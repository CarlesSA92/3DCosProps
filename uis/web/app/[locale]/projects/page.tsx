import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getProjectsDictionary } from "../../content";
import { isLocale, type Locale } from "../../i18n";
import { ProjectsPageContent } from "../../components/projects-page-content";

type ProjectsPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: ProjectsPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) {
    return {};
  }

  const title =
    locale === "es"
      ? "Proyectos | 3D CosProps"
      : "Projects | 3D CosProps";

  const description =
    locale === "es"
      ? "Galería de proyectos de modelado e impresión 3D — réplicas de anime, videojuegos y cine."
      : "3D modeling and printing project gallery — anime, game, and movie replicas.";

  const keywords =
    locale === "es"
      ? "3D, proyectos, modelado, impresión 3D, réplicas, anime, videojuegos, cine, artesanía, coleccionables"
      : "3D, projects, modeling, 3D printing, replicas, anime, video games, movies, craftsmanship, collectibles";

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url: `/${locale}/projects`,
      siteName: "3D CosProps",
      locale: locale === "es" ? "es_ES" : "en_US",
      type: "website",
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `/${locale}/projects`,
      languages: {
        en: "/en/projects",
        es: "/es/projects",
      },
    },
  };
}

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dict = getProjectsDictionary(locale as Locale);

  const projectsDescription =
    locale === "es"
      ? "Galería de proyectos de modelado e impresión 3D — réplicas de anime, videojuegos y cine."
      : "3D modeling and printing project gallery — anime, game, and movie replicas.";

  const projects = getProjectsDictionary(locale as Locale).projects;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `https://3dcosprops.com/${locale}/projects`,
    name:
      locale === "es" ? "Proyectos de 3D CosProps" : "3D CosProps Projects",
    description: projectsDescription,
    provider: {
      "@type": "Organization",
      name: "3D CosProps",
    },
    mainEntity: projects.map((p) => ({
      "@type": "CreativeWork",
      name: p.title,
      description: p.description,
      keywords: p.category,
      image: p.image.alt,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProjectsPageContent dict={dict} locale={locale} />
    </>
  );
}