"use client";

import { useSyncExternalStore } from "react";
import type { Cart, ProductCartItem } from "../models/api/contracts";
import type { ShopProductContent } from "../types/content";

const CART_STORAGE_KEY = "3d-cosprops-cart";
const EMPTY_CART: Cart = { currency: "USD", items: [], subtotalCents: 0, updatedAt: "" };
let cachedCartJson: string | null | undefined;
let cachedCart = EMPTY_CART;
const cartListeners = new Set<() => void>();

function getCartSnapshot(): Cart {
  let savedCart: string | null;
  try {
    savedCart = window.localStorage.getItem(CART_STORAGE_KEY);
  } catch {
    return EMPTY_CART;
  }
  if (savedCart === cachedCartJson) return cachedCart;
  cachedCartJson = savedCart;
  try {
    const parsedCart = savedCart ? JSON.parse(savedCart) as Cart : EMPTY_CART;
    cachedCart = Array.isArray(parsedCart.items) ? parsedCart : EMPTY_CART;
  } catch {
    cachedCart = EMPTY_CART;
  }
  return cachedCart;
}

function subscribeToCart(listener: () => void) {
  cartListeners.add(listener);
  const handleStorage = (event: StorageEvent) => {
    if (event.key === CART_STORAGE_KEY || event.key === null) {
      cachedCartJson = undefined;
      listener();
    }
  };
  window.addEventListener("storage", handleStorage);
  return () => {
    cartListeners.delete(listener);
    window.removeEventListener("storage", handleStorage);
  };
}

export function useShopCart() {
  const cart = useSyncExternalStore(subscribeToCart, getCartSnapshot, () => EMPTY_CART);

  function addProduct(product: ShopProductContent, quantity = 1): boolean {
    const currentCart = getCartSnapshot();
    const existing = currentCart.items.find(
      (item): item is ProductCartItem => item.kind === "product" && item.productId === product.id,
    );
    const items = existing
      ? currentCart.items.map((item) =>
          item.kind === "product" && item.productId === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        )
      : [...currentCart.items, {
          kind: "product" as const,
          productId: product.id,
          productType: product.type,
          quantity,
          unitPriceCents: product.priceCents,
        }];
    const nextCart: Cart = {
      ...currentCart,
      items,
      subtotalCents: currentCart.subtotalCents + product.priceCents * quantity,
      updatedAt: new Date().toISOString(),
    };
    try {
      const serializedCart = JSON.stringify(nextCart);
      window.localStorage.setItem(CART_STORAGE_KEY, serializedCart);
      cachedCartJson = serializedCart;
      cachedCart = nextCart;
      cartListeners.forEach((listener) => listener());
      return true;
    } catch {
      return false;
    }
  }

  return { cart, addProduct };
}