import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleLayout } from "@/components/articles/article-layout";
import { getLiveTools, getPublishedArticles } from "@/lib/content/registry";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { articleJsonLd } from "@/lib/seo/structured-data";

export const dynamicParams = false;
const guides = () =>
  getPublishedArticles("en").filter((item) => item.section === "how-to");
const findGuide = (slug: string) => guides().find((item) => item.slug === slug);

export function generateStaticParams() {
  return guides().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const item = findGuide((await params).slug);
  if (!item) return {};
  return buildPageMetadata({
    title: item.title,
    description: item.description,
    path: `/how-to/${item.slug}`,
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const item = findGuide((await params).slug);
  if (!item) notFound();
  const tools = getLiveTools("en").filter((tool) =>
    item.relatedToolIds.includes(tool.id),
  );
  return (
    <ArticleLayout title={item.title} description={item.description}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd(item)).replace(/</g, "\\u003c"),
        }}
      />
      <p>
        Last updated:{" "}
        {new Date(item.updatedAt).toLocaleDateString("en-IN", {
          dateStyle: "long",
          timeZone: "UTC",
        })}
      </p>
      {item.sections.map((section) => (
        <section key={section.heading}>
          <h2>{section.heading}</h2>
          {section.paragraphs?.map((text) => (
            <p key={text}>{text}</p>
          ))}
          {section.steps ? (
            <ol className="list-decimal space-y-2 pl-5">
              {section.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          ) : null}
        </section>
      ))}
      <h2>Tools for this guide</h2>
      <ul className="list-disc space-y-2 pl-5">
        {tools.map((tool) => (
          <li key={tool.id}>
            <Link href={tool.url}>{tool.title}</Link>: {tool.description}
          </li>
        ))}
      </ul>
    </ArticleLayout>
  );
}
