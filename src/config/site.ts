export const siteConfig = {
  name: "StudyTools.in",
  description:
    "Free online tools and carefully reviewed study resources for India.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://studytools.in",
  locale: "en" as const,
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@studytools.in",
  analyticsId: process.env.NEXT_PUBLIC_GA_ID,
  adsEnabled: process.env.NEXT_PUBLIC_ADS_ENABLED === "true",
};
