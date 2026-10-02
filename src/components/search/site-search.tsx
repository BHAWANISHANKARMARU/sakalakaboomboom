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
    <div className="site-search-page">
      <label className="site-search-label">
        Search tools and guides
        <input
          autoFocus
          className="field"
          type="search"
          value={query}
          onChange={(event) => {
            const next = event.target.value;
            setQuery(next);
            const url = new URL(window.location.href);
            if (next.trim()) url.searchParams.set("q", next);
            else url.searchParams.delete("q");
            window.history.replaceState(null, "", url);
          }}
          placeholder="Try ‘PDF’ or ‘word counter’"
        />
      </label>
      {query.trim() ? (
        results.length ? (
          <ul className="search-results">
            {results.map((item) => (
              <li key={item.url}>
                <Link href={item.url}>
                  <span>{item.category}</span>
                  <h2>{item.title}</h2>
                  <p>{item.description}</p>
                  <small>{item.url}</small>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p role="status" className="search-empty">
            No matches. Try a shorter phrase or browse the tool categories.
          </p>
        )
      ) : (
        <p className="search-empty">
          Search five live tools. Reviewed guides will appear here as they are
          published.
        </p>
      )}
    </div>
  );
}
