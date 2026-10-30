import type { Metadata } from "next";
import { RelatedTools } from "@/components/tools/related-tools";
import { ToolGuideDetails } from "@/components/tools/tool-guide";
import { ToolLayout } from "@/components/tools/tool-layout";
import { toolGuides } from "@/content/tool-guides";
import { ImageConverter } from "@/features/image-converter/image-converter";
import { buildPageMetadata } from "@/lib/seo/metadata";
const guide = toolGuides["jpg-to-png"];
export const metadata: Metadata = buildPageMetadata({
  title: guide.seoTitle,
  description: guide.metaDescription,
  path: "/tools/image/jpg-to-png",
});
export default function Page() {
  return (
    <ToolLayout
      title="JPG to PNG"
      description="Convert a JPG image to PNG without uploading it."
      category="Image"
      path="/tools/image/jpg-to-png"
      details={<ToolGuideDetails toolId="jpg-to-png" />}
    >
      <ImageConverter mode="jpg-to-png" />
      <RelatedTools toolId="jpg-to-png" />
    </ToolLayout>
  );
}
