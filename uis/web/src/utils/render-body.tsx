import type { ReactNode } from "react";

/**
 * Renders a text string containing `**bold**` markdown into React nodes
 * with `<strong>` elements. Also splits by `\n\n` for paragraph breaks.
 */
export function renderBody(text: string): ReactNode[] {
  return text.split("\n\n").map((paragraph, pi) => {
    const parts = paragraph.split(/(\*\*[^*]+\*\*)/).map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={i} className="text-white font-semibold">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
    return (
      <p key={pi} className="font-body text-sm md:text-base text-text-dim mb-3 leading-relaxed last:mb-0">
        {parts}
      </p>
    );
  });
}