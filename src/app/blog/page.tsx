import { SectionIndex } from "@/components/layout/section-index";
import { getStaticPageMetadata } from "@/lib/seo/static-pages";
export const metadata = getStaticPageMetadata("/blog");
export default function Page() {
  return (
    <SectionIndex
      title="Useful guides"
      description="Original, reviewed guides for students and everyday internet users."
    />
  );
}
