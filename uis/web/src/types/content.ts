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
  footerLegalTitle: string;
  footerLegalNoticeLabel: string;
  footerCookiePolicyLabel: string;
  footerTermsLabel: string;
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
  gallery: GallerySection;
  servicesOverviewTitle: string;
  servicesOverviewBody: string;
  servicesCardTitle: string;
  servicesCardBody: string;
  servicesCardCta: string;
  commissionsCardTitle: string;
  commissionsCardBody: string;
  commissionsCardCta: string;
};

/** A single slide in the gallery carousel */
export type CarouselSlide = {
  id: string;
  /** Future: real image path e.g. "/media/gallery/prop-helmet.webp" */
  src?: string;
  /** Alt text for screen readers */
  alt: string;
  /** Short label overlay (e.g. "Props", "Cosplay") */
  label: string;
  /** CSS gradient for placeholder visuals (used until real images are provided) */
  placeholderGradient: string;
};

/** Gallery carousel section data */
export type GallerySection = {
  title: string;
  slides: CarouselSlide[];
};

/** A single service offering */
export type ServiceItem = {
  id: string;
  subtitle: string;
  title: string;
  body: string;
  features: string[];
};

/** Flat dictionary shape expected by HomePageContent — no nested objects */
export type HomePageContentDict = {
  heroTag: string;
  heroTitle: string;
  heroBody: string;
  ctaSecondary: string;
  ctaPrimary: string;
  gallery: GallerySection;
  servicesOverviewTitle: string;
  servicesOverviewBody: string;
  servicesCardTitle: string;
  servicesCardBody: string;
  servicesCardCta: string;
  commissionsCardTitle: string;
  commissionsCardBody: string;
  commissionsCardCta: string;
};

/** Content dictionary for the Services page */
export type ServicesDictionary = PageContent & {
  heroTag: string;
  heroTitle: string;
  heroBody: string;
  ctaPrimary: string;
  ctaSecondary: string;
  services: ServiceItem[];
  ctaTitle: string;
  ctaBody: string;
  ctaLabel: string;
};

/** A single project item in the gallery */
export type ProjectItem = {
  id: string;
  title: string;
  description: string;
  category: "anime" | "games" | "movies";
  image: {
    /** Placeholder gradient until real images are provided */
    gradient: string;
    alt: string;
  };
};

/** Projects page dictionary */
export type ProjectsDictionary = PageContent & {
  heroTag: string;
  heroTitle: string;
  heroBody: string;
  heroCtaPrimary: string;
  heroCtaSecondary: string;
  galleryTitle: string;
  filterAll: string;
  filterAnime: string;
  filterGames: string;
  projects: ProjectItem[];
  loadMore: string;
  noMoreProjects: string;
};