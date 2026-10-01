import type { Metadata } from "next";
import { ToolLayout } from "@/components/tools/tool-layout";
import { RelatedTools } from "@/components/tools/related-tools";
import { ImageCompressor } from "@/features/image-compressor/image-compressor";
import { buildPageMetadata } from "@/lib/seo/metadata";
export const metadata: Metadata = buildPageMetadata({
  title: "Image Compressor",
  description: "Compress JPEG, PNG and WebP images locally.",
  path: "/tools/image/image-compressor",
});
export default function Page() {
  return (
    <ToolLayout
      title="Image Compressor"
      description="Reduce an image file size without uploading it."
      category="Image"
    >
      <ImageCompressor />
      <RelatedTools toolId="image-compressor" />
    </ToolLayout>
  );
}
