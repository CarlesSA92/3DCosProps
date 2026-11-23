import { beforeEach, describe, expect, it } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { ShopPageContent } from "../components/shop-page-content";
import { getShopDictionary } from "../content";

const dict = getShopDictionary("en");

describe("ShopPageContent", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("renders the localized hero and first six products", () => {
    render(<ShopPageContent dict={dict} locale="en" />);

    expect(screen.getByText("The")).toBeInTheDocument();
    expect(screen.getByText("Workshop")).toBeInTheDocument();
    expect(screen.getByText("3D CosProps' supply room")).toBeInTheDocument();
    expect(screen.getByText("Custom Helmet Kit")).toBeInTheDocument();
    expect(screen.getByText("Cyber-Optic Goggles")).toBeInTheDocument();
    expect(screen.queryByText("Universal Display Stand")).not.toBeInTheDocument();
  });

  it("filters products by category and resets pagination", () => {
    render(<ShopPageContent dict={dict} locale="en" />);

    fireEvent.click(screen.getByRole("button", { name: "Finished" }));

    expect(screen.getByText("Weathered Sci-Fi Blaster")).toBeInTheDocument();
    expect(screen.getByText("Cyber-Optic Goggles")).toBeInTheDocument();
    expect(screen.queryByText("Custom Helmet Kit")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Finished" })).toHaveAttribute("aria-pressed", "true");
  });

  it("links every visible product to its localized detail page", () => {
    render(<ShopPageContent dict={dict} locale="en" />);
    dict.products.slice(0, 6).forEach((product) => {
      screen.getAllByRole("link", { name: product.title }).forEach((link) => {
        expect(link).toHaveAttribute("href", `/en/shop/${product.id}`);
      });
    });
  });

  it("renders alphabetized collection cards and combines collection and product filters", () => {
    render(<ShopPageContent dict={dict} locale="en" />);

    const collectionGroup = screen.getAllByRole("group", { name: "Browse by universe" })[0];
    const collectionButtons = within(collectionGroup).getAllByRole("button");
    expect(collectionButtons.slice(1).map((button) => button.getAttribute("aria-label"))).toEqual([
      "Attack on Titan", "Demon Slayer", "The Legend of Zelda", "The Mandalorian",
    ]);

    fireEvent.click(screen.getByRole("button", { name: "The Legend of Zelda" }));
    fireEvent.click(screen.getByRole("button", { name: "Blueprints" }));

    expect(screen.getByText("Legendary Sword Files")).toBeInTheDocument();
    expect(screen.queryByText("Archmage Staff Topper")).not.toBeInTheDocument();
    expect(screen.queryByText("Custom Helmet Kit")).not.toBeInTheDocument();
  });

  it("initializes the active collection from the detail breadcrumb query", () => {
    render(<ShopPageContent dict={dict} locale="en" initialCollection="the-mandalorian" />);
    expect(screen.getByRole("button", { name: "The Mandalorian" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText("Custom Helmet Kit")).toBeInTheDocument();
    expect(screen.getByText("Weathered Sci-Fi Blaster")).toBeInTheDocument();
    expect(screen.queryByText("Legendary Sword Files")).not.toBeInTheDocument();
  });

  it("ignores unknown initial collections", () => {
    render(<ShopPageContent dict={dict} locale="en" initialCollection="unknown-universe" />);
    expect(screen.getByRole("button", { name: /All universes/ })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText("Legendary Sword Files")).toBeInTheDocument();
  });

  it("sorts products by price from low to high", () => {
    render(<ShopPageContent dict={dict} locale="en" />);

    fireEvent.change(screen.getByLabelText("Sort by"), { target: { value: "price-asc" } });

    const cards = screen.getAllByRole("article");
    expect(within(cards[0]).getByRole("heading", { name: "Rune-Etched Dagger Files" })).toBeInTheDocument();
  });

  it("loads more products when requested", () => {
    render(<ShopPageContent dict={dict} locale="en" />);

    fireEvent.click(screen.getByRole("button", { name: "Load more" }));

    expect(screen.getByText("Universal Display Stand")).toBeInTheDocument();
    expect(screen.getByText("Rune-Etched Dagger Files")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Load more" })).not.toBeInTheDocument();
  });

  it("adds products to the local cart and increments duplicate items", async () => {
    render(<ShopPageContent dict={dict} locale="en" />);

    const addButton = await screen.findByRole("button", { name: "Add to cart: Custom Helmet Kit" });
    fireEvent.click(addButton);
    fireEvent.click(addButton);

    const savedCart = JSON.parse(window.localStorage.getItem("3d-cosprops-cart") ?? "{}");
    expect(savedCart.items).toHaveLength(1);
    expect(savedCart.items[0]).toMatchObject({
      kind: "product",
      productId: "mando-helmet-kit",
      productType: "physical",
      quantity: 2,
      unitPriceCents: 14500,
    });
    expect(savedCart.subtotalCents).toBe(29000);
    expect(screen.getByText("Cart (2)")).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent("Added Custom Helmet Kit to your cart.");
  });
});