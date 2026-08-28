import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getServicesDictionary } from "../../content";
import { isLocale, type Locale } from "../../i18n";
import { ServicesPageContent } from "../../components/services-page-content";

type ServicesPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: ServicesPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) {
    return {};
  }

  const title =
    locale === "es"
      ? "Servicios | 3D CosProps"
      : "Services | 3D CosProps";

  const description =
    locale === "es"
      ? "Servicios profesionales de modelado 3D, impresión 3D, acabados y pintura, fabricación de atrezzo, cosplay y consultoría."
      : "Professional 3D modeling, 3D printing, finishing and painting, prop fabrication, cosplay, and consultation services.";

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/services`,
      languages: {
        en: "/en/services",
        es: "/es/services",
      },
    },
  };
}

export default async function ServicesPage({ params }: ServicesPageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dict = getServicesDictionary(locale as Locale);

  return <ServicesPageContent dict={dict} />;
}