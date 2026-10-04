import { SectionIndex } from "@/components/layout/section-index";
import { CategoryCard } from "@/components/ui/category-card";
import { categories } from "@/content/categories";
import { getStaticPageMetadata } from "@/lib/seo/static-pages";
export const metadata = getStaticPageMetadata("/tools");
export default function Page() {
  return (
    <SectionIndex
      title="Online tools"
      description="Fast utilities for PDFs, images, text and web tasks."
    >
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
