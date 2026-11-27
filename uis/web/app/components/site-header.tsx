"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import type { Locale } from "../i18n";
import { ProfileIcon, HamburgerIcon, CloseIcon } from "@shared/icons";

type SiteHeaderProps = {
  locale: Locale;
  nav: Array<{ href: string; label: string }>;
};

export function SiteHeader({ locale, nav }: SiteHeaderProps) {
  const pathname = usePathname();

  // Build locale-switch URL preserving the current path
  const switchHref = useCallback(
    (targetLocale: string) => {
      // Replace locale prefix in pathname: /en/services -> /es/services, /en -> /es
      const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, "");
      return `/${targetLocale}${pathWithoutLocale}`;
    },
    [pathname],
  );

  const [activeHash, setActiveHash] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [mobileProfileOpen, setMobileProfileOpen] = useState(false);

  const isActive = useCallback(
    (href: string) => {
      if (href === "#commissions" && pathname === `/${locale}/commissions`) {
        return true;
      }
      if (href.startsWith("/")) {
        // Route-based link: match pathname
        const fullPath = `/${locale}${href}`;
        return pathname === fullPath;
      }
      // Hash-based link: use intersection observer
      return activeHash === href.replace("#", "");
    },
    [pathname, activeHash, locale],
  );

  useEffect(() => {
    const sections = nav
      .filter((item) => item.href.startsWith("#"))
      .map((item) => document.getElementById(item.href.replace("#", "")))
      .filter(Boolean) as HTMLElement[];

    if (sections.length === 0) return;

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
    setMobileProfileOpen(false);
  }, []);

  // Build href with locale prefix for route-based links
  const navHref = useCallback(
    (href: string) => {
      if (href.startsWith("/")) {
        return `/${locale}${href}`;
      }
      if (href === "#commissions") {
        return `/${locale}/commissions`;
      }
      return href;
    },
    [locale],
  );

  const handleNavClickDesktop = useCallback(
    (href: string) => {
      if (href.startsWith("/")) {
        return;
      }
      // hash link — close mobile menu if open
      setMobileMenuOpen(false);
    },
    [],
  );

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/70 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between px-4 py-3 md:px-8 md:py-4">
        {/* Left: Title */}
        <Link
          href={`/${locale}`}
          className="font-display text-sm font-semibold uppercase tracking-[0.15em] text-primary transition-colors hover:text-[#d4af37]"
          aria-label="3D CosProps"
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
                href={navHref(item.href)}
                onClick={() => handleNavClickDesktop(item.href)}
                aria-current={active ? "page" : undefined}
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
              href={switchHref("en")}
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
              href={switchHref("es")}
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

          <div className="relative hidden md:block">
            <button type="button" onClick={() => setProfileMenuOpen((open) => !open)} aria-expanded={profileMenuOpen} aria-haspopup="menu" aria-label={locale === "es" ? "Menú de usuario" : "User menu"} className="flex text-primary transition-colors hover:text-[#d4af37]">
              <ProfileIcon className="h-[1.5625rem] w-[1.5625rem]" />
            </button>
            {profileMenuOpen && <ProfileDropdown locale={locale} />}
          </div>

          {/* Mobile hamburger */}
          <button
            className="flex md:hidden text-primary transition-colors"
            onClick={() => { setMobileMenuOpen(!mobileMenuOpen); setMobileProfileOpen(false); }}
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
          <nav aria-label={locale === "es" ? "Menú móvil" : "Mobile navigation"} className="flex flex-col px-4 py-6 gap-5">
            {nav.map((item) => {
              const active = isActive(item.href);
              return (
                <a
                  key={item.href}
                  href={navHref(item.href)}
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
              <div>
                <button type="button" onClick={() => setMobileProfileOpen((open) => !open)} aria-expanded={mobileProfileOpen} aria-controls="mobile-profile-options" aria-label={locale === "es" ? "Menú de usuario" : "User menu"} className="flex items-center gap-3 font-label text-sm uppercase tracking-[0.1em] text-primary hover:text-[#d4af37] transition-colors">
                  <ProfileIcon className="h-10 w-10" />
                  {locale === "es" ? "Perfil" : "Profile"}
                </button>
              </div>
              <div className="flex items-center gap-1 font-label text-sm uppercase tracking-[0.1em]">
                <Link
                  href={switchHref("en")}
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
                  href={switchHref("es")}
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
            {mobileProfileOpen && <div id="mobile-profile-options" className="flex w-full flex-col gap-5 border-t border-white/10 pt-5 font-label text-sm uppercase tracking-[0.1em]">
              <Link href={`/${locale}/profile`} onClick={handleNavClick} className="text-text-dim transition-colors hover:text-[#d4af37]">{locale === "es" ? "Perfil de usuario" : "User profile"}</Link>
              <Link href={`/${locale}/cart`} onClick={handleNavClick} className="text-text-dim transition-colors hover:text-[#d4af37]">{locale === "es" ? "Carrito" : "Cart"}</Link>
              <button type="button" disabled title={locale === "es" ? "Disponible al conectar la cuenta" : "Available when your account is connected"} className="cursor-not-allowed text-left text-text-dim opacity-45">{locale === "es" ? "Cerrar sesión" : "Log out"}</button>
            </div>}
          </nav>
        </div>
      )}
    </header>
  );
}

function ProfileDropdown({ locale, onNavigate }: { locale: Locale; onNavigate?: () => void }) {
  const labels = locale === "es"
    ? { profile: "Perfil de usuario", cart: "Carrito", logout: "Logout", unavailable: "Disponible al conectar la cuenta" }
    : { profile: "User profile", cart: "Cart", logout: "Logout", unavailable: "Available when your account is connected" };
  const itemClass = "block w-full px-4 py-3 text-left font-label text-[10px] uppercase tracking-wider text-text-dim transition-colors hover:bg-white/5 hover:text-primary";
  return <div role="menu" className="absolute left-0 top-full z-50 mt-3 min-w-48 border border-white/15 bg-black shadow-xl md:left-auto md:right-0">
    <Link role="menuitem" href={`/${locale}/profile`} onClick={onNavigate} className={itemClass}>{labels.profile}</Link>
    <Link role="menuitem" href={`/${locale}/cart`} onClick={onNavigate} className={itemClass}>{labels.cart}</Link>
    <button role="menuitem" type="button" disabled title={labels.unavailable} className={`${itemClass} cursor-not-allowed opacity-45`}>{labels.logout}</button>
  </div>;
}
