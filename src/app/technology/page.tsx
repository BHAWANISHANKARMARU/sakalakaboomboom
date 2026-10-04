import { SectionIndex } from "@/components/layout/section-index";
import { getStaticPageMetadata } from "@/lib/seo/static-pages";
export const metadata = getStaticPageMetadata("/technology");
export default function Page() {
  return (
    <SectionIndex
      title="Technology"
      description="Practical explanations of the internet, devices and digital safety."
    />
  );
}
