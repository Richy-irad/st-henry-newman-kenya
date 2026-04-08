"use client";

import { useState } from "react";
import type { Event, EventType } from "@/lib/types";
import Card from "./Card";

type FilterLabels = {
  all: string;
  Conference: string;
  Retreat: string;
  Symposium: string;
  location: string;
  date: string;
};

const filters: (EventType | "all")[] = ["all", "Conference", "Retreat", "Symposium"];

const filterLabelKeys: Record<EventType | "all", keyof FilterLabels> = {
  all: "all",
  Conference: "Conference",
  Retreat: "Retreat",
  Symposium: "Symposium",
};

export default function EventFilter({
  events,
  labels,
}: {
  events: Event[];
  labels: FilterLabels;
}) {
  const [active, setActive] = useState<EventType | "all">("all");

  const filtered = active === "all" ? events : events.filter((e) => e.type === active);

  return (
    <>
      <div className="flex flex-wrap justify-center gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
              active === f
                ? "bg-primary text-white"
                : "bg-white text-neutral-600 hover:bg-primary-tint hover:text-primary"
            }`}
          >
            {labels[filterLabelKeys[f]]}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((event) => (
          <Card
            key={event.slug}
            image={{ src: event.image, alt: event.title }}
          >
            <span className="mb-2 inline-block rounded-full bg-primary-tint px-3 py-0.5 text-xs font-medium text-primary">
              {event.type}
            </span>
            <h3 className="text-lg font-semibold text-neutral-900">
              {event.title}
            </h3>
            <p className="mt-2 text-sm text-neutral-600">{event.description}</p>
            <div className="mt-4 space-y-1 text-sm">
              <p className="text-neutral-600">
                <span className="font-medium">{labels.location}:</span> {event.location}
              </p>
              <p className="text-accent font-medium">
                {new Date(event.date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
                {event.endDate && (
                  <>
                    {" – "}
                    {new Date(event.endDate).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </>
                )}
              </p>
            </div>
            {event.registrationUrl && (
              <a
                href={event.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block rounded-[var(--radius)] bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:brightness-110"
              >
                Register &rarr;
              </a>
            )}
          </Card>
        ))}
      </div>
    </>
  );
}
