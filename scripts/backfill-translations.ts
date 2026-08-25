// One-off migration: wraps existing plain string/array fields into the new
// { en, fr, it } localized shape and fills fr/it via MyMemory.
//
// Safety:
//   - Defaults to a DRY RUN. Pass --apply to actually write.
//   - Take a dataset backup first: npx sanity dataset export <dataset> backup.tar.gz
//   - Only operates on published documents (drafts are skipped — publish or
//     discard any pending drafts before running this).
//   - Idempotent: fields already in { en, ... } shape are only topped up
//     (missing fr/it filled in), never re-wrapped or re-translated.
//
// Usage:
//   npx tsx scripts/backfill-translations.ts                 # dry run, all types
//   npx tsx scripts/backfill-translations.ts --apply          # write for real
//   npx tsx scripts/backfill-translations.ts --types=newsItem # limit to one type
//   npx tsx scripts/backfill-translations.ts --limit=3        # cap docs per type
//   npx tsx scripts/backfill-translations.ts --force          # ignore existing source hashes, re-translate everything

import { createClient } from "@sanity/client";
import { TRANSLATABLE_FIELDS, isMarkdownField } from "../sanity/lib/translatableFields";
import { NON_BASE_LANGUAGES } from "../sanity/lib/locales";
import { hashText } from "../sanity/lib/textHash";
import { OVERRIDES, fetchTranslation } from "../lib/translateCore";

try {
  process.loadEnvFile(".env.local");
} catch {
  // no .env.local — assume env vars are already set in the shell
}

const args = process.argv.slice(2);
const APPLY = args.includes("--apply");
const FORCE = args.includes("--force"); // ignore existing source hashes, re-translate everything
const LIMIT = Number(args.find((a) => a.startsWith("--limit="))?.split("=")[1] ?? "0") || undefined;
const TYPES_FILTER = args
  .find((a) => a.startsWith("--types="))
  ?.split("=")[1]
  ?.split(",");

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !dataset || !token) {
  console.error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, or SANITY_API_TOKEN.",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2024-01-01",
  useCdn: false,
});

type LocaleValue = { en?: unknown } & Record<string, unknown>;
type SanityDoc = { _id: string; _type: string } & Record<string, unknown>;

function isLocaleValue(value: unknown): value is LocaleValue {
  return typeof value === "object" && value !== null && !Array.isArray(value) && "en" in value;
}

function parseArrayFieldPath(fieldPath: string): { arrayName: string; subField: string } | null {
  const match = fieldPath.match(/^(.+)\[\]\.(.+)$/);
  return match ? { arrayName: match[1], subField: match[2] } : null;
}

// Translate one string, reporting whether it genuinely succeeded (as opposed
// to silently falling back to the English source after a MyMemory error) —
// the caller uses `ok` to decide whether it's safe to mark this translation
// complete via the source hash, or whether it must be retried on a future run.
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function translateString(text: string, lang: string): Promise<{ value: string; ok: boolean }> {
  const override = OVERRIDES[text]?.[lang];
  if (override) return { value: override, ok: true };
  try {
    await sleep(300); // throttle — MyMemory's free tier 429s on bursts well under its daily quota
    return { value: await fetchTranslation(text, lang), ok: true };
  } catch (err) {
    console.error(`translate failed [${lang}]: "${text.slice(0, 60)}"`, err);
    return { value: text, ok: false };
  }
}

async function translateMarkdown(md: string, lang: string): Promise<{ value: string; ok: boolean }> {
  const parts = md.split(/\n\n+/);
  const results: { value: string; ok: boolean }[] = [];
  for (const part of parts) {
    results.push(await translateString(part, lang)); // sequential — keeps the throttle delay meaningful
  }
  return { value: results.map((r) => r.value).join("\n\n"), ok: results.every((r) => r.ok) };
}

async function translateValue(
  enValue: unknown,
  lang: string,
  markdown: boolean,
): Promise<{ value: unknown; ok: boolean }> {
  const translator = markdown ? translateMarkdown : translateString;
  if (Array.isArray(enValue)) {
    const results: { value: string; ok: boolean }[] = [];
    for (const v of enValue) {
      results.push(await translator(v, lang)); // sequential — keeps the throttle delay meaningful
    }
    return { value: results.map((r) => r.value), ok: results.every((r) => r.ok) };
  }
  return translator(enValue as string, lang);
}

