import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { LegalPage } from "../../src/ui/legal-page";
import type { LegalDocument } from "../../app/content/legal-content";

const mockDocument: LegalDocument = {
  title: "Test Legal Document",
  lastUpdated: "2026-08-29",
  disclaimer: "This is a draft document for testing purposes.",
  sections: [
    {
      title: "Section One",
      body: "This is the first section content.",
    },
    {
      title: "Section Two",
      body: [
        "This is a multi-paragraph section.",
        "Second paragraph with some content.",
        "",
        "A line after an empty paragraph.",
      ],
    },
    {
      title: "Section With Table",
      body: [
        "| Column A | Column B |",
        "| Cell 1   | Cell 2   |",
        "---",
        "Some text after a separator.",
      ],
    },
  ],
};

describe("LegalPage", () => {
  it("should render the document title", () => {
    render(<LegalPage document={mockDocument} />);
    expect(screen.getByText("Test Legal Document")).toBeInTheDocument();
  });

  it("should render the disclaimer banner", () => {
    render(<LegalPage document={mockDocument} />);
    expect(screen.getByText("This is a draft document for testing purposes.")).toBeInTheDocument();
  });

  it("should render the last updated date", () => {
    render(<LegalPage document={mockDocument} />);
    expect(screen.getByText(/Última actualización: 2026-08-29/)).toBeInTheDocument();
  });

  it("should render all section titles", () => {
    render(<LegalPage document={mockDocument} />);
    expect(screen.getByText("Section One")).toBeInTheDocument();
    expect(screen.getByText("Section Two")).toBeInTheDocument();
    expect(screen.getByText("Section With Table")).toBeInTheDocument();
  });

  it("should render section body text", () => {
    render(<LegalPage document={mockDocument} />);
    expect(screen.getByText("This is the first section content.")).toBeInTheDocument();
    expect(screen.getByText("This is a multi-paragraph section.")).toBeInTheDocument();
  });

  it("should render table-like paragraphs in monospace style", () => {
    const { container } = render(<LegalPage document={mockDocument} />);
    // Table rows are rendered as <p> with font-mono class
    const tableRow = container.querySelector(".font-mono");
    expect(tableRow).toBeTruthy();
    expect(tableRow?.textContent).toBe("| Column A | Column B |");
  });

  it("should render separator lines as <hr>", () => {
    const { container } = render(<LegalPage document={mockDocument} />);
    const hrElements = container.querySelectorAll("hr");
    expect(hrElements.length).toBeGreaterThanOrEqual(1);
  });

  it("should render the main element", () => {
    const { container } = render(<LegalPage document={mockDocument} />);
    const main = container.querySelector("main");
    expect(main).toBeInTheDocument();
  });

  it("should not render disclaimer when it is empty", () => {
    const docWithoutDisclaimer = {
      ...mockDocument,
      disclaimer: "",
    };
    render(<LegalPage document={docWithoutDisclaimer} />);
    expect(screen.queryByText("This is a draft document for testing purposes.")).not.toBeInTheDocument();
  });
});