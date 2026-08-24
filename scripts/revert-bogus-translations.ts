// One-off cleanup: the first `backfill-translations.ts --apply` run silently
// wrote English text into fr/it fields for every doc where MyMemory's quota
// was exhausted — it returned HTTP 200 with the source text echoed back
// instead of erroring, so the backfill script (before the quotaFinished check
// was added to lib/translateCore.ts) treated it as a genuine translation and
// stamped the source hash. This unsets any {lang}/{lang}SourceHash pair whose
// value is byte-identical to the English source, so the next backfill run
// picks them back up for real translation.
//
// Usage:
//   npx tsx scripts/revert-bogus-translations.ts          # dry run
//   npx tsx scripts/revert-bogus-translations.ts --apply   # write for real

import { createClient } from "@sanity/client";
import { TRANSLATABLE_FIELDS } from "../sanity/lib/translatableFields";
import { NON_BASE_LANGUAGES } from "../sanity/lib/locales";

try {
  process.loadEnvFile(".env.local");
} catch {
  // no .env.local — assume env vars are already set in the shell
}

const APPLY = process.argv.includes("--apply");

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !dataset || !token) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, or SANITY_API_TOKEN.");
  process.exit(1);
}

const client = createClient({ projectId, dataset, token, apiVersion: "2024-01-01", useCdn: false });

type LocaleValue = { en?: unknown } & Record<string, unknown>;
type SanityDoc = { _id: string; _type: string } & Record<string, unknown>;

function isLocaleValue(value: unknown): value is LocaleValue {
  return typeof value === "object" && value !== null && !Array.isArray(value) && "en" in value;
}

function isBogus(enValue: unknown, translated: unknown): boolean {
  if (enValue === undefined || translated === undefined) return false;
  return JSON.stringify(enValue) === JSON.stringify(translated);
}

function parseArrayFieldPath(fieldPath: string): { arrayName: string; subField: string } | null {
  const match = fieldPath.match(/^(.+)\[\]\.(.+)$/);
  return match ? { arrayName: match[1], subField: match[2] } : null;
}

function collectUnsetPaths(basePath: string, value: unknown): string[] {
  if (!isLocaleValue(value)) return [];
  const unset: string[] = [];
  for (const lang of NON_BASE_LANGUAGES) {
    if (isBogus(value.en, value[lang.id])) {
      unset.push(`${basePath}.${lang.id}`, `${basePath}.${lang.id}SourceHash`);
    }
  }
  return unset;
}

async function main() {
  console.log(`Mode: ${APPLY ? "APPLY (writing to Sanity)" : "DRY RUN (no writes)"}`);

  let totalDocs = 0;
  let totalFields = 0;

  for (const [type, fieldPaths] of Object.entries(TRANSLATABLE_FIELDS)) {
    const docs = await client.fetch<SanityDoc[]>(
      `*[_type == $type && !(_id in path("drafts.**"))]`,
      { type },
    );

    for (const doc of docs) {
      let unset: string[] = [];

      for (const fieldPath of fieldPaths) {
        const arrayField = parseArrayFieldPath(fieldPath);
        if (arrayField) {
          const items = doc[arrayField.arrayName];
          if (!Array.isArray(items)) continue;
          for (const item of items as Record<string, unknown>[]) {
            const itemKey = item._key as string | undefined;
            if (!itemKey) continue;
            unset = unset.concat(
              collectUnsetPaths(
                `${arrayField.arrayName}[_key=="${itemKey}"].${arrayField.subField}`,
                item[arrayField.subField],
              ),
            );
          }
          continue;
        }
        unset = unset.concat(collectUnsetPaths(fieldPath, doc[fieldPath]));
      }

      if (unset.length === 0) continue;

      totalDocs += 1;
      totalFields += unset.length;
      console.log(`  ${APPLY ? "unset" : "would unset"}  ${type}/${doc._id}: ${unset.length} path(s)`);
      if (APPLY) {
        await client.patch(doc._id).unset(unset).commit();
      }
    }
  }

  console.log(`\n--- Summary ---\n${totalDocs} document(s), ${totalFields} field(s)`);
  if (!APPLY) console.log("\nDry run only — re-run with --apply to write these changes.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
