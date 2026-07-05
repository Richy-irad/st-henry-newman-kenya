import { getDictionary, hasLocale } from "../../../dictionaries";
import type { Locale } from "../../../dictionaries";
import { notFound } from "next/navigation";
import Link from "next/link";
import Markdown from "react-markdown";
import { getAgendaItemBySlug, getAllAgendaSlugs } from "@/lib/sanity/queries";

export async function generateStaticParams() {
  const slugs = await getAllAgendaSlugs();
  return slugs.map(({ slug }) => ({ slug }));
}

function formatDate(dateStr: string, locale: string): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function AgendaDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();

  const item = await getAgendaItemBySlug(slug);
  if (!item) notFound();

  const dict = await getDictionary(lang as Locale);

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <Link
        href={`/${lang}/events`}
        className="inline-flex items-center text-sm font-medium text-primary hover:text-primary-dark"
      >
        &larr; {dict.events.backToEvents}
      </Link>

      <h1 className="mt-6 text-3xl font-bold text-neutral-900 md:text-4xl">
        {item.title}
      </h1>

      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-neutral-600">
        <time className="text-accent font-medium">
          {formatDate(item.startDate, lang)}
          {item.endDate && item.endDate !== item.startDate && (
            <> &ndash; {formatDate(item.endDate, lang)}</>
          )}
        </time>
        {item.time && <span>{item.time}</span>}
        <span>{item.location}</span>
        {item.celebration && (
          <span className="rounded-full bg-primary-tint px-3 py-0.5 text-xs font-medium text-primary">
            {item.celebration.name}
          </span>
        )}
      </div>

      {(item.followUrl || item.followNote) && (
        <p className="mt-3 text-sm text-neutral-600">
          {item.followUrl ? (
            <a
              href={item.followUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {item.followNote ?? "Follow event"}
            </a>
          ) : (
            item.followNote
          )}
        </p>
      )}

      <hr className="my-10 border-neutral-200" />

      {item.content ? (
        <div className="prose prose-neutral max-w-none prose-headings:font-heading prose-headings:text-neutral-900 prose-a:text-primary prose-img:rounded-[var(--radius)]">
          <Markdown>{item.content}</Markdown>
        </div>
      ) : (
        <p className="text-neutral-500 italic">No write-up yet for this event.</p>
      )}
    </article>
  );
}
