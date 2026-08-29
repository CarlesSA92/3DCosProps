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

  const servicesDescription =
    locale === "es"
      ? "Servicios profesionales de modelado 3D, impresión 3D, acabados y pintura, fabricación de atrezzo, cosplay y consultoría."
      : "Professional 3D modeling, 3D printing, finishing and painting, prop fabrication, cosplay, and consultation services.";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    provider: {
      "@type": "Organization",
      name: "3D CosProps",
    },
    name:
      locale === "es"
        ? "Servicios de modelado e impresión 3D"
        : "3D Modeling and Printing Services",
    description: servicesDescription,
    areaServed: "Worldwide",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name:
        locale === "es"
          ? "Servicios de 3D CosProps"
          : "3D CosProps Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "3D Modeling" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "3D Printing" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Finishing & Painting" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Prop Fabrication" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Cosplay" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Consultation" } },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServicesPageContent dict={dict} />
    </>
  );
}