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
  ctaPrimary: "Request a Quote",
  ctaSecondary: "Explore Projects",
  heroTag: "Our expertise",
  heroTitle: "From concept to <gold>masterpiece</gold>",
  heroBody:
    "From the first sketch to the final coat of paint — we partner with you.",
  services: [
    {
      id: "modeling",
      title: "3D Modeling & Design",
      body: "Custom digital sculpting and hard-surface modeling.",
      features: [
        "Digital sculpting (ZBrush, Blender)",
        "Hard-surface modeling (Fusion 360, SolidWorks)",
      ],
    },
    {
      id: "printing",
      title: "3D Printing & Production",
      body: "Industrial-grade FDM and resin printing.",
      features: [
        "FDM printing (PLA, PETG, ABS, PC)",
        "Resin printing (standard, tough, castable)",
      ],
    },
  ],
  ctaTitle: "Ready to start your project?",
  ctaBody: "Send us a commission request.",
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
    const goldSpan = screen.getByText("masterpiece");
    expect(goldSpan).toBeInTheDocument();
    expect(goldSpan).toHaveClass("bg-gradient-to-r");
  });

  it("should render the hero body", () => {
    render(<ServicesPageContent dict={mockDict} />);
    expect(
      screen.getByText("From the first sketch to the final coat of paint — we partner with you."),
    ).toBeInTheDocument();
  });

  it("should render both service cards with titles", () => {
    render(<ServicesPageContent dict={mockDict} />);
    expect(screen.getByText("3D Modeling & Design")).toBeInTheDocument();
    expect(screen.getByText("3D Printing & Production")).toBeInTheDocument();
  });

  it("should render service card descriptions", () => {
    render(<ServicesPageContent dict={mockDict} />);
    expect(
      screen.getByText("Custom digital sculpting and hard-surface modeling."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Industrial-grade FDM and resin printing."),
    ).toBeInTheDocument();
  });

  it("should render feature lists for each service", () => {
    render(<ServicesPageContent dict={mockDict} />);
    expect(screen.getByText("Digital sculpting (ZBrush, Blender)")).toBeInTheDocument();
    expect(screen.getByText("Hard-surface modeling (Fusion 360, SolidWorks)")).toBeInTheDocument();
    expect(screen.getByText("FDM printing (PLA, PETG, ABS, PC)")).toBeInTheDocument();
    expect(screen.getByText("Resin printing (standard, tough, castable)")).toBeInTheDocument();
  });

  it("should render the final CTA section title and body", () => {
    render(<ServicesPageContent dict={mockDict} />);
    expect(screen.getByText("Ready to start your project?")).toBeInTheDocument();
    expect(screen.getByText("Send us a commission request.")).toBeInTheDocument();
  });

  it("should render the final CTA button with correct label", () => {
    render(<ServicesPageContent dict={mockDict} />);
    // Hero CTAs are hidden — only the bottom CTA button shows
    expect(screen.getByText("Request a Quote")).toBeInTheDocument();
  });
});