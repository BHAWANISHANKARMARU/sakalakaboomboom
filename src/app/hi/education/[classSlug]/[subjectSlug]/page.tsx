import { EducationSubjectPage } from "@/components/education/education-route-pages";
import { getSubjectMetadata } from "@/lib/education/metadata";
import { getEducationSubjectParams } from "@/lib/education/repository";
export const dynamicParams = false;
export async function generateMetadata({
  params,
}: {
  params: Promise<{ classSlug: string; subjectSlug: string }>;
}) {
  const value = await params;
  return getSubjectMetadata(value.classSlug, value.subjectSlug, "hi");
}
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
