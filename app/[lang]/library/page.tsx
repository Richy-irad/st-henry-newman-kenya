import { getDictionary, hasLocale } from "../dictionaries";
import type { Locale } from "../dictionaries";
import { notFound } from "next/navigation";
import Hero from "@/components/Hero";
import LibraryFilter from "@/components/LibraryFilter";
import { libraryItems } from "@/lib/data";

export default async function LibraryPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);

  return (
    <>
      <Hero title={dict.library.heroTitle} subtitle={dict.library.heroSubtitle} />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <LibraryFilter
          items={libraryItems}
          labels={{
            searchPlaceholder: dict.library.searchPlaceholder,
            all: dict.library.filterAll,
            works: dict.library.filterWorks,
            translations: dict.library.filterTranslations,
            articles: dict.library.filterArticles,
            author: dict.library.author,
            year: dict.library.year,
            readOnline: dict.library.readOnline,
            noResults: dict.library.noResults,
          }}
        />
      </section>
    </>
  );
}
