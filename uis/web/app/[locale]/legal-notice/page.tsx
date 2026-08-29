import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isLocale, type Locale } from "../../i18n";
import { legalDictionaries } from "../../content/legal-content";
import { LegalPage } from "../../../src/ui/legal-page";

type LegalNoticePageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: LegalNoticePageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const title = locale === "es" ? "Aviso Legal | 3D CosProps" : "Legal Notice | 3D CosProps";
  const description = locale === "es"
    ? "Aviso Legal del sitio web 3D Cosprops — información general, condiciones de uso y propiedad intelectual."
    : "Legal Notice for 3D CosProps website — general information, terms of use and intellectual property.";

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/legal-notice`,
      languages: { en: "/en/legal-notice", es: "/es/legal-notice" },
    },
  };
}

export default async function LegalNoticePage({ params }: LegalNoticePageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const document = legalDictionaries[locale as Locale].legalNotice;
  return <LegalPage document={document} />;
}