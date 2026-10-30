import type { Metadata } from "next";
import { RelatedTools } from "@/components/tools/related-tools";
import { ToolGuideDetails } from "@/components/tools/tool-guide";
import { ToolLayout } from "@/components/tools/tool-layout";
import { toolGuides } from "@/content/tool-guides";
import { ImageConverter } from "@/features/image-converter/image-converter";
import { buildPageMetadata } from "@/lib/seo/metadata";
const guide = toolGuides["image-resizer"];
export const metadata: Metadata = buildPageMetadata({
  title: guide.seoTitle,
  description: guide.metaDescription,
  path: "/tools/image/image-resizer",
});
export default function Page() {
  return (
    <ToolLayout
      title="Image Resizer"
      description="Resize an image to exact pixel dimensions without uploading it."
      category="Image"
      path="/tools/image/image-resizer"
      details={<ToolGuideDetails toolId="image-resizer" />}
    >
      <ImageConverter mode="resize" />
      <RelatedTools toolId="image-resizer" />
    </ToolLayout>
  );
}
