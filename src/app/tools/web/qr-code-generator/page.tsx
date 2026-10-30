import type { Metadata } from "next";
import { ToolLayout } from "@/components/tools/tool-layout";
import { RelatedTools } from "@/components/tools/related-tools";
import { QrGenerator } from "@/features/qr-generator/qr-generator";
import { ToolGuideDetails } from "@/components/tools/tool-guide";
import { toolGuides } from "@/content/tool-guides";
import { buildPageMetadata } from "@/lib/seo/metadata";
export const metadata: Metadata = buildPageMetadata({
  title: toolGuides["qr-generator"].seoTitle,
  description: toolGuides["qr-generator"].metaDescription,
  path: "/tools/web/qr-code-generator",
});
export default function Page() {
  return (
    <ToolLayout
      title="QR Code Generator"
      description="Turn text or a URL into a downloadable QR code."
      category="Web"
      path="/tools/web/qr-code-generator"
      details={<ToolGuideDetails toolId="qr-generator" />}
    >
      <QrGenerator />
      <RelatedTools toolId="qr-generator" />
    </ToolLayout>
  );
}
