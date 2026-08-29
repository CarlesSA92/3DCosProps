import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SiteFooter } from "../components/site-footer";

const mockNav = [
  { href: "/", label: "Home" },
  { href: "#services", label: "Services" },
];

describe("SiteFooter", () => {
  const defaultProps = {
    locale: "en" as const,
    text: "3D CosProps. High-Fidelity 3D Craftsmanship.",
    nav: mockNav,
    footerNavTitle: "Navigation",
    footerFollowTitle: "Follow Us",
    footerPrivacyLabel: "Privacy Policy",
  };

  it("should render the brand name", () => {
    render(<SiteFooter {...defaultProps} />);
    expect(screen.getByText("3D CosProps")).toBeInTheDocument();
  });

  it("should render the footer text", () => {
    render(<SiteFooter {...defaultProps} />);
    expect(
      screen.getByText("3D CosProps. High-Fidelity 3D Craftsmanship."),
    ).toBeInTheDocument();
  });

  it("should render navigation links", () => {
    render(<SiteFooter {...defaultProps} />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Services")).toBeInTheDocument();
  });

  it("should render privacy policy link", () => {
    render(<SiteFooter {...defaultProps} />);
    expect(screen.getByText("Privacy Policy")).toBeInTheDocument();
  });

  it("should render social section with the correct aria-label", () => {
    render(<SiteFooter {...defaultProps} />);
    expect(screen.getByLabelText("Follow Us")).toBeInTheDocument();
  });

  it("should render navigation section with the correct aria-label", () => {
    render(<SiteFooter {...defaultProps} />);
    expect(screen.getByLabelText("Navigation")).toBeInTheDocument();
  });
});