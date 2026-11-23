import { test, expect } from "@playwright/test";

test.describe("Legal pages smoke tests", () => {
  const legalPages = [
    { path: "privacy-policy", enTitle: /Privacy Policy.*3D CosProps/, esTitle: /Política de Privacidad.*3D CosProps/ },
    { path: "cookie-policy", enTitle: /Cookie Policy.*3D CosProps/, esTitle: /Política de Cookies.*3D CosProps/ },
    { path: "legal-notice", enTitle: /Legal Notice.*3D CosProps/, esTitle: /Aviso Legal.*3D CosProps/ },
    { path: "terms-conditions", enTitle: /Terms & Conditions.*3D CosProps/, esTitle: /Términos y Condiciones.*3D CosProps/ },
  ];

  for (const { path, enTitle, esTitle } of legalPages) {
    test(`should load ${path} in English with correct title and disclaimer`, async ({ page }) => {
      await page.goto(`/en/${path}`);

      await expect(page).toHaveTitle(enTitle);

      // Disclaimer banner should be visible (mockup version)
      await expect(page.getByText(/MOCKUP no definitivo|DRAFT.*not final/i)).toBeVisible();

      // Footer should be visible
      await expect(page.getByRole("contentinfo")).toBeVisible();
    });

    test(`should load ${path} in Spanish with correct title and disclaimer`, async ({ page }) => {
      await page.goto(`/es/${path}`);

      await expect(page).toHaveTitle(esTitle);

      // Disclaimer banner should be visible (mockup version)
      await expect(page.getByText(/MOCKUP no definitivo|DRAFT.*not final/i)).toBeVisible();

      // Footer should be visible
      await expect(page.getByRole("contentinfo")).toBeVisible();
    });
  }

  test("should navigate from Home to Privacy Policy via footer link in English", async ({ page }) => {
    await page.goto("/en");

    // Scroll to footer and click Privacy Policy link
    const privacyLink = page.getByRole("contentinfo").getByRole("link", { name: "Privacy Policy" });
    await privacyLink.scrollIntoViewIfNeeded();
    await privacyLink.click();

    await expect(page).toHaveURL(/\/en\/privacy-policy/);
    await expect(page).toHaveTitle(/Privacy Policy.*3D CosProps/);
  });

  test("should navigate from Home to Política de Privacidad via footer link in Spanish", async ({ page }) => {
    await page.goto("/es");

    const privacyLink = page.getByRole("contentinfo").getByRole("link", { name: "Política de Privacidad" });
    await privacyLink.scrollIntoViewIfNeeded();
    await privacyLink.click();

    await expect(page).toHaveURL(/\/es\/privacy-policy/);
    await expect(page).toHaveTitle(/Política de Privacidad.*3D CosProps/);
  });

  test("should navigate from Privacy Policy to Cookie Policy via footer in English", async ({ page }) => {
    await page.goto("/en/privacy-policy");

    const cookieLink = page.getByRole("contentinfo").getByRole("link", { name: "Cookie Policy" });
    await cookieLink.scrollIntoViewIfNeeded();
    await cookieLink.click();

    await expect(page).toHaveURL(/\/en\/cookie-policy/);
    await expect(page).toHaveTitle(/Cookie Policy.*3D CosProps/);
  });

  test("should show header and footer on all legal pages", async ({ page }) => {
    await page.goto("/en/legal-notice");

    // Header should be visible with brand name
    await expect(page.getByText("3D CosProps").first()).toBeVisible();

    // Navigation should be present
    await expect(page.getByRole("navigation", { name: "Main navigation" })).toBeVisible();

    // Footer should be visible
    await expect(page.getByRole("contentinfo")).toBeVisible();
  });
});