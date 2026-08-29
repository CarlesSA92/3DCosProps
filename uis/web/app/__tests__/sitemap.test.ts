import { describe, it, expect } from "vitest";
import sitemap from "../sitemap";

describe("sitemap.xml", () => {
  const entries = sitemap();

  const expectedRoutes = [
    { path: "/en", priority: 1 },
    { path: "/es", priority: 1 },
    { path: "/en/services", priority: 0.9 },
    { path: "/es/services", priority: 0.9 },
    { path: "/en/projects", priority: 0.9 },
    { path: "/es/projects", priority: 0.9 },
    { path: "/en/privacy-policy", priority: 0.5 },
    { path: "/es/privacy-policy", priority: 0.5 },
    { path: "/en/cookie-policy", priority: 0.5 },
    { path: "/es/cookie-policy", priority: 0.5 },
    { path: "/en/legal-notice", priority: 0.5 },
    { path: "/es/legal-notice", priority: 0.5 },
    { path: "/en/terms-conditions", priority: 0.5 },
    { path: "/es/terms-conditions", priority: 0.5 },
  ];

  it("should return all locale entries (home + services + projects + legal)", () => {
    expect(entries).toHaveLength(expectedRoutes.length);
  });

  it.each(expectedRoutes)("should have $path entry with priority $priority", ({ path, priority }) => {
    const entry = entries.find((e) => e.url === `https://3dcosprops.com${path}`);
    expect(entry).toBeDefined();
    expect(entry?.priority).toBe(priority);
    expect(entry?.changeFrequency).toBe("weekly");
  });

  it("should have valid lastModified dates", () => {
    for (const entry of entries) {
      expect(entry.lastModified).toBeInstanceOf(Date);
    }
  });
});