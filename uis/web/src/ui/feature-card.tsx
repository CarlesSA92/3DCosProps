import type { FeatureCardContent } from "../types/content";

type FeatureCardProps = {
  /** The content (title, body, cta label) */
  content: FeatureCardContent;
  /** Icon element to display at the top */
  icon: React.ReactNode;
  /** Optional click handler for when page is built */
  onClick?: () => void;
};

/**
 * Reusable feature card with glassmorphism style, icon, title, body and CTA.
 * Used for Services and Commissions overview cards on Home,
 * and reusable for other feature highlights across pages.
 */
export function FeatureCard({ content, icon }: FeatureCardProps) {
  return (
    <article className="group bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-lg p-6 md:p-10 flex flex-col items-center text-center hover:border-primary/50 transition-all duration-500 relative overflow-hidden cursor-pointer">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="w-16 h-16 md:w-24 md:h-24 mb-6 md:mb-8 text-primary flex items-center justify-center border border-white/10 rounded-full group-hover:scale-110 transition-transform duration-500 shadow-[0_0_15px_rgba(212,175,55,0.1)] group-hover:shadow-[0_0_25px_rgba(212,175,55,0.3)]">
        {icon}
      </div>
      <h3 className="font-display text-xl md:text-2xl text-white mb-3 md:mb-4">{content.title}</h3>
      <p className="font-body text-sm md:text-base text-text-dim mb-6 md:mb-8">
        {content.body}
      </p>
      <span className="font-label text-xs text-primary uppercase tracking-widest flex items-center gap-2 mt-auto">
        {content.cta}
        <svg className="w-4 h-4 group-hover:translate-x-2 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </span>
    </article>
  );
}