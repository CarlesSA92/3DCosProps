"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import type { Locale } from "../i18n";
import { ProfileIcon, HamburgerIcon, CloseIcon } from "../../src/icons";

type SiteHeaderProps = {
  locale: Locale;
  languageLabel: string;
  nav: Array<{ href: string; label: string }>;
};

export function SiteHeader({ locale, languageLabel, nav }: SiteHeaderProps) {
  const pathname = usePathname();
  const alternateLocale = locale === "en" ? "es" : "en";
  const [activeHash, setActiveHash] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = useCallback(
    (href: string) => {
      if (href === "/") {
        return pathname === `/${locale}` || pathname === "/";
      }
      return activeHash === href.replace("#", "");
    },
    [pathname, activeHash, locale],
  );

  useEffect(() => {
    const sections = nav
      .filter((item) => item.href.startsWith("#"))
      .map((item) => document.getElementById(item.href.replace("#", "")))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveHash(entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );

    for (const section of sections) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, [nav]);

  // Close mobile menu when clicking a nav link
  const handleNavClick = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/70 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between px-4 py-3 md:px-8 md:py-4">
        {/* Left: Title */}
        <Link
          href={`/${locale}`}
          className="font-display text-sm font-semibold uppercase tracking-[0.15em] text-primary transition-colors hover:text-[#d4af37]"
        >
          3D CosProps
        </Link>

        {/* Desktop: Navigation */}
        <nav aria-label="Main navigation" className="hidden md:flex items-center gap-8">
          {nav.map((item) => {
            const active = isActive(item.href);
            return (
              <a
                key={item.href}
                href={item.href}
                className={`font-label text-[11px] uppercase tracking-[0.1em] transition-colors ${
                  active
                    ? "border-b border-[#d4af37] font-semibold text-[#d4af37]"
                    : "text-text-dim hover:text-[#d4af37]"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Right: Locale Toggle + Profile + Mobile hamburger */}
        <div className="flex items-center gap-3 md:gap-4">
          <div className="hidden md:flex items-center gap-1 font-label text-[11px] uppercase tracking-[0.1em]">
            <Link
              href="/en"
              className={`transition-colors ${
                locale === "en"
                  ? "text-[#d4af37]"
                  : "text-text-dim/40 hover:text-[#d4af37]"
              }`}
              aria-label="Switch to English"
            >
              EN
            </Link>
            <span className="text-text-dim/30">|</span>
            <Link
              href="/es"
              className={`transition-colors ${
                locale === "es"
                  ? "text-[#d4af37]"
                  : "text-text-dim/40 hover:text-[#d4af37]"
              }`}
              aria-label="Cambiar a Español"
            >
              ES
            </Link>
          </div>

          <a
            href="#"
            className="hidden md:flex text-text-dim transition-colors hover:text-[#d4af37]"
            aria-label="User profile"
          >
            <ProfileIcon />
          </a>

          {/* Mobile hamburger */}
          <button
            className="flex md:hidden text-text-dim hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <CloseIcon />
            ) : (
              <HamburgerIcon />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-black/95 backdrop-blur-xl">
          <nav aria-label="Mobile navigation" className="flex flex-col px-4 py-6 gap-5">
            {nav.map((item) => {
              const active = isActive(item.href);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={handleNavClick}
                  className={`font-label text-sm uppercase tracking-[0.1em] transition-colors ${
                    active
                      ? "text-[#d4af37] font-semibold"
                      : "text-text-dim hover:text-[#d4af37]"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
            {/* Mobile locale switcher + profile */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <a
                href="#"
                onClick={handleNavClick}
                className="flex items-center gap-3 font-label text-sm uppercase tracking-[0.1em] text-text-dim hover:text-[#d4af37] transition-colors"
                aria-label="User profile"
              >
                <ProfileIcon className="h-5 w-5" />
                {locale === "es" ? "Perfil" : "Profile"}
              </a>
              <div className="flex items-center gap-1 font-label text-sm uppercase tracking-[0.1em]">
                <Link
                  href="/en"
                  onClick={handleNavClick}
                  className={`transition-colors ${
                    locale === "en"
                      ? "text-[#d4af37]"
                      : "text-text-dim/40 hover:text-[#d4af37]"
                  }`}
                  aria-label="Switch to English"
                >
                  EN
                </Link>
                <span className="text-text-dim/30 mx-1">|</span>
                <Link
                  href="/es"
                  onClick={handleNavClick}
                  className={`transition-colors ${
                    locale === "es"
                      ? "text-[#d4af37]"
                      : "text-text-dim/40 hover:text-[#d4af37]"
                  }`}
                  aria-label="Cambiar a Español"
                >
                  ES
                </Link>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
