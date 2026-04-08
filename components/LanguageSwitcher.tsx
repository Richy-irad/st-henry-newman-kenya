"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const languages = [
  { code: "en", label: "EN" },
  { code: "fr", label: "FR" },
  { code: "it", label: "IT" },
];

export default function LanguageSwitcher({ lang }: { lang: string }) {
  const pathname = usePathname();

  function switchedPath(newLang: string) {
    const segments = pathname.split("/");
    segments[1] = newLang;
    return segments.join("/");
  }

  return (
    <div className="flex items-center gap-1 ml-2" role="navigation" aria-label="Language switcher">
      {languages.map(({ code, label }) => (
        <Link
          key={code}
          href={switchedPath(code)}
          className={`rounded px-2 py-1 text-xs font-medium transition-colors ${
            lang === code
              ? "bg-primary text-white"
              : "text-neutral-600 hover:text-primary hover:bg-neutral-50"
          }`}
          aria-current={lang === code ? "true" : undefined}
        >
          {label}
        </Link>
      ))}
    </div>
  );
}
