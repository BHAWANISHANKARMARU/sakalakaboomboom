import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Home from "@/app/page";

describe("application scaffold", () => {
  it("renders the Sahaj Tools homepage heading", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Useful online tools and guides for everyday tasks",
      }),
    ).toBeInTheDocument();
  });
});
