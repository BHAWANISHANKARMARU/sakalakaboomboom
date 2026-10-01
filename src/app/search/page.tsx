import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/page-container";
import { SiteSearch } from "@/components/search/site-search";
import { buildSearchIndex } from "@/lib/search/build-index";
import { buildPageMetadata } from "@/lib/seo/metadata";
export const metadata: Metadata = buildPageMetadata({
  title: "Search",
  description: "Search Sahaj Tools and reviewed guides.",
  path: "/search",
  noIndex: true,
});
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  return (
    <main>
      <PageContainer className="grid max-w-3xl gap-8 py-12">
        <header>
          <h1>Search</h1>
          <p className="text-muted mt-3">
            Find a practical tool or a reviewed guide.
          </p>
        </header>
        <SiteSearch
          records={buildSearchIndex()}
          initialQuery={q.slice(0, 200)}
        />
      </PageContainer>
    </main>
  );
}
