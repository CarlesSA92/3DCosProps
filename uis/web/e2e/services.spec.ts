import { test, expect } from "@playwright/test";

test.describe("Services page smoke tests", () => {
  test("should load the services page in English and show hero content", async ({ page }) => {
    await page.goto("/en/services");

    // Page title should be correct
    await expect(page).toHaveTitle(/Services.*3D CosProps/);

    // Hero tag should be visible
    await expect(page.getByText("Our expertise")).toBeVisible();

    // Service cards should be rendered

    // Bottom CTA should show "Start Commission"
    await expect(page.getByRole("link", { name: "Start Commission" })).toBeVisible();
    await expect(page.getByText("3D Modeling & Design")).toBeVisible();
    await expect(page.getByText("3D Printing & Production")).toBeVisible();
    await expect(page.getByText("Finishing & Painting")).toBeVisible();
    await expect(page.getByText("Prop & Replica Fabrication")).toBeVisible();
    await expect(page.getByText("Cosplay Armor & Accessories")).toBeVisible();
    await expect(page.getByText("Consultation & Design")).toBeVisible();

    // Features should be listed
    await expect(page.getByText("Digital sculpting (ZBrush, Blender)")).toBeVisible();
    await expect(page.getByText("FDM printing (PLA, PETG, ABS, PC)")).toBeVisible();

    // Final CTA section should be visible
    await expect(page.getByText("Ready to start your project?")).toBeVisible();

    // Footer should be visible
    await expect(page.getByRole("contentinfo")).toBeVisible();
  });

  test("should load the services page in Spanish and show hero content", async ({ page }) => {
    await page.goto("/es/services");

    await expect(page).toHaveTitle(/Servicios.*3D CosProps/);

    await expect(page.getByText("Nuestra experiencia")).toBeVisible();

    // Service cards in Spanish
    await expect(page.getByText("Modelado y Diseño 3D")).toBeVisible();
    await expect(page.getByText("Impresión y Producción 3D")).toBeVisible();
    await expect(page.getByText("Acabados y Pintura")).toBeVisible();
    await expect(page.getByText("Fabricación de Atrezzo y Réplicas")).toBeVisible();
    await expect(page.getByText("Armaduras y Accesorios Cosplay")).toBeVisible();
    await expect(page.getByText("Consultoría y Diseño")).toBeVisible();

    // Features in Spanish
    await expect(page.getByText("Esculpido digital (ZBrush, Blender)")).toBeVisible();

    // Final CTA in Spanish
    await expect(page.getByText("¿Listo para empezar tu proyecto?")).toBeVisible();

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