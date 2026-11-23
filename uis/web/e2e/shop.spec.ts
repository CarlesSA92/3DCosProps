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

  for (const width of [320, 390, 1440]) {
    test(`universe carousel stays aligned at ${width}px`, async ({ page }, testInfo) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/es/shop");
      const carousel = page.getByRole("group", { name: "Explora por universo" }).first();
      const cards = carousel.getByRole("button");
      const boxes = await cards.evaluateAll((elements) => elements.map((element) => {
        const image = element.firstElementChild!.getBoundingClientRect();
        return { top: image.top, width: image.width, height: image.height };
      }));
      expect(boxes).toHaveLength(5);
      for (const box of boxes) {
        expect(box.top).toBeCloseTo(boxes[0].top, 0);
        expect(box.width).toBeCloseTo(boxes[0].width, 0);
        expect(box.height).toBeCloseTo(box.width, 0);
      }
      const previous = page.getByRole("button", { name: "Universos anteriores" });
      const next = page.getByRole("button", { name: "Universos siguientes" });
      for (const arrow of [previous, next]) {
        const bounds = await arrow.boundingBox();
        expect(bounds!.y + bounds!.height / 2).toBeCloseTo(boxes[0].top + boxes[0].height / 2, 0);
      }
      if (width >= 1024) {
        const first = await cards.first().boundingBox();
        const last = await cards.last().boundingBox();
        expect((first!.x + last!.x + last!.width) / 2).toBeCloseTo(width / 2, 0);
        expect(boxes[0].width).toBeLessThan(100);
      }
      await expect(previous).toBeDisabled();
      if (width < 768) {
        await expect(next).toBeEnabled();
        await next.click();
        await expect(previous).toBeEnabled();
        await expect.poll(() => carousel.evaluate((element) => element.scrollLeft)).toBeGreaterThan(0);
        await next.click();
        await expect(next).toBeDisabled();
        await carousel.getByRole("button", { name: "The Mandalorian" }).click();
        await expect(carousel.getByRole("button", { name: "The Mandalorian" })).toHaveAttribute("aria-pressed", "true");
        await expect(page.getByRole("heading", { name: "Kit de casco personalizado" })).toBeVisible();
        await previous.click();
        await expect(next).toBeEnabled();
      } else {
        await expect(next).toBeDisabled();
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
      await page.screenshot({ path: testInfo.outputPath(`universe-carousel-${width}.png`), fullPage: true, animations: "disabled" });
    });
  }

  test("shows a preselected universe in the mobile carousel", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/es/shop?collection=the-mandalorian");
    const carousel = page.getByRole("group", { name: "Explora por universo" }).first();
    const selected = carousel.getByRole("button", { name: "The Mandalorian" });
    await expect(selected).toHaveAttribute("aria-pressed", "true");
    await expect.poll(async () => {
      const track = await carousel.boundingBox();
      const card = await selected.boundingBox();
      return card!.x >= track!.x && card!.x + card!.width <= track!.x + track!.width + 1;
    }).toBe(true);
  });

  for (const width of [640, 768, 1024]) {
    test(`universe arrows remain centered at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/es/shop");
      const carousel = page.getByRole("group", { name: "Explora por universo" }).first();
      const square = await carousel.getByRole("button").first().locator("span").first().boundingBox();
      for (const name of ["Universos anteriores", "Universos siguientes"]) {
        const arrow = await page.getByRole("button", { name }).boundingBox();
        expect(arrow!.y + arrow!.height / 2).toBeCloseTo(square!.y + square!.height / 2, 0);
      }
    });
  }

  test("opens the selected product and shares its cart with the catalog", async ({ page }) => {
    await page.goto("/en/shop");
    await page.getByRole("heading", { name: "Custom Helmet Kit" }).getByRole("link").click();
    await expect(page).toHaveURL(/\/en\/shop\/mando-helmet-kit$/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Custom Helmet Kit");
    await expect(page.getByRole("combobox", { name: "Configuration" })).toBeDisabled();
    await expect(page.getByText("Cart (", { exact: false })).toHaveCount(0);
    await expect(page.getByRole("navigation", { name: "Product breadcrumb" }).getByRole("link", { name: "Filter by The Mandalorian" }))
      .toHaveAttribute("href", "/en/shop?collection=the-mandalorian");
    await page.getByRole("navigation", { name: "Product breadcrumb" }).getByRole("link", { name: "Filter by The Mandalorian" }).click();
    await expect(page).toHaveURL(/\/en\/shop\?collection=the-mandalorian$/);
    await expect(page.getByRole("button", { name: "The Mandalorian" })).toHaveAttribute("aria-pressed", "true");
    await page.goto("/en/shop/mando-helmet-kit");
    await page.getByRole("button", { name: "Enlarge Custom Helmet Kit" }).click();
    await expect(page.getByRole("dialog", { name: "Enlarged image of Custom Helmet Kit" })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toHaveCount(0);
    await page.getByRole("button", { name: "Increase quantity" }).click();
    await page.getByRole("button", { name: "Add to cart", exact: true }).click();
    await expect(page.getByRole("status")).toHaveText("Added Custom Helmet Kit to your cart.");
    await page.getByRole("tab", { name: "Material & finish" }).click();
    await expect(page.getByRole("tabpanel")).toContainText("Materials, finishes");
    await page.getByRole("link", { name: "Back to shop" }).click();
    await expect(page).toHaveURL(/\/en\/shop$/);
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