import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getShopDictionary } from "../../../content";
import { isLocale, locales } from "../../../i18n";
import { ProductDetailPageContent } from "../../../components/product-detail-page-content";

type ProductPageProps = { params: Promise<{ locale: string; productId: string }> };

export function generateStaticParams() {
  return locales.flatMap((locale) => getShopDictionary(locale).products.map((product) => ({ locale, productId: product.id })));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { locale, productId } = await params;
  if (!isLocale(locale)) return {};
  const product = getShopDictionary(locale).products.find((item) => item.id === productId);
  if (!product) return {};
  const path = `/${locale}/shop/${product.id}`;
  return {
    title: `${product.title} | 3D CosProps`,
    description: product.description,
    robots: { index: false, follow: true },
    alternates: { canonical: path, languages: { es: `/es/shop/${product.id}`, en: `/en/shop/${product.id}` } },
    openGraph: { title: product.title, description: product.description, url: path, siteName: "3D CosProps", locale: locale === "es" ? "es_ES" : "en_US", type: "website" },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { locale, productId } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getShopDictionary(locale);
  const product = dict.products.find((item) => item.id === productId);
  if (!product) notFound();
  return <ProductDetailPageContent key={`${locale}-${product.id}`} product={product} dict={dict} locale={locale} />;
}