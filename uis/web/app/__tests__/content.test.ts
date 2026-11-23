import { describe, it, expect } from "vitest";
import { getDictionary } from "../content";

const requiredKeys = [
  "languageLabel",
  "nav",
  "ctaPrimary",
  "ctaSecondary",
  "heroTag",
  "heroTitle",
  "heroBody",
  "footer",
  "footerNavTitle",
  "footerFollowTitle",
  "footerPrivacyLabel",
  "footerLegalTitle",
  "footerLegalNoticeLabel",
  "footerCookiePolicyLabel",
  "footerTermsLabel",
  "servicesOverviewTitle",
  "servicesOverviewBody",
  "servicesCardTitle",
  "servicesCardBody",
  "servicesCardCta",
  "commissionsCardTitle",
  "commissionsCardBody",
  "commissionsCardCta",
] as const;

describe("content dictionary", () => {
  it("should return a complete dictionary for en", () => {
    const dict = getDictionary("en");
    for (const key of requiredKeys) {
      expect(dict).toHaveProperty(key);
    }
    expect(dict.languageLabel).toBe("Language");
    expect(dict.nav).toHaveLength(5);
  });

  it("should return a complete dictionary for es", () => {
    const dict = getDictionary("es");
    for (const key of requiredKeys) {
      expect(dict).toHaveProperty(key);
    }
    expect(dict.languageLabel).toBe("Idioma");
    expect(dict.nav).toHaveLength(5);
  });

  it("should have matching nav items count in both locales", () => {
    const en = getDictionary("en");
    const es = getDictionary("es");
    expect(en.nav).toHaveLength(es.nav.length);
  });
});