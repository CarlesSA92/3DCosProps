import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { ProductDetailPageContent } from "../components/product-detail-page-content";
import { getShopDictionary } from "../content";
import ProductPage, { generateMetadata, generateStaticParams } from "../[locale]/shop/[productId]/page";

vi.mock("next/navigation", () => ({ notFound: () => { throw new Error("NEXT_NOT_FOUND"); } }));

const dict = getShopDictionary("en");
const product = dict.products[0];

describe("Product detail", () => {
  beforeEach(() => window.localStorage.clear());

  it("uses the selected product's name, price and specifications", () => {
    render(<ProductDetailPageContent dict={dict} product={product} locale="en" />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(product.title);
    expect(screen.getByText("$145.00")).toBeInTheDocument();
    expect(screen.getByRole("tabpanel")).toHaveTextContent(product.id);
    expect(screen.getByRole("combobox", { name: "Configuration" })).toBeDisabled();
    expect(screen.getByRole("combobox")).toHaveTextContent("To be defined");
    expect(screen.queryByText(/Cart \(/)).not.toBeInTheDocument();
  });

  it("shares the local cart and adds the selected quantity", () => {
    render(<ProductDetailPageContent dict={dict} product={product} locale="en" />);
    expect(screen.getByRole("button", { name: "Decrease quantity" })).toBeDisabled();
    fireEvent.click(screen.getByRole("button", { name: "Increase quantity" }));
    fireEvent.click(screen.getByRole("button", { name: "Add to cart" }));
    fireEvent.click(screen.getByRole("button", { name: "Add to cart" }));
    const cart = JSON.parse(window.localStorage.getItem("3d-cosprops-cart") ?? "{}");
    expect(cart.items).toHaveLength(1);
    expect(cart.items[0]).toMatchObject({ productId: product.id, quantity: 4 });
    expect(cart.subtotalCents).toBe(58000);
    expect(screen.getByRole("status")).toHaveTextContent("Added Custom Helmet Kit to your cart.");
  });

  it("bounds quantity input and reports storage failures", () => {
    render(<ProductDetailPageContent dict={dict} product={product} locale="en" />);
    fireEvent.change(screen.getByRole("spinbutton"), { target: { value: "-4" } });
    expect(screen.getByRole("spinbutton")).toHaveValue(1);
    fireEvent.change(screen.getByRole("spinbutton"), { target: { value: "150" } });
    expect(screen.getByRole("spinbutton")).toHaveValue(99);
    const storage = vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => { throw new Error("unavailable"); });
    fireEvent.click(screen.getByRole("button", { name: "Add to cart" }));
    expect(screen.getByRole("status")).toHaveTextContent("Your cart could not be saved");
    storage.mockRestore();
  });

  it("supports tab keyboard navigation and distinguishes digital delivery", () => {
    render(<ProductDetailPageContent dict={dict} product={dict.products[1]} locale="en" />);
    fireEvent.keyDown(screen.getByRole("tab", { name: "Specifications" }), { key: "End" });
    expect(screen.getByRole("tab", { name: "Delivery & care" })).toHaveFocus();
    expect(screen.getByRole("tabpanel")).toHaveTextContent("No physical shipping is required");
    fireEvent.click(screen.getByRole("tab", { name: "What's included" }));
    expect(screen.getByRole("tabpanel")).toHaveTextContent("No physical item is included");
  });

  it("shows related products without the current product and uses localized links", () => {
    const spanish = getShopDictionary("es");
    render(<ProductDetailPageContent dict={spanish} product={spanish.products[0]} locale="es" />);
    const related = screen.getByRole("region", { name: "Artículos relacionados" });
    expect(within(related).queryByRole("heading", { name: spanish.products[0].title })).not.toBeInTheDocument();
    expect(within(related).getByRole("link", { name: /Bláster de ciencia ficción/ })).toHaveAttribute("href", "/es/shop/weathered-blaster");
    expect(screen.getByRole("link", { name: "Volver a la tienda" })).toHaveAttribute("href", "/es/shop");
    expect(screen.getByRole("link", { name: "Filtrar por universo The Mandalorian" })).toHaveAttribute("href", "/es/shop?collection=the-mandalorian");
  });

  it("opens an accessible enlarged product photo and closes with Escape", () => {
    render(<ProductDetailPageContent dict={dict} product={product} locale="en" />);
    fireEvent.click(screen.getByRole("button", { name: "Enlarge Custom Helmet Kit" }));
    expect(screen.getByRole("dialog", { name: "Enlarged image of Custom Helmet Kit" })).toBeInTheDocument();
    expect(document.body.style.overflow).toBe("hidden");
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe("");
  });

  it("closes the enlarged photo when the backdrop is clicked", () => {
    render(<ProductDetailPageContent dict={dict} product={product} locale="en" />);
    fireEvent.click(screen.getByRole("button", { name: "Enlarge Custom Helmet Kit" }));
    fireEvent.click(screen.getByRole("dialog"));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("generates a distinct localized route and metadata for every product", async () => {
    expect(generateStaticParams()).toHaveLength(dict.products.length * 2);
    for (const locale of ["en", "es"] as const) {
      for (const item of getShopDictionary(locale).products) {
        const params = Promise.resolve({ locale, productId: item.id });
        const page = await ProductPage({ params });
        expect(page.props.product).toEqual(item);
        expect((await generateMetadata({ params })).title).toBe(`${item.title} | 3D CosProps`);
      }
    }
  });

  it("returns not found for an unknown product or locale", async () => {
    await expect(ProductPage({ params: Promise.resolve({ locale: "en", productId: "unknown" }) })).rejects.toThrow("NEXT_NOT_FOUND");
    await expect(ProductPage({ params: Promise.resolve({ locale: "fr", productId: product.id }) })).rejects.toThrow("NEXT_NOT_FOUND");
  });
});