import "server-only";
import { unstable_cache } from "next/cache";
import type {
  AgendaItem,
  NewsItem,
  Event,
  TeamMember,
  Resource,
  LibraryItem,
  SisterOrg,
  MembershipTier,
} from "@/lib/types";

const BASE = "https://api.mymemory.translated.net/get";
const TTL = 86_400;
const EMAIL = process.env.MYMEMORY_EMAIL ?? "";

// Curated translations for proper nouns MyMemory (a translation-memory
// service, not neural MT) renders unreliably. Checked before hitting the API.
const OVERRIDES: Record<string, Record<string, string>> = {
  "St. John Henry Newman & Friends Association Kenya": {
    fr: "Association des amis de saint John Henry Newman au Kenya",
    it: "Associazione degli amici di San Giovanni Henri Newman in Kenya",
  },
};

// Layer 1: in-process cache — avoids redundant unstable_cache lookups within a single process
const memCache = new Map<string, string>();

async function fetchTranslation(text: string, lang: string): Promise<string> {
  const key = `${lang}:${text}`;
  if (memCache.has(key)) return memCache.get(key)!;
  const qs = `q=${encodeURIComponent(text)}&langpair=en|${lang}${EMAIL ? `&de=${EMAIL}` : ""}`;
  // Layer 3: HTTP fetch cache
  const res = await fetch(`${BASE}?${qs}`, { next: { revalidate: TTL } });
  if (!res.ok) throw new Error(`MyMemory HTTP ${res.status}`);
  const data = await res.json();
  if (data?.responseStatus !== 200 || !data?.responseData?.translatedText)
    throw new Error("MyMemory bad response");
  const translated: string = data.responseData.translatedText;
  memCache.set(key, translated);
  return translated;
}

// Layer 2: Next.js Data Cache — persists across requests, 24 h TTL
// Cache key is unique per (text, lang) pair via function arguments
export const translateText = unstable_cache(
  (text: string, lang: string) => fetchTranslation(text, lang),
  ["translate-text"],
  { revalidate: TTL, tags: ["translations"] },
);

async function safe(
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

async function translateMarkdown(
  md: string | null | undefined,
  lang: string,
): Promise<string | undefined> {
  if (!md) return md ?? undefined;
  const parts = md.split(/\n\n+/);
  const translated = await Promise.all(parts.map((p) => safe(p, lang)));
  return translated.join("\n\n");
}

async function translateStringArray(arr: string[], lang: string): Promise<string[]> {
  return Promise.all(arr.map((s) => safe(s, lang) as Promise<string>));
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

// ── Per-type translators ──────────────────────────────────────────────────────

export async function translateAgendaItem(
  item: AgendaItem,
  lang: string,
): Promise<AgendaItem> {
  if (lang === "en") return item;
  const captions = item.gallery?.map((g) => g.caption) ?? [];
  const [title, followNote, content, ...caps] = await Promise.all([
    safe(item.title, lang),
    safe(item.followNote, lang),
    translateMarkdown(item.content, lang),
    ...captions.map((c) => safe(c, lang)),
  ]);
  return {
    ...item,
    title: title ?? item.title,
    followNote,
    content,
    gallery: item.gallery?.map((photo, i) => ({ ...photo, caption: caps[i] })),
  };
}

export function translateAgendaItems(
  items: AgendaItem[],
  lang: string,
): Promise<AgendaItem[]> {
  if (lang === "en") return Promise.resolve(items);
  return Promise.all(items.map((i) => translateAgendaItem(i, lang)));
}

export async function translateNewsItem(
  item: NewsItem,
  lang: string,
): Promise<NewsItem> {
  if (lang === "en") return item;
  const [title, excerpt, content] = await Promise.all([
    safe(item.title, lang),
    safe(item.excerpt, lang),
    translateMarkdown(item.content, lang),
  ]);
  return {
    ...item,
    title: title ?? item.title,
    excerpt: excerpt ?? item.excerpt,
    content: content ?? item.content,
  };
}

export function translateNewsItems(
  items: NewsItem[],
  lang: string,
): Promise<NewsItem[]> {
  if (lang === "en") return Promise.resolve(items);
  return Promise.all(items.map((i) => translateNewsItem(i, lang)));
}

export async function translateEvent(item: Event, lang: string): Promise<Event> {
  if (lang === "en") return item;
  const [title, description] = await Promise.all([
    safe(item.title, lang),
    safe(item.description, lang),
  ]);
  return {
    ...item,
    title: title ?? item.title,
    description: description ?? item.description,
  };
}

export function translateEvents(items: Event[], lang: string): Promise<Event[]> {
  if (lang === "en") return Promise.resolve(items);
  return Promise.all(items.map((i) => translateEvent(i, lang)));
}

export async function translateTeamMember(
  item: TeamMember,
  lang: string,
): Promise<TeamMember> {
  if (lang === "en") return item;
  const [role, bio] = await Promise.all([
    safe(item.role, lang),
    safe(item.bio, lang),
  ]);
  return { ...item, role: role ?? item.role, bio: bio ?? item.bio };
}

export function translateTeamMembers(
  items: TeamMember[],
  lang: string,
): Promise<TeamMember[]> {
  if (lang === "en") return Promise.resolve(items);
  return Promise.all(items.map((i) => translateTeamMember(i, lang)));
}

export async function translateResource(
  item: Resource,
  lang: string,
): Promise<Resource> {
  if (lang === "en") return item;
  const [title, description] = await Promise.all([
    safe(item.title, lang),
    safe(item.description, lang),
  ]);
  return {
    ...item,
    title: title ?? item.title,
    description: description ?? item.description,
  };
}

export function translateResources(
  items: Resource[],
  lang: string,
): Promise<Resource[]> {
  if (lang === "en") return Promise.resolve(items);
  return Promise.all(items.map((i) => translateResource(i, lang)));
}

export async function translateLibraryItem(
  item: LibraryItem,
  lang: string,
): Promise<LibraryItem> {
  if (lang === "en") return item;
  const [title, description] = await Promise.all([
    safe(item.title, lang),
    safe(item.description, lang),
  ]);
  return {
    ...item,
    title: title ?? item.title,
    description: description ?? item.description,
  };
}

export function translateLibraryItems(
  items: LibraryItem[],
  lang: string,
): Promise<LibraryItem[]> {
  if (lang === "en") return Promise.resolve(items);
  return Promise.all(items.map((i) => translateLibraryItem(i, lang)));
}

export async function translateSisterOrg(
  item: SisterOrg,
  lang: string,
): Promise<SisterOrg> {
  if (lang === "en") return item;
  const description = await safe(item.description, lang);
  return { ...item, description: description ?? item.description };
}

export function translateSisterOrgs(
  items: SisterOrg[],
  lang: string,
): Promise<SisterOrg[]> {
  if (lang === "en") return Promise.resolve(items);
  return Promise.all(items.map((i) => translateSisterOrg(i, lang)));
}

export async function translateMembershipTier(
  item: MembershipTier,
  lang: string,
): Promise<MembershipTier> {
  if (lang === "en") return item;
  const [name, benefits] = await Promise.all([
    safe(item.name, lang),
    translateStringArray(item.benefits, lang),
  ]);
  return { ...item, name: name ?? item.name, benefits };
}

export function translateMembershipTiers(
  items: MembershipTier[],
  lang: string,
): Promise<MembershipTier[]> {
  if (lang === "en") return Promise.resolve(items);
  return Promise.all(items.map((i) => translateMembershipTier(i, lang)));
}
