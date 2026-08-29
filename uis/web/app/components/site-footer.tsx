import type { NavItem } from "../../src/types/content";
import type { Locale } from "../i18n";
import {
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
  YouTubeIcon,
  SketchfabIcon,
} from "../../src/icons";

type SiteFooterProps = {
  locale: Locale;
  text: string;
  nav: NavItem[];
  footerNavTitle: string;
  footerFollowTitle: string;
  footerPrivacyLabel: string;
  footerLegalTitle: string;
  footerLegalNoticeLabel: string;
  footerCookiePolicyLabel: string;
  footerTermsLabel: string;
};

function footerHref(locale: Locale, href: string): string {
  if (href.startsWith("/")) {
    return `/${locale}${href}`;
  }
  return href;
}

export function SiteFooter({
  locale, text, nav, footerNavTitle, footerFollowTitle, footerPrivacyLabel,
  footerLegalTitle, footerLegalNoticeLabel, footerCookiePolicyLabel, footerTermsLabel,
}: SiteFooterProps) {
  return (
    <footer className="w-full py-16 md:py-24 px-6 md:px-8 grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 bg-background border-t border-white/10 opacity-80 hover:opacity-100 transition-opacity">
      <div className="col-span-1 flex flex-col gap-6 text-center md:text-left items-center md:items-start">
        <div className="mb-6">
          <span className="font-display text-3xl text-primary uppercase italic">3D CosProps</span>
        </div>
        <p className="font-body text-sm md:text-base text-text-dim max-w-xs">
          {text}
        </p>
      </div>
      <nav className="col-span-1 flex flex-col gap-4 font-body text-base text-center md:text-left items-center md:items-start" aria-label={footerNavTitle}>
        <h4 className="font-label text-xs text-primary uppercase tracking-widest mb-2">{footerNavTitle}</h4>
        {nav.map((item) => (
          <a key={item.href} className="text-text-dim hover:text-primary transition-colors" href={footerHref(locale, item.href)}>
            {item.label}
          </a>
        ))}
      </nav>
      <nav className="col-span-1 flex flex-col gap-4 font-body text-base text-center md:text-left items-center md:items-start" aria-label={footerLegalTitle}>
        <h4 className="font-label text-xs text-primary uppercase tracking-widest mb-2">{footerLegalTitle}</h4>
        <a className="text-text-dim hover:text-primary transition-colors" href={`/${locale}/legal-notice`}>{footerLegalNoticeLabel}</a>
        <a className="text-text-dim hover:text-primary transition-colors" href={`/${locale}/privacy-policy`}>{footerPrivacyLabel}</a>
        <a className="text-text-dim hover:text-primary transition-colors" href={`/${locale}/cookie-policy`}>{footerCookiePolicyLabel}</a>
        <a className="text-text-dim hover:text-primary transition-colors" href={`/${locale}/terms-conditions`}>{footerTermsLabel}</a>
      </nav>
      <div className="col-span-1 flex flex-col gap-6" aria-label={footerFollowTitle}>
        <h4 className="font-label text-xs text-primary uppercase tracking-widest mb-2">{footerFollowTitle}</h4>
        <div className="flex flex-wrap gap-5">
          <a
            aria-label="Facebook"
            className="flex items-center justify-center text-text-dim hover:text-primary transition-colors"
            href="https://www.facebook.com/3DCosProps/"
          >
            <span aria-hidden="true"><FacebookIcon className="w-10 h-10" /></span>
          </a>
          <a
            aria-label="Twitter"
            className="flex items-center justify-center text-text-dim hover:text-primary transition-colors"
            href="https://twitter.com/3DCosprops"
          >
            <span aria-hidden="true"><TwitterIcon className="w-10 h-10" /></span>
          </a>
          <a
            aria-label="Instagram"
            className="flex items-center justify-center text-text-dim hover:text-primary transition-colors"
            href="https://www.instagram.com/3dcosprops/"
          >
            <span aria-hidden="true"><InstagramIcon className="w-10 h-10" /></span>
          </a>
          <a
            aria-label="Sketchfab"
            className="flex items-center justify-center text-text-dim hover:text-primary transition-colors"
            href="https://sketchfab.com/3dcosprops"
          >
            <span aria-hidden="true"><SketchfabIcon className="w-10 h-10" /></span>
          </a>
          <a
            aria-label="YouTube"
            className="flex items-center justify-center text-text-dim hover:text-primary transition-colors"
            href="https://www.youtube.com/@3DCosProps"
          >
            <span aria-hidden="true"><YouTubeIcon className="w-10 h-10" /></span>
          </a>
        </div>
      </div>
    </footer>
  );
}
