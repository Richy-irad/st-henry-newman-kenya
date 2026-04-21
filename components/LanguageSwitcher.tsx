"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

const languages = [
  { code: "en", label: "EN" },
  { code: "fr", label: "FR" },
  { code: "it", label: "IT" },
];

export default function LanguageSwitcher({ lang }: { lang: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  function switchedPath(newLang: string) {
    const segments = pathname.split("/");
    segments[1] = newLang;
    return segments.join("/");
  }

  useEffect(() => {
    if (!open) return;
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [open]);

  const current = languages.find((l) => l.code === lang) ?? languages[0];

  return (
    <>
      {/* Mobile: dropdown */}
      <div className="relative md:hidden" ref={ref}>
        <button
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-haspopup="listbox"
          className="flex items-center gap-1 rounded px-2 py-1 text-xs font-medium text-neutral-600 transition-colors hover:bg-neutral-50 hover:text-primary"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
          {current.label}
          <svg
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            aria-hidden="true"
            className={`transition-transform ${open ? "rotate-180" : ""}`}
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
        {open && (
          <div className="absolute right-0 top-full z-50 mt-1 min-w-[4rem] overflow-hidden rounded border border-neutral-200 bg-white shadow-md">
            {languages.map(({ code, label }) => (
              <Link
                key={code}
                href={switchedPath(code)}
                onClick={() => setOpen(false)}
                className={`block px-3 py-2 text-xs font-medium transition-colors ${
                  lang === code
                    ? "bg-primary text-white"
                    : "text-neutral-600 hover:bg-neutral-50 hover:text-primary"
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Desktop: button group */}
      <div
        className="ml-2 hidden items-center gap-1 md:flex"
        role="navigation"
        aria-label="Language switcher"
      >
        {languages.map(({ code, label }) => (
          <Link
            key={code}
            href={switchedPath(code)}
            className={`rounded px-2 py-1 text-xs font-medium transition-colors ${
              lang === code
                ? "bg-primary text-white"
                : "text-neutral-600 hover:bg-neutral-50 hover:text-primary"
            }`}
            aria-current={lang === code ? "true" : undefined}
          >
            {label}
          </Link>
        ))}
      </div>
    </>
  );
}
