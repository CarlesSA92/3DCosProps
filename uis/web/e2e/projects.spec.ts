import { test, expect } from "@playwright/test";

test.describe("Projects page smoke tests", () => {
  test("should load the projects page in English and show hero content", async ({ page }) => {
    await page.goto("/en/projects");

    // Page title should be correct
    await expect(page).toHaveTitle(/Projects.*3D CosProps/);

    // Hero tag should be visible
    await expect(page.getByText("Our portfolio")).toBeVisible();

    // Gallery title should be visible
    await expect(page.getByText("Project Gallery")).toBeVisible();

    // Filter buttons should be present
    await expect(page.getByRole("button", { name: "All" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Anime" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Games" })).toBeVisible();

    // Project cards should be rendered — use headings to avoid ambiguity
    await expect(page.getByRole("heading", { name: "Tanjiro's Nichirin Blade" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Mandalorian Helmet" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Master Sword" })).toBeVisible();

    // Load More button should be visible
    await expect(page.getByRole("button", { name: "Load More Projects" })).toBeVisible();

    // Footer should be visible
    await expect(page.getByRole("contentinfo")).toBeVisible();
  });

  test("should load the projects page in Spanish and show hero content", async ({ page }) => {
    await page.goto("/es/projects");

    await expect(page).toHaveTitle(/Proyectos.*3D CosProps/);

    await expect(page.getByText("Nuestro portafolio")).toBeVisible();

    await expect(page.getByText("Galería de Proyectos")).toBeVisible();

    // Filter buttons in Spanish
    await expect(page.getByRole("button", { name: "Todas" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Anime" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Videojuegos" })).toBeVisible();

    // Project cards in Spanish — use headings
    await expect(page.getByRole("heading", { name: "Espada de Tanjiro" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Casco Mandaloriano" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Espada Maestra" })).toBeVisible();

    // Footer should be visible
    await expect(page.getByRole("contentinfo")).toBeVisible();
  });

  test("should filter projects by category", async ({ page }) => {
    await page.goto("/en/projects");

    // Click Anime filter
    await page.getByRole("button", { name: "Anime" }).click();

    // Anime project headings should be visible
    await expect(page.getByRole("heading", { name: "Tanjiro's Nichirin Blade" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Nezuko's Bamboo Muzzle" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Levi's Thunder Spear" })).toBeVisible();

    // Click Games filter
    await page.getByRole("button", { name: "Games" }).click();

    // Games headings should now be visible
    await expect(page.getByRole("heading", { name: "Master Sword" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Doom Slayer Armor Set" })).toBeVisible();

    // Click All filter
    await page.getByRole("button", { name: "All" }).click();

    // All categories should be represented
    await expect(page.getByRole("heading", { name: "Mandalorian Helmet" })).toBeVisible();
  });

  test("should load more projects when clicking Load More", async ({ page }) => {
    await page.goto("/en/projects");

    // Initially 3 projects visible
    const loadMoreBtn = page.getByRole("button", { name: "Load More Projects" });
    await expect(loadMoreBtn).toBeVisible();

    // Click to load more
    await loadMoreBtn.click();

    // Additional projects should now appear
    await expect(page.getByRole("heading", { name: "Nezuko's Bamboo Muzzle" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Doom Slayer Armor Set" })).toBeVisible();

    // All 6 projects are now loaded so "No more projects" should appear
    await expect(page.getByText("No more projects.")).toBeVisible();
  });

  test("should open and close gallery modal on zoom", async ({ page }) => {
    await page.goto("/en/projects");

    // Click the zoom button on the first project card — aria-label is "View {title} details"
    const firstZoomButton = page.getByRole("button", { name: /view.*details/i }).first();
    await firstZoomButton.click();

    // Modal should be visible
    const modal = page.getByRole("dialog");
    await expect(modal).toBeVisible();

    // Close modal by pressing Escape key
    await page.keyboard.press("Escape");

    // Modal should be gone
    await expect(modal).not.toBeVisible();
  });

  test("should navigate between projects in the modal", async ({ page }) => {
    await page.goto("/en/projects");

    // Click zoom on the first card
    const firstZoomButton = page.getByRole("button", { name: /view.*details/i }).first();
    await firstZoomButton.click();

    // Modal should show Tanjiro's blade
    const modal = page.getByRole("dialog");
    await expect(modal).toContainText("Tanjiro's Nichirin Blade");

    // Navigate to next using right arrow key
    await page.keyboard.press("ArrowRight");

    // Should show next project
    await expect(modal).toContainText("Mandalorian Helmet");
  });

  test("should navigate from Home to Projects via nav link", async ({ page }) => {
    await page.goto("/en");

    // Click the Projects nav link
    const projectsLink = page.locator('nav a:has-text("Projects")').first();
    await projectsLink.click();

    // Should be on /en/projects now
    await expect(page).toHaveURL(/\/en\/projects/);
    await expect(page.getByText("Our portfolio")).toBeVisible();
  });

  test("should maintain locale when navigating to projects page", async ({ page }) => {
    await page.goto("/es");

    // Click Proyectos nav link
    const proyectosLink = page.locator('nav a:has-text("Proyectos")').first();
    await proyectosLink.click();

    // Should stay in Spanish
    await expect(page).toHaveURL(/\/es\/projects/);
    await expect(page.getByText("Nuestro portafolio")).toBeVisible();
  });

  test("should show header and footer on projects page", async ({ page }) => {
    await page.goto("/en/projects");

    // Header should be visible with brand name
    await expect(page.getByText("3D CosProps").first()).toBeVisible();

    // Navigation should be present
    await expect(page.getByRole("navigation", { name: "Main navigation" })).toBeVisible();

    // Footer should be visible
    await expect(page.getByRole("contentinfo")).toBeVisible();
  });
});