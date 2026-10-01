import { SectionIndex } from "./section-index";
import { CategoryCard } from "@/components/ui/category-card";
import { getLiveTools } from "@/lib/content/registry";
import type { ToolCategory } from "@/types/content";
export function ToolCategoryPage({
  category,
  title,
  description,
}: {
  category: ToolCategory;
  title: string;
  description: string;
}) {
  const list = getLiveTools("en").filter((tool) => tool.category === category);
  return (
    <SectionIndex title={title} description={description}>
      {list.length ? (
        <div className="grid gap-x-7 sm:grid-cols-2">
          {list.map((tool) => (
            <CategoryCard
              key={tool.id}
              href={tool.url}
              title={tool.title}
              description={tool.description}
            />
          ))}
        </div>
      ) : (
        <p className="border-line text-muted border-t pt-6">
          Tools in this category are being tested before publication.
        </p>
      )}
    </SectionIndex>
  );
}
