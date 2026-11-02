import type { Metadata } from "next";
import { RelatedTools } from "@/components/tools/related-tools";
import { SizeLinks } from "@/components/tools/size-links";
import { ToolGuideDetails } from "@/components/tools/tool-guide";
import { ToolLayout } from "@/components/tools/tool-layout";
import { toolGuides } from "@/content/tool-guides";
import { PhotoResizer } from "@/features/photo-resizer/photo-resizer";
import { buildPageMetadata } from "@/lib/seo/metadata";
const guide = toolGuides["photo-signature-resizer"];
export const metadata: Metadata = buildPageMetadata({
  title: guide.seoTitle,
  description: guide.metaDescription,
  path: "/tools/image/photo-resizer-in-kb",
});
export default function Page() {
  return (
    <ToolLayout
      title="Photo Resizer in KB"
      description="Resize a photo or signature to the KB and pixel limits of your online form."
      category="Image"
      path="/tools/image/photo-resizer-in-kb"
      details={
        <div className="grid gap-5">
          <ToolGuideDetails toolId="photo-signature-resizer" />
          <SizeLinks kind="image" />
        </div>
      }
    >
      <PhotoResizer />
      <RelatedTools toolId="photo-signature-resizer" />
    </ToolLayout>
  );
}
