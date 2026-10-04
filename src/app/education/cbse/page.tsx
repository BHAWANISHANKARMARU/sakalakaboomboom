import { SectionIndex } from "@/components/layout/section-index";
import { getStaticPageMetadata } from "@/lib/seo/static-pages";
export const metadata = getStaticPageMetadata("/education/cbse");
export default function Page() {
  return (
    <SectionIndex
      title="CBSE"
      description="Verified preparation guidance for CBSE students."
    />
  );
}
