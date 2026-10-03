import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { buildPageMetadata } from "@/lib/seo/metadata";

describe("education SEO", () => {
  it("builds absolute reciprocal locale alternates", () => {
    const metadata = buildPageMetadata({
      title: "Number System",
      description: "Easy Class 9 guide.",
      path: "/education/class-9/mathematics/mathematics-2026-27/number-system",
      languageAlternates: {
        en: "/education/class-9/mathematics/mathematics-2026-27/number-system",
        hi: "/hi/education/class-9/mathematics/mathematics-2026-27/number-system",
        "x-default":
          "/education/class-9/mathematics/mathematics-2026-27/number-system",
      },
    });
    expect(metadata.alternates?.languages).toEqual({
      en: "https://www.sakalakaboomboom.online/education/class-9/mathematics/mathematics-2026-27/number-system",
      hi: "https://www.sakalakaboomboom.online/hi/education/class-9/mathematics/mathematics-2026-27/number-system",
      "x-default":
        "https://www.sakalakaboomboom.online/education/class-9/mathematics/mathematics-2026-27/number-system",
    });
  });

  it("includes published bilingual lessons but excludes planned chapters", () => {
    const urls = sitemap().map((item) => item.url);
    expect(urls).toContain(
      "https://www.sakalakaboomboom.online/education/class-9/mathematics/mathematics-2026-27/number-system",
    );
    expect(urls).toContain(
      "https://www.sakalakaboomboom.online/hi/education/class-9/mathematics/mathematics-2026-27/number-system",
    );
    expect(urls.some((url) => url.endsWith("/quadrilaterals"))).toBe(false);
  });
});
