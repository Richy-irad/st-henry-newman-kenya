import { getDictionary, hasLocale } from "../dictionaries";
import type { Locale } from "../dictionaries";
import { notFound } from "next/navigation";
import Hero from "@/components/Hero";
import ContactForm from "@/components/ContactForm";
import SectionHeading from "@/components/SectionHeading";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);

  return (
    <>
      <Hero title={dict.contact.heroTitle} subtitle={dict.contact.heroSubtitle} />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Form */}
          <div>
            <ContactForm dict={dict.contact} />
          </div>

          {/* Hours & Map */}
          <div className="space-y-8">
            <div>
              <SectionHeading as="h3" centered={false}>
                {dict.contact.hoursTitle}
              </SectionHeading>
              <ul className="mt-6 space-y-1 text-sm text-neutral-600">
                <li>{dict.contact.hours}</li>
                <li>{dict.contact.hoursSat}</li>
                <li>{dict.contact.hoursSun}</li>
              </ul>
            </div>

            {/* Map placeholder */}
            <div className="aspect-video w-full overflow-hidden rounded-[var(--radius)] bg-neutral-200 flex items-center justify-center">
              <span className="text-sm text-neutral-600">{dict.contact.mapPlaceholder}</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
