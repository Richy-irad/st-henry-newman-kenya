import { notFound } from "next/navigation";
import { getDictionary, hasLocale, locales } from "./dictionaries";
import type { Locale } from "./dictionaries";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang as Locale);
  return {
    title: {
      template: "%s | St. Henry Newman Association",
      default: "St. Henry Newman & Friends Association",
    },
    description: dict.home.heroSubtitle,
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded"
      >
        Skip to content
      </a>
      <Header dict={dict} lang={lang} />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer dict={dict} lang={lang} />
    </>
  );
}
