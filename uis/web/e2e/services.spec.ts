import { test, expect } from "@playwright/test";

test.describe("Services page smoke tests", () => {
  test("should load the services page in English and show hero content", async ({ page }) => {
    await page.goto("/en/services");

    // Page title should be correct
    await expect(page).toHaveTitle(/Services.*3D CosProps/);

    // Hero tag should be visible
    await expect(page.getByText("Our expertise")).toBeVisible();

    // Service cards should be rendered
    await expect(page.getByText("We Design Your Vision")).toBeVisible();
    await expect(page.getByText("We Print the Details")).toBeVisible();
    await expect(page.getByText("The Finish Makes the Difference")).toBeVisible();
    await expect(page.getByText("We Build the Complete Piece")).toBeVisible();
    await expect(page.getByText("Blueprints & Concept Design")).toBeVisible();

    // Features should be listed
    await expect(page.getByText("Custom 3D Modeling")).toBeVisible();
    await expect(page.getByText("FDM & Resin Printing")).toBeVisible();

    // Final CTA section should be visible
    await expect(page.getByText("Ready to forge your legend?")).toBeVisible();

    // Footer should be visible
    await expect(page.getByRole("contentinfo")).toBeVisible();
  });

  test("should load the services page in Spanish and show hero content", async ({ page }) => {
    await page.goto("/es/services");

    await expect(page).toHaveTitle(/Servicios.*3D CosProps/);

    await expect(page.getByText("Nuestra experiencia")).toBeVisible();

    // Service cards in Spanish
    await expect(page.getByText("Diseñamos tu Visión")).toBeVisible();
    await expect(page.getByText("Imprimimos los Detalles")).toBeVisible();
    await expect(page.getByText("El Acabado Marca la Diferencia")).toBeVisible();
    await expect(page.getByText("Construimos la Pieza Completa")).toBeVisible();
    await expect(page.getByText("Planos y Diseño Conceptual")).toBeVisible();

    // Features in Spanish
    await expect(page.getByText("Modelado 3D Personalizado")).toBeVisible();

    // Final CTA in Spanish
    await expect(page.getByText("¿Listo para forjar tu leyenda?")).toBeVisible();

    // Bottom CTA should show "Iniciar Encargo"
    await expect(page.getByRole("link", { name: "Iniciar Encargo" })).toBeVisible();

    // Footer should be visible
    await expect(page.getByRole("contentinfo")).toBeVisible();
  });

  test("should navigate from Home to Services via nav link", async ({ page }) => {
    await page.goto("/en");

    // Click the Services nav link
    const servicesLink = page.locator('nav a:has-text("Services")').first();
    await servicesLink.click();

    // Should be on /en/services now
    await expect(page).toHaveURL(/\/en\/services/);
    await expect(page.getByText("Our expertise")).toBeVisible();
  });

  test("should maintain locale when navigating to services page", async ({ page }) => {
    // Navigate to Spanish Home
    await page.goto("/es");

    // Click Servicios nav link
    const serviciosLink = page.locator('nav a:has-text("Servicios")').first();
    await serviciosLink.click();

    // Should stay in Spanish
    await expect(page).toHaveURL(/\/es\/services/);
    await expect(page.getByText("Nuestra experiencia")).toBeVisible();
  });

  test("should show header and footer on services page", async ({ page }) => {
    await page.goto("/en/services");

    // Header should be visible with brand name
    await expect(page.getByText("3D CosProps").first()).toBeVisible();

    // Navigation should be present
    await expect(page.getByRole("navigation", { name: "Main navigation" })).toBeVisible();

    // Footer should be visible
    await expect(page.getByRole("contentinfo")).toBeVisible();
  });
});