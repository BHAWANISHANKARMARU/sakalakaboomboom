import type { SearchRecord } from "./build-index";
export function searchIndex(query: string, records: SearchRecord[]) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return records
    .filter(
      (item) =>
        item.terms.includes(q) ||
        q.split(/\s+/).every((term) => item.terms.includes(term)),
    )
    .sort((a, b) => score(b, q) - score(a, q));
}
function score(item: SearchRecord, q: string) {
  const title = item.title.toLowerCase();
  return title === q
    ? 100
    : title.startsWith(q)
      ? 75
      : title.includes(q)
        ? 50
        : 10;
}
