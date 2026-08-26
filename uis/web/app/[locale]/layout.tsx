import type { ReactNode } from "react";
import { notFound } from "next/navigation";

import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
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
        className="pointer-events-none fixed inset-0 -z-10 bg-[url('/media/Background-Scales.png')] bg-repeat opacity-[0.04]"
        aria-hidden="true"
      />
      <SiteHeader
        locale={locale as Locale}
        languageLabel={dictionary.languageLabel}
        nav={dictionary.nav}
      />
      {children}
      <SiteFooter
        text={dictionary.footer}
        nav={dictionary.nav}
        footerNavTitle={dictionary.footerNavTitle}
        footerFollowTitle={dictionary.footerFollowTitle}
        footerPrivacyLabel={dictionary.footerPrivacyLabel}
      />
    </div>
  );
}
