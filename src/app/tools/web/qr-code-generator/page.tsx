import type { Metadata } from "next";
import { ToolLayout } from "@/components/tools/tool-layout";
import { RelatedTools } from "@/components/tools/related-tools";
import { QrGenerator } from "@/features/qr-generator/qr-generator";
import { buildPageMetadata } from "@/lib/seo/metadata";
export const metadata: Metadata = buildPageMetadata({
  title: "QR Code Generator",
  description: "Create a downloadable QR code privately in your browser.",
  path: "/tools/web/qr-code-generator",
});
export default function Page() {
  return (
    <ToolLayout
      title="QR Code Generator"
      description="Turn text or a URL into a downloadable QR code."
      category="Web"
      path="/tools/web/qr-code-generator"
    >
      <QrGenerator />
      <RelatedTools toolId="qr-generator" />
    </ToolLayout>
  );
}
