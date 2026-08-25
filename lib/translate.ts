import "server-only";
import { unstable_cache } from "next/cache";
import { fetchTranslation, OVERRIDES } from "./translateCore";

const TTL = 86_400;

// Next.js Data Cache — persists across requests, 24 h TTL.
// Cache key is unique per (text, lang) pair via function arguments.
export const translateText = unstable_cache(
  (text: string, lang: string) => fetchTranslation(text, lang),
  ["translate-text"],
  { revalidate: TTL, tags: ["translations"] },
);

export async function safe(
  text: string | null | undefined,
  lang: string,
): Promise<string | undefined> {
  if (!text) return text ?? undefined;
  const override = OVERRIDES[text]?.[lang];
  if (override) return override;
  try {
    return await translateText(text, lang);
  } catch (err) {
    console.error(`translate failed [${lang}]: "${text.slice(0, 60)}"`, err);
    return text;
  }
}

// Markdown/long-text fields exceed MyMemory's per-request length limit if sent
// whole. Split on paragraph breaks, translate each (still via the cached
// `safe`), rejoin.
export async function safeMarkdown(
  md: string | null | undefined,
  lang: string,
): Promise<string | undefined> {
  if (!md) return md ?? undefined;
  const parts = md.split(/\n\n+/);
  const translated = await Promise.all(parts.map((p) => safe(p, lang)));
  return translated.join("\n\n");
}

// Generic recursive translator — handles nested objects, arrays, and primitives
export async function translateObject<T>(obj: T, lang: string): Promise<T> {
  if (lang === "en") return obj;
  if (typeof obj === "string") return safe(obj, lang) as unknown as Promise<T>;
  if (Array.isArray(obj)) {
    const results = await Promise.all(obj.map((item) => translateObject(item, lang)));
    return results as unknown as T;
  }
  if (typeof obj === "object" && obj !== null) {
    const entries = await Promise.all(
      Object.entries(obj as Record<string, unknown>).map(async ([k, v]) => [
        k,
        await translateObject(v, lang),
      ]),
    );
    return Object.fromEntries(entries) as T;
  }
  return obj;
}
