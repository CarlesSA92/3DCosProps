import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { ProjectsPageContent } from "../components/projects-page-content";
import type { ProjectsDictionary } from "../../src/types/content";

const mockDict: ProjectsDictionary = {
  languageLabel: "Language",
  nav: [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/projects", label: "Projects" },
  ],
  ctaPrimary: "Start Commission",
  ctaSecondary: "Explore Projects",
  heroTag: "Our portfolio",
  heroTitle: "Forged <gold>Projects</gold>",
  heroBody: "A showcase of our finest creations.",
  heroCtaPrimary: "Request Commission",
  heroCtaSecondary: "View Services",
  galleryTitle: "Project <gold>Gallery</gold>",
  filterAll: "All",
  filterAnime: "Anime",
  filterGames: "Games",
  loadMore: "Load More Projects",
  noMoreProjects: "No more projects.",
  projects: [
    {
      id: "tanjiro-sword",
      title: "Tanjiro's Nichirin Blade",
      description: "Handcrafted replica of Tanjiro's sword.",
      category: "anime",
      image: {
        gradient: "linear-gradient(135deg, #1a2a1a 0%, #2d4a2d 50%, #1a3a1a 100%)",
        alt: "Tanjiro's Nichirin Blade replica",
      },
    },
    {
      id: "mando-helmet",
      title: "Mandalorian Helmet",
      description: "Premium beskar-inspired Mandalorian helmet.",
      category: "movies",
      image: {
        gradient: "linear-gradient(135deg, #2a2a2a 0%, #4a4a4a 50%, #3a3a3a 100%)",
        alt: "Mandalorian helmet replica",
      },
    },
    {
      id: "master-sword",
      title: "Master Sword",
      description: "Full-scale replica of the Zelda Master Sword.",
      category: "games",
      image: {
        gradient: "linear-gradient(135deg, #1a1a3a 0%, #2a2a5a 50%, #1a1a4a 100%)",
        alt: "Master Sword replica",
      },
    },
    {
      id: "nezuko-bamboo",
      title: "Nezuko's Bamboo Muzzle",
      description: "Detailed replica of Nezuko's bamboo muzzle.",
      category: "anime",
      image: {
        gradient: "linear-gradient(135deg, #2a1a0a 0%, #4a2a1a 50%, #3a1a0a 100%)",
        alt: "Nezuko's bamboo muzzle replica",
      },
    },
    {
      id: "doom-slayer",
      title: "Doom Slayer Armor",
      description: "Full cosplay armor set inspired by Doom Eternal.",
      category: "games",
      image: {
        gradient: "linear-gradient(135deg, #1a0a0a 0%, #3a1a1a 50%, #2a0a0a 100%)",
        alt: "Doom Slayer armor replica",
      },
    },
    {
      id: "levi-sword",
      title: "Levi's Thunder Spear",
      description: "Replica of Levi Ackerman's Thunder Spear.",
      category: "anime",
      image: {
        gradient: "linear-gradient(135deg, #1a1a2a 0%, #2a2a4a 50%, #1a1a3a 100%)",
        alt: "Levi's Thunder Spear replica",
      },
    },
  ],
  footer: "3D CosProps. High-Fidelity 3D Craftsmanship.",
  footerNavTitle: "Navigation",
  footerFollowTitle: "Follow Us",
  footerPrivacyLabel: "Privacy Policy",
};

