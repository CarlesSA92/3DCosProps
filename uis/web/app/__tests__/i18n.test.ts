import { describe, it, expect } from "vitest";
import { locales, defaultLocale, isLocale } from "../i18n";

describe("i18n", () => {
  it("should have en and es locales", () => {
    expect(locales).toEqual(["es", "en"]);
  });

  it("should have en as default locale", () => {
    expect(defaultLocale).toBe("en");
  });

  it("should validate known locales", () => {
    expect(isLocale("en")).toBe(true);
    expect(isLocale("es")).toBe(true);
  });

  it("should reject unknown locales", () => {
    expect(isLocale("fr")).toBe(false);
    expect(isLocale("de")).toBe(false);
    expect(isLocale("")).toBe(false);
    expect(isLocale("en-US")).toBe(false);
  });
});