import { getDictionary, hasLocale } from "../dictionaries";
import type { Locale } from "../dictionaries";
import { notFound } from "next/navigation";
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import Card from "@/components/Card";
import Button from "@/components/Button";
import { getMembershipTiers } from "@/lib/sanity/queries";

export default async function MembershipPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);
  const membershipTiers = await getMembershipTiers();

  return (
    <>
      <Hero
        title={dict.membership.heroTitle}
        subtitle={dict.membership.heroSubtitle}
      />

      {/* Why Join */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading>{dict.membership.whyJoinTitle}</SectionHeading>
        <p className="mx-auto mt-8 max-w-3xl text-center text-neutral-600">
          {dict.membership.whyJoinText}
        </p>
      </section>

      {/* Tiers */}
      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading>{dict.membership.tiersTitle}</SectionHeading>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {membershipTiers.map((tier) => (
              <Card
                key={tier.name}
                padding="lg"
                className={
                  tier.highlighted
                    ? "ring-2 ring-accent"
                    : ""
                }
              >
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-neutral-900">
                    {tier.name}
                  </h3>
                  <p className="mt-2 text-2xl font-bold text-accent">
                    {tier.price}
                  </p>
                </div>

                <div className="mt-6">
                  <h4 className="text-sm font-medium text-neutral-900">
                    {dict.membership.benefits}
                  </h4>
                  <ul className="mt-3 space-y-2">
                    {tier.benefits.map((benefit) => (
                      <li
                        key={benefit}
                        className="flex items-start gap-2 text-sm text-neutral-600"
                      >
                        <svg
                          className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 text-center">
                  <Button
                    variant={tier.highlighted ? "gold" : "secondary"}
                    href="/contact"
                    lang={lang}
                  >
                    {dict.membership.joinNow}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
