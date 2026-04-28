import { getDictionary, hasLocale } from "../../dictionaries";
import type { Locale } from "../../dictionaries";
import { notFound } from "next/navigation";
import { getNewsBySlug, getAllNewsSlugs } from "@/lib/sanity/queries";
import Image from "next/image";
import Link from "next/link";
import Markdown from "react-markdown";

export async function generateStaticParams() {
  const slugs = await getAllNewsSlugs();
  return slugs.map(({ slug }) => ({ slug }));
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();

  const article = await getNewsBySlug(slug);
  if (!article) notFound();

  const dict = await getDictionary(lang as Locale);

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <Link
        href={`/${lang}/news`}
        className="inline-flex items-center text-sm font-medium text-primary hover:text-primary-dark"
      >
        &larr; {dict.news.backToNews}
      </Link>

      <h1 className="mt-6 text-3xl font-bold text-neutral-900 md:text-4xl">
        {article.title}
      </h1>

      <div className="mt-4 flex items-center gap-4 text-sm text-neutral-600">
        <time dateTime={article.date}>
          {new Date(article.date).toLocaleDateString(lang, {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </time>
        {article.author && <span>{dict.common.by} {article.author}</span>}
      </div>

      <div className="relative mt-8 aspect-video w-full overflow-hidden rounded-[var(--radius)]">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 768px"
        />
      </div>

      <div className="prose prose-neutral mt-10 max-w-none prose-headings:font-heading prose-headings:text-neutral-900 prose-a:text-primary prose-img:rounded-[var(--radius)]">
        <Markdown>{article.content}</Markdown>
      </div>
    </article>
  );
}
