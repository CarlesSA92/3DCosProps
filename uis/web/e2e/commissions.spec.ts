import { test, expect } from "@playwright/test";

test.describe("Commissions page", () => {
  test("shows the brief, process, payment policy, and FAQ in Spanish", async ({ page }) => {
    await page.goto("/es/commissions");

    await expect(page).toHaveTitle(/Encargos personalizados.*3D CosProps/);
    await expect(page.getByRole("heading", { name: "Brief del proyecto" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "El proceso" })).toBeVisible();
    await expect(page.getByText(/Primero el presupuesto, después el pago/)).toBeVisible();
    await expect(page.getByRole("heading", { name: "Preguntas frecuentes" })).toBeVisible();
    await expect(page.getByRole("contentinfo")).toBeVisible();
  });

  test("navigates from the services page to commissions in the current locale", async ({ page }) => {
    await page.goto("/en/services");
    await page.locator('nav a:has-text("Commissions")').first().click();

    await expect(page).toHaveURL(/\/en\/commissions/);
    await expect(page.getByRole("heading", { name: "Project Brief" })).toBeVisible();
  });

  test("navigates from Home to the dedicated commissions page", async ({ page }) => {
    await page.goto("/en");
    await page.locator('nav a:has-text("Commissions")').first().click();

    await expect(page).toHaveURL(/\/en\/commissions/);
    await expect(page.getByRole("heading", { name: "Project Brief" })).toBeVisible();
  });

  test("the Services page CTA preserves the current locale", async ({ page }) => {
    await page.goto("/es/services");
    await page.getByRole("link", { name: "Iniciar Encargo" }).click();

    await expect(page).toHaveURL(/\/es\/commissions/);
    await expect(page.getByRole("heading", { name: "Brief del proyecto" })).toBeVisible();
  });
});