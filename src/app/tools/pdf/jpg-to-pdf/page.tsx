import type { Metadata } from "next";
import { RelatedTools } from "@/components/tools/related-tools";
import { ToolGuideDetails } from "@/components/tools/tool-guide";
import { ToolLayout } from "@/components/tools/tool-layout";
import { toolGuides } from "@/content/tool-guides";
import { JpgToPdf } from "@/features/jpg-to-pdf/jpg-to-pdf";
import { buildPageMetadata } from "@/lib/seo/metadata";
const guide = toolGuides["jpg-to-pdf"];
export const metadata: Metadata = buildPageMetadata({
  title: guide.seoTitle,
  description: guide.metaDescription,
  path: "/tools/pdf/jpg-to-pdf",
});
export default function Page() {
  return (
    <ToolLayout
      title="JPG to PDF"
      description="Turn JPG and PNG images into one A4 PDF. Nothing is uploaded."
      category="PDF"
      path="/tools/pdf/jpg-to-pdf"
      details={<ToolGuideDetails toolId="jpg-to-pdf" />}
    >
      <JpgToPdf />
      <RelatedTools toolId="jpg-to-pdf" />
    </ToolLayout>
  );
}
