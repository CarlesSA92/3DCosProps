import { expect, test } from "@playwright/test";

test.describe("Shop page", () => {
  test("opens from navigation and supports category filters and cart adds", async ({ page }) => {
    await page.goto("/en");
    await page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "Shop" }).click();

    await expect(page).toHaveURL(/\/en\/shop$/);
    await expect(page.getByRole("heading", { name: "The Workshop" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Custom Helmet Kit" })).toBeVisible();

    await page.getByRole("button", { name: "3D Files", exact: true }).click();
    await expect(page.getByRole("heading", { name: "Archmage Staff Topper" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Custom Helmet Kit" })).not.toBeVisible();

    await page.getByRole("button", { name: "All", exact: true }).click();
    await page.getByRole("button", { name: "Add to cart: Custom Helmet Kit" }).click();
    await expect(page.getByText("Cart (1)")).toBeVisible();
  });

  test("renders the Spanish catalog", async ({ page }) => {
    await page.goto("/es/shop");

    await expect(page.getByRole("heading", { name: "El Taller" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Añadir al carrito: Kit de casco personalizado" })).toBeVisible();
    await expect(page.getByRole("contentinfo")).toBeVisible();
  });

  test("opens the selected product and shares its cart with the catalog", async ({ page }) => {
    await page.goto("/en/shop");
    await page.getByRole("heading", { name: "Custom Helmet Kit" }).getByRole("link").click();
    await expect(page).toHaveURL(/\/en\/shop\/mando-helmet-kit$/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Custom Helmet Kit");
    await expect(page.getByRole("combobox", { name: "Configuration" })).toBeDisabled();
    await page.getByRole("button", { name: "Increase quantity" }).click();
    await page.getByRole("button", { name: "Add to cart", exact: true }).click();
    await expect(page.getByRole("status")).toHaveText("Added Custom Helmet Kit to your cart.");
    await page.getByRole("tab", { name: "Material & finish" }).click();
    await expect(page.getByRole("tabpanel")).toContainText("Materials, finishes");
    await page.getByRole("link", { name: "Back to shop" }).click();
    await expect(page.getByText("Cart (2)")).toBeVisible();
  });

  for (const viewport of [{ width: 1440, height: 1000 }, { width: 390, height: 844 }]) {
    test(`renders responsive Spanish detail at ${viewport.width}px`, async ({ page }, testInfo) => {
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      await page.setViewportSize(viewport);
      await page.goto("/es/shop/legendary-sword-files");
      await expect(page.getByRole("heading", { level: 1 })).toHaveText("Archivos de espada legendaria");
      await expect(page.getByRole("contentinfo")).toBeVisible();
      await page.getByRole("tab", { name: "Entrega y cuidados" }).click();
      await expect(page.getByRole("tabpanel")).toContainText("No requiere envío físico");
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.screenshot({ path: testInfo.outputPath(`product-detail-${viewport.width}.png`), fullPage: true, animations: "disabled" });
      const related = page.getByRole("region", { name: "Artículos relacionados" });
      await related.getByRole("link", { name: /Remate de bastón de archimago/ }).click();
      await expect(page.getByRole("heading", { level: 1 })).toHaveText("Remate de bastón de archimago");
      expect(errors).toEqual([]);
    });
  }

  test("returns 404 for an unknown product", async ({ page }) => {
    const response = await page.goto("/en/shop/unknown-product");
    expect(response?.status()).toBe(404);
  });
});