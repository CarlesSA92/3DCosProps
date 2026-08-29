import type { MetadataRoute } from "next";

const locales = ["en", "es"] as const;
const baseUrl = "https://3dcosprops.com";

type PageEntry = {
  path: string;
  priority: number;
};

const pages: PageEntry[] = [
  { path: "", priority: 1 },
  { path: "services", priority: 0.9 },
  { path: "projects", priority: 0.9 },
  { path: "privacy-policy", priority: 0.5 },
  { path: "cookie-policy", priority: 0.5 },
  { path: "legal-notice", priority: 0.5 },
  { path: "terms-conditions", priority: 0.5 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const page of pages) {
      const path = page.path ? `/${locale}/${page.path}` : `/${locale}`;
      entries.push({
        url: `${baseUrl}${path}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: page.priority,
      });
    }
  }

  return entries;
}
