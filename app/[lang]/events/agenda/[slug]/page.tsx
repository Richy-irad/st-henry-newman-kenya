import { getDictionary, hasLocale } from "../../../dictionaries";
import type { Locale } from "../../../dictionaries";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Markdown from "react-markdown";
import { getAgendaItemBySlug, getAllAgendaSlugs } from "@/lib/sanity/queries";
import { translateAgendaItem } from "@/lib/translate";

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

  const rawItem = await getAgendaItemBySlug(slug);
  if (!rawItem) notFound();
  const item = await translateAgendaItem(rawItem, lang);

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

      {item.coverImage && (
        <div className="relative aspect-video w-full overflow-hidden rounded-[var(--radius)]">
          <Image
            src={item.coverImage}
            alt={item.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>
      )}

      {item.content ? (
        <div className="prose prose-neutral mt-10 max-w-none prose-headings:font-heading prose-headings:text-neutral-900 prose-a:text-primary prose-img:rounded-[var(--radius)]">
          <Markdown
            components={{
              img({ src, alt }) {
                if (!src || typeof src !== "string") return null;
                return (
                  <span className="relative block w-full aspect-video my-4 overflow-hidden rounded-[var(--radius)]">
                    <Image
                      src={src}
                      alt={alt ?? ""}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 768px"
                    />
                  </span>
                );
              },
            }}
          >
            {item.content}
          </Markdown>
        </div>
      ) : (
        <p className="text-neutral-500 italic">No write-up yet for this event.</p>
      )}

      {item.gallery && item.gallery.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 font-heading text-xl font-bold text-neutral-900">
            Photos
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {item.gallery.map((photo, index) => (
              <figure key={index} className="overflow-hidden rounded-[var(--radius)]">
                <div className="relative aspect-square w-full">
                  <Image
                    src={photo.url}
                    alt={photo.caption ?? `Photo ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, 33vw"
                  />
                </div>
                {photo.caption && (
                  <figcaption className="mt-1 text-center text-xs text-neutral-500">
                    {photo.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
