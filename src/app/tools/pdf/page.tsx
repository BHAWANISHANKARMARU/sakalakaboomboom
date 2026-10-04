import { ToolCategoryPage } from "@/components/layout/tool-category-page";
import { getStaticPageMetadata } from "@/lib/seo/static-pages";
export const metadata = getStaticPageMetadata("/tools/pdf");
export default function Page() {
  return (
    <ToolCategoryPage
      category="pdf"
      title="PDF tools"
      description="Work with PDF files privately in your browser."
    />
  );
}
