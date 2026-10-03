import { EducationClassPage } from "@/components/education/education-route-pages";
import { getClassMetadata } from "@/lib/education/metadata";
import { getEducationClassParams } from "@/lib/education/repository";
export const dynamicParams = false;
export async function generateMetadata({
  params,
}: {
  params: Promise<{ classSlug: string }>;
}) {
  return getClassMetadata((await params).classSlug, "en");
}
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
