import { describe, it, expect } from "vitest";
import sitemap from "../sitemap";

describe("sitemap.xml", () => {
  const entries = sitemap();

  it("should return both locale entries", () => {
    expect(entries).toHaveLength(2);
  });

  it("should have /en entry", () => {
    const enEntry = entries.find((e) => e.url === "https://3dcosprops.com/en");
    expect(enEntry).toBeDefined();
    expect(enEntry?.priority).toBe(1);
    expect(enEntry?.changeFrequency).toBe("weekly");
  });

  it("should have /es entry", () => {
    const esEntry = entries.find((e) => e.url === "https://3dcosprops.com/es");
    expect(esEntry).toBeDefined();
    expect(esEntry?.priority).toBe(1);
    expect(esEntry?.changeFrequency).toBe("weekly");
  });

  it("should have valid lastModified dates", () => {
    for (const entry of entries) {
      expect(entry.lastModified).toBeInstanceOf(Date);
    }
  });
});