import { describe, it, expect } from "vitest";
import robots from "../robots";

describe("robots.txt", () => {
  const result = robots();

  it("should allow all user agents", () => {
    expect(result.rules).toBeDefined();
    if ("userAgent" in result.rules) {
      expect(result.rules.userAgent).toBe("*");
    }
    if ("allow" in result.rules) {
      expect(result.rules.allow).toBe("/");
    }
  });

  it("should point to the sitemap", () => {
    expect(result.sitemap).toBe("https://3dcosprops.com/sitemap.xml");
  });
});