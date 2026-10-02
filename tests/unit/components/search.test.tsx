import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { SiteSearch } from "@/components/search/site-search";

const records = [
  {
    title: "Word Counter",
    category: "Text",
    description: "Count words and characters.",
    url: "/tools/text/word-counter",
    terms: "word counter text count words characters",
  },
];

describe("site search", () => {
  it("shows complete result information and useful no-result guidance", async () => {
    const user = userEvent.setup();
    render(<SiteSearch records={records} />);
    const input = screen.getByRole("searchbox", {
      name: "Search tools and guides",
    });
    await user.type(input, "word");
    expect(
      screen.getByRole("link", { name: /Word Counter/ }),
    ).toHaveTextContent("Text");
    expect(
      screen.getByRole("link", { name: /Word Counter/ }),
    ).toHaveTextContent("Count words and characters.");
    await user.clear(input);
    await user.type(input, "nothing matches");
    expect(screen.getByRole("status")).toHaveTextContent(
      "browse the tool categories",
    );
  });
});
