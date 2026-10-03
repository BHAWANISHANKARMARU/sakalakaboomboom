import { EducationSubjectPage } from "@/components/education/education-route-pages";
import { getEducationSubjectParams } from "@/lib/education/repository";
export const dynamicParams = false;
export function generateStaticParams() {
  return getEducationSubjectParams();
}
export default async function Page({
  params,
}: {
  params: Promise<{ classSlug: string; subjectSlug: string }>;
}) {
  return <EducationSubjectPage {...await params} locale="hi" />;
}
