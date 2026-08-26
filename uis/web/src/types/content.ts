import type { Locale } from "../../app/i18n";

export type NavItem = {
  href: string;
  label: string;
};

export type Capability = {
  title: string;
  body: string;
};

/** Content dictionary shared by Home and future pages */
export type PageContent = {
  languageLabel: string;
  nav: NavItem[];
  ctaPrimary: string;
  ctaSecondary: string;
  footer: string;
  footerNavTitle: string;
  footerFollowTitle: string;
  footerPrivacyLabel: string;
};

export type HomeDictionary = PageContent & {
  heroTag: string;
  heroTitle: string;
  heroBody: string;
  capabilitiesTitle: string;
  capabilities: Capability[];
  projectsTitle: string;
  projectsBody: string;
  projectsChips: string[];
  commissionTitle: string;
  commissionBody: string;
  servicesOverviewTitle: string;
  servicesOverviewBody: string;
  servicesCardTitle: string;
  servicesCardBody: string;
  servicesCardCta: string;
  commissionsCardTitle: string;
  commissionsCardBody: string;
  commissionsCardCta: string;
};

export type FeatureCardContent = {
  title: string;
  body: string;
  cta: string;
};

export type PageIntroContent = {
  tag: string;
  title: string;
  body: string;
  ctaSecondary: string;
  ctaPrimary: string;
};

export type SectionIntroContent = {
  title: string;
  body: string;
};

/** Flat dictionary shape expected by HomePageContent — no nested objects */
export type HomePageContentDict = {
  heroTag: string;
  heroTitle: string;
  heroBody: string;
  ctaSecondary: string;
  ctaPrimary: string;
  servicesOverviewTitle: string;
  servicesOverviewBody: string;
  servicesCardTitle: string;
  servicesCardBody: string;
  servicesCardCta: string;
  commissionsCardTitle: string;
  commissionsCardBody: string;
  commissionsCardCta: string;
};