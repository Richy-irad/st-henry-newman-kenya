import Link from "next/link";
import type { AgendaItem } from "@/lib/types";

function formatDate(dateStr: string, locale: string): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function AgendaList({
  items,
  locale = "en-GB",
}: {
  items: AgendaItem[];
  locale?: string;
}) {
  return (
    <div className="overflow-x-auto rounded-lg border border-neutral-200">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-neutral-200 bg-neutral-50 text-left text-xs font-semibold uppercase tracking-wide text-neutral-500">
            <th className="px-4 py-3">Dates</th>
            <th className="px-4 py-3">Title</th>
            <th className="px-4 py-3">Location</th>
            <th className="px-4 py-3">How to follow</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-200">
          {items.map((item, i) => (
            <tr key={i} className="transition-colors hover:bg-neutral-50">
              <td className="whitespace-nowrap px-4 py-3">
                <p className="font-medium text-accent">
                  {formatDate(item.startDate, locale)}
                  {item.endDate && item.endDate !== item.startDate && (
                    <> &ndash; {formatDate(item.endDate, locale)}</>
                  )}
                </p>
                {item.time && (
                  <p className="mt-0.5 text-xs text-neutral-500">{item.time}</p>
                )}
              </td>
              <td className="px-4 py-3">
                {item.slug ? (
                  <Link
                    href={`/${locale}/events/agenda/${item.slug}`}
                    className="font-semibold text-neutral-900 hover:text-primary hover:underline"
                  >
                    {item.title}
                  </Link>
                ) : (
                  <p className="font-semibold text-neutral-900">{item.title}</p>
                )}
              </td>
              <td className="px-4 py-3">
                <p className="text-neutral-600">{item.location}</p>
              </td>
              <td className="px-4 py-3">
                {item.followUrl ? (
                  <a
                    href={item.followUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {item.followNote ?? "Follow event"}
                  </a>
                ) : (
                  <p className="text-neutral-600">{item.followNote}</p>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
