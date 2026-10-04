import { ToolCategoryPage } from "@/components/layout/tool-category-page";
import { getStaticPageMetadata } from "@/lib/seo/static-pages";
export const metadata = getStaticPageMetadata("/tools/scanner");
export default function Page() {
  return (
    <ToolCategoryPage
      category="scanner"
      title="Scanner & utility tools"
      description="Scan codes and inspect public websites."
    />
  );
}
