import "server-only";
import { sanityClient } from "./client";
import type {
  NewsItem,
  Event,
  TeamMember,
  Resource,
  LibraryItem,
  SisterOrg,
  MembershipTier,
  AgendaItem,
  Celebration,
  ResourceType,
} from "@/lib/types";

const IMAGE_URL = `image.asset->url`;

// Feature flag: while off, every visitor gets English CMS content regardless
// of URL locale (UI chrome still translates via the untouched dictionaries.ts
// path). This exists purely as a staged/reversible cutover switch — the
// coalesce(...) projections below are shape-tolerant on their own and work
// correctly whether or not the Sanity backfill has run yet.
function resolveLang(lang: string): string {
  return process.env.CMS_LOCALIZED_CONTENT === "true" ? lang : "en";
}

// Resolves a localized field to the requested language, falling back to
// English, and finally to the raw field itself — which covers documents that
// haven't been migrated from the old plain-string shape yet. Safe to use
// against both old and new data shapes.
function localized(fieldPath: string): string {
  return `coalesce(${fieldPath}[$lang], ${fieldPath}.en, ${fieldPath})`;
}

// ---------------------------------------------------------------------------
// News
// ---------------------------------------------------------------------------

export async function getLatestNews(lang: string, count?: number): Promise<NewsItem[]> {
  const limit = count ? `[0...${count}]` : "";
  return sanityClient.fetch<NewsItem[]>(
    `*[_type == "newsItem"] | order(date desc) ${limit} {
      "slug": slug.current,
      "title": ${localized("title")},
      "excerpt": ${localized("excerpt")},
      "content": ${localized("content")},
      date,
      "image": ${IMAGE_URL},
      author
    }`,
    { lang: resolveLang(lang) },
  );
}

export async function getNewsBySlug(slug: string, lang: string): Promise<NewsItem | null> {
  return sanityClient.fetch<NewsItem | null>(
    `*[_type == "newsItem" && slug.current == $slug][0] {
      "slug": slug.current,
      "title": ${localized("title")},
      "excerpt": ${localized("excerpt")},
      "content": ${localized("content")},
      date,
      "image": ${IMAGE_URL},
      author
    }`,
    { slug, lang: resolveLang(lang) },
  );
}

export async function getAllNewsSlugs(): Promise<{ slug: string }[]> {
  return sanityClient.fetch<{ slug: string }[]>(
    `*[_type == "newsItem"] { "slug": slug.current }`,
  );
}

// ---------------------------------------------------------------------------
// Events
// ---------------------------------------------------------------------------

export async function getUpcomingEvents(lang: string, count?: number): Promise<Event[]> {
  const limit = count ? `[0...${count}]` : "";
  return sanityClient.fetch<Event[]>(
    `*[_type == "event" && date >= now()] | order(date desc) ${limit} {
      "slug": slug.current,
      "title": ${localized("title")},
      "description": ${localized("description")},
      type, date, endDate, location,
      "image": ${IMAGE_URL},
      registrationUrl
    }`,
    { lang: resolveLang(lang) },
  );
}

// ---------------------------------------------------------------------------
// Team Members
// ---------------------------------------------------------------------------

export async function getTeamMembers(lang: string): Promise<TeamMember[]> {
  return sanityClient.fetch<TeamMember[]>(
    `*[_type == "teamMember"] | order(order asc) {
      name,
      "role": ${localized("role")},
      "bio": ${localized("bio")},
      "image": ${IMAGE_URL}
    }`,
    { lang: resolveLang(lang) },
  );
}

// ---------------------------------------------------------------------------
// Resources
// ---------------------------------------------------------------------------

export async function getResourcesByType(
  type: ResourceType,
  lang: string,
): Promise<Resource[]> {
  return sanityClient.fetch<Resource[]>(
    `*[_type == "resource" && type == $type] | order(date desc) {
      "slug": slug.current,
      "title": ${localized("title")},
      "description": ${localized("description")},
      type, downloadUrl, date, fileSize
    }`,
    { type, lang: resolveLang(lang) },
  );
}

// ---------------------------------------------------------------------------
// Library
// ---------------------------------------------------------------------------

export async function getLibraryItems(lang: string): Promise<LibraryItem[]> {
  return sanityClient.fetch<LibraryItem[]>(
    `*[_type == "libraryItem"] | order(year desc) {
      "slug": slug.current,
      "title": ${localized("title")},
      "description": ${localized("description")},
      author, year, category, link
    }`,
    { lang: resolveLang(lang) },
  );
}

// ---------------------------------------------------------------------------
// Sister Organisations
// ---------------------------------------------------------------------------

export async function getSisterOrgs(lang: string): Promise<SisterOrg[]> {
  return sanityClient.fetch<SisterOrg[]>(
    `*[_type == "sisterOrg"] | order(_createdAt asc) {
      "name": ${localized("name")},
      "description": ${localized("description")},
      url,
      "image": ${IMAGE_URL},
      country
    }`,
    { lang: resolveLang(lang) },
  );
}

// ---------------------------------------------------------------------------
// Membership Tiers
// ---------------------------------------------------------------------------

export async function getMembershipTiers(lang: string): Promise<MembershipTier[]> {
  return sanityClient.fetch<MembershipTier[]>(
    `*[_type == "membershipTier"] | order(order asc) {
      "name": ${localized("name")},
      "price": ${localized("price")},
      "benefits": ${localized("benefits")},
      highlighted
    }`,
    { lang: resolveLang(lang) },
  );
}

// ---------------------------------------------------------------------------
// Agenda
// ---------------------------------------------------------------------------

export async function getAgendaItems(lang: string, count?: number): Promise<AgendaItem[]> {
  const limit = count ? `[0...${count}]` : "";
  return sanityClient.fetch<AgendaItem[]>(
    `*[_type == "agendaItem"] | order(coalesce(endDate, startDate) desc) ${limit} {
      "slug": slug.current,
      "title": ${localized("title")},
      startDate, endDate, time, followUrl,
      "location": ${localized("location")},
      "followNote": ${localized("followNote")},
      "content": ${localized("content")},
      "celebration": celebration->{"name": ${localized("name")}, "slug": slug.current}
    }`,
    { lang: resolveLang(lang) },
  );
}

export async function getAgendaItemBySlug(
  slug: string,
  lang: string,
): Promise<AgendaItem | null> {
  return sanityClient.fetch<AgendaItem | null>(
    `*[_type == "agendaItem" && slug.current == $slug][0] {
      "slug": slug.current,
      "title": ${localized("title")},
      startDate, endDate, time, followUrl,
      "location": ${localized("location")},
      "followNote": ${localized("followNote")},
      "content": ${localized("content")},
      "celebration": celebration->{"name": ${localized("name")}, "slug": slug.current},
      "coverImage": coverImage.asset->url,
      "gallery": gallery[]{ "url": asset->url, "caption": ${localized("caption")} }
    }`,
    { slug, lang: resolveLang(lang) },
  );
}

export async function getAllAgendaSlugs(): Promise<{ slug: string }[]> {
  return sanityClient.fetch<{ slug: string }[]>(
    `*[_type == "agendaItem"] { "slug": slug.current }`,
  );
}

export async function getCelebrationBySlug(
  slug: string,
  lang: string,
): Promise<Celebration | null> {
  return sanityClient.fetch<Celebration | null>(
    `*[_type == "celebration" && slug.current == $slug][0] {
      "name": ${localized("name")}, "slug": slug.current,
      "description": ${localized("description")}
    }`,
    { slug, lang: resolveLang(lang) },
  );
}
