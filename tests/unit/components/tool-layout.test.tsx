import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ToolLayout } from "@/components/tools/tool-layout";

describe("tool layout", () => {
  it("prioritises the interface and explains browser privacy", () => {
    render(
      <ToolLayout
        title="Word Counter"
        description="Count words."
        category="Text"
        path="/tools/text/word-counter"
      >
        <div data-testid="tool-interface">Interface</div>
      </ToolLayout>,
    );
    expect(
      screen.getByRole("heading", { level: 1, name: "Word Counter" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("status", { name: "Private browser processing" }),
    ).toBeInTheDocument();
    const tool = screen.getByTestId("tool-interface");
    const instructions = screen.getByRole("heading", {
      name: "How to use this tool",
    });
    expect(
      tool.compareDocumentPosition(instructions) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });
});
