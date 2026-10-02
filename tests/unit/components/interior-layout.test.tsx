import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ContentSection } from "@/components/layout/content-section";
import { InteriorHero } from "@/components/layout/interior-hero";
import { ResponsiveGrid } from "@/components/layout/responsive-grid";
import { StatusNotice } from "@/components/ui/status-notice";

describe("interior layout primitives", () => {
  it("renders breadcrumbs, one page heading, description and action", () => {
    render(
      <InteriorHero
        title="PDF Tools"
        description="Work with PDF files."
        eyebrow="Tools"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "PDF Tools" }]}
        action={{ label: "Browse all tools", href: "/tools" }}
      />,
    );
    expect(
      screen.getByRole("heading", { level: 1, name: "PDF Tools" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("navigation", { name: "Breadcrumb" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Browse all tools" }),
    ).toHaveAttribute("href", "/tools");
  });

  it("provides reusable section, grid and labelled notice structure", () => {
    render(
      <>
        <ContentSection title="Available tools" description="Ready to use.">
          <ResponsiveGrid>
            <div>Tool</div>
          </ResponsiveGrid>
        </ContentSection>
        <StatusNotice
          title="Carefully reviewed"
          description="More resources are being prepared."
        />
      </>,
    );
    expect(
      screen.getByRole("heading", { name: "Available tools" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("status", { name: "Carefully reviewed" }),
    ).toHaveTextContent("More resources are being prepared.");
  });
});
