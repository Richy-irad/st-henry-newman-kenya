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
  ResourceType,
} from "@/lib/types";

const IMAGE_URL = `coalesce(image.asset->url, "")`;

// ---------------------------------------------------------------------------
// News
// ---------------------------------------------------------------------------

export async function getLatestNews(count?: number): Promise<NewsItem[]> {
  const limit = count ? `[0...${count}]` : "";
  return sanityClient.fetch<NewsItem[]>(
    `*[_type == "newsItem"] | order(date desc) ${limit} {
      "slug": slug.current,
      title, excerpt, content, date,
      "image": ${IMAGE_URL},
      author
    }`,
  );
}

export async function getNewsBySlug(slug: string): Promise<NewsItem | null> {
  return sanityClient.fetch<NewsItem | null>(
    `*[_type == "newsItem" && slug.current == $slug][0] {
      "slug": slug.current,
      title, excerpt, content, date,
      "image": ${IMAGE_URL},
      author
    }`,
    { slug },
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

export async function getUpcomingEvents(count?: number): Promise<Event[]> {
  const limit = count ? `[0...${count}]` : "";
  return sanityClient.fetch<Event[]>(
    `*[_type == "event" && dateTime(date) >= dateTime(now())] | order(date asc) ${limit} {
      "slug": slug.current,
      title, description, type, date, endDate, location,
      "image": ${IMAGE_URL},
      registrationUrl
    }`,
  );
}

// ---------------------------------------------------------------------------
// Team Members
// ---------------------------------------------------------------------------

export async function getTeamMembers(): Promise<TeamMember[]> {
  return sanityClient.fetch<TeamMember[]>(
    `*[_type == "teamMember"] | order(order asc) {
      name, role, bio,
      "image": ${IMAGE_URL}
    }`,
  );
}

// ---------------------------------------------------------------------------
// Resources
// ---------------------------------------------------------------------------

export async function getResourcesByType(
  type: ResourceType,
): Promise<Resource[]> {
  return sanityClient.fetch<Resource[]>(
    `*[_type == "resource" && type == $type] | order(date desc) {
      "slug": slug.current,
      title, description, type, downloadUrl, date, fileSize
    }`,
    { type },
  );
}

// ---------------------------------------------------------------------------
// Library
// ---------------------------------------------------------------------------

export async function getLibraryItems(): Promise<LibraryItem[]> {
  return sanityClient.fetch<LibraryItem[]>(
    `*[_type == "libraryItem"] | order(year desc) {
      "slug": slug.current,
      title, description, author, year, category, link
    }`,
  );
}

// ---------------------------------------------------------------------------
// Sister Organisations
// ---------------------------------------------------------------------------

export async function getSisterOrgs(): Promise<SisterOrg[]> {
  return sanityClient.fetch<SisterOrg[]>(
    `*[_type == "sisterOrg"] | order(_createdAt asc) {
      name, description, url,
      "image": ${IMAGE_URL},
      country
    }`,
  );
}

// ---------------------------------------------------------------------------
// Membership Tiers
// ---------------------------------------------------------------------------

export async function getMembershipTiers(): Promise<MembershipTier[]> {
  return sanityClient.fetch<MembershipTier[]>(
    `*[_type == "membershipTier"] | order(order asc) {
      name, price, benefits, highlighted
    }`,
  );
}
