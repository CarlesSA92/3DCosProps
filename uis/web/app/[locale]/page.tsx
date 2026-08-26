import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getDictionary } from "../content";
import { isLocale, type Locale } from "../i18n";
import { HomePageContent } from "../components/home-page-content";

type LocalePageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) {
    return {};
  }

  const title =
    locale === "es"
      ? "Inicio | Estudio premium de modelado e impresión 3D"
      : "Home | Premium 3D modeling and printing studio";

  const description =
    locale === "es"
      ? "Estudio de modelado e impresión 3D para props de alta fidelidad, encargos personalizados y acabados profesionales."
      : "3D modeling and printing studio for high-fidelity props, custom commissions, and professional finishing.";

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        es: "/es",
      },
    },
  };
}

export default async function LocaleHomePage({ params }: LocalePageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dict = getDictionary(locale as Locale);

  return <HomePageContent dict={dict} />;
}
