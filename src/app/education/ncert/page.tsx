import { SectionIndex } from "@/components/layout/section-index";
import { getStaticPageMetadata } from "@/lib/seo/static-pages";
export const metadata = getStaticPageMetadata("/education/ncert");
export default function Page() {
  return (
    <SectionIndex
      title="NCERT"
      description="Clear guides to using NCERT textbooks effectively."
    />
  );
}
