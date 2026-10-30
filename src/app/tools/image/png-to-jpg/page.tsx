import type { Metadata } from "next";
import { RelatedTools } from "@/components/tools/related-tools";
import { ToolGuideDetails } from "@/components/tools/tool-guide";
import { ToolLayout } from "@/components/tools/tool-layout";
import { toolGuides } from "@/content/tool-guides";
import { ImageConverter } from "@/features/image-converter/image-converter";
import { buildPageMetadata } from "@/lib/seo/metadata";
const guide = toolGuides["png-to-jpg"];
export const metadata: Metadata = buildPageMetadata({
  title: guide.seoTitle,
  description: guide.metaDescription,
  path: "/tools/image/png-to-jpg",
});
export default function Page() {
  return (
    <ToolLayout
      title="PNG to JPG"
      description="Convert a PNG image to JPG without uploading it."
      category="Image"
      path="/tools/image/png-to-jpg"
      details={<ToolGuideDetails toolId="png-to-jpg" />}
    >
      <ImageConverter mode="png-to-jpg" />
      <RelatedTools toolId="png-to-jpg" />
    </ToolLayout>
  );
}
