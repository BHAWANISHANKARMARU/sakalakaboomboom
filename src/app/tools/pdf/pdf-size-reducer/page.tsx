import type { Metadata } from "next";
import { RelatedTools } from "@/components/tools/related-tools";
import { SizeLinks } from "@/components/tools/size-links";
import { ToolGuideDetails } from "@/components/tools/tool-guide";
import { ToolLayout } from "@/components/tools/tool-layout";
import { toolGuides } from "@/content/tool-guides";
import { PdfCompressor } from "@/features/pdf-compressor/pdf-compressor";
import { buildPageMetadata } from "@/lib/seo/metadata";
const guide = toolGuides["pdf-compressor"];
export const metadata: Metadata = buildPageMetadata({
  title: guide.seoTitle,
  description: guide.metaDescription,
  path: "/tools/pdf/pdf-size-reducer",
});
export default function Page() {
  return (
    <ToolLayout
      title="PDF Size Reducer in KB"
      description="Reduce a PDF to the KB size you need. Nothing is uploaded."
      category="PDF"
      path="/tools/pdf/pdf-size-reducer"
      details={
        <div className="grid gap-5">
          <ToolGuideDetails toolId="pdf-compressor" />
          <SizeLinks kind="pdf" />
        </div>
      }
    >
      <PdfCompressor />
      <RelatedTools toolId="pdf-compressor" />
    </ToolLayout>
  );
}
