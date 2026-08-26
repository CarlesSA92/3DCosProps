import type { ReactNode } from "react";
import Image from "next/image";

export type HomePageContentDict = {
  heroTag: string;
  heroTitle: string;
  heroBody: string;
  ctaSecondary: string;
  ctaPrimary: string;
  servicesOverviewTitle: string;
  servicesOverviewBody: string;
  servicesCardTitle: string;
  servicesCardBody: string;
  servicesCardCta: string;
  commissionsCardTitle: string;
  commissionsCardBody: string;
  commissionsCardCta: string;
};

type HomePageContentProps = {
  dict: HomePageContentDict;
};

export function HomePageContent({ dict }: HomePageContentProps) {
  return (
    <main id="top">
      {/* ── Hero Section ── */}
      <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden px-6 md:px-8">
        {/* Scales background with gradient overlay — full viewport */}
        <div className="absolute inset-0 z-0">
          <Image
            alt=""
            src="/media/Background-Scales.png"
            fill
            className="object-cover opacity-30"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          {/* Tag with decorative lines */}
          <p className="animate-reveal-up opacity-0 mb-6 flex items-center justify-center gap-3 font-display text-xs uppercase italic tracking-[0.2em] text-primary">
            <span className="inline-block h-px w-8 bg-primary" />
            {dict.heroTag}
            <span className="inline-block h-px w-8 bg-primary" />
          </p>

          {/* Title — render <gold> as a styled span */}
          <h1 className="animate-reveal-up-1 opacity-0 font-display text-3xl leading-[1.08] font-bold italic tracking-[-0.02em] text-white sm:text-4xl md:text-7xl md:leading-[1.06]">
            {splitGoldTag(dict.heroTitle)}
          </h1>

          {/* Body */}
          <p className="animate-reveal-up-2 opacity-0 mx-auto mt-6 max-w-2xl text-base leading-7 text-text-dim md:text-lg md:leading-8">
            {dict.heroBody}
          </p>

          {/* CTA buttons */}
          <div className="animate-reveal-up-3 opacity-0 mt-8 sm:mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:w-auto">
            <a
              href="#projects"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-3 bg-primary px-6 py-3 sm:px-8 sm:py-4 font-label text-xs uppercase tracking-widest text-[#0d0d0d] shadow-[0_0_20px_rgba(212,175,55,0.2)] transition-all duration-300 hover:bg-white hover:text-[#0d0d0d] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]"
            >
              {dict.ctaSecondary}
              <ArrowIcon />
            </a>

            <a
              href="#commissions"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-3 border border-white/20 bg-white/5 px-6 py-3 sm:px-8 sm:py-4 font-label text-xs uppercase tracking-widest text-white backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-[#0d0d0d] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]"
            >
              {dict.ctaPrimary}
              <EditIcon />
            </a>
          </div>
        </div>
      </section>

      {/* ── Services & Commissions Overview ── */}
      <section className="py-16 md:py-24 px-4 md:px-12 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16 max-w-3xl mx-auto px-2">
            <h2 className="font-display text-2xl md:text-4xl text-white mb-4 md:mb-6">
              {dict.servicesOverviewTitle}
            </h2>
            <p className="font-body text-sm md:text-base text-text-dim">
              {dict.servicesOverviewBody}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Services Card */}
            <a
              className="group bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-lg p-6 md:p-10 flex flex-col items-center text-center hover:border-primary/50 transition-all duration-500 relative overflow-hidden"
              href="#"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="w-16 h-16 md:w-24 md:h-24 mb-6 md:mb-8 text-primary flex items-center justify-center border border-white/10 rounded-full group-hover:scale-110 transition-transform duration-500 shadow-[0_0_15px_rgba(212,175,55,0.1)] group-hover:shadow-[0_0_25px_rgba(212,175,55,0.3)]">
                <SettingsIcon />
              </div>
              <h3 className="font-display text-xl md:text-2xl text-white mb-3 md:mb-4">{dict.servicesCardTitle}</h3>
              <p className="font-body text-sm md:text-base text-text-dim mb-6 md:mb-8">
                {dict.servicesCardBody}
              </p>
              <span className="font-label text-xs text-primary uppercase tracking-widest flex items-center gap-2 mt-auto">
                {dict.servicesCardCta}
                <svg className="w-4 h-4 group-hover:translate-x-2 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </span>
            </a>
            {/* Commissions Card */}
            <a
              className="group bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-lg p-6 md:p-10 flex flex-col items-center text-center hover:border-primary/50 transition-all duration-500 relative overflow-hidden"
              href="#"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="w-16 h-16 md:w-24 md:h-24 mb-6 md:mb-8 text-primary flex items-center justify-center border border-white/10 rounded-full group-hover:scale-110 transition-transform duration-500 shadow-[0_0_15px_rgba(212,175,55,0.1)] group-hover:shadow-[0_0_25px_rgba(212,175,55,0.3)]">
                <PenIcon />
              </div>
              <h3 className="font-display text-xl md:text-2xl text-white mb-3 md:mb-4">{dict.commissionsCardTitle}</h3>
              <p className="font-body text-sm md:text-base text-text-dim mb-6 md:mb-8">
                {dict.commissionsCardBody}
              </p>
              <span className="font-label text-xs text-primary uppercase tracking-widest flex items-center gap-2 mt-auto">
                {dict.commissionsCardCta}
                <svg className="w-4 h-4 group-hover:translate-x-2 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

function splitGoldTag(text: string): ReactNode[] {
  return text.split(/<gold>|<\/gold>/).map((part, i) =>
    i % 2 === 1 ? (
      <span
        key={i}
        className="bg-gradient-to-r from-primary to-primary-container bg-clip-text text-transparent pr-2"
      >
        {part}
      </span>
    ) : (
      part
    ),
  );
}

function ArrowIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg className="w-8 h-8 md:w-10 md:h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.41 1z" />
    </svg>
  );
}

function PenIcon() {
  return (
    <svg className="w-8 h-8 md:w-10 md:h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
    </svg>
  );
}