import { ToolCategoryPage } from "@/components/layout/tool-category-page";
import { getStaticPageMetadata } from "@/lib/seo/static-pages";
export const metadata = getStaticPageMetadata("/tools/calculators");
export default function Page() {
  return (
    <ToolCategoryPage
      category="calculators"
      title="Calculators"
      description="Practical calculators for everyday decisions."
    />
  );
}
