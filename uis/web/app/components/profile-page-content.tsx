"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CubeIcon, ProfileIcon } from "../../src/icons";
import type { Locale } from "../i18n";

const copy = {
  es: {
    eyebrow: "Tu espacio / 3D CosProps", title: "Mi perfil", demo: "Vista de demostración", member: "Miembro de la comunidad", name: "Alex Morgan", id: "PERFIL DE EJEMPLO",
    active: "Encargos activos", activeSuffix: "en proceso", completed: "Pedidos completados", completedSuffix: "pedidos",
    backoffice: "Backoffice", preview: "Vista previa", sampleOrder: "Pedido de muestra", sampleCommission: "Encargo de muestra", orderItem: "Kit de casco personalizado", commissionItem: "Pieza personalizada", orderStatus: "En preparación", commissionStatus: "En producción", updated: "Actualizado hoy", orderId: "PED-2026-0142", commissionId: "ENC-2026-0038", tracking: "Progreso del pedido", commissionTracking: "Progreso del encargo", orderSteps: ["Pedido confirmado", "Pago recibido", "En preparación", "Listo para envío", "Enviado", "Entregado"], commissionSteps: ["Solicitud recibida", "En revisión", "Presupuesto aceptado", "Pago recibido", "En producción", "Completado", "Listo para envío", "Enviado"], current: "Estado actual", demoData: "Datos de demostración: el progreso no está conectado a pedidos reales.",
    tabs: ["Datos personales", "Métodos de pago", "Descarga de archivos", "Pedidos y encargos"],
    detailsTag: "01 / TU CUENTA", details: "Datos personales", detailsBody: "Tu información de contacto y tus direcciones en un mismo lugar.",
    fullName: "Nombre completo", email: "Correo electrónico", phone: "Teléfono", emailNote: "Las notificaciones se enviarán a este correo.",
    addressTag: "02 / DIRECCIONES", addresses: "Direcciones", shipping: "Dirección de envío", billing: "Dirección de facturación", sameAddress: "Facturación igual que la dirección de envío",
    save: "Guardar cambios", saved: "Cambios aplicados a esta vista de demostración. No se han guardado en una cuenta.",
    securityTag: "03 / SEGURIDAD", security: "Seguridad de la cuenta", securityBody: "Gestiona tu contraseña y protege tu información personal.", password: "Cambiar contraseña", securityNote: "La gestión de contraseña y la confirmación de cambios sensibles estarán disponibles al conectar tu cuenta.",
    paymentTag: "01 / PAGOS", paymentTitle: "Métodos de pago", paymentBody: "Tus métodos de pago, reunidos en un solo lugar.", card: "Tarjeta", cardDetail: "Tarjeta de crédito o débito", paypal: "PayPal", paypalDetail: "Cuenta de PayPal vinculada", notConnected: "No disponible todavía", paymentNote: "La gestión segura de métodos de pago estará disponible cuando conectemos los proveedores de pago.",
    filesTag: "01 / TU BIBLIOTECA", filesTitle: "Descarga de archivos", filesBody: "Tus productos digitales estarán disponibles aquí después de confirmar el pago.", emptyFiles: "Todavía no hay archivos disponibles", emptyFilesBody: "Cuando compres un producto digital, podrás acceder a sus archivos desde aquí.", explore: "Explorar la tienda", fileProduct: "Archivo digital de muestra", fileDescription: "Modelo 3D imprimible para proyecto de cosplay. Archivo de demostración; la descarga no está conectada a una compra real.", fileFormat: "STL · Archivo digital", download: "Descargar archivo",
    ordersTag: "01 / SEGUIMIENTO", ordersTitle: "Pedidos y encargos", ordersBody: "Sigue el recorrido de tus compras y proyectos personalizados.", orders: "Pedidos", commissions: "Encargos", noOrders: "Todavía no hay pedidos", noOrdersBody: "Aquí podrás consultar el estado de tus compras.", noCommissions: "Todavía no hay encargos", noCommissionsBody: "Aquí podrás seguir tus proyectos desde la solicitud hasta la entrega.", exploreCommissions: "Explorar encargos",
  },
  en: {
    eyebrow: "Your space / 3D CosProps", title: "My profile", demo: "Demo view", member: "Community member", name: "Alex Morgan", id: "SAMPLE PROFILE",
    active: "Active commissions", activeSuffix: "in progress", completed: "Completed orders", completedSuffix: "orders",
    backoffice: "Backoffice", preview: "Preview", sampleOrder: "Sample order", sampleCommission: "Sample commission", orderItem: "Custom Helmet Kit", commissionItem: "Custom prop piece", orderStatus: "Preparing", commissionStatus: "In production", updated: "Updated today", orderId: "ORD-2026-0142", commissionId: "COM-2026-0038", tracking: "Order progress", commissionTracking: "Commission progress", orderSteps: ["Order confirmed", "Payment received", "Preparing", "Ready to ship", "Shipped", "Delivered"], commissionSteps: ["Request received", "Under review", "Quote accepted", "Payment received", "In production", "Completed", "Ready to ship", "Shipped"], current: "Current status", demoData: "Demo data: progress is not connected to real orders.",
    tabs: ["Personal details", "Payment methods", "File downloads", "Orders & commissions"],
    detailsTag: "01 / YOUR ACCOUNT", details: "Personal details", detailsBody: "Your contact details and addresses, all in one place.",
    fullName: "Full name", email: "Email address", phone: "Phone number", emailNote: "Notifications will be sent to this email address.",
    addressTag: "02 / ADDRESSES", addresses: "Addresses", shipping: "Shipping address", billing: "Billing address", sameAddress: "Billing same as shipping address",
    save: "Save changes", saved: "Changes applied to this demo view. They have not been saved to an account.",
    securityTag: "03 / SECURITY", security: "Account security", securityBody: "Manage your password and protect your personal information.", password: "Change password", securityNote: "Password management and confirmation of sensitive changes will be available when your account is connected.",
    paymentTag: "01 / PAYMENTS", paymentTitle: "Payment methods", paymentBody: "Your payment methods, together in one place.", card: "Card", cardDetail: "Credit or debit card", paypal: "PayPal", paypalDetail: "Linked PayPal account", notConnected: "Not available yet", paymentNote: "Secure payment method management will be available when payment providers are connected.",
    filesTag: "01 / YOUR LIBRARY", filesTitle: "File downloads", filesBody: "Your digital products will be available here once payment is confirmed.", emptyFiles: "No files available yet", emptyFilesBody: "When you purchase a digital product, you can access its files here.", explore: "Explore the shop", fileProduct: "Sample digital file", fileDescription: "Printable 3D model for a cosplay project. Demo file; this download is not connected to a real purchase.", fileFormat: "STL · Digital file", download: "Download file",
    ordersTag: "01 / TRACKING", ordersTitle: "Orders & commissions", ordersBody: "Follow the progress of your purchases and custom projects.", orders: "Orders", commissions: "Commissions", noOrders: "No orders yet", noOrdersBody: "You can check the status of your purchases here.", noCommissions: "No commissions yet", noCommissionsBody: "You can follow your projects from request to delivery here.", exploreCommissions: "Explore commissions",
  },
} as const;

