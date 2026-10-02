import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ArticleLayout } from "@/components/articles/article-layout";

describe("article layout", () => {
  it("provides breadcrumbs and a readable article hierarchy", () => {
    render(
      <ArticleLayout title="Study guide" description="A useful guide.">
        <h2>Start here</h2>
        <p>Article content.</p>
      </ArticleLayout>,
    );
    expect(
      screen.getByRole("navigation", { name: "Breadcrumb" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 1, name: "Study guide" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "Start here" }),
    ).toBeInTheDocument();
  });
});
