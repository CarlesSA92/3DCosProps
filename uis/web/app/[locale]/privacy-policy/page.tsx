import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isLocale, type Locale } from "../../i18n";
import { legalDictionaries } from "../../content/legal-content";
import { LegalPage } from "../../../src/ui/legal-page";

type PrivacyPolicyPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PrivacyPolicyPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const title = locale === "es" ? "Política de Privacidad | 3D CosProps" : "Privacy Policy | 3D CosProps";
  const description = locale === "es"
    ? "Política de Privacidad de 3D Cosprops — información sobre el tratamiento de datos personales."
    : "Privacy Policy of 3D CosProps — information about the processing of personal data.";

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/privacy-policy`,
      languages: { en: "/en/privacy-policy", es: "/es/privacy-policy" },
    },
  };
}

export default async function PrivacyPolicyPage({ params }: PrivacyPolicyPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const document = legalDictionaries[locale as Locale].privacyPolicy;
  return <LegalPage document={document} />;
}