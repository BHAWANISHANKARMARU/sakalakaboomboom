import { EducationClassPage } from "@/components/education/education-route-pages";
import { getEducationClassParams } from "@/lib/education/repository";
export const dynamicParams = false;
export function generateStaticParams() {
  return getEducationClassParams();
}
export default async function Page({
  params,
}: {
  params: Promise<{ classSlug: string }>;
}) {
  return <EducationClassPage {...await params} locale="en" />;
}
