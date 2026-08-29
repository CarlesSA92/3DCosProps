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
    footerLegalTitle: "Legal",
    footerLegalNoticeLabel: "Legal Notice",
    footerCookiePolicyLabel: "Cookie Policy",
    footerTermsLabel: "Terms & Conditions",
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

  it("should render legal section links", () => {
    render(<SiteFooter {...defaultProps} />);
    expect(screen.getByText("Legal Notice")).toBeInTheDocument();
    expect(screen.getByText("Cookie Policy")).toBeInTheDocument();
    expect(screen.getByText("Terms & Conditions")).toBeInTheDocument();
  });

  it("should render legal links with correct hrefs", () => {
    render(<SiteFooter {...defaultProps} />);
    const legalNotice = screen.getByText("Legal Notice").closest("a");
    expect(legalNotice).toHaveAttribute("href", "/en/legal-notice");
    const cookiePolicy = screen.getByText("Cookie Policy").closest("a");
    expect(cookiePolicy).toHaveAttribute("href", "/en/cookie-policy");
    const terms = screen.getByText("Terms & Conditions").closest("a");
    expect(terms).toHaveAttribute("href", "/en/terms-conditions");
    const privacy = screen.getByText("Privacy Policy").closest("a");
    expect(privacy).toHaveAttribute("href", "/en/privacy-policy");
  });
});