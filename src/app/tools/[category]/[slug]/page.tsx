import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RelatedTools } from "@/components/tools/related-tools";
import { ToolLayout } from "@/components/tools/tool-layout";
import { tools } from "@/content/tools";
import { EverydayTool } from "@/features/everyday-tools/everyday-tool";
import { buildPageMetadata } from "@/lib/seo/metadata";

const categories = ["calculators", "text", "web"] as const;
const everydayIds = new Set([
  "age-calculator",
  "bmi-calculator",
  "percentage-calculator",
  "discount-calculator",
  "gst-calculator",
  "emi-calculator",
  "sip-calculator",
  "date-difference-calculator",
  "unit-converter",
  "fuel-cost-calculator",
  "case-converter",
  "remove-duplicate-lines",
  "text-sorter",
  "find-replace-text",
  "whitespace-cleaner",
  "line-counter",
  "url-encoder-decoder",
  "base64-encoder-decoder",
  "password-generator",
  "uuid-generator",
]);

const findTool = (category: string, slug: string) =>
  tools.find(
    (item) =>
      item.category === category &&
      item.slug === slug &&
      everydayIds.has(item.id),
  );

export function generateStaticParams() {
  return tools
    .filter((item) => everydayIds.has(item.id))
    .map(({ category, slug }) => ({ category, slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { category, slug } = await params;
  const item = findTool(category, slug);
  if (!item) return {};
  return buildPageMetadata({
    title: item.title.en,
    description: item.description.en,
    path: `/tools/${category}/${slug}`,
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  if (!categories.includes(category as (typeof categories)[number])) notFound();
  const item = findTool(category, slug);
  if (!item) notFound();
  const financial = ["emi-calculator", "sip-calculator"].includes(slug);
  return (
    <ToolLayout
      title={item.title.en}
      description={item.description.en}
      category={
        category === "calculators"
          ? "Calculators"
          : category === "text"
            ? "Text"
            : "Web"
      }
      path={`/tools/${category}/${slug}`}
      details={
        <p>
          {financial
            ? "This calculator provides an estimate only. Actual returns, rates and lender charges may differ. "
            : ""}
          Enter your values, review the result, and use Copy result when needed.
          All processing stays on your device.
        </p>
      }
    >
      <EverydayTool slug={slug} />
      <RelatedTools toolId={item.id} />
    </ToolLayout>
  );
}
