import { ToolCategoryPage } from "@/components/layout/tool-category-page";
import { getStaticPageMetadata } from "@/lib/seo/static-pages";
export const metadata = getStaticPageMetadata("/tools/text");
export default function Page() {
  return (
    <ToolCategoryPage
      category="text"
      title="Text tools"
      description="Count, clean and transform text instantly."
    />
  );
}
