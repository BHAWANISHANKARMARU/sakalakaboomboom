import { ResponsiveGrid } from "@/components/layout/responsive-grid";
import { SectionIndex } from "@/components/layout/section-index";
import { CategoryCard } from "@/components/ui/category-card";
import { getPublishedArticles } from "@/lib/content/registry";
import { getStaticPageMetadata } from "@/lib/seo/static-pages";
export const metadata = getStaticPageMetadata("/how-to");
export default function Page() {
  return (
    <SectionIndex
      title="How-to guides"
      description="Clear steps for online forms, documents and everyday digital tasks."
    >
      <ResponsiveGrid columns={2}>
        {getPublishedArticles("en")
          .filter((item) => item.section === "how-to")
          .map((item) => (
            <CategoryCard
              key={item.id}
              href={`/how-to/${item.slug}`}
              title={item.title}
              description={item.description}
            />
          ))}
      </ResponsiveGrid>
    </SectionIndex>
  );
}
