import { getDictionary, hasLocale } from "../dictionaries";
import type { Locale } from "../dictionaries";
import { notFound } from "next/navigation";
import Hero from "@/components/Hero";
import EventFilter from "@/components/EventFilter";
import { getUpcomingEvents } from "@/lib/data";

export default async function EventsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);

  const events = getUpcomingEvents();

  return (
    <>
      <Hero title={dict.events.heroTitle} subtitle={dict.events.heroSubtitle} />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <EventFilter
          events={events}
          locale={lang}
          labels={{
            all: dict.events.filterAll,
            Conference: dict.events.filterConference,
            Retreat: dict.events.filterRetreat,
            Symposium: dict.events.filterSymposium,
            location: dict.events.location,
            date: dict.events.date,
            register: dict.events.register,
          }}
        />
      </section>
    </>
  );
}
