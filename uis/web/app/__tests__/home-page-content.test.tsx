import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { HomePageContent } from "../components/home-page-content";
import type { HomePageContentDict } from "../../src/types/content";

const mockDict: HomePageContentDict = {
  heroTag: "High-fidelity replicas",
  heroTitle: "Transform fiction into <gold>reality!</gold>",
  heroBody: "Specialists in cosplays, replicas and atrezzo.",
  ctaSecondary: "Explore Projects",
  ctaPrimary: "Start Commission",
  gallery: {
    title: "Gallery",
    slides: [
      {
        id: "test-slide",
        alt: "Test slide",
        label: "Test",
        placeholderGradient: "linear-gradient(135deg, #000 0%, #333 100%)",
      },
    ],
  },
  servicesOverviewTitle: "Do you have a project?",
  servicesOverviewBody: "We will help you make it real.",
  servicesCardTitle: "Services",
  servicesCardBody: "Discover our services.",
  servicesCardCta: "View Services",
  commissionsCardTitle: "Commissions",
  commissionsCardBody: "Let us build it from scratch.",
  commissionsCardCta: "Request Quote",
};

describe("HomePageContent", () => {
  it("should render the hero tag", () => {
    render(<HomePageContent dict={mockDict} />);
    expect(screen.getByText("High-fidelity replicas")).toBeInTheDocument();
  });

  it("should render the hero title with gold highlight", () => {
    render(<HomePageContent dict={mockDict} />);
    // The gold-highlighted word is wrapped in a <span>
    const goldSpan = screen.getByText("reality!");
    expect(goldSpan).toBeInTheDocument();
    expect(goldSpan).toHaveClass("bg-gradient-to-r");

    // The rest of the title is a sibling text node — check by container
    const heading = goldSpan.closest("h1");
    expect(heading?.textContent).toContain("Transform fiction into");
  });

  it("should render the hero body", () => {
    render(<HomePageContent dict={mockDict} />);
    expect(
      screen.getByText("Specialists in cosplays, replicas and atrezzo."),
    ).toBeInTheDocument();
  });

  it("should render CTA buttons", () => {
    render(<HomePageContent dict={mockDict} />);
    expect(screen.getByText("Explore Projects")).toBeInTheDocument();
    expect(screen.getByText("Start Commission")).toBeInTheDocument();
  });

  it("should render the services section", () => {
    render(<HomePageContent dict={mockDict} />);
    expect(screen.getByText("Do you have a project?")).toBeInTheDocument();
    expect(screen.getByText("Services")).toBeInTheDocument();
    expect(screen.getByText("View Services")).toBeInTheDocument();
  });

  it("should render the commissions section", () => {
    render(<HomePageContent dict={mockDict} />);
    expect(screen.getByText("Commissions")).toBeInTheDocument();
    expect(screen.getByText("Request Quote")).toBeInTheDocument();
  });
});