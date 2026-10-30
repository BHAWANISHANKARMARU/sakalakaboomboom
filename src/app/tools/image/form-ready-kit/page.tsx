import type { Metadata } from "next";
import Link from "next/link";
import { RelatedTools } from "@/components/tools/related-tools";
import { ToolGuideDetails } from "@/components/tools/tool-guide";
import { ToolLayout } from "@/components/tools/tool-layout";
import { toolGuides } from "@/content/tool-guides";
import { FormKit } from "@/features/form-kit/form-kit";
import { buildPageMetadata } from "@/lib/seo/metadata";
const guide = toolGuides["form-ready-kit"];
export const metadata: Metadata = buildPageMetadata({
  title: guide.seoTitle,
  description: guide.metaDescription,
  path: "/tools/image/form-ready-kit",
  languageAlternates: {
    en: "/tools/image/form-ready-kit",
    hi: "/hi/tools/form-ready-kit",
    "x-default": "/tools/image/form-ready-kit",
  },
});
export default function Page() {
  return (
    <ToolLayout
      title="Form Ready Kit"
      description="Prepare your photo, signature and documents for an online form in one go."
      category="Image"
      path="/tools/image/form-ready-kit"
      details={<ToolGuideDetails toolId="form-ready-kit" />}
    >
      <p className="mb-4">
        <Link
          className="font-bold underline"
          href="/hi/tools/form-ready-kit"
          hrefLang="hi"
        >
          हिंदी में खोलें
        </Link>
      </p>
      <FormKit />
      <RelatedTools toolId="form-ready-kit" />
    </ToolLayout>
  );
}
