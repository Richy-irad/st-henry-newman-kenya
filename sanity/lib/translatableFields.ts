export const TRANSLATABLE_FIELDS: Record<string, string[]> = {
  newsItem: ["title", "excerpt", "content"],
  event: ["title", "description"],
  agendaItem: ["title", "location", "followNote", "content", "gallery[].caption"],
  celebration: ["name", "description"],
  teamMember: ["role", "bio"],
  resource: ["title", "description"],
  libraryItem: ["title", "description"],
  sisterOrg: ["name", "description"],
  membershipTier: ["name", "price", "benefits"],
}

// Long-form markdown fields need paragraph-by-paragraph translation — MyMemory
// rejects requests over its per-call length limit ("bad response") if a whole
// article is sent as one string. Matched by trailing field-name segment, since
// gallery[].caption-style paths don't apply here.
export const MARKDOWN_FIELD_NAMES = new Set(["content"])

export function isMarkdownField(fieldPath: string): boolean {
  const lastSegment = fieldPath.split(".").pop() ?? fieldPath
  return MARKDOWN_FIELD_NAMES.has(lastSegment)
}
