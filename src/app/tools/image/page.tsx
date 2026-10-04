import { ToolCategoryPage } from "@/components/layout/tool-category-page";
import { getStaticPageMetadata } from "@/lib/seo/static-pages";
export const metadata = getStaticPageMetadata("/tools/image");
export default function Page() {
  return (
    <ToolCategoryPage
      category="image"
      title="Image tools"
      description="Compress, resize and convert everyday images."
    />
  );
}
