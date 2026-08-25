// Framework-agnostic MyMemory translation core, importable from both Next.js
// server code (via lib/translate.ts, which adds "server-only" + the Next Data
// Cache layer) and plain Node scripts (e.g. scripts/backfill-translations.ts)
// that can't use "server-only" or unstable_cache outside a Next.js runtime.

const BASE = "https://api.mymemory.translated.net/get";
const EMAIL = process.env.MYMEMORY_EMAIL ?? "";

// Curated translations for proper nouns MyMemory (a translation-memory
// service, not neural MT) renders unreliably. Checked before hitting the API.
export const OVERRIDES: Record<string, Record<string, string>> = {
  "Saint John Henry Newman Friends Association Kenya": {
    fr: "Association des amis de saint John Henry Newman au Kenya",
    it: "Associazione degli amici di San Giovanni Henri Newman in Kenya",
  },
};

// In-process cache — avoids redundant lookups for repeated strings within a single run
const memCache = new Map<string, string>();

export async function fetchTranslation(text: string, lang: string): Promise<string> {
  const key = `${lang}:${text}`;
  if (memCache.has(key)) return memCache.get(key)!;
  const qs = `q=${encodeURIComponent(text)}&langpair=en|${lang}${EMAIL ? `&de=${EMAIL}` : ""}`;
  const res = await fetch(`${BASE}?${qs}`);
  if (!res.ok) throw new Error(`MyMemory HTTP ${res.status}`);
  const data = await res.json();
  if (data?.responseStatus !== 200 || !data?.responseData?.translatedText)
    throw new Error("MyMemory bad response");
  // When MyMemory's daily quota is exhausted it can reply with HTTP 200 and
  // the source text echoed back unchanged instead of an error. `quotaFinished`
  // is the documented signal for one variant of this; empirically there's also
  // a fully silent variant (200, quotaFinished still false/null, translatedText
  // byte-identical to the query) with no signal at all besides the echo itself
  // — confirmed by hitting it directly against this project's live data.
  const translated: string = data.responseData.translatedText;
  if (data.quotaFinished) throw new Error("MyMemory quota finished");
  // Only treat an identical echo as a failure for multi-word text: short
  // strings (country names, brand names, "France", "KTO TV"...) are
  // frequently — and correctly — identical across en/fr/it, confirmed
  // against live MyMemory responses with match:1. A full sentence coming
  // back byte-identical is essentially never a real translation, so that
  // case is still treated as a silent pass-through failure.
  const isMultiWord = text.trim().split(/\s+/).length > 2;
  if (isMultiWord && translated.trim() === text.trim())
    throw new Error("MyMemory returned source text unchanged");
  memCache.set(key, translated);
  return translated;
}

export async function safeCore(
  text: string | null | undefined,
  lang: string,
): Promise<string | undefined> {
  if (!text) return text ?? undefined;
  const override = OVERRIDES[text]?.[lang];
  if (override) return override;
  try {
    return await fetchTranslation(text, lang);
  } catch (err) {
    console.error(`translate failed [${lang}]: "${text.slice(0, 60)}"`, err);
    return text;
  }
}

// Markdown/long-text fields exceed MyMemory's per-request length limit if sent
// whole. Split on paragraph breaks, translate each, rejoin.
export async function safeMarkdownCore(
  md: string | null | undefined,
  lang: string,
): Promise<string | undefined> {
  if (!md) return md ?? undefined;
  const parts = md.split(/\n\n+/);
  const translated = await Promise.all(parts.map((p) => safeCore(p, lang)));
  return translated.join("\n\n");
}
