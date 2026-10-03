import { describe, expect, it } from "vitest";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { websiteJsonLd } from "@/lib/seo/structured-data";
describe("metadata", () => {
  it("builds an absolute canonical and branded title", () => {
    const value = buildPageMetadata({
      title: "Online tools",
      description: "Practical online tools.",
      path: "/tools",
    });
    expect(value.alternates?.canonical).toBe(
      "https://www.sakalakaboomboom.online/tools",
    );
    expect(value.title).toBe("Online tools | Sakalakaboomboom");
  });
  it("gives the root page a canonical and Open Graph URL", async () => {
    const { metadata } = await import("@/app/layout");
    expect(metadata.alternates?.canonical).toBe(
      "https://www.sakalakaboomboom.online/",
    );
    expect(metadata.openGraph).toMatchObject({
      url: "https://www.sakalakaboomboom.online/",
      siteName: "Sakalakaboomboom",
    });
    expect(metadata.title).toMatchObject({
      default:
        "Sakalakaboomboom — Free Online Tools & Study Resources for India",
    });
  });

  it("describes the canonical website identity for search engines", () => {
    expect(websiteJsonLd()).toEqual({
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Sakalakaboomboom",
      url: "https://www.sakalakaboomboom.online/",
      inLanguage: "en",
      potentialAction: {
        "@type": "SearchAction",
        target:
          "https://www.sakalakaboomboom.online/search?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    });
  });
});
