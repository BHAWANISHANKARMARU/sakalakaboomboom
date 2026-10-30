import type { Metadata } from "next";
import { RelatedTools } from "@/components/tools/related-tools";
import { ToolGuideDetails } from "@/components/tools/tool-guide";
import { ToolLayout } from "@/components/tools/tool-layout";
import { toolGuides } from "@/content/tool-guides";
import { PdfPages } from "@/features/pdf-pages/pdf-pages";
import { buildPageMetadata } from "@/lib/seo/metadata";
const guide = toolGuides["pdf-page-extractor"];
export const metadata: Metadata = buildPageMetadata({
  title: guide.seoTitle,
  description: guide.metaDescription,
  path: "/tools/pdf/pdf-page-extractor",
});
export default function Page() {
  return (
    <ToolLayout
      title="PDF Page Extractor"
      description="Keep only the pages you need from a PDF. Nothing is uploaded."
      category="PDF"
      path="/tools/pdf/pdf-page-extractor"
      details={<ToolGuideDetails toolId="pdf-page-extractor" />}
    >
      <PdfPages />
      <RelatedTools toolId="pdf-page-extractor" />
    </ToolLayout>
  );
}
