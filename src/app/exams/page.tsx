import { SectionIndex } from "@/components/layout/section-index";
import { getStaticPageMetadata } from "@/lib/seo/static-pages";
export const metadata = getStaticPageMetadata("/exams");
export default function Page() {
  return (
    <SectionIndex
      title="Competitive exams"
      description="Evergreen preparation guidance, with official sources for current details."
    />
  );
}