/** Returns the `set` patch entries needed for one locale-object field, or null if nothing to do. */
async function buildFieldPatch(
  basePath: string,
  currentValue: unknown,
  markdown: boolean,
): Promise<{ set: Record<string, unknown>; migrated: boolean } | null> {
  const alreadyLocalized = isLocaleValue(currentValue);
  const enValue = alreadyLocalized ? (currentValue as LocaleValue).en : currentValue;
  if (enValue === undefined || enValue === null) return null;

  const set: Record<string, unknown> = {};
  let didWork = false;

  if (!alreadyLocalized) {
    set[`${basePath}.en`] = enValue;
  }

  const sourceHash = hashText(enValue as string | string[]);

  for (const lang of NON_BASE_LANGUAGES) {
    const existingTranslation = alreadyLocalized ? (currentValue as LocaleValue)[lang.id] : undefined;
    const existingHash = alreadyLocalized
      ? (currentValue as LocaleValue)[`${lang.id}SourceHash`]
      : undefined;
    if (!FORCE && existingTranslation !== undefined && existingHash === sourceHash) continue; // already translated, up to date

    const { value: translated, ok } = await translateValue(enValue, lang.id, markdown);
    set[`${basePath}.${lang.id}`] = translated;
    // Only stamp the hash on a genuine translation — an English-fallback
    // value must NOT look "up to date" or it'll never be retried.
    if (ok) set[`${basePath}.${lang.id}SourceHash`] = sourceHash;
    didWork = true;
  }

  if (!didWork && alreadyLocalized) return null; // fully migrated already, nothing to top up
  return { set, migrated: didWork || !alreadyLocalized };
}

async function processDocument(doc: SanityDoc, fieldPaths: string[]) {
  let set: Record<string, unknown> = {};
  let touched = false;

  for (const fieldPath of fieldPaths) {
    const arrayField = parseArrayFieldPath(fieldPath);
    if (arrayField) {
      const items = doc[arrayField.arrayName];
      if (!Array.isArray(items)) continue;
      for (const item of items as Record<string, unknown>[]) {
        const itemKey = item._key as string | undefined;
        if (!itemKey) continue;
        const patch = await buildFieldPatch(
          `${arrayField.arrayName}[_key=="${itemKey}"].${arrayField.subField}`,
          item[arrayField.subField],
          isMarkdownField(arrayField.subField),
        );
        if (patch) {
          set = { ...set, ...patch.set };
          touched = true;
        }
      }
      continue;
    }
    const patch = await buildFieldPatch(fieldPath, doc[fieldPath], isMarkdownField(fieldPath));
    if (patch) {
      set = { ...set, ...patch.set };
      touched = true;
    }
  }

  return { touched, set };
}

async function main() {
  const types = TYPES_FILTER ?? Object.keys(TRANSLATABLE_FIELDS);
  console.log(`Mode: ${APPLY ? "APPLY (writing to Sanity)" : "DRY RUN (no writes)"}`);
  console.log(`Types: ${types.join(", ")}`);
  if (LIMIT) console.log(`Limit: ${LIMIT} docs/type`);
  console.log("");

  const summary: Record<string, { migrated: number; skipped: number; failed: number }> = {};

  for (const type of types) {
    const fieldPaths = TRANSLATABLE_FIELDS[type];
    if (!fieldPaths) {
      console.warn(`Unknown type "${type}", skipping.`);
      continue;
    }

    summary[type] = { migrated: 0, skipped: 0, failed: 0 };

    const query = `*[_type == $type && !(_id in path("drafts.**"))]${LIMIT ? `[0...${LIMIT}]` : ""}`;
    const docs = await client.fetch<SanityDoc[]>(query, { type });

    console.log(`\n${type}: ${docs.length} published document(s)`);

    for (const doc of docs) {
      try {
        const { touched, set } = await processDocument(doc, fieldPaths);
        if (!touched) {
          summary[type].skipped += 1;
          console.log(`  skip  ${doc._id} (already fully translated)`);
          continue;
        }

        console.log(`  ${APPLY ? "apply" : "would apply"}  ${doc._id}: ${Object.keys(set).length} field(s)`);
        if (APPLY) {
          await client.patch(doc._id).set(set).commit();
        }
        summary[type].migrated += 1;
      } catch (err) {
        summary[type].failed += 1;
        console.error(`  FAILED ${doc._id}:`, err);
      }
    }
  }

  console.log("\n--- Summary ---");
  for (const [type, counts] of Object.entries(summary)) {
    console.log(`${type}: migrated=${counts.migrated} skipped=${counts.skipped} failed=${counts.failed}`);
  }
  if (!APPLY) console.log("\nDry run only — re-run with --apply to write these changes.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