const fieldClass = "mt-2 min-h-12 w-full border border-white/10 bg-black/20 px-4 font-body text-sm normal-case text-white outline-none transition-colors focus:border-primary";
const labelClass = "block font-label text-[10px] uppercase leading-5 text-text-dim";
const buttonClass = "inline-flex min-h-11 items-center justify-center border border-primary bg-primary px-6 font-label text-[10px] uppercase text-background transition-colors hover:bg-white hover:border-white";
const tabSlugs = ["personal", "payments", "downloads", "orders"] as const;

export function ProfilePageContent({ locale }: { locale: Locale }) {
  const text = copy[locale];
  const [activeTab, setActiveTab] = useState(0);
  const [name, setName] = useState<string>(text.name);
  const [savedName, setSavedName] = useState<string>(text.name);
  const [sameAddress, setSameAddress] = useState(true);
  const [saved, setSaved] = useState(false);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  useEffect(() => {
    const syncTabFromUrl = () => {
      const slug = new URLSearchParams(window.location.search).get("tab");
      const index = tabSlugs.indexOf(slug as (typeof tabSlugs)[number]);
      setActiveTab(index < 0 ? 0 : index);
    };
    syncTabFromUrl();
    window.addEventListener("popstate", syncTabFromUrl);
    return () => window.removeEventListener("popstate", syncTabFromUrl);
  }, []);

  function changeTab(index: number) {
    setActiveTab(index);
    const url = new URL(window.location.href);
    if (index === 0) url.searchParams.delete("tab");
    else url.searchParams.set("tab", tabSlugs[index]);
    window.history.replaceState(window.history.state, "", `${url.pathname}${url.search}${url.hash}`);
  }

  function selectTab(index: number) {
    changeTab(index);
    tabRefs.current[index]?.focus();
  }

  return (
    <main id="top" className="min-h-screen bg-background px-4 pb-20 pt-24 md:px-8 md:pb-28 md:pt-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 font-label text-[10px] uppercase text-text-dim">
          <span>{text.eyebrow}</span><span className="text-primary">{text.demo}</span>
        </div>

        <section aria-label={text.title} className="relative overflow-hidden border border-white/10 bg-surface-grey p-6 md:p-8">
          <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-[linear-gradient(90deg,transparent,rgba(242,202,80,0.06))]" />
          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex min-w-0 items-center gap-5 md:gap-6">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center border border-primary/30 bg-black/30 text-primary md:h-28 md:w-28"><ProfileIcon className="h-14 w-14 md:h-20 md:w-20" /></div>
              <div className="min-w-0">
                <p className="font-label text-[10px] uppercase text-primary">{text.member}</p>
                <h1 className="mt-2 break-words font-display text-3xl font-semibold text-white md:text-4xl">{savedName || text.title}</h1>
                <p className="mt-2 font-label text-[10px] uppercase text-text-dim">{text.id}</p>
              </div>
            </div>
            <div className="grid w-full grid-cols-3 gap-2 sm:gap-3 lg:ml-auto lg:w-[528px]">
              <button type="button" disabled className="flex aspect-square min-w-0 cursor-not-allowed flex-col items-center justify-center border border-primary/35 bg-black/25 p-2 text-center opacity-90 sm:p-3 md:p-4" aria-label={`${text.backoffice} — ${text.preview}`}>
                <span className="font-label text-[9px] uppercase tracking-wider text-primary">{text.backoffice}</span>
                <span className="mt-2 font-display text-xs font-semibold uppercase text-white md:text-sm">{text.preview}</span>
                <span className="mt-2 font-label text-[8px] uppercase text-text-dim">{text.notConnected}</span>
              </button>
              {[{ label: text.active, suffix: text.activeSuffix }, { label: text.completed, suffix: text.completedSuffix }].map((stat, index) => (
                <div key={stat.label} className="flex aspect-square min-w-0 flex-col justify-center border border-white/5 bg-black/20 p-2 sm:p-3 md:p-4">
                  <p className="font-label text-[8px] uppercase leading-3 text-text-dim sm:text-[9px] sm:leading-4">{stat.label}</p>
                  <p className="mt-2 flex flex-wrap items-baseline gap-1 sm:gap-2"><span className={`font-display text-2xl font-semibold sm:text-3xl ${index === 0 ? "text-primary" : "text-white"}`}>00</span><span className="font-label text-[8px] uppercase text-text-dim sm:text-[9px]">{stat.suffix}</span></p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div role="tablist" aria-label={text.title} className="mt-6 grid grid-cols-2 gap-1 border border-white/10 bg-surface-grey p-1.5 md:mt-8 md:grid-cols-4">
          {text.tabs.map((tab, index) => (
            <button key={tab} ref={(element) => { tabRefs.current[index] = element; }} type="button" role="tab" id={`profile-tab-${index}`} aria-controls={`profile-panel-${index}`} aria-selected={activeTab === index} tabIndex={activeTab === index ? 0 : -1} onClick={() => changeTab(index)} onKeyDown={(event) => {
              if (event.key === "ArrowRight" || event.key === "ArrowLeft" || event.key === "Home" || event.key === "End") {
                event.preventDefault();
                selectTab(event.key === "Home" ? 0 : event.key === "End" ? text.tabs.length - 1 : (index + (event.key === "ArrowRight" ? 1 : -1) + text.tabs.length) % text.tabs.length);
              }
            }} className={`min-h-12 px-3 py-3 text-left font-label text-[10px] uppercase leading-4 transition-colors md:text-center ${activeTab === index ? "bg-primary text-background" : "text-text-dim hover:bg-white/5 hover:text-white"}`}>{tab}</button>
          ))}
        </div>

        <div role="tabpanel" id={`profile-panel-${activeTab}`} aria-labelledby={`profile-tab-${activeTab}`} tabIndex={0} className="mt-6 md:mt-8">
            <form hidden={activeTab !== 0} onSubmit={(event) => { event.preventDefault(); setSavedName(name); setSaved(true); }} className={activeTab === 0 ? "grid items-start gap-6 lg:grid-cols-[1.4fr_0.85fr]" : "hidden"}>
              <div className="space-y-6">
                <section className="border border-white/10 bg-surface-grey p-6 md:p-8">
                  <p className="font-label text-[10px] uppercase text-primary">{text.detailsTag}</p>
                  <h2 className="mt-3 font-display text-2xl font-semibold text-white md:text-3xl">{text.details}</h2>
                  <p className="mt-2 text-sm leading-6 text-text-dim">{text.detailsBody}</p>
                  <div className="mt-7 grid gap-5 sm:grid-cols-2">
                    <label className={labelClass}>{text.fullName}<input className={fieldClass} value={name} onChange={(event) => { setName(event.target.value); setSaved(false); }} /></label>
                    <label className={labelClass}>{text.phone}<input className={fieldClass} type="tel" placeholder="+34 600 000 000" onChange={() => setSaved(false)} /></label>
                    <label className={`${labelClass} sm:col-span-2`}>{text.email}<input className={fieldClass} type="email" placeholder="alex@example.com" onChange={() => setSaved(false)} /><span className="mt-2 block font-body text-xs normal-case text-text-dim">{text.emailNote}</span></label>
                  </div>
                </section>
                <section className="border border-white/10 bg-surface-grey p-6 md:p-8">
                  <p className="font-label text-[10px] uppercase text-primary">{text.addressTag}</p>
                  <h2 className="mt-3 font-display text-2xl font-semibold text-white md:text-3xl">{text.addresses}</h2>
                  <div className="mt-7 grid gap-5">
                    <label className={labelClass}>{text.shipping}<input className={fieldClass} autoComplete="shipping street-address" onChange={() => setSaved(false)} /></label>
                    <label className="flex items-center gap-3 text-sm text-text-dim"><input type="checkbox" checked={sameAddress} onChange={(event) => { setSameAddress(event.target.checked); setSaved(false); }} className="h-4 w-4 accent-primary" />{text.sameAddress}</label>
                    {!sameAddress && <label className={labelClass}>{text.billing}<input className={fieldClass} autoComplete="billing street-address" onChange={() => setSaved(false)} /></label>}
                  </div>
                  <button type="submit" className={`${buttonClass} mt-7`}>{text.save}</button>
                  <p role="status" className="mt-3 text-sm text-primary">{saved ? text.saved : ""}</p>
                </section>
              </div>
              <section className="border border-white/10 bg-surface-grey p-6 md:p-8">
                <p className="font-label text-[10px] uppercase text-primary">{text.securityTag}</p>
                <h2 className="mt-3 font-display text-2xl font-semibold text-white md:text-3xl">{text.security}</h2>
                <p className="mt-3 text-sm leading-6 text-text-dim">{text.securityBody}</p>
                <div className="mt-7 border-t border-white/10 pt-6"><p className="font-label text-[10px] uppercase text-primary">{text.notConnected}</p><p className="mt-3 text-sm leading-6 text-text-dim">{text.securityNote}</p><button type="button" disabled className="mt-6 min-h-11 border border-white/15 px-5 font-label text-[10px] uppercase text-text-dim/60">{text.password}</button></div>
              </section>
            </form>
          {activeTab === 1 && <section className="border border-white/10 bg-surface-grey p-6 md:p-8"><p className="font-label text-[10px] uppercase text-primary">{text.paymentTag}</p><h2 className="mt-3 font-display text-2xl font-semibold text-white md:text-3xl">{text.paymentTitle}</h2><p className="mt-2 text-sm leading-6 text-text-dim">{text.paymentBody}</p><div className="mt-7 divide-y divide-white/10 border-y border-white/10">{[[text.card, text.cardDetail], [text.paypal, text.paypalDetail]].map(([title, detail]) => <div key={title} className="flex flex-wrap items-center justify-between gap-3 py-5"><div><h3 className="font-display text-lg font-semibold text-white">{title}</h3><p className="mt-1 text-sm text-text-dim">{detail}</p></div><span className="font-label text-[10px] uppercase text-text-dim">{text.notConnected}</span></div>)}</div><p className="mt-6 max-w-2xl text-sm leading-6 text-text-dim">{text.paymentNote}</p></section>}
          {activeTab === 2 && <section className="border border-white/10 bg-surface-grey p-6 md:p-8"><p className="font-label text-[10px] uppercase text-primary">{text.filesTag}</p><h2 className="mt-3 font-display text-2xl font-semibold text-white md:text-3xl">{text.filesTitle}</h2><p className="mt-2 text-sm leading-6 text-text-dim">{text.filesBody}</p><div className="mt-8 grid grid-cols-1 items-stretch gap-3 lg:grid-cols-2">{[0, 1, 2, 3].map((item) => <DownloadCard key={item} title={locale === "es" ? [text.fileProduct, "Plano de armadura sci-fi", "Accesorios de cosplay", "Kit de piezas imprimibles"][item] : [text.fileProduct, "Sci-fi armor blueprint", "Cosplay accessories", "Printable parts kit"][item]} description={text.fileDescription} format={text.fileFormat} downloadLabel={text.download} detailsLabel={locale === "es" ? "Detalles" : "Details"} href="/media/sample-cosplay-model.stl" />)}</div><Link className={`${buttonClass} mt-6`} href={`/${locale}/shop`}>{text.explore}</Link></section>}
          {activeTab === 3 && <section className="border border-white/10 bg-surface-grey p-6 md:p-8"><p className="font-label text-[10px] uppercase text-primary">{text.ordersTag}</p><h2 className="mt-3 font-display text-2xl font-semibold text-white md:text-3xl">{text.ordersTitle}</h2><p className="mt-2 text-sm leading-6 text-text-dim">{text.ordersBody}</p><div className="mt-8 grid items-start gap-6 xl:grid-cols-2">
            <TrackingCard locale={locale} title={text.sampleOrder} item={text.orderItem} id={text.orderId} status={text.orderStatus} updated={text.updated} progressTitle={text.tracking} steps={text.orderSteps} activeStep={2} currentLabel={text.current} demoData={text.demoData} />
            <TrackingCard locale={locale} title={text.sampleCommission} item={text.commissionItem} id={text.commissionId} status={text.commissionStatus} updated={text.updated} progressTitle={text.commissionTracking} steps={text.commissionSteps} activeStep={4} currentLabel={text.current} demoData={text.demoData} />
          </div></section>}
        </div>
      </div>
    </main>
  );
}

function DownloadCard({ title, description, format, downloadLabel, detailsLabel, href }: {
  title: string; description: string; format: string; downloadLabel: string; detailsLabel: string; href: string;
}) {
  const [expanded, setExpanded] = useState(false);
  return <article className="h-full overflow-hidden border border-white/10 bg-white/[0.035] transition-colors hover:border-primary/45">
    <div className="flex min-h-28">
      <div role="img" aria-label={title} className="relative flex w-24 shrink-0 items-center justify-center overflow-hidden border-r border-white/10 bg-[linear-gradient(135deg,#28251c,#111)] sm:w-32">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_49%,rgba(255,255,255,0.035)_50%,transparent_51%),linear-gradient(0deg,transparent_49%,rgba(255,255,255,0.035)_50%,transparent_51%)] bg-[size:24px_24px]" />
        <CubeIcon className="relative h-9 w-9 text-primary/70" />
        <span className="absolute bottom-2 left-2 font-label text-[8px] uppercase text-primary">{format}</span>
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-center p-3 sm:p-4">
        <h3 className="font-display text-sm font-semibold leading-snug text-white sm:text-base">{title}</h3>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <a href={href} download className={`${buttonClass} min-h-9 px-2 text-center text-[8px] sm:text-[9px]`} aria-label={`${downloadLabel}: ${title}`}>{downloadLabel}</a>
          <button type="button" aria-expanded={expanded} onClick={() => setExpanded((open) => !open)} className="flex min-h-9 cursor-pointer items-center justify-center gap-1 border border-white/20 px-2 text-center font-label text-[8px] uppercase text-text-dim transition-colors hover:border-primary hover:text-primary sm:text-[9px]">
            {detailsLabel}<span aria-hidden="true" className={`inline-block transition-transform ${expanded ? "rotate-180" : ""}`}>⌄</span>
          </button>
        </div>
      </div>
    </div>
    {expanded && <div className="border-t border-white/10 px-4 py-3 text-sm leading-6 text-text-dim">{description}</div>}
  </article>;
}

function TrackingCard({ locale, title, item, id, status, updated, progressTitle, steps, activeStep, currentLabel, demoData }: {
  locale: Locale; title: string; item: string; id: string; status: string; updated: string;
  progressTitle: string; steps: readonly string[]; activeStep: number; currentLabel: string; demoData: string;
}) {
  return <article className="border border-white/10 bg-black/20 p-5 md:p-6">
    <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-4">
      <div><p className="font-label text-[9px] uppercase text-text-dim">{title} / {id}</p><h3 className="mt-2 font-display text-lg font-semibold text-white">{item}</h3></div>
      <span className="border border-primary/35 bg-primary/10 px-3 py-2 font-label text-[9px] uppercase text-primary">{status}</span>
    </div>
    <div className="mt-5 flex items-center justify-between gap-3"><h4 className="font-label text-[10px] uppercase text-white">{progressTitle}</h4><span className="font-label text-[9px] text-text-dim">{updated}</span></div>
    <ol className="mt-5 space-y-0" aria-label={progressTitle}>{steps.map((step, index) => {
      const complete = index < activeStep;
      const active = index === activeStep;
      return <li key={step} aria-current={active ? "step" : undefined} className="relative flex min-h-10 items-start gap-3 pb-3 last:pb-0">
        {index < steps.length - 1 && <span aria-hidden="true" className={`absolute left-[5px] top-3 h-full w-px ${complete ? "bg-primary/70" : "bg-white/10"}`} />}
        <span aria-hidden="true" className={`relative z-10 mt-0.5 h-3 w-3 shrink-0 rounded-full border ${complete ? "border-primary bg-primary" : active ? "border-primary bg-background ring-2 ring-primary/20" : "border-white/20 bg-surface"}`} />
        <span className={`font-body text-xs leading-5 ${complete ? "text-text-dim" : active ? "font-semibold text-primary" : "text-text-dim/70"}`}>{step}</span>
      </li>;
    })}</ol>
    <p className="mt-1 border-t border-white/10 pt-3 font-label text-[10px] uppercase text-primary"><span className="text-text-dim">{currentLabel}:</span> {status}</p>
    <p className="mt-4 border-t border-white/10 pt-3 font-body text-[11px] leading-5 text-text-dim">{demoData}</p>
    <Link href={`/${locale}/${title === (locale === "es" ? "Pedido de muestra" : "Sample order") ? "shop" : "commissions"}`} className="mt-4 inline-block font-label text-[9px] uppercase text-primary underline underline-offset-4 hover:text-white">{locale === "es" ? "Ver sección" : "View section"}</Link>
  </article>;
}