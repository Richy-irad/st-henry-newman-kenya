"use client";

import { useState } from "react";
import type { LibraryItem, LibraryCategory } from "@/lib/types";
import Card from "./Card";

type FilterLabels = {
  searchPlaceholder: string;
  all: string;
  works: string;
  translations: string;
  articles: string;
  author: string;
  year: string;
};

const categories: (LibraryCategory | "all")[] = ["all", "works", "translations", "articles"];

const categoryLabelKeys: Record<LibraryCategory | "all", keyof FilterLabels> = {
  all: "all",
  works: "works",
  translations: "translations",
  articles: "articles",
};

export default function LibraryFilter({
  items,
  labels,
}: {
  items: LibraryItem[];
  labels: FilterLabels;
}) {
  const [active, setActive] = useState<LibraryCategory | "all">("all");
  const [query, setQuery] = useState("");

  const q = query.toLowerCase();
  const filtered = items.filter((item) => {
    const matchesCategory = active === "all" || item.category === active;
    const matchesQuery =
      !q ||
      item.title.toLowerCase().includes(q) ||
      item.author.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q);
    return matchesCategory && matchesQuery;
  });

  return (
    <>
      <div className="space-y-4">
        <input
          type="search"
          placeholder={labels.searchPlaceholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-[var(--radius)] border border-neutral-200 px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-600/50 transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
        />

        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                active === c
                  ? "bg-primary text-white"
                  : "bg-white text-neutral-600 hover:bg-primary-tint hover:text-primary"
              }`}
            >
              {labels[categoryLabelKeys[c]]}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <Card key={item.slug} padding="lg">
            <span className="mb-2 inline-block rounded-full bg-primary-tint px-3 py-0.5 text-xs font-medium text-primary capitalize">
              {item.category}
            </span>
            <h3 className="text-lg font-semibold text-neutral-900">
              {item.title}
            </h3>
            <p className="mt-2 text-sm text-neutral-600">{item.description}</p>
            <div className="mt-4 flex items-center gap-4 text-sm text-neutral-600">
              <span>
                <span className="font-medium">{labels.author}:</span> {item.author}
              </span>
              <span>
                <span className="font-medium">{labels.year}:</span> {item.year}
              </span>
            </div>
            {item.link && (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-sm font-medium text-primary hover:text-primary-dark"
              >
                Read online &rarr;
              </a>
            )}
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-10 text-center text-neutral-600">No results found.</p>
      )}
    </>
  );
}
