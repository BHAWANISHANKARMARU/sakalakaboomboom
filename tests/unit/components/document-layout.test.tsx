import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PrivacyPage from "@/app/privacy-policy/page";

describe("document pages", () => {
  it("uses a readable structured layout with accurate privacy disclosure", () => {
    render(<PrivacyPage />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Privacy Policy" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Browser processing" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/do not receive or store that content/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("navigation", { name: "Breadcrumb" }),
    ).toBeInTheDocument();
  });
});
