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
});
