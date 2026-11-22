import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getCommissionPageDictionary } from "../../content/commission-content";
import { isLocale, type Locale } from "../../i18n";
import { CommissionsPageContent } from "../../components/commissions-page-content";

type CommissionsPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: CommissionsPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const title = locale === "es" ? "Encargos personalizados | 3D CosProps" : "Custom Commissions | 3D CosProps";
  const description = locale === "es"
    ? "Cuéntanos tu idea para una pieza personalizada. Revisa el proceso de presupuesto, aprobación y pago antes de iniciar tu encargo."
    : "Tell us about your custom prop or cosplay project. Learn how project reviews, quotes, approval, and payment work before commissioning. ";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/${locale}/commissions`,
      siteName: "3D CosProps",
      locale: locale === "es" ? "es_ES" : "en_US",
      type: "website",
    },
    alternates: {
      canonical: `/${locale}/commissions`,
      languages: {
        en: "/en/commissions",
        es: "/es/commissions",
      },
    },
  };
}

export default async function CommissionsPage({ params }: CommissionsPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return <CommissionsPageContent dict={getCommissionPageDictionary(locale as Locale)} />;
}