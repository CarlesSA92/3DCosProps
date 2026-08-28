import type { ReactNode } from "react";

// ─── Icon Props ──────────────────────────────────────

/** Shared props for all SVG icon components */
export type IconProps = {
  /** Optional className for sizing. Defaults vary per icon. */
  className?: string;
};

// ─── Section / Layout Props ───────────────────────────

/** Content for the hero / page-intro section */
export type PageIntroContent = {
  tag: string;
  title: string;
  body: string;
  ctaSecondary: string;
  ctaPrimary: string;
};

/** Props for the SectionIntro component (section heading + optional body) */
export type SectionIntroProps = {
  title: string;
  body?: string;
  children?: ReactNode;
};

/** Props for the CtaButton component */
export type CtaButtonProps = {
  children: ReactNode;
  href: string;
  /** "primary" = gold filled, "secondary" = ghost/outlined */
  variant?: "primary" | "secondary";
  /** Optional extra class names */
  className?: string;
};

// ─── Card Props ───────────────────────────────────────

/** Content for a feature/benefit card with optional CTA */
export type FeatureCardContent = {
  title: string;
  body: string;
  /** Call-to-action label shown at the bottom */
  cta: string;
};

/** Props for the GlassmorphismCard component 
 *  (icon + content, reusable across all card-like sections) */
export type GlassmorphismCardProps = {
  content: FeatureCardContent;
  icon: ReactNode;
  onClick?: () => void;
};

// ─── Carousel Props ───────────────────────────────────

/** Props for the CarouselSection component */
export type CarouselSectionProps = {
  title?: string;
  slides: import("./content").CarouselSlide[];
  autoPlayInterval?: number;
};