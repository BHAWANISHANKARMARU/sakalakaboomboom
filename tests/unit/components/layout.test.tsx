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

  it("does not render an empty ad when advertising is disabled", () => {
    const { container } = render(<AdPlaceholder />);
    expect(container).toBeEmptyDOMElement();
  });
});
