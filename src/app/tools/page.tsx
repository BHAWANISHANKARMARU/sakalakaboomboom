import { SectionIndex } from "@/components/layout/section-index";
import { CategoryCard } from "@/components/ui/category-card";
import { categories } from "@/content/categories";
import { getToolBySlug } from "@/lib/content/registry";
import { getStaticPageMetadata } from "@/lib/seo/static-pages";
export const metadata = getStaticPageMetadata("/tools");
export default function Page() {
  const youtube = getToolBySlug("web", "youtube-video-to-audio", "en");
  return (
    <SectionIndex
      title="Online tools"
      description="Fast utilities for PDFs, images, text and web tasks."
    >
      {youtube && (
        <section aria-label="Featured tool" className="mb-8">
          <h2 className="text-navy mb-3 text-xl font-bold">
            YouTube audio tools
          </h2>
          <CategoryCard
            href={youtube.url}
            title={youtube.title}
            description={youtube.description}
          />
        </section>
      )}
      <div className="grid gap-x-7 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((item) => (
          <CategoryCard
            key={item.id}
            href={`/tools/${item.id}`}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </SectionIndex>
  );
}
