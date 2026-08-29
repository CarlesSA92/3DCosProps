import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isLocale, type Locale } from "../../i18n";
import { legalDictionaries } from "../../content/legal-content";
import { LegalPage } from "../../../src/ui/legal-page";

type TermsConditionsPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: TermsConditionsPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const title = locale === "es"
    ? "Términos y Condiciones | 3D CosProps"
    : "Terms & Conditions | 3D CosProps";
  const description = locale === "es"
    ? "Términos y Condiciones de uso y compra de 3D Cosprops."
    : "Terms and Conditions of use and purchase for 3D CosProps.";

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/terms-conditions`,
      languages: { en: "/en/terms-conditions", es: "/es/terms-conditions" },
    },
  };
}

export default async function TermsConditionsPage({ params }: TermsConditionsPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const document = legalDictionaries[locale as Locale].termsConditions;
  return <LegalPage document={document} />;
}