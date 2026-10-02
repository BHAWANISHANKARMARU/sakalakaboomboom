import { SectionIndex } from "./section-index";
import { CategoryCard } from "@/components/ui/category-card";
import { ResponsiveGrid } from "./responsive-grid";
import { StatusNotice } from "@/components/ui/status-notice";
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
        <ResponsiveGrid columns={2}>
          {list.map((tool) => (
            <CategoryCard
              key={tool.id}
              href={tool.url}
              title={tool.title}
              description={tool.description}
            />
          ))}
        </ResponsiveGrid>
      ) : (
        <StatusNotice
          title="Tools are being tested"
          description="Tools in this category will appear here after functional and privacy review."
          tone="planned"
        />
      )}
    </SectionIndex>
  );
}
