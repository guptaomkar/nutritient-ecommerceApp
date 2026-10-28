"use client";

import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from "react";
import { CartItem } from "@/lib/types";
import { BRAND_INFO } from "@/lib/data";

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  isCheckoutOpen: boolean;
  totalQuantity: number;
  subtotal: number;
  freeShippingThreshold: number;
  freeShippingRemaining: number;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  openCheckout: () => void;
  closeCheckout: () => void;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "natural_protein_cart_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Restore cart on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setItems(parsed);
        }
      }
    } catch {
      // LocalStorage access failure fallback
    }
    setIsHydrated(true);
  }, []);

  // Save cart changes
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Storage quota or privacy mode handling
    }
  }, [items, isHydrated]);

  const totalQuantity = useMemo(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }, [items]);

  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [items]);

  const freeShippingThreshold = BRAND_INFO.freeShippingThreshold;

  const freeShippingRemaining = useMemo(() => {
    return Math.max(0, freeShippingThreshold - subtotal);
  }, [subtotal, freeShippingThreshold]);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen((prev) => !prev), []);

  const openCheckout = useCallback(() => {
    setIsOpen(false);
    setIsCheckoutOpen(true);
  }, []);

  const closeCheckout = useCallback(() => setIsCheckoutOpen(false), []);

  const addItem = useCallback(
    (newItem: Omit<CartItem, "quantity">, quantity = 1) => {
      setItems((prevItems) => {
        const existingIndex = prevItems.findIndex((i) => i.variantId === newItem.variantId);
        if (existingIndex > -1) {
          const updated = [...prevItems];
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: updated[existingIndex].quantity + quantity,
          };
          return updated;
        } else {
          return [...prevItems, { ...newItem, quantity }];
        }
      });
      setIsOpen(true);
    },
    []
  );

  const removeItem = useCallback((variantId: string) => {
    setItems((prev) => prev.filter((i) => i.variantId !== variantId));
  }, []);

  const updateQuantity = useCallback((variantId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => i.variantId !== variantId));
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.variantId === variantId ? { ...i, quantity } : i))
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const value = useMemo(
    () => ({
      items,
      isOpen,
      isCheckoutOpen,
      totalQuantity,
      subtotal,
      freeShippingThreshold,
      freeShippingRemaining,
      openCart,
      closeCart,
      toggleCart,
      openCheckout,
      closeCheckout,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    }),
    [
      items,
      isOpen,
      isCheckoutOpen,
      totalQuantity,
      subtotal,
      freeShippingThreshold,
      freeShippingRemaining,
      openCart,
      closeCart,
      toggleCart,
      openCheckout,
      closeCheckout,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
