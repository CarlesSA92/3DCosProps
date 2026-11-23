"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { PageIntro } from "../../src/ui/page-intro";
import { useShopCart } from "../../src/utils/use-shop-cart";
import { ArrowIcon, CartIcon } from "../../src/icons";
import type { ShopCategory, ShopDictionary, ShopProductContent } from "../../src/types/content";
import type { Locale } from "../i18n";

type ShopPageContentProps = {
  dict: ShopDictionary;
  locale: Locale;
  initialCollection?: string | null;
};

type FilterType = "all" | ShopCategory;
type SortType = "newest" | "price-asc" | "price-desc";

const INITIAL_VISIBLE = 6;

function productCategoryLabel(product: ShopProductContent, dict: ShopDictionary): string {
  if (product.category === "blueprint") return dict.filterBlueprints;
  if (product.category === "kit") return dict.filterKits;
  if (product.category === "file") return dict.filterFiles;
  return dict.filterFinished;
}

export function ShopPageContent({ dict, locale, initialCollection = null }: ShopPageContentProps) {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [activeCollection, setActiveCollection] = useState<string | null>(() =>
    dict.collections.some((collection) => collection.id === initialCollection) ? initialCollection : null,
  );
  const [sortBy, setSortBy] = useState<SortType>("newest");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const { cart, addProduct } = useShopCart();
  const [feedback, setFeedback] = useState("");
  const collectionsRef = useRef<HTMLDivElement>(null);
  const [canScrollPrevious, setCanScrollPrevious] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  function updateCollectionScroll() {
    const track = collectionsRef.current;
    if (!track) return;
    setCanScrollPrevious(track.scrollLeft > 1);
    setCanScrollNext(track.scrollLeft + track.clientWidth < track.scrollWidth - 1);
  }

  useEffect(() => {
    const track = collectionsRef.current;
    const selected = track?.querySelector('[aria-pressed="true"]');
    if (track && selected) {
      const offset = selected.getBoundingClientRect().right - track.getBoundingClientRect().right;
      if (offset > 0) track.scrollLeft += offset;
    }
    updateCollectionScroll();
    window.addEventListener("resize", updateCollectionScroll);
    return () => window.removeEventListener("resize", updateCollectionScroll);
  }, [dict.collections.length]);

  function scrollCollections(direction: number) {
    const track = collectionsRef.current;
    const firstItem = track?.firstElementChild;
    if (!track || !firstItem) return;
    const gap = parseFloat(window.getComputedStyle(track).columnGap) || 0;
    track.scrollBy({ left: direction * (firstItem.getBoundingClientRect().width + gap), behavior: "smooth" });
  }

  const filters: { key: FilterType; label: string }[] = [
    { key: "all", label: dict.filterAll },
    { key: "blueprint", label: dict.filterBlueprints },
    { key: "kit", label: dict.filterKits },
    { key: "file", label: dict.filterFiles },
    { key: "finished", label: dict.filterFinished },
  ];

  const collections = [...dict.collections].sort((a, b) => a.label.localeCompare(b.label, locale));
  const filteredProducts = dict.products.filter((product) =>
    (activeFilter === "all" || product.category === activeFilter)
    && (activeCollection === null || product.collection === activeCollection),
  );
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-asc") return a.priceCents - b.priceCents;
    if (sortBy === "price-desc") return b.priceCents - a.priceCents;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
  const visibleProducts = sortedProducts.slice(0, visibleCount);
  const hasMore = visibleCount < sortedProducts.length;
  const cartCount = cart.items.reduce((count, item) => count + item.quantity, 0);

  function handleFilter(filter: FilterType) {
    setActiveFilter(filter);
    setVisibleCount(INITIAL_VISIBLE);
  }

  function handleCollection(collection: string | null) {
    setActiveCollection(collection);
    setVisibleCount(INITIAL_VISIBLE);
  }

  function handleSort(value: SortType) {
    setSortBy(value);
    setVisibleCount(INITIAL_VISIBLE);
  }

  function handleAddToCart(product: ShopProductContent) {
    setFeedback(addProduct(product) ? dict.addedToCart.replace("{product}", product.title) : "");
  }

  const formatPrice = (product: ShopProductContent) =>
    new Intl.NumberFormat(locale, {
      style: "currency",
      currency: product.currency,
    }).format(product.priceCents / 100);

  return (
    <main id="top">
      <PageIntro
        content={{
          tag: dict.heroTag,
          title: dict.heroTitle,
          body: dict.heroBody,
          ctaPrimary: dict.ctaPrimary,
          ctaSecondary: dict.ctaSecondary,
        }}
        showCta={false}
        compact
      />

      <section className="bg-background px-4 pb-4 pt-2 md:px-8 md:pb-8 md:pt-3" aria-label={dict.collectionsTitle}>
        <div className="mx-auto max-w-7xl">
          <div className="@container mx-auto mb-5 pb-3 md:mb-7 lg:w-[calc((100%_+_104px)/2)]">
          <div className="flex items-start gap-1 md:gap-3">
            <button type="button" onClick={() => scrollCollections(-1)} disabled={!canScrollPrevious} aria-label={locale === "es" ? "Universos anteriores" : "Previous universes"} title={locale === "es" ? "Universos anteriores" : "Previous universes"} className="relative top-[calc((100cqw_-_96px)/6)] flex h-10 w-8 shrink-0 -translate-y-1/2 items-center justify-center text-primary disabled:opacity-30 sm:top-[calc((100cqw_-_108px)/8)] md:top-[calc((100cqw_-_140px)/8)] md:h-12 md:w-10 lg:top-[calc((100cqw_-_164px)/12)]">
              <ArrowIcon className="h-6 w-6 rotate-180" />
            </button>
            <div ref={collectionsRef} onScroll={updateCollectionScroll} className={`flex min-w-0 flex-1 snap-x snap-mandatory items-start gap-3 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${collections.length < 6 ? "lg:justify-center" : ""}`} role="group" aria-label={dict.collectionsTitle}>
            <button
              type="button"
              onClick={() => handleCollection(null)}
              aria-pressed={activeCollection === null}
              className={`w-[calc((100%_-_24px)/3)] shrink-0 snap-start text-left sm:w-[calc((100%_-_36px)/4)] lg:w-[calc((100%_-_60px)/6)] ${activeCollection === null ? "text-primary" : "text-text-dim hover:text-white"}`}
            >
              <span className={`mb-2 block aspect-square border bg-surface p-2 transition-colors md:p-3 ${activeCollection === null ? "border-primary" : "border-white/10 hover:border-primary/50"}`}>
                <span className="flex h-full items-center justify-center border border-white/10 font-label text-[9px] uppercase tracking-widest">3D CP</span>
              </span>
              <span className="block break-words font-label text-[9px] uppercase leading-tight md:text-[10px]">{dict.allCollections}</span>
            </button>
            {collections.map((collection) => (
              <button
                key={collection.id}
                type="button"
                onClick={() => handleCollection(collection.id)}
                aria-pressed={activeCollection === collection.id}
                aria-label={collection.label}
                className={`w-[calc((100%_-_24px)/3)] shrink-0 snap-start text-left sm:w-[calc((100%_-_36px)/4)] lg:w-[calc((100%_-_60px)/6)] ${activeCollection === collection.id ? "text-primary" : "text-text-dim hover:text-white"}`}
              >
                <span className={`mb-2 block aspect-square border bg-cover bg-center p-2 transition-colors md:p-3 ${activeCollection === collection.id ? "border-primary" : "border-white/10 hover:border-primary/50"}`} style={{ backgroundImage: collection.gradient }}>
                  <span className="flex h-full items-center justify-center border border-white/15 bg-black/20 font-display text-lg font-semibold uppercase italic text-white/35" aria-hidden="true">3D</span>
                </span>
                <span className="block break-words font-label text-[9px] uppercase leading-tight md:text-[10px]">{collection.label}</span>
              </button>
            ))}
            </div>
            <button type="button" onClick={() => scrollCollections(1)} disabled={!canScrollNext} aria-label={locale === "es" ? "Universos siguientes" : "Next universes"} title={locale === "es" ? "Universos siguientes" : "Next universes"} className="relative top-[calc((100cqw_-_96px)/6)] flex h-10 w-8 shrink-0 -translate-y-1/2 items-center justify-center text-primary disabled:opacity-30 sm:top-[calc((100cqw_-_108px)/8)] md:top-[calc((100cqw_-_140px)/8)] md:h-12 md:w-10 lg:top-[calc((100cqw_-_164px)/12)]">
              <ArrowIcon className="h-6 w-6" />
            </button>
          </div>
          </div>

          <div className="mb-8 flex flex-col gap-5 border-b border-white/10 pb-5 md:mb-8 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center gap-2" role="group" aria-label={dict.collectionsTitle}>
              {[filters[0], filters[2], filters[3], filters[1], filters[4]].map((filter) => (
                <button
                  key={filter.key}
                  type="button"
                  onClick={() => handleFilter(filter.key)}
                  aria-pressed={activeFilter === filter.key}
                  className={`min-h-10 border px-4 font-label text-[10px] uppercase transition-colors md:px-5 ${
                    activeFilter === filter.key
                      ? "border-primary bg-primary text-[#0d0d0d]"
                      : "border-white/10 bg-white/[0.03] text-text-dim hover:border-primary/60 hover:text-primary"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 md:justify-end">
              <label className="flex items-center gap-3 font-label text-[10px] uppercase text-text-dim">
                {dict.sortLabel}
                <select
                  value={sortBy}
                  onChange={(event) => handleSort(event.target.value as SortType)}
                  className="min-h-10 border border-white/15 bg-surface px-3 text-[10px] text-white outline-none focus:border-primary"
                >
                  <option value="newest">{dict.sortNewest}</option>
                  <option value="price-asc">{dict.sortPriceLow}</option>
                  <option value="price-desc">{dict.sortPriceHigh}</option>
                </select>
              </label>
              <p className="flex items-center gap-2 font-label text-[10px] uppercase text-primary" aria-label={`${dict.cartLabel}: ${cartCount}`}>
                <CartIcon className="h-4 w-4" />
                {dict.cartLabel} ({cartCount})
              </p>
            </div>
          </div>

          <p className="sr-only" role="status" aria-live="polite">{feedback}</p>

          {visibleProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
              {visibleProducts.map((product, index) => (
                <article
                  key={product.id}
                  className="group flex flex-col overflow-hidden border border-white/10 bg-white/[0.035] transition-colors duration-300 hover:border-primary/45"
                  style={{ animationDelay: `${(index % 3) * 90}ms` }}
                >
                  <Link href={`/${locale}/shop/${product.id}`} aria-label={product.title}>
                  <div
                    role="img"
                    aria-label={product.image.alt}
                    className="relative flex aspect-[4/3] items-center justify-center overflow-hidden border-b border-white/10 bg-cover bg-center"
                    style={{ backgroundImage: product.image.gradient }}
                  >
                    <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_49%,rgba(255,255,255,0.035)_50%,transparent_51%),linear-gradient(0deg,transparent_49%,rgba(255,255,255,0.035)_50%,transparent_51%)] bg-[size:32px_32px] opacity-60" />
                    <span className="relative font-display text-4xl font-semibold uppercase italic text-white/20 md:text-5xl" aria-hidden="true">
                      3D
                    </span>
                    <span className="absolute left-3 top-3 border border-primary/30 bg-black/75 px-2 py-1 font-label text-[9px] uppercase text-primary">
                      {productCategoryLabel(product, dict)}
                    </span>
                    <span className="absolute bottom-3 right-3 font-label text-[9px] uppercase text-white/40" aria-hidden="true">
                      3D CosProps / {product.category}
                    </span>
                  </div>
                  </Link>

                  <div className="flex flex-1 flex-col p-5 md:p-6">
                    <h3 className="mb-2 font-display text-lg leading-snug text-white md:text-xl"><Link href={`/${locale}/shop/${product.id}`} className="hover:text-primary">{product.title}</Link></h3>
                    <p className="mb-6 flex-1 font-body text-sm leading-6 text-text-dim">{product.description}</p>
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <p className="font-label text-base font-semibold text-primary">{formatPrice(product)}</p>
                      <button
                        type="button"
                        onClick={() => handleAddToCart(product)}
                        aria-label={`${dict.addToCart}: ${product.title}`}
                        className="min-h-10 border border-white/20 px-4 font-label text-[10px] uppercase text-white transition-colors hover:border-primary hover:bg-primary hover:text-[#0d0d0d]"
                      >
                        {dict.addToCart}
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="py-16 text-center font-body text-sm text-text-dim">{dict.noProducts}</p>
          )}

          <div className="mt-10 flex min-h-12 flex-col items-center justify-center gap-3 md:mt-12" aria-live="polite">
            {hasMore ? (
              <button
                type="button"
                onClick={() => setVisibleCount((count) => count + INITIAL_VISIBLE)}
                className="min-h-11 border border-white/20 px-7 font-label text-[10px] uppercase text-white transition-colors hover:border-primary hover:text-primary"
              >
                {dict.loadMore}
              </button>
            ) : sortedProducts.length > 0 && visibleCount >= sortedProducts.length ? (
              <p className="font-body text-sm text-text-dim/70">{dict.noMoreProducts}</p>
            ) : null}
          </div>
        </div>
      </section>
    </main>
  );
}