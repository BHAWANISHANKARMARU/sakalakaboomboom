import { render, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";

describe("GoogleAnalytics", () => {
  it("loads and initializes one Google tag for the configured measurement ID", async () => {
    render(<GoogleAnalytics measurementId="G-MDCMHQR1JD" />);

    await waitFor(() => {
      expect(
        document.querySelectorAll(
          'script[src="https://www.googletagmanager.com/gtag/js?id=G-MDCMHQR1JD"]',
        ),
      ).toHaveLength(1);
    });
    expect(document.body.textContent).toContain(
      "gtag('config', 'G-MDCMHQR1JD',",
    );
  });

  it("renders nothing when analytics is not configured", () => {
    const { container } = render(<GoogleAnalytics />);

    expect(container).toBeEmptyDOMElement();
  });
});
