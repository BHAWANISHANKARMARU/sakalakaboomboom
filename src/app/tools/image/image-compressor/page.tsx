import type { Metadata } from "next";
import { ToolLayout } from "@/components/tools/tool-layout";
import { RelatedTools } from "@/components/tools/related-tools";
import { ImageCompressor } from "@/features/image-compressor/image-compressor";
import { ToolGuideDetails } from "@/components/tools/tool-guide";
import { toolGuides } from "@/content/tool-guides";
import { buildPageMetadata } from "@/lib/seo/metadata";
export const metadata: Metadata = buildPageMetadata({
  title: toolGuides["image-compressor"].seoTitle,
  description: toolGuides["image-compressor"].metaDescription,
  path: "/tools/image/image-compressor",
});
export default function Page() {
  return (
    <ToolLayout
      title="Image Compressor"
      description="Reduce an image file size without uploading it."
      category="Image"
      path="/tools/image/image-compressor"
      details={<ToolGuideDetails toolId="image-compressor" />}
    >
      <ImageCompressor />
      <RelatedTools toolId="image-compressor" />
    </ToolLayout>
  );
}
