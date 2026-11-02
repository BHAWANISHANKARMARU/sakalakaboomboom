import type { Metadata } from "next";
import { ToolLayout } from "@/components/tools/tool-layout";
import { RelatedTools } from "@/components/tools/related-tools";
import { JsonFormatter } from "@/features/json-formatter/json-formatter";
import { ToolGuideDetails } from "@/components/tools/tool-guide";
import { toolGuides } from "@/content/tool-guides";
import { buildPageMetadata } from "@/lib/seo/metadata";
export const metadata: Metadata = buildPageMetadata({
  title: toolGuides["json-formatter"].seoTitle,
  description: toolGuides["json-formatter"].metaDescription,
  path: "/tools/web/json-formatter-validator",
});
export default function Page() {
  return (
    <ToolLayout
      title="JSON Formatter & Validator"
      description="Format, minify and check JSON without sending it anywhere."
      category="Web"
      path="/tools/web/json-formatter-validator"
      details={<ToolGuideDetails toolId="json-formatter" />}
    >
      <JsonFormatter />
      <RelatedTools toolId="json-formatter" />
    </ToolLayout>
  );
}
