import { getDictionary, hasLocale } from "./dictionaries";
import type { Locale } from "./dictionaries";
import { notFound } from "next/navigation";
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import Card from "@/components/Card";
import Button from "@/components/Button";
import { getLatestNews, getUpcomingEvents } from "@/lib/data";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);

  const latestNews = getLatestNews(3);
  const upcomingEvents = getUpcomingEvents(3);

  return (
    <>
      <Hero
        title={dict.home.heroTitle}
        subtitle={dict.home.heroSubtitle}
        backgroundImage="/st-john-henry-newman-lndscp.jpg"
        quote={dict.home.heroQuote}
        cta={{ label: dict.home.ctaButton, href: "/membership" }}
        lang={lang}
      />

      {/* Mission section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading>{dict.home.missionTitle}</SectionHeading>
        <div className="mx-auto mt-8 max-w-3xl space-y-4 text-center text-neutral-600">
          <p>{dict.home.missionText}</p>
          <p>{dict.home.missionText2}</p>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading>{dict.home.eventsTitle}</SectionHeading>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {upcomingEvents.map((event) => (
              <Card
                key={event.slug}
                href={`/events`}
                lang={lang}
                image={{ src: event.image, alt: event.title }}
              >
                <span className="mb-2 inline-block rounded-full bg-primary-tint px-3 py-0.5 text-xs font-medium text-primary">
                  {event.type}
                </span>
                <h3 className="text-lg font-semibold text-neutral-900">
                  {event.title}
                </h3>
                <p className="mt-1 text-sm text-neutral-600">
                  {event.location}
                </p>
                <p className="mt-1 text-sm text-accent font-medium">
                  {new Date(event.date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </Card>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button variant="secondary" href="/events" lang={lang}>
              {dict.home.eventsViewAll}
            </Button>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading>{dict.home.newsTitle}</SectionHeading>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {latestNews.map((item) => (
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
              <p className="mt-2 text-sm text-neutral-600 line-clamp-2">
                {item.excerpt}
              </p>
            </Card>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button variant="secondary" href="/news" lang={lang}>
            {dict.home.newsViewAll}
          </Button>
        </div>
      </section>

      {/* Membership CTA */}
      <section className="bg-primary px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-white">{dict.home.ctaTitle}</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/90">
            {dict.home.ctaText}
          </p>
          <p className="mx-auto mt-6 max-w-xl text-base italic text-accent">
            {dict.home.quote}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button variant="gold" size="lg" href="/membership" lang={lang}>
              {dict.home.donateButton}
            </Button>
            <Button
              variant="secondary"
              size="lg"
              href="/membership"
              lang={lang}
              className="border-white! text-white! hover:bg-white/10!"
            >
              {dict.home.ctaButton}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
