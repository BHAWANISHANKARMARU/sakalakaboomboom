import type { Metadata } from "next";
import { PdfMerger } from "@/features/pdf-merger/pdf-merger";
import { ToolLayout } from "@/components/tools/tool-layout";
import { RelatedTools } from "@/components/tools/related-tools";
import { ToolGuideDetails } from "@/components/tools/tool-guide";
import { toolGuides } from "@/content/tool-guides";
import { buildPageMetadata } from "@/lib/seo/metadata";
export const metadata: Metadata = buildPageMetadata({
  title: toolGuides["pdf-merger"].seoTitle,
  description: toolGuides["pdf-merger"].metaDescription,
  path: "/tools/pdf/pdf-merger",
});
export default function Page() {
  return (
    <ToolLayout
      title="PDF Merger"
      description="Combine multiple PDFs in the order you choose. Nothing is uploaded."
      category="PDF"
      path="/tools/pdf/pdf-merger"
      details={<ToolGuideDetails toolId="pdf-merger" />}
    >
      <PdfMerger />
      <RelatedTools toolId="pdf-merger" />
    </ToolLayout>
  );
}
