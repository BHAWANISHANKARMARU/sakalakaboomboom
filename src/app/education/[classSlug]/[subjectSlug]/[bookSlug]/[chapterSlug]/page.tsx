import { EducationLessonPage } from "@/components/education/education-route-pages";
import { getPublishedLessonParams } from "@/lib/education/repository";
export const dynamicParams = false;
export function generateStaticParams() {
  return getPublishedLessonParams("en");
}
export default async function Page({
  params,
}: {
  params: Promise<{
    classSlug: string;
    subjectSlug: string;
    bookSlug: string;
    chapterSlug: string;
  }>;
}) {
  return <EducationLessonPage {...await params} locale="en" />;
}
