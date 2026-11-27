"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowIcon, CartIcon, CloseIcon, CubeIcon, MagnifyingGlassIcon, SettingsIcon } from "@shared/icons";
import { PageIntro } from "@shared/ui/page-intro";
import { splitGoldTag } from "@shared/utils/split-gold-tag";
import { useShopCart } from "@shared/utils/use-shop-cart";
import type { ShopDictionary, ShopProductContent } from "@shared/types/content";
import type { Locale } from "../i18n";
import { getProductDetailDictionary } from "../content/product-detail-content";

type ProductDetailPageContentProps = {
  product: ShopProductContent;
  dict: ShopDictionary;
  locale: Locale;
};

export function ProductDetailPageContent({ product, dict, locale }: ProductDetailPageContentProps) {
  const text = getProductDetailDictionary(locale);
  const { addProduct } = useShopCart();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [isImageExpanded, setIsImageExpanded] = useState(false);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const tabs = [text.specifications, text.materials, text.included, text.delivery];
  const collection = dict.collections.find((item) => item.id === product.collection)?.label ?? product.collection;
  const categoryLabels = { blueprint: dict.filterBlueprints, file: dict.filterFiles, kit: dict.filterKits, finished: dict.filterFinished };
  const related = dict.products
    .filter((item) => item.id !== product.id && (item.collection === product.collection || item.category === product.category))
    .sort((first, second) => Number(second.collection === product.collection) - Number(first.collection === product.collection))
    .slice(0, 3);
  const formatPrice = (item: ShopProductContent) => new Intl.NumberFormat(locale, {
    style: "currency", currency: item.currency,
  }).format(item.priceCents / 100);
  const specifications = [
    [text.reference, product.id],
    [text.collection, collection],
    [text.category, categoryLabels[product.category]],
    [text.format, product.type === "digital" ? text.digital : text.physical],
  ];

  const closeExpandedImage = useCallback(() => setIsImageExpanded(false), []);
  useEffect(() => {
    if (!isImageExpanded) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeExpandedImage();
    };
    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isImageExpanded, closeExpandedImage]);

  function selectTab(index: number) {
    setActiveTab(index);
    tabRefs.current[index]?.focus();
  }

  return (
    <main id="top">
      <PageIntro compact showCta={false} content={{
        tag: text.productTag,
        title: product.title,
        body: collection,
        ctaPrimary: dict.ctaPrimary,
        ctaSecondary: dict.ctaSecondary,
      }} />

      <section className="bg-background px-4 pb-14 md:px-8 md:pb-20" aria-label={text.details}>
        <div className="mx-auto max-w-7xl">
          <div className="mb-7 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
            <nav aria-label={text.breadcrumb} className="min-w-0 font-label text-[10px] text-text-dim">
              <ol className="flex flex-wrap items-center gap-2">
                <li><Link href={`/${locale}/shop`} className="hover:text-primary">{locale === "es" ? "Tienda" : "Shop"}</Link></li>
                <li aria-hidden="true">/</li>
                <li><Link href={`/${locale}/shop?collection=${encodeURIComponent(product.collection)}`} aria-label={text.filterCollection.replace("{collection}", collection)} className="text-text-dim hover:text-primary">{collection}</Link></li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-primary">{product.title}</li>
              </ol>
            </nav>
            <Link href={`/${locale}/shop`} className="flex min-h-10 items-center gap-2 font-label text-[10px] uppercase text-text-dim hover:text-primary">
              <ArrowIcon className="h-9 w-9 rotate-180" />{text.back}
            </Link>
          </div>

          <div className="grid items-start gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
            <div aria-label={text.gallery}>
              <button type="button" onClick={() => setIsImageExpanded(true)} aria-label={locale === "es" ? `Ampliar ${product.title}` : `Enlarge ${product.title}`} aria-haspopup="dialog" className="group/product relative flex aspect-square w-full items-center justify-center overflow-hidden border border-white/10 bg-cover bg-center text-left focus-visible:outline-2 focus-visible:outline-primary" style={{ backgroundImage: product.image.gradient }}>
                {product.image.src ? (
                  <Image src={product.image.src} alt={product.image.alt} fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-contain" priority />
                ) : (
                  <div role="img" aria-label={`${product.image.alt} — ${text.photoPending}`} className="flex flex-col items-center gap-4 text-white/25">
                    <CubeIcon className="h-32 w-32 md:h-44 md:w-44" />
                    <span className="font-display text-xl font-semibold italic">3D COSPROPS</span>
                    <span className="font-label text-[10px] uppercase text-white/60">{text.photoPending}</span>
                  </div>
                )}
                <span className="absolute left-4 top-4 border border-primary/30 bg-black/75 px-3 py-2 font-label text-[10px] uppercase text-primary">{categoryLabels[product.category]}</span>
                <span aria-hidden="true" className="absolute bottom-4 right-4 flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-black/70 text-primary opacity-0 shadow-[0_0_15px_rgba(212,175,55,0.2)] backdrop-blur-sm transition group-hover/product:opacity-100 group-hover/product:bg-white group-hover/product:text-background group-focus-visible/product:opacity-100"><MagnifyingGlassIcon className="h-9 w-9" /></span>
              </button>
              <div className="mt-3 grid grid-cols-4 gap-3" aria-hidden="true">
                {[0, 1, 2, 3].map((index) => (
                  <div key={index} className={`flex aspect-[4/3] items-center justify-center border bg-surface ${index === 0 ? "border-primary/50" : "border-white/10"}`}>
                    <CubeIcon className={`h-8 w-8 ${index === 0 ? "text-primary/50" : "text-white/10"}`} />
                  </div>
                ))}
              </div>
              <p className="mt-5 break-words font-label text-[10px] uppercase leading-5 text-text-dim">{text.reference}: {product.id}</p>
            </div>

            <div className="min-w-0 border-t-2 border-primary bg-white/[0.035] p-6 md:p-8">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3 font-label text-[10px] uppercase">
                <span className="text-primary">{categoryLabels[product.category]} / {collection}</span>
              </div>
              <h2 className="font-display text-2xl font-semibold leading-tight text-white md:text-3xl">{product.title}</h2>
              <p className="mt-6 font-label text-[10px] uppercase text-text-dim">{text.price}</p>
              <p className="mt-1 font-display text-4xl font-semibold text-primary">{formatPrice(product)}</p>
              <p className="mt-6 font-body text-sm leading-7 text-text-dim">{product.description}</p>

              <fieldset className="mt-8 border-y border-white/10 py-5">
                <legend className="px-2 font-label text-[10px] uppercase text-primary">{text.options}</legend>
                <label className="block font-label text-[10px] uppercase text-text-dim">
                  {text.configuration}
                  <select disabled className="mt-3 block min-h-12 w-full border border-white/15 bg-surface px-3 font-body text-sm normal-case text-text-dim disabled:cursor-not-allowed">
                    <option>{text.pending}</option>
                  </select>
                </label>
              </fieldset>

              <div className="mt-6 flex flex-wrap items-end gap-3">
                <div>
                  <label htmlFor="product-quantity" className="mb-2 block font-label text-[10px] uppercase text-text-dim">{text.quantity}</label>
                  <div className="flex h-12 items-center border border-white/20">
                    <button type="button" title={text.decrease} aria-label={text.decrease} disabled={quantity === 1} onClick={() => setQuantity(quantity - 1)} className="h-full w-10 text-white hover:text-primary disabled:opacity-30">-</button>
                    <input id="product-quantity" type="number" min={1} max={99} value={quantity} onChange={(event) => setQuantity(Math.max(1, Math.min(99, Math.trunc(Number(event.target.value) || 1))))} className="h-full w-12 bg-transparent text-center font-label text-sm text-white [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none" />
                    <button type="button" title={text.increase} aria-label={text.increase} disabled={quantity === 99} onClick={() => setQuantity(quantity + 1)} className="h-full w-10 text-white hover:text-primary disabled:opacity-30">+</button>
                  </div>
                </div>
                <button type="button" onClick={() => setFeedback(addProduct(product, quantity) ? dict.addedToCart.replace("{product}", product.title) : text.error)} className="inline-flex min-h-12 flex-1 items-center justify-center gap-3 bg-primary px-5 py-3 font-label text-[10px] uppercase tracking-widest text-[#0d0d0d] shadow-[0_0_20px_rgba(212,175,55,0.2)] transition-all duration-300 hover:bg-white hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]">
                  <CartIcon />{dict.addToCart}
                </button>
              </div>
              <p role="status" aria-live="polite" className="mt-3 min-h-5 font-body text-xs text-primary">{feedback}</p>
              <p className="mt-3 border-t border-white/10 pt-4 font-body text-xs leading-6 text-text-dim">{text.purchaseNote}</p>
            </div>
          </div>

          <div className="mt-12 border-y border-white/10 py-6 md:mt-16 md:py-8">
            <div role="tablist" aria-label={text.details} className="grid grid-cols-2 gap-2 md:grid-cols-4">
              {tabs.map((tab, index) => (
                <button key={tab} ref={(element) => { tabRefs.current[index] = element; }} id={`product-tab-${index}`} type="button" role="tab" aria-selected={activeTab === index} aria-controls={`product-panel-${index}`} tabIndex={activeTab === index ? 0 : -1} onClick={() => setActiveTab(index)} onKeyDown={(event) => {
                  if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
                  event.preventDefault();
                  selectTab(event.key === "Home" ? 0 : event.key === "End" ? tabs.length - 1 : (index + (event.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length);
                }} className={`flex min-h-12 items-center justify-center gap-2 border px-3 py-3 font-label text-[10px] uppercase leading-5 transition-colors ${activeTab === index ? "border-primary/50 bg-primary/10 text-primary" : "border-white/10 text-text-dim hover:text-white"}`}>
                  <span aria-hidden="true"><SettingsIcon className="h-8 w-8 shrink-0" /></span>{tab}
                </button>
              ))}
            </div>
            {tabs.map((tab, index) => (
              <div key={tab} role="tabpanel" id={`product-panel-${index}`} aria-labelledby={`product-tab-${index}`} hidden={activeTab !== index} tabIndex={0} className="min-h-52 py-7 md:py-8">
                {index === 0 ? (
                  <div className="grid gap-8 md:grid-cols-2">
                    <div><h3 className="mb-3 font-display text-xl text-white">{text.specifications}</h3><p className="font-body text-sm leading-7 text-text-dim">{product.description}</p></div>
                    <dl>{specifications.map(([label, value]) => <div key={label} className="flex flex-wrap justify-between gap-2 border-b border-white/10 py-3 text-sm"><dt className="font-body text-text-dim">{label}</dt><dd className="break-all font-label text-xs text-white">{value}</dd></div>)}</dl>
                  </div>
                ) : (
                  <div className="max-w-3xl"><h3 className="mb-3 font-display text-xl text-white">{tab}</h3><p className="font-body text-sm leading-7 text-text-dim">{index === 1 ? text.materialPending : index === 2 ? (product.type === "digital" ? text.digitalContents : text.physicalContents) : (product.type === "digital" ? text.digitalDelivery : text.physicalDelivery)}</p></div>
                )}
              </div>
            ))}
          </div>

          {related.length > 0 && (
            <section className="pt-12 md:pt-16" aria-labelledby="related-products-title">
              <div className="mb-7 flex flex-wrap items-end justify-between gap-5">
                <div><p className="mb-3 font-label text-[10px] uppercase text-primary">{text.relatedTag}</p><h2 id="related-products-title" className="font-display text-3xl font-semibold italic text-white">{splitGoldTag(text.related)}</h2></div>
                <Link href={`/${locale}/shop`} className="flex min-h-10 items-center gap-2 font-label text-[10px] uppercase text-primary hover:text-white">{text.browse}<ArrowIcon className="h-9 w-9" /></Link>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((item) => (
                  <article key={item.id} className="group border border-white/10 bg-white/[0.035] transition-colors hover:border-primary/45">
                    <Link href={`/${locale}/shop/${item.id}`} className="block h-full">
                      <div className="relative flex aspect-[4/3] items-center justify-center border-b border-white/10 bg-cover bg-center" style={{ backgroundImage: item.image.gradient }}>
                        {item.image.src ? <Image src={item.image.src} alt={item.image.alt} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-contain" /> : <span aria-hidden="true"><CubeIcon className="h-20 w-20 text-white/20" /></span>}
                        <span className="absolute left-3 top-3 bg-black/75 px-2 py-1 font-label text-[9px] uppercase text-primary">{categoryLabels[item.category]}</span>
                      </div>
                      <div className="p-5"><h3 className="min-h-14 font-display text-xl leading-snug text-white group-hover:text-primary">{item.title}</h3><p className="mt-4 font-label text-base text-primary">{formatPrice(item)}</p></div>
                    </Link>
                  </article>
                ))}
              </div>
            </section>
          )}
        </div>
      </section>
      {isImageExpanded && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm md:p-8" role="dialog" aria-modal="true" aria-label={locale === "es" ? `Imagen ampliada de ${product.title}` : `Enlarged image of ${product.title}`} onClick={closeExpandedImage}>
          <div className="relative w-full max-w-5xl" onClick={(event) => event.stopPropagation()}>
            <button type="button" onClick={closeExpandedImage} aria-label={locale === "es" ? "Cerrar" : "Close"} className="absolute -top-12 right-0 z-10 text-white/80 transition-colors hover:text-primary"><CloseIcon className="h-8 w-8" /></button>
            <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden border border-white/10 bg-cover bg-center shadow-[0_0_40px_rgba(212,175,55,0.2)]" style={{ backgroundImage: product.image.gradient }}>
              {product.image.src ? <Image src={product.image.src} alt={product.image.alt} fill sizes="100vw" className="object-contain" /> : <div className="flex flex-col items-center gap-4 text-white/25"><CubeIcon className="h-40 w-40 md:h-56 md:w-56" /><span className="font-display text-xl font-semibold italic">3D COSPROPS</span><span className="font-label text-[10px] uppercase text-white/60">{text.photoPending}</span></div>}
            </div>
            <p className="mt-4 text-center font-display text-lg text-white">{product.title}</p>
          </div>
        </div>
      )}
    </main>
  );
}