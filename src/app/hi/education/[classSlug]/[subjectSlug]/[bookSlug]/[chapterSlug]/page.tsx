import { EducationLessonPage } from "@/components/education/education-route-pages";
import { getLessonMetadata } from "@/lib/education/metadata";
import { getPublishedLessonParams } from "@/lib/education/repository";
export const dynamicParams = false;
type Params = {
  classSlug: string;
  subjectSlug: string;
  bookSlug: string;
  chapterSlug: string;
};
export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const value = await params;
  return getLessonMetadata(
    value.classSlug,
    value.subjectSlug,
    value.bookSlug,
    value.chapterSlug,
    "hi",
  );
}
export function generateStaticParams() {
  return getPublishedLessonParams("hi");
}
export default async function Page({ params }: { params: Promise<Params> }) {
  return <EducationLessonPage {...await params} locale="hi" />;
}
