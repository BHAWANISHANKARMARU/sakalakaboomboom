import { EducationBookPage } from "@/components/education/education-route-pages";
import { getEducationBookParams } from "@/lib/education/repository";
export const dynamicParams = false;
export function generateStaticParams() {
  return getEducationBookParams();
}
export default async function Page({
  params,
}: {
  params: Promise<{ classSlug: string; subjectSlug: string; bookSlug: string }>;
}) {
  return <EducationBookPage {...await params} locale="en" />;
}
