import type { Locale } from "./i18n";
import type { NavItem, HomeDictionary, ServicesDictionary, ProjectsDictionary } from "../src/types/content";

const dictionaries: Record<Locale, HomeDictionary> = {
  en: {
    languageLabel: "Language",
    nav: [
      { href: "/", label: "Home" },
      { href: "/services", label: "Services" },
      { href: "/projects", label: "Projects" },
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
    footerLegalTitle: "Legal",
    footerLegalNoticeLabel: "Legal Notice",
    footerCookiePolicyLabel: "Cookie Policy",
    footerTermsLabel: "Terms & Conditions",
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
    servicesOverviewTitle: "Do you have a <gold>project</gold> but don't know how to <gold>start</gold>?",
    servicesOverviewBody:
      "3D CosProps will help you make your project a reality. Explore our services to see what we can do, or if you already have an idea in mind, send us a commission request. We will contact you to confirm your project and solve any doubts.",
    servicesCardTitle: "Services",
    servicesCardBody:
      "Discover our 3D modeling, printing, and finishing services designed to create production-ready props.",
    servicesCardCta: "View Services",
    commissionsCardTitle: "Commissions",
    commissionsCardBody:
      "Do you have a specific project in mind? Let us build it from scratch to your exact specifications.",
    commissionsCardCta: "Request Quote",
  },
  es: {
    languageLabel: "Idioma",
    nav: [
      { href: "/", label: "Inicio" },
      { href: "/services", label: "Servicios" },
      { href: "/projects", label: "Proyectos" },
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
    footerLegalTitle: "Legal",
    footerLegalNoticeLabel: "Aviso Legal",
    footerCookiePolicyLabel: "Política de Cookies",
    footerTermsLabel: "Términos y Condiciones",
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
    servicesOverviewTitle: "¿Tienes un <gold>proyecto</gold> pero no sabes por dónde <gold>empezar</gold>?",
    servicesOverviewBody:
      "3D CosProps te ayudará a hacer realidad tu proyecto. Echa un vistazo a nuestros servicios para ver qué podemos ofrecerte o, si ya tienes una idea en mente, envíanos una solicitud de encargo. Nos pondremos en contacto contigo para confirmar tu proyecto y resolver cualquier duda.",
    servicesCardTitle: "Servicios",
    servicesCardBody:
      "Descubre nuestros servicios de modelado, impresión y acabado en 3D, diseñados para crear tus proyectos al más mínimo detalle.",
    servicesCardCta: "Ver Más",
    commissionsCardTitle: "Encargos",
    commissionsCardBody:
      "¿Tienes en mente un proyecto concreto? Déjanos fabricarlo desde cero según tus especificaciones exactas.",
    commissionsCardCta: "Iniciar Encargo",
  },
};

const servicesDictionaries: Record<Locale, ServicesDictionary> = {
  en: {
    languageLabel: "Language",
    nav: [
      { href: "/", label: "Home" },
      { href: "/services", label: "Services" },
      { href: "/projects", label: "Projects" },
      { href: "#shop", label: "Shop" },
      { href: "#commissions", label: "Commissions" },
    ],
    ctaPrimary: "Start Commission",
    ctaSecondary: "Explore Projects",
    heroTag: "Our expertise",
    heroTitle: "From Concept to <gold>Reality</gold>",
    heroBody:
      "From the first sketch to the final coat of paint — we partner with you at every stage of production. Each service is designed for precision, durability, and showcase-level quality.",
    services: [
      {
        id: "consultation",
        subtitle: "PLANNING",
        title: "Let's Plan Your <gold>Project</gold>",
        body: "Not sure where to start? We help you define the best approach for your project, from materials and production methods to budget and timeline.",
        features: [
          "Project scope, planning & material consultation",
          "Budget & production timeline",
        ],
      },
      {
        id: "cosplay",
        subtitle: "CONCEPT",
        title: "<gold>Blueprints</gold> & Concept Design",
        body: "Before a creation becomes reality, it needs a plan. We develop **2D sketches, technical blueprints, and construction plans** that translate an idea into a clear and achievable build.\n\nFrom the overall design to individual components, every detail is mapped out to guide the **modeling, fabrication, assembly, and finishing** process.",
        features: [
          "Concept Sketches & Technical Drawings",
          "Construction Plans & Part Breakdown",
        ],
      },
      {
        id: "modeling",
        subtitle: "3D MODELING",
        title: "We <gold>Design</gold> Your Vision",
        body: "Every great piece starts with a great model. We create and adapt 3D models from **concept art, game assets, illustrations, references, or your own ideas**, preparing each piece specifically for real-world production.\n\nWe carefully consider **proportions, details, assembly, and wearability** to ensure your model looks right and works in the real world.",
        features: [
          "Custom 3D Modeling",
          "Model Adaptation & Optimization",
        ],
      },
      {
        id: "printing",
        subtitle: "3D PRINTING",
        title: "We <gold>Print</gold> the Details",
        body: "We turn digital designs into physical pieces using high-precision 3D printing. Each project is matched with the right **technology, material, and print settings** according to its size, detail, and intended use.\n\nFrom helmets and armor to weapons, accessories, and large-scale props, we aim for the perfect balance of **strength, detail, and quality**.",
        features: [
          "FDM & Resin Printing",
          "Large-Format & High-Detail Parts",
        ],
      },
      {
        id: "finishing",
        subtitle: "FINISHING PROCESS",
        title: "The <gold>Finish</gold> Makes the Difference",
        body: "Printing is only the beginning. Through **sanding, priming, assembly, painting, and weathering**, we transform raw prints into finished pieces worthy of the character they represent.\n\nEvery surface is carefully prepared to hide print lines and recreate the look of materials such as **metal, wood, leather, stone, or futuristic alloys**.",
        features: [
          "Surface Preparation & Assembly",
          "Painting, Weathering & Effects",
        ],
      },
      {
        id: "prop-fabrication",
        subtitle: "RESULT",
        title: "We Build the <gold>Complete Piece</gold>",
        body: "We can take your project from the first digital model to the finished piece. By combining **3D printing with electronics, lighting, mechanisms, structural elements, and traditional crafting techniques**, we create complete, convention-ready creations.\n\nEvery build is designed to balance **appearance, durability, functionality, and comfort**, while paying attention to every detail.",
        features: [
          "Electronics, LEDs & Mechanisms",
          "Structural Reinforcement & Assembly",
        ],
      },
    ],
    ctaTitle: "Ready to forge your <gold>legend</gold>?",
    ctaBody:
      "Tell us what you have in mind. Whether you have a finished design, a collection of references, or simply an idea, we'll help turn it into a real, wearable piece.\n\nWe'll review your project, discuss the best approach, and provide a **custom quote tailored to your needs**.\n\n**Let's build your next cosplay, prop, or set piece together.**",
    ctaLabel: "Request a Quote",
    footer: "3D CosProps. High-Fidelity 3D Craftsmanship.",
    footerNavTitle: "Navigation",
    footerFollowTitle: "Follow Us",
    footerPrivacyLabel: "Privacy Policy",
    footerLegalTitle: "Legal",
    footerLegalNoticeLabel: "Legal Notice",
    footerCookiePolicyLabel: "Cookie Policy",
    footerTermsLabel: "Terms & Conditions",
  },
  es: {
    languageLabel: "Idioma",
    nav: [
      { href: "/", label: "Inicio" },
      { href: "/services", label: "Servicios" },
      { href: "/projects", label: "Proyectos" },
      { href: "#shop", label: "Tienda" },
      { href: "#commissions", label: "Encargos" },
    ],
    ctaPrimary: "Iniciar Encargo",
    ctaSecondary: "Ver Portfolio",
    heroTag: "Nuestra experiencia",
    heroTitle: "Del Concepto a la <gold>Realidad</gold>",
    heroBody:
      "Desde el primer boceto hasta la última capa de pintura — te acompañamos en cada etapa de producción. Cada servicio está diseñado para ofrecer precisión, durabilidad y calidad de exposición.",
    services: [
      {
        id: "consultation",
        subtitle: "PLANIFICACIÓN",
        title: "Planifiquemos tu <gold>Proyecto</gold>",
        body: "¿No sabes por dónde empezar? Te ayudamos a definir el mejor enfoque para tu proyecto, desde materiales y métodos de producción hasta presupuesto y cronograma.",
        features: [
          "Alcance del proyecto, planificación y consultoría",
          "Presupuesto y cronograma de producción",
        ],
      },
      {
        id: "cosplay",
        subtitle: "CONCEPTO",
        title: "<gold>Planos</gold> y Diseño Conceptual",
        body: "Antes de que una creación se convierta en realidad, necesita un plan. Desarrollamos **bocetos 2D, planos técnicos y planos de construcción** que traducen una idea en una construcción clara y alcanzable.\n\nDesde el diseño general hasta los componentes individuales, cada detalle se mapea para guiar el proceso de **modelado, fabricación, montaje y acabado**.",
        features: [
          "Bocetos Conceptuales y Planos Técnicos",
          "Planos de Construcción y Desglose de Piezas",
        ],
      },
      {
        id: "modeling",
        subtitle: "MODELADO 3D",
        title: "<gold>Diseñamos</gold> tu Visión",
        body: "Toda gran pieza comienza con un gran modelo. Creamos y adaptamos modelos 3D a partir de **concept art, assets de videojuegos, ilustraciones, referencias o tus propias ideas**, preparando cada pieza específicamente para la producción en el mundo real.\n\nConsideramos cuidadosamente **proporciones, detalles, ensamblaje y portabilidad** para asegurar que tu modelo se vea bien y funcione en el mundo real.",
        features: [
          "Modelado 3D Personalizado",
          "Adaptación y Optimización de Modelos",
        ],
      },
      {
        id: "printing",
        subtitle: "IMPRESIÓN 3D",
        title: "<gold>Imprimimos</gold> los Detalles",
        body: "Convertimos diseños digitales en piezas físicas mediante impresión 3D de alta precisión. Cada proyecto se empareja con la **tecnología, material y configuración de impresión** adecuados según su tamaño, detalle y uso previsto.\n\nDesde cascos y armaduras hasta armas, accesorios y atrezzo de gran formato, buscamos el equilibrio perfecto entre **resistencia, detalle y calidad**.",
        features: [
          "Impresión FDM y Resina",
          "Piezas de Gran Formato y Alto Detalle",
        ],
      },
      {
        id: "finishing",
        subtitle: "ACABADOS",
        title: "El <gold>Acabado</gold> Marca la Diferencia",
        body: "La impresión es solo el comienzo. Mediante **lijado, imprimación, montaje, pintura y desgaste**, transformamos piezas impresas en piezas terminadas dignas del personaje que representan.\n\nCada superficie se prepara cuidadosamente para ocultar las líneas de impresión y recrear el aspecto de materiales como **metal, madera, cuero, piedra o aleaciones futuristas**.",
        features: [
          "Preparación de Superficie y Montaje",
          "Pintura, Desgaste y Efectos",
        ],
      },
      {
        id: "prop-fabrication",
        subtitle: "RESULTADO",
        title: "Construimos la <gold>Pieza Completa</gold>",
        body: "Podemos llevar tu proyecto desde el primer modelo digital hasta la pieza terminada. Combinando **impresión 3D con electrónica, iluminación, mecanismos, elementos estructurales y técnicas artesanales tradicionales**, creamos creaciones completas listas para convenciones.\n\nCada construcción está diseñada para equilibrar **apariencia, durabilidad, funcionalidad y comodidad**, prestando atención a cada detalle.",
        features: [
          "Electrónica, LEDs y Mecanismos",
          "Refuerzo Estructural y Montaje",
        ],
      },
    ],
    ctaTitle: "¿Listo para forjar tu <gold>leyenda</gold>?",
    ctaBody:
      "Cuéntanos qué tienes en mente. Ya sea que tengas un diseño terminado, una colección de referencias o simplemente una idea, te ayudaremos a convertirla en una pieza real y usable.\n\nRevisaremos tu proyecto, discutiremos el mejor enfoque y te proporcionaremos un **presupuesto personalizado adaptado a tus necesidades**.\n\n**Construyamos juntos tu próximo cosplay, atrezzo o pieza de escenario.**",
    ctaLabel: "Solicitar Presupuesto",
    footer: "3D CosProps. Artesanía 3D de alta fidelidad.",
    footerNavTitle: "Navegación",
    footerFollowTitle: "Síguenos",
    footerPrivacyLabel: "Política de Privacidad",
    footerLegalTitle: "Legal",
    footerLegalNoticeLabel: "Aviso Legal",
    footerCookiePolicyLabel: "Política de Cookies",
    footerTermsLabel: "Términos y Condiciones",
  },
};

const projectsDictionaries: Record<Locale, ProjectsDictionary> = {
  en: {
    languageLabel: "Language",
    nav: [
      { href: "/", label: "Home" },
      { href: "/services", label: "Services" },
      { href: "/projects", label: "Projects" },
      { href: "#shop", label: "Shop" },
      { href: "#commissions", label: "Commissions" },
    ],
    ctaPrimary: "Start Commission",
    ctaSecondary: "Explore Projects",
    footer: "3D CosProps. High-Fidelity 3D Craftsmanship.",
    footerNavTitle: "Navigation",
    footerFollowTitle: "Follow Us",
    footerPrivacyLabel: "Privacy Policy",
    footerLegalTitle: "Legal",
    footerLegalNoticeLabel: "Legal Notice",
    footerCookiePolicyLabel: "Cookie Policy",
    footerTermsLabel: "Terms & Conditions",
    heroTag: "Our portfolio",
    heroTitle: "Forged <gold>Projects</gold>",
    heroBody:
      "A showcase of our finest creations — from anime replica props to game-inspired collectibles. Each piece reflects our commitment to fidelity and craftsmanship.",
    heroCtaPrimary: "Request Commission",
    heroCtaSecondary: "View Services",
    galleryTitle: "Project Gallery",
    filterAll: "All",
    filterAnime: "Anime",
    filterGames: "Games",
    loadMore: "Load More Projects",
    noMoreProjects: "No more projects.",
    projects: [
      {
        id: "tanjiro-sword",
        title: "Tanjiro's Nichirin Blade",
        description: "Handcrafted replica of Tanjiro Kamado's sword from Demon Slayer, finished with a polished steel effect and detailed tsuba.",
        category: "anime",
        image: {
          gradient: "linear-gradient(135deg, #1a2a1a 0%, #2d4a2d 50%, #1a3a1a 100%)",
          alt: "Tanjiro's Nichirin Blade replica",
        },
      },
      {
        id: "mando-helmet",
        title: "Mandalorian Helmet",
        description: "Premium beskar-inspired Mandalorian helmet with weathering effects, LED lighting, and adjustable interior padding.",
        category: "games",
        image: {
          gradient: "linear-gradient(135deg, #2a2a2a 0%, #4a4a4a 50%, #3a3a3a 100%)",
          alt: "Mandalorian helmet replica",
        },
      },
      {
        id: "master-sword",
        title: "Master Sword",
        description: "Full-scale replica of the Legend of Zelda Master Sword with metallic finish, leather-wrapped grip, and detailed engravings.",
        category: "games",
        image: {
          gradient: "linear-gradient(135deg, #1a1a3a 0%, #2a2a5a 50%, #1a1a4a 100%)",
          alt: "Master Sword replica from Legend of Zelda",
        },
      },
      {
        id: "nezuko-bamboo",
        title: "Nezuko's Bamboo Muzzle",
        description: "Detailed replica of Nezuko Kamado's signature bamboo muzzle with custom hand-painted wood grain texture.",
        category: "anime",
        image: {
          gradient: "linear-gradient(135deg, #2a1a0a 0%, #4a2a1a 50%, #3a1a0a 100%)",
          alt: "Nezuko's bamboo muzzle replica",
        },
      },
      {
        id: "doom-slayer",
        title: "Doom Slayer Armor Set",
        description: "Full cosplay armor set inspired by Doom Eternal, featuring LED chest light, articulated joints, and weathered paint job.",
        category: "games",
        image: {
          gradient: "linear-gradient(135deg, #1a0a0a 0%, #3a1a1a 50%, #2a0a0a 100%)",
          alt: "Doom Slayer armor set replica",
        },
      },
      {
        id: "levi-sword",
        title: "Levi's Thunder Spear",
        description: "Replica of Levi Ackerman's Thunder Spear from Attack on Titan, with retractable mechanism and battle-worn finishing.",
        category: "anime",
        image: {
          gradient: "linear-gradient(135deg, #1a1a2a 0%, #2a2a4a 50%, #1a1a3a 100%)",
          alt: "Levi's Thunder Spear replica from Attack on Titan",
        },
      },
    ],
  },
  es: {
    languageLabel: "Idioma",
    nav: [
      { href: "/", label: "Inicio" },
      { href: "/services", label: "Servicios" },
      { href: "/projects", label: "Proyectos" },
      { href: "#shop", label: "Tienda" },
      { href: "#commissions", label: "Encargos" },
    ],
    ctaPrimary: "Iniciar Encargo",
    ctaSecondary: "Explorar Proyectos",
    footer: "3D CosProps. Artesanía 3D de alta fidelidad.",
    footerNavTitle: "Navegación",
    footerFollowTitle: "Síguenos",
    footerPrivacyLabel: "Política de Privacidad",
    footerLegalTitle: "Legal",
    footerLegalNoticeLabel: "Aviso Legal",
    footerCookiePolicyLabel: "Política de Cookies",
    footerTermsLabel: "Términos y Condiciones",
    heroTag: "Nuestro portafolio",
    heroTitle: "Proyectos <gold>Forjados</gold>",
    heroBody:
      "Una muestra de nuestras mejores creaciones — desde réplicas de anime hasta coleccionables inspirados en videojuegos. Cada pieza refleja nuestro compromiso con la fidelidad y la artesanía.",
    heroCtaPrimary: "Solicitar Encargo",
    heroCtaSecondary: "Ver Servicios",
    galleryTitle: "Galería de Proyectos",
    filterAll: "Todas",
    filterAnime: "Anime",
    filterGames: "Videojuegos",
    loadMore: "Cargar Más Proyectos",
    noMoreProjects: "No hay más proyectos.",
    projects: [
      {
        id: "tanjiro-sword",
        title: "Espada de Tanjiro",
        description: "R�plica artesanal de la espada de Tanjiro Kamado de Demon Slayer, con acabado de acero pulido y tsuba detallada.",
        category: "anime",
        image: {
          gradient: "linear-gradient(135deg, #1a2a1a 0%, #2d4a2d 50%, #1a3a1a 100%)",
          alt: "Réplica de la espada de Tanjiro",
        },
      },
      {
        id: "mando-helmet",
        title: "Casco Mandaloriano",
        description: "Casco Mandaloriano premium inspirado en beskar con efectos de desgaste, iluminación LED y acolchado interior ajustable.",
        category: "games",
        image: {
          gradient: "linear-gradient(135deg, #2a2a2a 0%, #4a4a4a 50%, #3a3a3a 100%)",
          alt: "Réplica del casco Mandaloriano",
        },
      },
      {
        id: "master-sword",
        title: "Espada Maestra",
        description: "Réplica a escala real de la Espada Maestra de Zelda con acabado metálico, empuñadura de cuero y grabados detallados.",
        category: "games",
        image: {
          gradient: "linear-gradient(135deg, #1a1a3a 0%, #2a2a5a 50%, #1a1a4a 100%)",
          alt: "Réplica de la Espada Maestra de Zelda",
        },
      },
      {
        id: "nezuko-bamboo",
        title: "Bozal de Nezuko",
        description: "Réplica detallada del bozal de bambú de Nezuko Kamado con textura de veta de madera pintada a mano.",
        category: "anime",
        image: {
          gradient: "linear-gradient(135deg, #2a1a0a 0%, #4a2a1a 50%, #3a1a0a 100%)",
          alt: "Réplica del bozal de Nezuko",
        },
      },
      {
        id: "doom-slayer",
        title: "Armadura del Doom Slayer",
        description: "Armadura cosplay completa inspirada en Doom Eternal, con luz LED en el pecho, articulaciones móviles y pintura desgastada.",
        category: "games",
        image: {
          gradient: "linear-gradient(135deg, #1a0a0a 0%, #3a1a1a 50%, #2a0a0a 100%)",
          alt: "Réplica de la armadura del Doom Slayer",
        },
      },
      {
        id: "levi-sword",
        title: "Lanza Trueno de Levi",
        description: "Réplica de la Lanza Trueno de Levi Ackerman de Attack on Titan, con mecanismo retráctil y acabado de batalla.",
        category: "anime",
        image: {
          gradient: "linear-gradient(135deg, #1a1a2a 0%, #2a2a4a 50%, #1a1a3a 100%)",
          alt: "Réplica de la Lanza Trueno de Levi",
        },
      },
    ],
  },
};

export function getDictionary(locale: Locale): HomeDictionary {
  return dictionaries[locale];
}

export function getServicesDictionary(locale: Locale): ServicesDictionary {
  return servicesDictionaries[locale];
}

export function getProjectsDictionary(locale: Locale): ProjectsDictionary {
  return projectsDictionaries[locale];
}
