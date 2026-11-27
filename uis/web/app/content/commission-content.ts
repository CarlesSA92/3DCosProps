import type { Locale } from "../i18n";
import { getDictionary } from "../content";
import type { CommissionPageDictionary, PageContent } from "@shared/types/content";

const commissionContent: Record<Locale, Omit<CommissionPageDictionary, keyof PageContent>> = {
  en: {
    heroTag: "Custom commissions",
    heroTitle: "Bring your ideas to <gold>life</gold>",
    heroBody:
      "Tell us what you have in mind. We will review the project, discuss what is possible, and prepare a tailored quote before any payment is due.",
    formTitle: "Project Idea",
    formSteps: ["Project", "Scope & references", "Your details"],
    formStepDescriptions: [
      "Give your project a name and tell us what you would like us to create.",
      "Share your budget, preferred completion date, and visual references that help explain your idea.",
      "Leave your contact details so we can follow up about your project.",
    ],
    projectTypes: [
      { value: "consultation", label: "Project planning & consultation" },
      { value: "concept", label: "Concept design & blueprints" },
      { value: "modeling", label: "3D modeling" },
      { value: "printing", label: "3D printing" },
      { value: "finishing", label: "Finishing & painting" },
      { value: "complete-piece", label: "Complete piece fabrication" },
    ],
    budgetOptions: [
      { value: "custom", label: "Enter an amount" },
      { value: "guidance", label: "I need guidance" },
    ],
    labels: {
      projectTitle: "Project name",
      projectType: "Project type",
      details: "Project details",
      budget: "Estimated budget",
      enterBudget: "Budget amount",
      timeline: "Preferred completion date",
      references: "Reference files",
      name: "Name / handle",
      email: "Email address",
      agreement: "I confirm these details are accurate and agree to be contacted about this request.",
    },
    hints: {
      projectTitle: "e.g. Custom fantasy helmet",
      details:
        "Describe the scale, intended use, materials or finish you have in mind, and any functional requirements.",
      references: "Drag files here or choose files",
      referencesHelp: "JPG, PNG or PDF · Multiple files · Up to 10 MB total",
      payment:
        "A request is not a purchase. We will review your project idea and send a quote; payment only comes after you accept it.",
      timeline: "Choose a date at least one month from today. Earlier completion may be possible depending on studio availability.",
    },
    actions: {
      back: "Back",
      next: "Continue",
      submit: "Send my project idea",
      removeFile: "Remove",
    },
    validation: {
      projectTitle: "Add a name for your project to continue.",
      projectType: "Choose the type of project you have in mind.",
      details: "Tell us a little more about the project.",
      name: "Add your name or handle.",
      email: "Enter a valid email address.",
      agreement: "Please confirm you can be contacted about this request.",
      fileSize: "The selected files exceed the 10 MB total limit.",
      fileType: "Only JPG, PNG, and PDF files are accepted.",
      fileCount: "You can attach up to 10 files.",
      budget: "Enter a valid budget amount.",
    },
    successTitle: "Your project idea is ready",
    successBody:
      "Your project details are ready for review. Our team will follow up using the contact details you provided.",
    processTitle: "The process",
    processSteps: [
      {
        title: "Project idea review",
        body: "We review your references and details, then get in touch if we need to clarify anything.",
      },
      {
        title: "Quote & timeline",
        body: "If the project is a good fit, we send a tailored quote and agree on a production timeline.",
      },
      {
        title: "Your approval",
        body: "You review the scope, price, and timing. Nothing moves to payment until you accept the quote.",
      },
      {
        title: "Payment & making",
        body: "After acceptance, you receive a secure payment link. Production starts once payment is confirmed.",
      },
    ],
    paymentTitle: "Payment comes after the quote",
    paymentBody:
      "Custom work is only paid for after you review and accept the quote. You will receive a secure link to complete payment.",
    faqTitle: "Frequently asked questions",
    faqs: [
      {
        question: "How much will my project cost?",
        answer:
          "Every commission is different. After reviewing your project idea, we will send a quote covering the agreed scope before you decide whether to proceed.",
      },
      {
        question: "When do I pay?",
        answer:
          "Only after you have reviewed and accepted the quote. The payment link and any applicable deadline will be included with the offer.",
      },
      {
        question: "Can I cancel after paying?",
        answer:
          "Payment confirms your acceptance of the agreed work, so a paid commission cannot be cancelled. You can withdraw a request before payment.",
      },
      {
        question: "How long does production take?",
        answer:
          "Timing depends on the scope, materials, and current workload. We will agree on an estimated timeline with you before payment.",
      },
      {
        question: "Do you ship internationally?",
        answer:
          "Shipping options and costs depend on the finished piece and destination. We will confirm them as part of the quote and delivery plan.",
      },
    ],
  },
  es: {
    heroTag: "Encargos personalizados",
    heroTitle: "Damos vida a tus <gold>ideas</gold>",
    heroBody:
      "Cuéntanos qué tienes en mente. Revisaremos el proyecto, valoraremos su viabilidad y prepararemos un presupuesto a medida antes de que tengas que pagar nada.",
    formTitle: "Idea de proyecto",
    formSteps: ["Proyecto", "Alcance y referencias", "Tus datos"],
    formStepDescriptions: [
      "Ponle nombre a tu proyecto y cuéntanos qué te gustaría crear.",
      "Indica un presupuesto orientativo, plazos y referencias visuales que ayuden a explicar tu idea.",
      "Déjanos tus datos de contacto para poder hablar contigo sobre el proyecto.",
    ],
    projectTypes: [
      { value: "consultation", label: "Planificación y consultoría del proyecto" },
      { value: "concept", label: "Diseño conceptual y planos" },
      { value: "modeling", label: "Modelado 3D" },
      { value: "printing", label: "Impresión 3D" },
      { value: "finishing", label: "Acabados y pintura" },
      { value: "complete-piece", label: "Fabricación de la pieza completa" },
    ],
    budgetOptions: [
      { value: "custom", label: "Introducir un importe" },
      { value: "guidance", label: "Necesito orientación" },
    ],
    labels: {
      projectTitle: "Nombre del proyecto",
      projectType: "Tipo de proyecto",
      details: "Detalles del proyecto",
      budget: "Presupuesto aproximado",
      enterBudget: "Importe del presupuesto",
      timeline: "Fecha de entrega deseada",
      references: "Archivos de referencia",
      name: "Nombre / alias",
      email: "Correo electrónico",
      agreement: "Confirmo que estos datos son correctos y acepto que contacten conmigo sobre esta solicitud.",
    },
    hints: {
      projectTitle: "p. ej., casco de fantasía personalizado",
      details:
        "Describe el tamaño, el uso previsto, los materiales o acabados que tienes en mente y cualquier requisito funcional.",
      references: "Arrastra archivos o selecciónalos",
      referencesHelp: "JPG, PNG o PDF · Varios archivos · Hasta 10 MB en total",
      payment:
        "Enviar una solicitud no es una compra. Revisaremos tu idea y te enviaremos un presupuesto; solo pagarás si lo aceptas.",
      timeline: "Elige una fecha de al menos un mes desde hoy. Según la disponibilidad del estudio, quizá podamos terminarlo antes.",
    },
    actions: {
      back: "Atrás",
      next: "Continuar",
      submit: "Enviar mi idea de proyecto",
      removeFile: "Eliminar",
    },
    validation: {
      projectTitle: "Añade un nombre para el proyecto antes de continuar.",
      projectType: "Elige el tipo de proyecto que tienes en mente.",
      details: "Cuéntanos un poco más sobre el proyecto.",
      name: "Añade tu nombre o alias.",
      email: "Introduce un correo electrónico válido.",
      agreement: "Confirma que podemos contactar contigo sobre esta solicitud.",
      fileSize: "Los archivos seleccionados superan el límite total de 10 MB.",
      fileType: "Solo se admiten archivos JPG, PNG y PDF.",
      fileCount: "Puedes adjuntar hasta 10 archivos.",
      budget: "Introduce un importe válido para tu presupuesto.",
    },
    successTitle: "Tu idea de proyecto está preparada",
    successBody:
      "Los detalles de tu proyecto están listos para su revisión. Nos pondremos en contacto contigo a través de los datos que nos has facilitado.",
    processTitle: "El proceso",
    processSteps: [
      {
        title: "Revisión de la idea",
        body: "Revisamos tus referencias y detalles, y contactamos contigo si necesitamos aclarar algo.",
      },
      {
        title: "Presupuesto y plazos",
        body: "Si el proyecto encaja, preparamos un presupuesto a medida y acordamos un plazo de producción.",
      },
      {
        title: "Tu aprobación",
        body: "Revisas el alcance, el precio y los plazos. No se inicia ningún pago hasta que aceptes el presupuesto.",
      },
      {
        title: "Pago y fabricación",
        body: "Tras aceptarlo, recibirás un enlace de pago seguro. La producción comienza cuando se confirma el pago.",
      },
    ],
    paymentTitle: "Primero el presupuesto, después el pago",
    paymentBody:
      "Los encargos personalizados se pagan después de que revises y aceptes el presupuesto. Recibirás un enlace seguro para completar el pago.",
    faqTitle: "Preguntas frecuentes",
    faqs: [
      {
        question: "¿Cuánto costará mi proyecto?",
        answer:
          "Cada encargo es distinto. Después de revisar tu idea, te enviaremos un presupuesto con el alcance acordado para que decidas si quieres continuar.",
      },
      {
        question: "¿Cuándo tengo que pagar?",
        answer:
          "Solo después de revisar y aceptar el presupuesto. El enlace de pago y, si corresponde, la fecha límite aparecerán en la oferta.",
      },
      {
        question: "¿Puedo cancelar después de pagar?",
        answer:
          "El pago confirma que aceptas el trabajo acordado, por lo que un encargo pagado no se puede cancelar. Puedes retirar tu solicitud antes del pago.",
      },
      {
        question: "¿Cuánto tarda la fabricación?",
        answer:
          "El plazo depende del alcance, los materiales y la carga de trabajo. Acordaremos contigo una estimación antes del pago.",
      },
      {
        question: "¿Hacéis envíos internacionales?",
        answer:
          "Las opciones y el coste dependen de la pieza terminada y del destino. Confirmaremos los detalles en el presupuesto y el plan de entrega.",
      },
    ],
  },
};

export function getCommissionPageDictionary(locale: Locale): CommissionPageDictionary {
  return {
    ...getDictionary(locale),
    ...commissionContent[locale],
  };
}