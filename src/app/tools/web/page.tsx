import { ToolCategoryPage } from "@/components/layout/tool-category-page";
import { getStaticPageMetadata } from "@/lib/seo/static-pages";
export const metadata = getStaticPageMetadata("/tools/web");
export default function Page() {
  return (
    <ToolCategoryPage
      category="web"
      title="Web & developer tools"
      description="Practical utilities for data, URLs and QR codes."
    />
  );
}
