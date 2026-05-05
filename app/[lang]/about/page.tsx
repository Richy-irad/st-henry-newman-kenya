import { getDictionary, hasLocale } from "../dictionaries";
import type { Locale } from "../dictionaries";
import { notFound } from "next/navigation";
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import Card from "@/components/Card";
import { getTeamMembers } from "@/lib/sanity/queries";
import Image from "next/image";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);
  const teamMembers = await getTeamMembers();

  return (
    <>
      <Hero
        title={dict.about.heroTitle}
        subtitle={dict.about.heroSubtitle}
      />

      {/* History */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading>{dict.about.historyTitle}</SectionHeading>
        <div className="mx-auto mt-8 max-w-3xl space-y-4 text-neutral-600">
          <p>{dict.about.historyText}</p>
          <p>{dict.about.historyText2}</p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading>{dict.about.missionTitle}</SectionHeading>
          <p className="mx-auto mt-8 max-w-3xl text-center text-neutral-600">
            {dict.about.missionText}
          </p>
        </div>
      </section>

      {/* Team */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading>{dict.about.teamTitle}</SectionHeading>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member) => (
            <Card key={member.name}>
              <div className="flex flex-col items-center text-center">
                <div className="relative h-24 w-24 overflow-hidden rounded-full">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-neutral-900">
                  {member.name}
                </h3>
                <p className="text-sm font-medium text-accent">{member.role}</p>
                <p className="mt-2 text-sm text-neutral-600">{member.bio}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Patron Saint */}
      <section className="bg-primary-tint px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading>{dict.about.patronTitle}</SectionHeading>
          <div className="mx-auto mt-8 max-w-3xl space-y-4 text-neutral-600">
            <p>{dict.about.patronText}</p>
            <p>{dict.about.patronText2}</p>
          </div>
        </div>
      </section>
    </>
  );
}
