import type { ReactNode } from "react";

type CtaButtonProps = {
  children: ReactNode;
  href: string;
  /** "primary" = gold filled, "secondary" = ghost/outlined */
  variant?: "primary" | "secondary";
  /** Optional extra class names */
  className?: string;
};

/**
 * Reusable CTA button with two brand variants:
 * - `primary`: gold filled button
 * - `secondary`: ghost/outlined with backdrop blur
 */
export function CtaButton({ children, href, variant = "primary", className = "" }: CtaButtonProps) {
  const base =
    "inline-flex w-full sm:w-auto items-center justify-center gap-3 px-6 py-3 sm:px-8 sm:py-4 font-label text-xs uppercase tracking-widest transition-all duration-300";

  const variants = {
    primary:
      "bg-primary text-[#0d0d0d] shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:bg-white hover:text-[#0d0d0d] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]",
    secondary:
      "border border-white/20 bg-white/5 text-white backdrop-blur-sm hover:bg-white hover:text-[#0d0d0d] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]",
  };

  return (
    <a href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </a>
  );
}