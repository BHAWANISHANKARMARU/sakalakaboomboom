import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleLayout } from "@/components/articles/article-layout";
import { getPublishedArticles } from "@/lib/content/registry";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { articleJsonLd } from "@/lib/seo/structured-data";

export const dynamicParams = false;
const findGuide = (slug: string) =>
  getPublishedArticles("hi").find((item) => item.slug === slug);

export function generateStaticParams() {
  return getPublishedArticles("hi").map(({ slug }) => ({ slug }));
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
    path: `/hi/how-to/${item.slug}`,
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const item = findGuide((await params).slug);
  if (!item) notFound();
  return (
    <div lang="hi">
      <ArticleLayout
        title={item.title}
        description={item.description}
        category="गाइड"
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              articleJsonLd({ ...item, section: "hi/how-to" }),
            ).replace(/</g, "\\u003c"),
          }}
        />
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
        {item.toolLinks ? (
          <>
            <h2>काम के टूल</h2>
            <ul className="list-disc space-y-2 pl-5">
              {item.toolLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </>
        ) : null}
      </ArticleLayout>
    </div>
  );
}
