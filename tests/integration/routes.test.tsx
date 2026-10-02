import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "@/app/page";

describe("public routes", () => {
  it("renders the homepage thesis and only live tools", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Free Online Tools & Study Resources for India",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /PDF Merger/ }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: /PDF Compressor/ }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Tools by Category" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Student & Education Resources" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Frequently Asked Questions" }),
    ).toBeInTheDocument();
  });
});
