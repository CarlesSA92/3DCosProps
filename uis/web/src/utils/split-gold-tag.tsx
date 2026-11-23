import type { ReactNode } from "react";

/**
 * Splits a text containing `<gold>` and `</gold>` tags and wraps
 * each gold segment in a styled `<span>` with a gold gradient.
 */
export function splitGoldTag(text: string, goldClassName = ""): ReactNode[] {
  return text.split(/<gold>|<\/gold>/).map((part, i) =>
    i % 2 === 1 ? (
      <span
        key={i}
        className={`bg-gradient-to-r from-primary to-primary-container bg-clip-text text-transparent ${goldClassName}`}
      >
        {part}
      </span>
    ) : (
      part
    ),
  );
}