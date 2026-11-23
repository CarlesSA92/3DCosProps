import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isLocale, type Locale } from "../../i18n";
import { legalDictionaries } from "../../content/legal-content";
import { LegalPage } from "../../../src/ui/legal-page";

type CookiePolicyPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: CookiePolicyPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const title = locale === "es" ? "Política de Cookies | 3D CosProps" : "Cookie Policy | 3D CosProps";
  const description = locale === "es"
    ? "Política de Cookies de 3D Cosprops — información sobre el uso de cookies y tecnologías similares."
    : "Cookie Policy of 3D CosProps — information about the use of cookies and similar technologies.";

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/cookie-policy`,
      languages: { en: "/en/cookie-policy", es: "/es/cookie-policy" },
    },
  };
}

export default async function CookiePolicyPage({ params }: CookiePolicyPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const document = legalDictionaries[locale as Locale].cookiePolicy;
  return <LegalPage document={document} />;
}