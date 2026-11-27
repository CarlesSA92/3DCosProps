import type { ButtonProps } from "../types/ui";

const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "bg-primary text-on-primary hover:bg-white",
  secondary: "border border-white/20 text-text-dim hover:border-primary hover:text-primary",
  ghost: "text-text-dim hover:bg-white/5 hover:text-white",
  danger: "border border-red-400/30 text-red-300 hover:bg-red-400/10",
};

const sizes: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "min-h-9 px-3 text-[10px]",
  md: "min-h-11 px-5 text-xs",
  lg: "min-h-12 px-6 text-xs",
};

/** Shared visual button primitive; preserves native button semantics. */
export function Button({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
  onClick,
  "aria-label": ariaLabel,
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
      className={`inline-flex items-center justify-center gap-2 font-label uppercase tracking-[0.12em] transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
}
