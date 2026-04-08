import { getDictionary, hasLocale } from "../dictionaries";
import type { Locale } from "../dictionaries";
import { notFound } from "next/navigation";
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import Card from "@/components/Card";
import { getResourcesByType } from "@/lib/data";
import type { ResourceType } from "@/lib/types";

const sections: { type: ResourceType; dictKey: "publications" | "studies" | "documents" }[] = [
  { type: "publications", dictKey: "publications" },
  { type: "studies", dictKey: "studies" },
  { type: "documents", dictKey: "documents" },
];

export default async function ResourcesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);

  return (
    <>
      <Hero title={dict.resources.heroTitle} subtitle={dict.resources.heroSubtitle} />

      {sections.map(({ type, dictKey }) => {
        const items = getResourcesByType(type);
        return (
          <section
            key={type}
            className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
          >
            <SectionHeading as="h3" centered={false}>
              {dict.resources[dictKey]}
            </SectionHeading>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {items.map((resource) => (
                <Card key={resource.slug} padding="lg">
                  <h4 className="text-lg font-semibold text-neutral-900">
                    {resource.title}
                  </h4>
                  <p className="mt-2 text-sm text-neutral-600">
                    {resource.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-neutral-600">
                      {new Date(resource.date).toLocaleDateString("en-GB", {
                        month: "long",
                        year: "numeric",
                      })}
                      {resource.fileSize && ` · ${resource.fileSize}`}
                    </span>
                    <a
                      href={resource.downloadUrl}
                      className="inline-flex items-center text-sm font-medium text-primary hover:text-primary-dark"
                    >
                      {dict.resources.download} &darr;
                    </a>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        );
      })}
    </>
  );
}
