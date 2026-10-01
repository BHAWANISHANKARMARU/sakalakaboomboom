"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { SearchRecord } from "@/lib/search/build-index";
import { searchIndex } from "@/lib/search/rank-results";
export function SiteSearch({
  records,
  initialQuery = "",
}: {
  records: SearchRecord[];
  initialQuery?: string;
}) {
  const [query, setQuery] = useState(initialQuery);
  const results = useMemo(() => searchIndex(query, records), [query, records]);
  return (
    <div className="grid gap-6">
      <label className="text-navy grid gap-2 font-bold">
        Search tools and guides
        <input
          autoFocus
          className="field font-normal"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Try ‘PDF’ or ‘word counter’"
        />
      </label>
      {query.trim() ? (
        results.length ? (
          <ul className="divide-line border-line divide-y border-y">
            {results.map((item) => (
              <li key={item.url}>
                <Link className="hover:text-blue block py-5" href={item.url}>
                  <span className="text-muted text-xs font-bold tracking-wider uppercase">
                    {item.category}
                  </span>
                  <h2 className="mt-1 text-xl">{item.title}</h2>
                  <p className="text-muted mt-1 text-sm">{item.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p role="status" className="border-line bg-paper rounded border p-4">
            No matches. Try a shorter phrase or browse the tool categories.
          </p>
        )
      ) : (
        <p className="text-muted">
          Search five live tools. Reviewed guides will appear here as they are
          published.
        </p>
      )}
    </div>
  );
}