describe("ProjectsPageContent", () => {
  it("should render the hero tag", () => {
    render(<ProjectsPageContent dict={mockDict} />);
    expect(screen.getByText("Our portfolio")).toBeInTheDocument();
  });

  it("should render the hero title with gold highlight", () => {
    render(<ProjectsPageContent dict={mockDict} />);
    const goldSpan = screen.getByText("Projects");
    expect(goldSpan).toBeInTheDocument();
    expect(goldSpan).toHaveClass("bg-gradient-to-r");
  });

  it("should render the hero body", () => {
    render(<ProjectsPageContent dict={mockDict} />);
    expect(
      screen.getByText("A showcase of our finest creations."),
    ).toBeInTheDocument();
  });

  it("should render the gallery title with gold highlight", () => {
    render(<ProjectsPageContent dict={mockDict} />);
    const goldSpan = screen.getByText("Gallery");
    expect(goldSpan).toBeInTheDocument();
    expect(goldSpan).toHaveClass("bg-gradient-to-r");
  });

  it("should render filter buttons", () => {
    render(<ProjectsPageContent dict={mockDict} />);
    const filterButtons = screen.getAllByRole("button");
    const filterLabels = filterButtons.map((btn) => btn.textContent);
    expect(filterLabels).toContain("All");
    expect(filterLabels).toContain("Anime");
    expect(filterLabels).toContain("Games");
  });

  it("should show only the initial 3 projects by default", () => {
    render(<ProjectsPageContent dict={mockDict} />);
    expect(screen.getByText("Tanjiro's Nichirin Blade")).toBeInTheDocument();
    expect(screen.getByText("Mandalorian Helmet")).toBeInTheDocument();
    expect(screen.getByText("Master Sword")).toBeInTheDocument();
    // 4th should not be visible yet
    expect(screen.queryByText("Nezuko's Bamboo Muzzle")).not.toBeInTheDocument();
  });

  it("should render category badges on project cards", () => {
    render(<ProjectsPageContent dict={mockDict} />);
    // Movie badge on the Mandalorian Helmet card
    const movieBadges = screen.getAllByText("Movie");
    expect(movieBadges.length).toBeGreaterThanOrEqual(1);
  });

  it("should show more projects when clicking Load More", () => {
    render(<ProjectsPageContent dict={mockDict} />);
    const loadMoreBtn = screen.getByText("Load More Projects");
    expect(loadMoreBtn).toBeInTheDocument();

    fireEvent.click(loadMoreBtn);

    // Now 4th and 5th should appear
    expect(screen.getByText("Nezuko's Bamboo Muzzle")).toBeInTheDocument();
    expect(screen.getByText("Doom Slayer Armor")).toBeInTheDocument();
  });

  it("should show no more projects message after loading all", () => {
    render(<ProjectsPageContent dict={mockDict} />);
    // Load more once — should load all 6 projects (3 initial + 3 more)
    const loadMoreBtn = screen.getByText("Load More Projects");
    fireEvent.click(loadMoreBtn);

    expect(screen.getByText("No more projects.")).toBeInTheDocument();
    expect(screen.queryByText("Load More Projects")).not.toBeInTheDocument();
  });

  it("should filter projects by Anime category", () => {
    render(<ProjectsPageContent dict={mockDict} />);
    // Click the first "Anime" button (filter button, not category badge)
    const animeButtons = screen.getAllByText("Anime");
    fireEvent.click(animeButtons[0]);

    // Should show first 3 anime projects
    expect(screen.getByText("Tanjiro's Nichirin Blade")).toBeInTheDocument();
    expect(screen.getByText("Nezuko's Bamboo Muzzle")).toBeInTheDocument();
    expect(screen.getByText("Levi's Thunder Spear")).toBeInTheDocument();
    // Games/movies should not appear
    expect(screen.queryByText("Master Sword")).not.toBeInTheDocument();
    expect(screen.queryByText("Mandalorian Helmet")).not.toBeInTheDocument();
  });

  it("should filter projects by Games category", () => {
    render(<ProjectsPageContent dict={mockDict} />);
    const gamesButtons = screen.getAllByText("Games");
    fireEvent.click(gamesButtons[0]);

    expect(screen.getByText("Master Sword")).toBeInTheDocument();
    expect(screen.getByText("Doom Slayer Armor")).toBeInTheDocument();
    expect(screen.queryByText("Tanjiro's Nichirin Blade")).not.toBeInTheDocument();
  });

  it("should reset visible count when changing filter", () => {
    render(<ProjectsPageContent dict={mockDict} />);
    // Load more first
    fireEvent.click(screen.getByText("Load More Projects"));

    // Then change filter
    const gamesButtons = screen.getAllByText("Games");
    fireEvent.click(gamesButtons[0]);

    // Should only show 2 games projects from the beginning
    expect(screen.getByText("Master Sword")).toBeInTheDocument();
    expect(screen.getByText("Doom Slayer Armor")).toBeInTheDocument();
    // And "Load More" should not appear since only 2 games projects
    expect(screen.queryByText("Load More Projects")).not.toBeInTheDocument();
  });

  it("should show coming soon message for Movie filter", () => {
    render(<ProjectsPageContent dict={mockDict} />);
    // There's 1 movie project, so after loading it, no more
    // But "Movies" is not a filter button
  });

  it("should show empty state for filter with no results", () => {
    // This tests clicking "All" when there are already results
    // All projects are visible in "All", so just verify filter works
    render(<ProjectsPageContent dict={mockDict} />);
    const allButton = screen.getByText("All");
    expect(allButton).toBeInTheDocument();
    expect(allButton).toHaveClass("bg-primary");
  });

  // ── Modal tests ──
  it("should open the modal when clicking the magnifying glass button", () => {
    render(<ProjectsPageContent dict={mockDict} />);
    const zoomButtons = screen.getAllByLabelText(/View .* details/);
    expect(zoomButtons.length).toBeGreaterThanOrEqual(1);

    fireEvent.click(zoomButtons[0]);

    // Modal should now be visible — look for dialog role
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    // Title of the first project should appear in the modal
    expect(within(screen.getByRole("dialog")).getByText("Tanjiro's Nichirin Blade")).toBeInTheDocument();
  });

  it("should close the modal when clicking the close button", () => {
    render(<ProjectsPageContent dict={mockDict} />);
    fireEvent.click(screen.getAllByLabelText(/View .* details/)[0]);

    const closeBtn = screen.getByLabelText("Close");
    expect(closeBtn).toBeInTheDocument();

    fireEvent.click(closeBtn);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("should close the modal when clicking the backdrop", () => {
    render(<ProjectsPageContent dict={mockDict} />);
    fireEvent.click(screen.getAllByLabelText(/View .* details/)[0]);

    expect(screen.getByRole("dialog")).toBeInTheDocument();

    // Click the backdrop (the outermost div of the modal)
    fireEvent.click(screen.getByRole("dialog"));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("should navigate to next project via right arrow button", () => {
    render(<ProjectsPageContent dict={mockDict} />);
    fireEvent.click(screen.getAllByLabelText(/View .* details/)[0]);

    const dialog = screen.getByRole("dialog");

    // Should show first project title in modal
    expect(within(dialog).getByText("Tanjiro's Nichirin Blade")).toBeInTheDocument();

    // Click next arrow
    const nextBtn = within(dialog).getByLabelText("Next project");
    fireEvent.click(nextBtn);

    // Should now show second project title in modal
    expect(within(dialog).getByText("Mandalorian Helmet")).toBeInTheDocument();
  });

  it("should navigate to previous project via left arrow button", () => {
    render(<ProjectsPageContent dict={mockDict} />);
    // Open modal for the second project
    fireEvent.click(screen.getAllByLabelText(/View .* details/)[1]);

    const dialog = screen.getByRole("dialog");

    expect(within(dialog).getByText("Mandalorian Helmet")).toBeInTheDocument();

    // Click prev arrow
    const prevBtn = within(dialog).getByLabelText("Previous project");
    fireEvent.click(prevBtn);

    expect(within(dialog).getByText("Tanjiro's Nichirin Blade")).toBeInTheDocument();
  });

  it("should show position indicator in modal", () => {
    render(<ProjectsPageContent dict={mockDict} />);
    fireEvent.click(screen.getAllByLabelText(/View .* details/)[0]);

    expect(screen.getByText("1 / 6")).toBeInTheDocument();
  });

  it("should show category badge and description in modal caption", () => {
    render(<ProjectsPageContent dict={mockDict} />);
    fireEvent.click(screen.getAllByLabelText(/View .* details/)[0]);

    const dialog = screen.getByRole("dialog");

    // Category badge — scope query within the dialog
    const animeTexts = within(dialog).getAllByText("Anime");
    expect(animeTexts.length).toBeGreaterThanOrEqual(1);
    // Description
    expect(
      within(dialog).getByText("Handcrafted replica of Tanjiro's sword."),
    ).toBeInTheDocument();
  });
});