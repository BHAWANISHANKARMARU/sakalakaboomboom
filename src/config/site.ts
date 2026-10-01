export const siteConfig = {
  name: "Sahaj Tools",
  description: "Useful online tools and guides for everyday tasks.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://sahaj.tools",
  locale: "en" as const,
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@sahaj.tools",
  analyticsId: process.env.NEXT_PUBLIC_GA_ID,
  adsEnabled: process.env.NEXT_PUBLIC_ADS_ENABLED === "true",
};
