import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SizePageView, sizePageMetadata } from "@/components/tools/size-page";
import { findSizePage, sizePages } from "@/content/size-pages";

export const dynamicParams = false;

export function generateStaticParams() {
  return sizePages
    .filter((page) => page.kind === "pdf")
    .map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const page = findSizePage("pdf", (await params).slug);
  return page ? sizePageMetadata(page) : {};
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const page = findSizePage("pdf", (await params).slug);
  if (!page) notFound();
  return <SizePageView page={page} />;
}
