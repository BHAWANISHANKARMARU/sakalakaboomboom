import { articles } from "@/content/articles";
import { tools } from "@/content/tools";
import type {
  Locale,
  ResolvedTool,
  ToolCategory,
  ToolRecord,
} from "@/types/content";

const localise = (record: ToolRecord, locale: Locale): ResolvedTool => ({
  ...record,
  title: record.title[locale] ?? record.title.en,
  description: record.description[locale] ?? record.description.en,
  url: `/tools/${record.category}/${record.slug}`,
});
export const getLiveTools = (locale: Locale) =>
  tools
    .filter((item) => item.status === "published")
    .map((item) => localise(item, locale));
export const getToolBySlug = (
  category: ToolCategory,
  slug: string,
  locale: Locale,
) => {
  const match = tools.find(
    (item) =>
      item.category === category &&
      item.slug === slug &&
      item.status === "published",
  );
  return match ? localise(match, locale) : undefined;
};
export const getPublishedArticles = (locale: Locale) =>
  articles.filter(
    (item) => item.locale === locale && item.status === "published",
  );
export const getRelatedTools = (toolId: string, locale: Locale) => {
  const source = tools.find((item) => item.id === toolId);
  return (source?.relatedToolIds ?? [])
    .map((id) => tools.find((item) => item.id === id))
    .filter((item): item is ToolRecord => Boolean(item?.status === "published"))
    .map((item) => localise(item, locale));
};
export const getRelatedArticles = (articleId: string, locale: Locale) => {
  const source = articles.find((item) => item.id === articleId);
  return (source?.relatedArticleIds ?? [])
    .map((id) => articles.find((item) => item.id === id))
    .filter((item) => item?.locale === locale && item.status === "published");
};
