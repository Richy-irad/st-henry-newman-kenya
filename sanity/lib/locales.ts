export const SUPPORTED_LANGUAGES = [
  { id: "en", title: "English", isBase: true },
  { id: "fr", title: "French", isBase: false },
  { id: "it", title: "Italian", isBase: false },
] as const

export type LanguageId = (typeof SUPPORTED_LANGUAGES)[number]["id"]

export const BASE_LANGUAGE: LanguageId = "en"

export const NON_BASE_LANGUAGES = SUPPORTED_LANGUAGES.filter((lang) => !lang.isBase)
