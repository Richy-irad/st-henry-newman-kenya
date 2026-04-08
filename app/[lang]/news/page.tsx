import { getDictionary, hasLocale } from "../dictionaries";
import type { Locale } from "../dictionaries";
import { notFound } from "next/navigation";
import Hero from "@/components/Hero";
import Card from "@/components/Card";
import { getLatestNews } from "@/lib/data";

export default async function NewsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);

  const news = getLatestNews();

  return (
    <>
      <Hero title={dict.news.heroTitle} subtitle={dict.news.heroSubtitle} />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {news.map((item) => (
            <Card
              key={item.slug}
              href={`/news/${item.slug}`}
              lang={lang}
              image={{ src: item.image, alt: item.title }}
            >
              <p className="text-sm text-accent font-medium">
                {new Date(item.date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <h3 className="mt-1 text-lg font-semibold text-neutral-900">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-neutral-600 line-clamp-3">
                {item.excerpt}
              </p>
              <span className="mt-3 inline-block text-sm font-medium text-primary">
                {dict.news.readMore} &rarr;
              </span>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
