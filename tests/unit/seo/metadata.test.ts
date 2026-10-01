import { describe, expect, it } from "vitest";
import { buildPageMetadata } from "@/lib/seo/metadata";
describe("metadata", () => {
  it("builds an absolute canonical and branded title", () => {
    const value = buildPageMetadata({
      title: "Online tools",
      description: "Practical online tools.",
      path: "/tools",
    });
    expect(value.alternates?.canonical).toBe("https://sahaj.tools/tools");
    expect(value.title).toBe("Online tools | Sahaj Tools");
  });
  it("gives the root page a canonical and Open Graph URL", async () => {
    const { metadata } = await import("@/app/layout");
    expect(metadata.alternates?.canonical).toBe("./");
    expect(metadata.openGraph).toMatchObject({ url: "./" });
  });
});
