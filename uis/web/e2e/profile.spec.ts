import { expect, test } from "@playwright/test";

for (const width of [1440, 390]) {
  test(`profile navigation and tabs at ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/es");
    if (width < 768) await page.getByRole("button", { name: "Open menu" }).click();
    await page.getByRole("button", { name: "Menú de usuario" }).click();
    if (width < 768) {
      const mobileNav = page.getByRole("navigation", { name: "Menú móvil" });
      const options = mobileNav.locator("#mobile-profile-options");
      await expect(options.getByRole("link", { name: "Carrito" })).toBeVisible();
      await expect(options.getByRole("button", { name: "Logout" })).toBeDisabled();
      const menuStyles = await mobileNav.locator("a").first().evaluate((element) => ({ fontSize: getComputedStyle(element).fontSize, fontFamily: getComputedStyle(element).fontFamily }));
      expect(await options.getByRole("link", { name: "Perfil de usuario" }).evaluate((element) => ({ fontSize: getComputedStyle(element).fontSize, fontFamily: getComputedStyle(element).fontFamily }))).toEqual(menuStyles);
      expect((await options.boundingBox())!.width).toBeCloseTo((await mobileNav.boundingBox())!.width - 32, 0);
      await options.getByRole("link", { name: "Perfil de usuario" }).click();
    } else {
      await page.getByRole("menuitem", { name: "Perfil de usuario" }).click();
    }
    await expect(page).toHaveURL(/\/es\/profile$/);
    await expect(page.getByRole("heading", { name: "Alex Morgan" })).toBeVisible();
    await expect(page.getByText("Vista de demostración")).toBeVisible();
    if (width >= 1024) {
      const account = await page.getByRole("heading", { name: "Datos personales" }).locator("..").boundingBox();
      const addresses = await page.getByRole("heading", { name: "Direcciones" }).locator("..").boundingBox();
      const security = await page.getByRole("heading", { name: "Seguridad de la cuenta" }).locator("..").boundingBox();
      const deletion = await page.getByRole("heading", { name: "Eliminar cuenta" }).locator("..").boundingBox();
      expect(account!.y).toBe(security!.y);
      expect(addresses!.y).toBe(deletion!.y);
      expect(deletion!.x).toBeGreaterThan(addresses!.x);
      expect(deletion!.y).toBeGreaterThan(security!.y);
    }
    await page.screenshot({ path: testInfo.outputPath(`profile-${width}.png`), fullPage: true });
    await page.getByRole("tab", { name: "Descarga de archivos" }).click();
    await expect(page.getByRole("link", { name: "Descargar archivo: Archivo digital de muestra" })).toHaveAttribute("download", "");
    await expect(page).toHaveURL(/\?tab=downloads$/);
    await page.getByRole("link", { name: "Explorar la tienda" }).click();
    await expect(page).toHaveURL(/\/es\/shop$/);
    await page.goBack();
    await expect(page).toHaveURL(/\/es\/profile\?tab=downloads$/);
    await expect(page.getByRole("tab", { name: "Descarga de archivos" })).toHaveAttribute("aria-selected", "true");
    await page.getByRole("tab", { name: "Pedidos y encargos" }).click();
    await expect(page.getByText("En preparación", { exact: true }).first()).toBeVisible();
    await expect(page.getByText("En producción", { exact: true }).first()).toBeVisible();
    for (const name of ["Kit de casco personalizado", "Pieza personalizada"]) {
      const card = page.getByRole("article").filter({ has: page.getByRole("heading", { name }) });
      const heading = await card.getByRole("heading", { name }).boundingBox();
      const reference = await card.locator("p").first().boundingBox();
      const details = await card.getByRole("button", { name: "Detalles" }).boundingBox();
      expect(details!.x).toBeGreaterThan(reference!.x);
      expect(heading!.y).toBeGreaterThan(details!.y + details!.height - 1);
      expect(heading!.width).toBeGreaterThan(reference!.width);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  });
}

test("profile is available in English", async ({ page }) => {
  await page.goto("/en/profile");
  await expect(page.getByRole("tab", { name: "Personal details" })).toBeVisible();
  await page.getByRole("tab", { name: "Payment methods" }).click();
  await expect(page.getByText("Credit or debit card")).toBeVisible();
});