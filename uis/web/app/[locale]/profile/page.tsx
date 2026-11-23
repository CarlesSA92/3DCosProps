import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProfilePageContent } from "../../components/profile-page-content";
import { isLocale } from "../../i18n";

type ProfilePageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: ProfilePageProps): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "es" ? "Mi perfil" : "My profile",
    robots: { index: false, follow: false },
  };
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <ProfilePageContent locale={locale} />;
}