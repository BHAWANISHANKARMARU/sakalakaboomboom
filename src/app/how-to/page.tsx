import { SectionIndex } from "@/components/layout/section-index";
import { getStaticPageMetadata } from "@/lib/seo/static-pages";
export const metadata = getStaticPageMetadata("/how-to");
export default function Page() {
  return (
    <SectionIndex
      title="How-to guides"
      description="Clear steps for everyday digital tasks."
    />
  );
}
