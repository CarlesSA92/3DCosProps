import type { Locale } from "./i18n";
import type { NavItem, HomeDictionary } from "../src/types/content";

const dictionaries: Record<Locale, HomeDictionary> = {
  en: {
    languageLabel: "Language",
    nav: [
      { href: "/", label: "Home" },
      { href: "#services", label: "Services" },
      { href: "#projects", label: "Projects" },
      { href: "#shop", label: "Shop" },
      { href: "#commissions", label: "Commissions" },
    ],
    ctaPrimary: "Start Commission",
    ctaSecondary: "Explore Projects",
    heroTag: "High-fidelity replicas",
    heroTitle: "Transform fiction into <gold>reality!</gold> ",
    heroBody:
      "Specialists in cosplays, replicas and atrezzo. We bring your most ambitious projects to life with precision 3D printing and master craftsmanship.",
    capabilitiesTitle: "Studio Capabilities",
    capabilities: [
      {
        title: "3D Modeling",
        body: "Custom digital sculpting and hard-surface workflows tailored for fidelity and durability.",
      },
      {
        title: "Print & Production",
        body: "FDM and resin process pipelines calibrated for clean tolerances and repeatable quality.",
      },
      {
        title: "Finishing",
        body: "Assembly, surface preparation, and premium final treatment for showcase-level results.",
      },
    ],
    projectsTitle: "Featured Work",
    projectsBody:
      "A curated glimpse into premium replicas and custom builds. Full Projects and Shop views are scheduled for next phases.",
    projectsChips: ["Anime", "Game", "Movie", "Collector"],
    commissionTitle: "Bring Your Concept To The Armory",
    commissionBody:
      "Commission intake and progress tracking are already planned in the roadmap. Start with a concept and we will shape the production path.",
    footer: "3D CosProps. High-Fidelity 3D Craftsmanship.",
    footerNavTitle: "Navigation",
    footerFollowTitle: "Follow Us",
    footerPrivacyLabel: "Privacy Policy",
    gallery: {
      title: "Gallery",
      slides: [
        {
          id: "props",
          alt: "High-fidelity prop replicas showcase",
          label: "Props",
          placeholderGradient:
            "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
        },
        {
          id: "cosplay",
          alt: "Cosplay armor and accessories showcase",
          label: "Cosplay",
          placeholderGradient:
            "linear-gradient(135deg, #2d1b3d 0%, #4a1942 50%, #1a0a1e 100%)",
        },
        {
          id: "printing",
          alt: "3D printing in progress showcase",
          label: "3D Printing",
          placeholderGradient:
            "linear-gradient(135deg, #1a3a1a 0%, #2d5a2d 50%, #0d1a0d 100%)",
        },
        {
          id: "finishing",
          alt: "Professional finishing and painting showcase",
          label: "Finishing",
          placeholderGradient:
            "linear-gradient(135deg, #3a2a1a 0%, #5a4a2d 50%, #2a1a0d 100%)",
        },
        {
          id: "atelier",
          alt: "Studio workspace showcase",
          label: "Atelier",
          placeholderGradient:
            "linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 50%, #3a3a3a 100%)",
        },
      ],
    },
    servicesOverviewTitle: "Do you have a project but don't know how to start?",
    servicesOverviewBody:
      "3D CosProps will help you make your project a reality. Explore our services to see what we can do, or if you already have an idea in mind, send us a commission request. We will contact you to confirm your project and solve any doubts.",
    servicesCardTitle: "Services",
    servicesCardBody:
      "Discover our 3D modeling, printing, and finishing services designed to create production-ready props.",
    servicesCardCta: "View Services",
    commissionsCardTitle: "Commissions",
    commissionsCardBody:
      "Have a specific prop in mind? Let us build it from scratch to your exact specifications.",
    commissionsCardCta: "Request Quote",
  },
  es: {
    languageLabel: "Idioma",
    nav: [
      { href: "/", label: "Inicio" },
      { href: "#services", label: "Servicios" },
      { href: "#projects", label: "Proyectos" },
      { href: "#shop", label: "Tienda" },
      { href: "#commissions", label: "Encargos" },
    ],
    ctaPrimary: "Iniciar Encargo",
    ctaSecondary: "Ver Portfolio",
    heroTag: "Réplicas de alta fidelidad",
    heroTitle: "¡Convierte la ficción en <gold>realidad!</gold> ",
    heroBody:
      "Especialistas en cosplays, réplicas y atrezzo. Damos vida a tus proyectos más ambiciosos con precisión 3D y artesanía de maestro.",
    capabilitiesTitle: "Capacidades Del Estudio",
    capabilities: [
      {
        title: "Modelado 3D",
        body: "Esculpido digital y hard-surface personalizados para mantener fidelidad visual y resistencia.",
      },
      {
        title: "Impresión y Producción",
        body: "Flujos FDM y resina calibrados para tolerancias limpias y calidad consistente.",
      },
      {
        title: "Acabados",
        body: "Montaje, preparacion de superficie y tratamiento final premium para resultados de exposicion.",
      },
    ],
    projectsTitle: "Trabajo Destacado",
    projectsBody:
      "Una vista previa de replicas premium y construcciones personalizadas. Las vistas completas de Proyectos y Tienda llegan en siguientes fases.",
    projectsChips: ["Anime", "Videojuego", "Cine", "Coleccion"],
    commissionTitle: "Lleva Tu Concepto Al Armory",
    commissionBody:
      "La captación de encargos y su seguimiento ya están planificados en la hoja de ruta. Empieza con una idea y definimos la ruta de producción.",
    footer: "3D CosProps. Artesania 3D de alta fidelidad.",
    footerNavTitle: "Navegación",
    footerFollowTitle: "Síguenos",
    footerPrivacyLabel: "Política de Privacidad",
    gallery: {
      title: "Galería",
      slides: [
        {
          id: "props",
          alt: "Muestra de réplicas de atrezo de alta fidelidad",
          label: "Atrezo",
          placeholderGradient:
            "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
        },
        {
          id: "cosplay",
          alt: "Muestra de armaduras y accesorios de cosplay",
          label: "Cosplay",
          placeholderGradient:
            "linear-gradient(135deg, #2d1b3d 0%, #4a1942 50%, #1a0a1e 100%)",
        },
        {
          id: "printing",
          alt: "Muestra de impresión 3D en proceso",
          label: "Impresión 3D",
          placeholderGradient:
            "linear-gradient(135deg, #1a3a1a 0%, #2d5a2d 50%, #0d1a0d 100%)",
        },
        {
          id: "finishing",
          alt: "Muestra de acabados y pintura profesional",
          label: "Acabados",
          placeholderGradient:
            "linear-gradient(135deg, #3a2a1a 0%, #5a4a2d 50%, #2a1a0d 100%)",
        },
        {
          id: "atelier",
          alt: "Muestra del espacio de trabajo del estudio",
          label: "Taller",
          placeholderGradient:
            "linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 50%, #3a3a3a 100%)",
        },
      ],
    },
    servicesOverviewTitle: "¿Tienes un proyecto pero no sabes por dónde empezar?",
    servicesOverviewBody:
      "3D CosProps te ayudará a hacer realidad tu proyecto. Echa un vistazo a nuestros servicios para ver qué podemos ofrecerte o, si ya tienes una idea en mente, envíanos una solicitud de encargo. Nos pondremos en contacto contigo para confirmar tu proyecto y resolver cualquier duda.",
    servicesCardTitle: "Servicios",
    servicesCardBody:
      "Descubre nuestros servicios de modelado, impresión y acabado en 3D, diseñados para crear atrezo listo para la producción.",
    servicesCardCta: "Ver Más",
    commissionsCardTitle: "Encargos",
    commissionsCardBody:
      "¿Tienes en mente un atrezo concreto? Déjanos fabricarlo desde cero según tus especificaciones exactas.",
    commissionsCardCta: "Iniciar Encargo",
  },
};

export function getDictionary(locale: Locale): HomeDictionary {
  return dictionaries[locale];
}
