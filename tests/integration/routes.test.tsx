import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "@/app/page";

describe("public routes", () => {
  it("renders the homepage thesis and only live tools", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Useful online tools and guides for everyday tasks",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /PDF Merger/ }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: /PDF Compressor/ }),
    ).not.toBeInTheDocument();
  });
});
