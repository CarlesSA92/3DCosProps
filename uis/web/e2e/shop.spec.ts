import { expect, test } from "@playwright/test";

test.describe("Shop page", () => {
  test("opens from navigation and supports category filters and cart adds", async ({ page }) => {
    await page.goto("/en");
    await page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "Shop" }).click();

    await expect(page).toHaveURL(/\/en\/shop$/);
    await expect(page.getByRole("heading", { name: "The Armory" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Custom Helmet Kit" })).toBeVisible();

    await page.getByRole("button", { name: "Files", exact: true }).click();
    await expect(page.getByRole("heading", { name: "Legendary Sword Files" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Custom Helmet Kit" })).not.toBeVisible();

    await page.getByRole("button", { name: "All", exact: true }).click();
    await page.getByRole("button", { name: "Add to cart: Custom Helmet Kit" }).click();
    await expect(page.getByText("Cart (1)")).toBeVisible();
  });

  test("renders the Spanish catalog", async ({ page }) => {
    await page.goto("/es/shop");

    await expect(page.getByRole("heading", { name: "La Armería" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Añadir al carrito: Kit de casco personalizado" })).toBeVisible();
    await expect(page.getByRole("contentinfo")).toBeVisible();
  });
});