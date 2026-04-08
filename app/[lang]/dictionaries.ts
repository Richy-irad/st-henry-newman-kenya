import "server-only";

const dictionaries = {
  en: () => import("@/dictionaries/en.json").then((m) => m.default),
  fr: () => import("@/dictionaries/fr.json").then((m) => m.default),
  it: () => import("@/dictionaries/it.json").then((m) => m.default),
};

export type Locale = keyof typeof dictionaries;
export type Dictionary = Awaited<ReturnType<(typeof dictionaries)[Locale]>>;

export const locales: Locale[] = ["en", "fr", "it"];

export function hasLocale(locale: string): locale is Locale {
  return locale in dictionaries;
}

export const getDictionary = async (locale: Locale) => dictionaries[locale]();
