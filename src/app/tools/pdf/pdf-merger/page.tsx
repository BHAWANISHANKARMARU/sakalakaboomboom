import type { Metadata } from "next";
import { PdfMerger } from "@/features/pdf-merger/pdf-merger";
import { ToolLayout } from "@/components/tools/tool-layout";
import { RelatedTools } from "@/components/tools/related-tools";
import { buildPageMetadata } from "@/lib/seo/metadata";
export const metadata: Metadata = buildPageMetadata({
  title: "PDF Merger",
  description: "Combine multiple PDF files privately in your browser.",
  path: "/tools/pdf/pdf-merger",
});
export default function Page() {
  return (
    <ToolLayout
      title="PDF Merger"
      description="Combine multiple PDFs in the order you choose. Nothing is uploaded."
      category="PDF"
    >
      <PdfMerger />
      <RelatedTools toolId="pdf-merger" />
    </ToolLayout>
  );
}
