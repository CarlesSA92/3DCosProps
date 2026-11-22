import { expect, test } from "@playwright/test";

for (const width of [1440, 390]) {
  test(`profile navigation and tabs at ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/es");
    if (width < 768) await page.getByRole("button", { name: "Open menu" }).click();
    await page.getByRole("link", { name: "Perfil de usuario" }).click();
    await expect(page).toHaveURL(/\/es\/profile$/);
    await expect(page.getByRole("heading", { name: "Alex Morgan" })).toBeVisible();
    await expect(page.getByText("Vista de demostración")).toBeVisible();
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
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  });
}

test("profile is available in English", async ({ page }) => {
  await page.goto("/en/profile");
  await expect(page.getByRole("tab", { name: "Personal details" })).toBeVisible();
  await page.getByRole("tab", { name: "Payment methods" }).click();
  await expect(page.getByText("Credit or debit card")).toBeVisible();
});