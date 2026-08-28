import type { ReactNode } from "react";
import { notFound } from "next/navigation";

import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import { ScalesBackground } from "../../src/ui/scales-background";
import { getDictionary } from "../content";
import { isLocale, locales, type Locale } from "../i18n";

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dictionary = getDictionary(locale as Locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "3D CosProps",
    url: `https://3dcosprops.com/${locale}`,
    logo: "https://3dcosprops.com/media/Icons/Logo-3DCosProps.png",
    description:
      locale === "es"
        ? "Estudio de modelado e impresión 3D para props de alta fidelidad, encargos personalizados y acabados profesionales."
        : "High-fidelity 3D modeling and printing studio. Premium replicas, production-ready craftsmanship, and custom commissions.",
    sameAs: [
      "https://www.facebook.com/3DCosProps/",
      "https://twitter.com/3DCosprops",
      "https://www.instagram.com/3dcosprops/",
      "https://www.youtube.com/@3DCosProps",
      "https://sketchfab.com/3dcosprops",
    ],
  };

  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Skip-to-content link for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-background focus:font-label focus:text-sm focus:uppercase focus:tracking-widest focus:rounded focus:outline-none"
      >
        {locale === "es" ? "Saltar al contenido principal" : "Skip to main content"}
      </a>
      <div className="relative min-h-screen bg-background" id="main-content">
        <div
          className="pointer-events-none fixed inset-0 -z-10"
          aria-hidden="true"
        >
          <ScalesBackground opacity={0.04} />
        </div>
        <SiteHeader
          locale={locale as Locale}
          languageLabel={dictionary.languageLabel}
          nav={dictionary.nav}
        />
        {children}
        <SiteFooter
          locale={locale as Locale}
          text={dictionary.footer}
          nav={dictionary.nav}
          footerNavTitle={dictionary.footerNavTitle}
          footerFollowTitle={dictionary.footerFollowTitle}
          footerPrivacyLabel={dictionary.footerPrivacyLabel}
        />
      </div>
    </>
  );
}
