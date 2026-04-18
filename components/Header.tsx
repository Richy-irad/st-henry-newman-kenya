"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher";

type Dict = {
  nav: {
    home: string;
    about: string;
    news: string;
    events: string;
    resources: string;
    library: string;
    links: string;
    contact: string;
    membership: string;
  };
};

const navItems = [
  { key: "home", href: "" },
  { key: "about", href: "/about" },
  { key: "news", href: "/news" },
  { key: "events", href: "/events" },
  { key: "resources", href: "/resources" },
  { key: "library", href: "/library" },
  { key: "links", href: "/links" },
  { key: "contact", href: "/contact" },
] as const;

export default function Header({ dict, lang }: { dict: Dict; lang: string }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Shadow on scroll
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 0);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on Escape
  useEffect(() => {
    if (!mobileOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  function isActive(href: string) {
    const full = `/${lang}${href}`;
    if (href === "") return pathname === `/${lang}` || pathname === `/${lang}/`;
    return pathname.startsWith(full);
  }

  return (
    <header
      className={`sticky top-0 z-40 bg-white transition-shadow ${
        scrolled ? "shadow-[0_1px_3px_rgba(0,0,0,0.08)]" : ""
      }`}
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8"
      >
        {/* Logo */}
        <Link
          href={`/${lang}`}
          className="font-heading text-base font-bold text-primary leading-tight max-w-55"
        >
          St. John Henry Newman<br />& Friends Association Kenya
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map(({ key, href }) => (
            <Link
              key={key}
              href={`/${lang}${href}`}
              className={`rounded px-3 py-2 text-sm font-medium transition-colors ${
                isActive(href)
                  ? "text-primary shadow-[inset_0_-2px_0_0_var(--color-primary)]"
                  : "text-neutral-600 hover:text-primary"
              }`}
            >
              {dict.nav[key]}
            </Link>
          ))}
          <Link
            href={`/${lang}/membership`}
            className="ml-2 rounded-[6px] bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
          >
            {dict.nav.membership}
          </Link>
          <LanguageSwitcher lang={lang} />
        </div>

        {/* Mobile hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher lang={lang} />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label="Toggle navigation menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded text-neutral-600 hover:text-primary focus-visible:ring-2 focus-visible:ring-primary"
          >
            {mobileOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu with animation */}
      <div
        className={`overflow-hidden border-t border-neutral-200 bg-white transition-all duration-200 md:hidden ${
          mobileOpen ? "max-h-screen" : "max-h-0 border-t-0"
        }`}
      >
        <div className="px-4 pb-4">
          {navItems.map(({ key, href }) => (
            <Link
              key={key}
              href={`/${lang}${href}`}
              className={`block rounded px-3 py-2 text-sm font-medium transition-colors ${
                isActive(href)
                  ? "text-primary bg-primary-tint"
                  : "text-neutral-600 hover:text-primary hover:bg-neutral-50"
              }`}
            >
              {dict.nav[key]}
            </Link>
          ))}
          <Link
            href={`/${lang}/membership`}
            className="mt-2 block rounded-[6px] bg-primary px-4 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-primary-dark"
          >
            {dict.nav.membership}
          </Link>
        </div>
      </div>
    </header>
  );
}
