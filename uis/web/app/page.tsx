import type { Metadata } from "next";

import { getDictionary } from "./content";
import { HomePageContent } from "./components/home-page-content";
import { SiteHeader } from "./components/site-header";
import { SiteFooter } from "./components/site-footer";

export const metadata: Metadata = {
  title: "Home | Premium 3D modeling and printing studio",
  description:
    "3D modeling and printing studio for high-fidelity props, custom commissions, and professional finishing.",
  alternates: {
    canonical: "/en",
    languages: {
      en: "/en",
      es: "/es",
    },
  },
};

export default function Home() {
  const dict = getDictionary("en");
  return (
    <div className="relative min-h-screen bg-background">
      <div
        className="pointer-events-none fixed inset-0 -z-10 bg-[url('/media/Background-Scales.png')] bg-repeat opacity-[0.04]"
        aria-hidden="true"
      />
      <SiteHeader
        locale="en"
        languageLabel={dict.languageLabel}
        nav={dict.nav}
      />
      <HomePageContent dict={dict} />
      <SiteFooter
        text={dict.footer}
        nav={dict.nav}
        footerNavTitle={dict.footerNavTitle}
        footerFollowTitle={dict.footerFollowTitle}
        footerPrivacyLabel={dict.footerPrivacyLabel}
      />
    </div>
  );
}
