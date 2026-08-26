import type { ReactNode } from "react";

type SectionIntroProps = {
  title: string;
  body?: string;
  children?: ReactNode;
};

/**
 * Reusable section heading with an optional subtitle.
 * Used for sections like "Do you have a project…", capabilities, featured work, etc.
 */
export function SectionIntro({ title, body, children }: SectionIntroProps) {
  return (
    <div className="text-center mb-12 md:mb-16 max-w-3xl mx-auto px-2">
      <h2 className="font-display text-2xl md:text-4xl text-white mb-4 md:mb-6">
        {title}
      </h2>
      {body && (
        <p className="font-body text-sm md:text-base text-text-dim">
          {body}
        </p>
      )}
      {children}
    </div>
  );
}