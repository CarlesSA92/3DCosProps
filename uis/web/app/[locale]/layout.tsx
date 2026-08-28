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

  return (
    <div className="relative min-h-screen bg-background">
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "3D CosProps",
            url: locale === "es" ? "https://3dcosprops.com/es" : "https://3dcosprops.com/en",
            logo: "https://3dcosprops.com/media/Background-Scales.png",
            description: dictionary.footer,
            sameAs: [
              "https://www.facebook.com/3DCosProps/",
              "https://twitter.com/3DCosprops",
              "https://www.instagram.com/3dcosprops/",
            ],
          }),
        }}
      />
    </div>
  );
}
