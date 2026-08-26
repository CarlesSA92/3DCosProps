import { test, expect } from "@playwright/test";

test.describe("Home page smoke tests", () => {
  test("should load the home page in English and show hero content", async ({ page }) => {
    await page.goto("/en");

    // Page title should be correct
    await expect(page).toHaveTitle(/Home.*3D CosProps/);

    // Hero tag should be visible
    await expect(page.getByText("High-fidelity replicas")).toBeVisible();

    // CTA buttons should be present
    await expect(page.getByRole("link", { name: "Explore Projects" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Start Commission" })).toBeVisible();

    // Footer should be visible — use the footer role directly
    await expect(page.getByRole("contentinfo")).toBeVisible();
  });

  test("should load the home page in Spanish and show hero content", async ({ page }) => {
    await page.goto("/es");

    await expect(page).toHaveTitle(/Inicio.*3D CosProps/);

    await expect(page.getByText("Réplicas de alta fidelidad")).toBeVisible();

    await expect(page.getByRole("link", { name: "Ver Portfolio" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Iniciar Encargo", exact: true })).toBeVisible();

    // Footer should be visible
    await expect(page.getByRole("contentinfo")).toBeVisible();
  });

  test("should switch locale from EN to ES", async ({ page }) => {
    await page.goto("/en");

    // Click the locale switcher link to ES in the header
    const esLink = page.locator('header a[aria-label="Cambiar a Español"]');
    await esLink.click();

    // Should be on /es now
    await expect(page).toHaveURL(/\/es/);
    await expect(page.getByText("Réplicas de alta fidelidad")).toBeVisible();
  });

  test("should switch locale from ES to EN", async ({ page }) => {
    await page.goto("/es");

    const enLink = page.locator('header a[aria-label="Switch to English"]');
    await enLink.click();

    await expect(page).toHaveURL(/\/en/);
    await expect(page.getByText("High-fidelity replicas")).toBeVisible();
  });

  test("should navigate using the mobile menu toggle", async ({ page }) => {
    // Set viewport to mobile size
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/en");

    // Mobile menu button should be visible
    const menuButton = page.locator('button[aria-label*="menu" i], button[aria-label*="Menu" i]');
    await expect(menuButton).toBeVisible();

    // Click to open
    await menuButton.click();

    // Profile link should be visible in the menu
    await expect(page.getByText("Profile")).toBeVisible();
  });

  test("should have robots.txt and sitemap.xml available", async ({ request }) => {
    const robots = await request.get("/robots.txt");
    expect(robots.ok()).toBeTruthy();
    expect(await robots.text()).toContain("sitemap");

    const sitemap = await request.get("/sitemap.xml");
    expect(sitemap.ok()).toBeTruthy();
    expect(await sitemap.text()).toContain("3dcosprops.com");
  });
});