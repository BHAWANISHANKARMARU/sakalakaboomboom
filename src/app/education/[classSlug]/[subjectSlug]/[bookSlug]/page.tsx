import { EducationBookPage } from "@/components/education/education-route-pages";
import { getBookMetadata } from "@/lib/education/metadata";
import { getEducationBookParams } from "@/lib/education/repository";
export const dynamicParams = false;
export async function generateMetadata({
  params,
}: {
  params: Promise<{ classSlug: string; subjectSlug: string; bookSlug: string }>;
}) {
  const value = await params;
  return getBookMetadata(
    value.classSlug,
    value.subjectSlug,
    value.bookSlug,
    "en",
  );
}
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
