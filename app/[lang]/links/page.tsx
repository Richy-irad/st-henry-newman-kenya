import { getDictionary, hasLocale } from "../dictionaries";
import type { Locale } from "../dictionaries";
import { notFound } from "next/navigation";
import Hero from "@/components/Hero";
import Card from "@/components/Card";
import { sisterOrgs } from "@/lib/data";

export default async function LinksPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);

  return (
    <>
      <Hero title={dict.links.heroTitle} subtitle={dict.links.heroSubtitle} />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2">
          {sisterOrgs.map((org) => (
            <Card
              key={org.name}
              image={{ src: org.image, alt: org.name }}
              padding="lg"
            >
              <h3 className="text-lg font-semibold text-neutral-900">
                {org.name}
              </h3>
              <p className="mt-1 text-sm font-medium text-accent">
                {org.country}
              </p>
              <p className="mt-2 text-sm text-neutral-600">
                {org.description}
              </p>
              <a
                href={org.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-sm font-medium text-primary hover:text-primary-dark"
              >
                {dict.links.visitWebsite} &rarr;
              </a>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
