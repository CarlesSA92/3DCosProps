import { PageIntro } from "../../src/ui/page-intro";
import { CtaButton } from "../../src/ui/cta-button";
import { renderBody } from "../../src/utils/render-body";
import { splitGoldTag } from "../../src/utils/split-gold-tag";
import {
  CubeIcon,
  BrushIcon,
  SwordIcon,
  HelmetIcon,
  MessageIcon,
  SprayIcon,
} from "../../src/icons";
import type { ServicesDictionary } from "../../src/types/content";
import type { ReactNode } from "react";

type ServicesPageContentProps = {
  dict: ServicesDictionary;
};

function getServiceIcon(id: string): ReactNode {
  const iconMap: Record<string, ReactNode> = {
    modeling: <CubeIcon />,
    printing: <BrushIcon />,
    finishing: <SprayIcon />,
    "prop-fabrication": <SwordIcon />,
    cosplay: <HelmetIcon />,
    consultation: <MessageIcon />,
  };
  return iconMap[id] ?? <CubeIcon />;
}

export function ServicesPageContent({ dict }: ServicesPageContentProps) {
  return (
    <main id="top">
      {/* ── Hero Section ── */}
      <PageIntro
        content={{
          tag: dict.heroTag,
          title: dict.heroTitle,
          body: dict.heroBody,
          ctaSecondary: dict.ctaSecondary,
          ctaPrimary: dict.ctaPrimary,
        }}
        showCta={false}
        compact
      />

      {/* ── Services Grid ── */}
      <section className="py-4 md:py-8 px-4 md:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {dict.services.map((service, index) => (
              <article
                key={service.id}
                className="group bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-lg p-6 md:p-8 flex flex-col hover:border-primary/50 transition-all duration-500 relative overflow-hidden"
                style={{
                  animationDelay: `${(index % 3) * 120}ms`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 flex flex-col h-full">
                  {/* Icon — centered at top */}
                  <div className="w-16 h-16 md:w-20 md:h-20 mb-5 md:mb-6 mx-auto text-primary flex items-center justify-center border border-white/10 rounded-full group-hover:scale-110 transition-transform duration-500 shadow-[0_0_15px_rgba(212,175,55,0.1)] group-hover:shadow-[0_0_25px_rgba(212,175,55,0.3)]">
                    {getServiceIcon(service.id)}
                  </div>

                  {/* Title */}
                  <h2 className="font-display text-xl md:text-2xl text-white mb-3 md:mb-4 text-center">
                    {splitGoldTag(service.title)}
                  </h2>

                  {/* Body — grows to push ticks to bottom */}
                  <div className="mb-5 md:mb-6 flex-1 space-y-3">
                    {renderBody(service.body)}
                  </div>

                  {/* Features list — pinned to bottom */}
                  <ul className="space-y-2.5 mt-auto" role="list">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 font-body text-sm text-text-dim/80"
                      >
                        <svg
                          className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA Section ── */}
      <section className="py-20 md:py-28 px-4 md:px-8 bg-background border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-2xl md:text-4xl text-white mb-4 md:mb-6">
            {splitGoldTag(dict.ctaTitle)}
          </h2>
          <div className="font-body text-sm md:text-base text-text-dim mb-8 md:mb-10 max-w-2xl mx-auto space-y-3">
            {renderBody(dict.ctaBody)}
          </div>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:w-auto">
            <CtaButton href="/commissions" variant="primary">
              {dict.ctaPrimary}
            </CtaButton>
          </div>
        </div>
      </section>
    </main>
  );
}