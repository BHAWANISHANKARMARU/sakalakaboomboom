import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/page-container";
import { SiteSearch } from "@/components/search/site-search";
import { buildSearchIndex } from "@/lib/search/build-index";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { InteriorHero } from "@/components/layout/interior-hero";
export const metadata: Metadata = buildPageMetadata({
  title: "Search",
  description: "Search Sakalakaboomboom and reviewed guides.",
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
      <PageContainer className="interior-page search-page">
        <InteriorHero
          title="Search"
          description="Find a practical tool or a reviewed guide."
          eyebrow="Find what you need"
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Search" }]}
        />
        <SiteSearch
          records={buildSearchIndex()}
          initialQuery={q.slice(0, 200)}
        />
      </PageContainer>
    </main>
  );
}
