import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ToolDirectoryCard } from "@/components/ui/tool-directory-card";
import EducationPage from "@/app/education/page";

describe("directory pages", () => {
  it("links live tools and keeps planned tools non-interactive", () => {
    render(
      <>
        <ToolDirectoryCard
          title="Word Counter"
          description="Count words."
          href="/tools/text/word-counter"
          status="live"
          category="Text"
        />
        <ToolDirectoryCard
          title="Case Converter"
          description="Convert text case."
          status="planned"
          category="Text"
        />
      </>,
    );
    expect(screen.getByRole("link", { name: /Word Counter/ })).toHaveAttribute(
      "href",
      "/tools/text/word-counter",
    );
    expect(
      screen.queryByRole("link", { name: /Case Converter/ }),
    ).not.toBeInTheDocument();
    expect(screen.getByText("Coming soon")).toBeInTheDocument();
  });

  it("gives education visitors useful navigation and publication context", () => {
    render(<EducationPage />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Education" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Class 11/ })).toBeInTheDocument();
    expect(
      screen.getByRole("status", { name: "Reviewed before publication" }),
    ).toBeInTheDocument();
  });
});
