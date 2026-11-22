import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getShopDictionary } from "../../content";
import { isLocale, type Locale } from "../../i18n";
import { ShopPageContent } from "../../components/shop-page-content";

type ShopPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: ShopPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const title = locale === "es" ? "Tienda | 3D CosProps" : "Shop | 3D CosProps";
  const description =
    locale === "es"
      ? "Explora kits de impresión 3D, archivos digitales y réplicas terminadas de 3D CosProps."
      : "Explore 3D printing kits, digital files, and finished replicas from 3D CosProps.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/${locale}/shop`,
      siteName: "3D CosProps",
      locale: locale === "es" ? "es_ES" : "en_US",
      type: "website",
    },
    robots: { index: true, follow: true },
    alternates: {
      canonical: `/${locale}/shop`,
      languages: { en: "/en/shop", es: "/es/shop" },
    },
  };
}

export default async function ShopPage({ params }: ShopPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getShopDictionary(locale as Locale);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `https://3dcosprops.com/${locale}/shop`,
    name: locale === "es" ? "Tienda de 3D CosProps" : "3D CosProps Shop",
    description: dict.heroBody,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: dict.products.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Product",
          name: product.title,
          description: product.description,
          offers: {
            "@type": "Offer",
            priceCurrency: product.currency,
            price: (product.priceCents / 100).toFixed(2),
            availability: "https://schema.org/InStock",
          },
        },
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ShopPageContent dict={dict} locale={locale as Locale} />
    </>
  );
}