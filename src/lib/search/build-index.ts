import { getLiveTools, getPublishedArticles } from "@/lib/content/registry";
export type SearchRecord = {
  title: string;
  description: string;
  category: string;
  url: string;
  terms: string;
};
export function buildSearchIndex(): SearchRecord[] {
  return [
    ...getLiveTools("en").map((tool) => ({
      title: tool.title,
      description: tool.description,
      category: tool.category,
      url: tool.url,
      terms: `${tool.title} ${tool.description} ${tool.category}`.toLowerCase(),
    })),
    ...getPublishedArticles("en").map((article) => ({
      title: article.title,
      description: article.description,
      category: article.section,
      url: `/${article.section}/${article.slug}`,
      terms:
        `${article.title} ${article.description} ${article.section}`.toLowerCase(),
    })),
  ];
}
