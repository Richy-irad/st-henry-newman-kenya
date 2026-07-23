import "server-only";
import { translateObject } from "@/lib/translate";
import enDict from "@/dictionaries/en.json";

export type Locale = "en" | "fr" | "it";
export type Dictionary = typeof enDict;

export const locales: Locale[] = ["en", "fr", "it"];

export function hasLocale(locale: string): locale is Locale {
  return (locales as string[]).includes(locale);
}

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  if (locale === "en") return enDict;
  return translateObject(enDict, locale) as Promise<Dictionary>;
}
