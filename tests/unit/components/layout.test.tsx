import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { AdPlaceholder } from "@/components/ui/ad-placeholder";
import { Header } from "@/components/layout/header";

describe("site shell", () => {
  it("opens and closes the labelled mobile navigation", async () => {
    const user = userEvent.setup();
    render(<Header />);
    const button = screen.getByRole("button", { name: "Open menu" });
    expect(button).toHaveAttribute("aria-expanded", "false");
    await user.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");
    await user.keyboard("{Escape}");
    expect(button).toHaveFocus();
    expect(button).toHaveAttribute("aria-expanded", "false");
  });

  it("provides working desktop navigation menus", async () => {
    const user = userEvent.setup();
    render(<Header />);
    const toolsMenu = screen.getAllByText("Tools", { selector: "summary" })[0];
    await user.click(toolsMenu);
    expect(toolsMenu.closest("details")).toHaveAttribute("open");
    expect(
      screen.getAllByRole("link", { name: "PDF Tools" })[0],
    ).toHaveAttribute("href", "/tools/pdf");
    expect(
      screen.getAllByRole("link", { name: "Class 12" })[0],
    ).toHaveAttribute("href", "/education/class-12");
  });

  it("does not render an empty ad when advertising is disabled", () => {
    const { container } = render(<AdPlaceholder />);
    expect(container).toBeEmptyDOMElement();
  });
});
