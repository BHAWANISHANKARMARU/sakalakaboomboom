import type { Metadata } from "next";
import { ToolLayout } from "@/components/tools/tool-layout";
import { RelatedTools } from "@/components/tools/related-tools";
import { JsonFormatter } from "@/features/json-formatter/json-formatter";
import { buildPageMetadata } from "@/lib/seo/metadata";
export const metadata: Metadata = buildPageMetadata({
  title: "JSON Formatter & Validator",
  description: "Format, minify and validate JSON safely in your browser.",
  path: "/tools/web/json-formatter-validator",
});
export default function Page() {
  return (
    <ToolLayout
      title="JSON Formatter & Validator"
      description="Format, minify and check JSON without sending it anywhere."
      category="Web"
      path="/tools/web/json-formatter-validator"
    >
      <JsonFormatter />
      <RelatedTools toolId="json-formatter" />
    </ToolLayout>
  );
}
