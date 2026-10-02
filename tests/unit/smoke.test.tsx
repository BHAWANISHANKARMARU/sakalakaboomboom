import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Home from "@/app/page";

describe("application scaffold", () => {
  it("renders the StudyTools homepage heading", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Free Online Tools & Study Resources for India",
      }),
    ).toBeInTheDocument();
  });
});
