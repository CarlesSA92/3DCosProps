import { splitGoldTag } from "../utils/split-gold-tag";
import { ScalesBackground } from "./scales-background";
import { CtaButton } from "./cta-button";
import type { PageIntroContent } from "../types/content";

type PageIntroProps = {
  content: PageIntroContent;
  /** Scale background opacity. Default 0.3 */
  bgOpacity?: number;
  /** Whether to show the CTA buttons. Default true */
  showCta?: boolean;
  /** Compact mode: removes min-h-[90vh] and tightens vertical spacing. */
  compact?: boolean;
  /** Additional classes for the section container. Override min-height etc. */
  className?: string;
};

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

/**
 * Full-viewport page intro section with scales background,
 * tag line, animated title, body text, and two CTA buttons.
 * Reusable across pages as a consistent hero/introduction.
 */
export function PageIntro({ content, bgOpacity = 0.3, showCta = true, compact = false, className = "" }: PageIntroProps) {
  return (
    <section className={`relative flex ${compact ? "py-12 md:py-16" : "min-h-[90vh]"} items-center justify-center overflow-hidden px-6 md:px-8 ${className}`}>
      <ScalesBackground opacity={bgOpacity} />

      <div className={`relative z-10 mx-auto max-w-4xl text-center ${compact ? "my-[50px]" : ""}`}>
        {/* Tag with decorative lines */}
        <p className={`animate-reveal-up opacity-0 flex items-center justify-center gap-3 font-display text-xs uppercase italic tracking-[0.2em] text-primary ${compact ? "mb-3" : "mb-6"}`}>
          <span className="inline-block h-px w-8 bg-primary" />
          {content.tag}
          <span className="inline-block h-px w-8 bg-primary" />
        </p>

        {/* Title — render <gold> as styled span */}
        <h1 className={`animate-reveal-up-1 opacity-0 font-display text-3xl leading-[1.08] font-bold italic tracking-[-0.02em] text-white sm:text-4xl md:text-7xl md:leading-[1.06] ${compact ? "mb-2" : ""}`}>
          {splitGoldTag(content.title, "pr-2")}
        </h1>

        {/* Body */}
        <p className={`animate-reveal-up-2 opacity-0 mx-auto max-w-2xl text-base leading-7 text-text-dim md:text-lg md:leading-8 ${compact ? "mt-2" : "mt-6"}`}>
          {content.body}
        </p>

        {/* CTA buttons */}
        {showCta && (
          <div className="animate-reveal-up-3 opacity-0 mt-8 sm:mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:w-auto">
            <CtaButton href="#projects" variant="primary">
              {content.ctaSecondary}
              <ArrowIcon />
            </CtaButton>
            <CtaButton href="#commissions" variant="secondary">
              {content.ctaPrimary}
              <EditIcon />
            </CtaButton>
          </div>
        )}
      </div>
    </section>
  );
}