import { PageIntro } from "../../src/ui/page-intro";
import { SectionIntro } from "../../src/ui/section-intro";
import { FeatureCard } from "../../src/ui/feature-card";
import { CarouselSection } from "../../src/ui/carousel-section";
import { SettingsIcon, PenIcon } from "../../src/icons";
import type { HomePageContentDict } from "../../src/types/content";

type HomePageContentProps = {
  dict: HomePageContentDict;
};

export function HomePageContent({ dict }: HomePageContentProps) {
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
      />

      {/* ── Gallery Carousel ── */}
      <CarouselSection
        slides={dict.gallery.slides}
        autoPlayInterval={5000}
      />

      {/* ── Services & Commissions Overview ── */}
      <section className="py-8 md:py-12 px-4 md:px-12 bg-background">
        <div className="max-w-7xl mx-auto">
          <SectionIntro
            title={dict.servicesOverviewTitle}
            body={dict.servicesOverviewBody}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <FeatureCard
              content={{
                title: dict.servicesCardTitle,
                body: dict.servicesCardBody,
                cta: dict.servicesCardCta,
              }}
              icon={<SettingsIcon />}
            />
            <FeatureCard
              content={{
                title: dict.commissionsCardTitle,
                body: dict.commissionsCardBody,
                cta: dict.commissionsCardCta,
              }}
              icon={<PenIcon />}
            />
          </div>
        </div>
      </section>
    </main>
  );
}