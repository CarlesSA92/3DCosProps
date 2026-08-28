import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ServicesPageContent } from "../components/services-page-content";
import type { ServicesDictionary } from "../../src/types/content";

const mockDict: ServicesDictionary = {
  languageLabel: "Language",
  nav: [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
  ],
  ctaPrimary: "Start Commission",
  ctaSecondary: "Explore Projects",
  heroTag: "Our expertise",
  heroTitle: "From Concept to <gold>Reality</gold>",
  heroBody:
    "From the first sketch to the final coat of paint — we partner with you.",
  services: [
    {
      id: "modeling",
      title: "We <gold>Design</gold> Your Vision",
      body: "Every great piece starts with a great model.",
      features: [
        "Custom 3D Modeling",
        "Model Adaptation & Optimization",
      ],
    },
    {
      id: "printing",
      title: "We <gold>Print</gold> the Details",
      body: "We turn digital designs into physical pieces.",
      features: [
        "FDM & Resin Printing",
        "Large-Format & High-Detail Parts",
      ],
    },
  ],
  ctaTitle: "Ready to forge your <gold>legend</gold>?",
  ctaBody: "Tell us what you have in mind.",
  ctaLabel: "Request a Quote",
  footer: "3D CosProps. High-Fidelity 3D Craftsmanship.",
  footerNavTitle: "Navigation",
  footerFollowTitle: "Follow Us",
  footerPrivacyLabel: "Privacy Policy",
};

describe("ServicesPageContent", () => {
  it("should render the hero tag", () => {
    render(<ServicesPageContent dict={mockDict} />);
    expect(screen.getByText("Our expertise")).toBeInTheDocument();
  });

  it("should render the hero title with gold highlight", () => {
    render(<ServicesPageContent dict={mockDict} />);
    const goldSpan = screen.getByText("Reality");
    expect(goldSpan).toBeInTheDocument();
    expect(goldSpan).toHaveClass("bg-gradient-to-r");
  });

  it("should render the hero body", () => {
    render(<ServicesPageContent dict={mockDict} />);
    expect(
      screen.getByText("From the first sketch to the final coat of paint — we partner with you."),
    ).toBeInTheDocument();
  });

  it("should render both service cards with gold-highlighted words", () => {
    render(<ServicesPageContent dict={mockDict} />);
    const designGold = screen.getByText("Design");
    expect(designGold).toBeInTheDocument();
    expect(designGold).toHaveClass("bg-gradient-to-r");

    const printGold = screen.getByText("Print");
    expect(printGold).toBeInTheDocument();
    expect(printGold).toHaveClass("bg-gradient-to-r");
  });

  it("should render service card descriptions", () => {
    render(<ServicesPageContent dict={mockDict} />);
    expect(
      screen.getByText("Every great piece starts with a great model."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("We turn digital designs into physical pieces."),
    ).toBeInTheDocument();
  });

  it("should render feature lists for each service", () => {
    render(<ServicesPageContent dict={mockDict} />);
    expect(screen.getByText("Custom 3D Modeling")).toBeInTheDocument();
    expect(screen.getByText("Model Adaptation & Optimization")).toBeInTheDocument();
    expect(screen.getByText("FDM & Resin Printing")).toBeInTheDocument();
    expect(screen.getByText("Large-Format & High-Detail Parts")).toBeInTheDocument();
  });

  it("should render the final CTA section title with gold highlight and body", () => {
    render(<ServicesPageContent dict={mockDict} />);
    const legendGold = screen.getByText("legend");
    expect(legendGold).toBeInTheDocument();
    expect(legendGold).toHaveClass("bg-gradient-to-r");
    expect(screen.getByText("Tell us what you have in mind.")).toBeInTheDocument();
  });

  it("should render the final CTA button with correct label", () => {
    render(<ServicesPageContent dict={mockDict} />);
    // Hero CTAs are hidden — only the bottom CTA button shows
    expect(screen.getByText("Start Commission")).toBeInTheDocument();
  });
});