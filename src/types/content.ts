export type Locale = "en" | "hi";
export type PublicationStatus = "planned" | "draft" | "reviewed" | "published";
export type ToolCategory =
  "pdf" | "image" | "text" | "web" | "scanner" | "calculators";

export type LocalizedText = { en: string; hi?: string };
export type ToolRecord = {
  id: string;
  slug: string;
  category: ToolCategory;
  title: LocalizedText;
  description: LocalizedText;
  status: PublicationStatus;
  relatedToolIds: string[];
};
export type ArticleRecord = {
  id: string;
  slug: string;
  locale: Locale;
  title: string;
  description: string;
  section: "education" | "exams" | "technology" | "how-to" | "india-guides";
  status: PublicationStatus;
  relatedToolIds: string[];
  relatedArticleIds: string[];
};
export type CategoryRecord = {
  id: ToolCategory;
  title: string;
  description: string;
};
export type ResolvedTool = Omit<ToolRecord, "title" | "description"> & {
  title: string;
  description: string;
  url: string;
};
