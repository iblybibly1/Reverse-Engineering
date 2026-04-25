"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";

export interface EntryData {
  participantName: string;
  horseName: string;
  horseAge: string;
  phone: string;
  address: string;
  imageBase64?: string;
  imageFileName?: string;
}

export interface CartItem {
  cartId: string;
  competitionId: string;
  competitionName: string;
  classId: string;
  className: string;
  priceEur: number;
  entry: EntryData;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "cartId">) => void;
  removeItem: (cartId: string) => void;
  clearCart: () => void;
  total: number;
  count: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "nattely_cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setItems(JSON.parse(stored));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  const addItem = useCallback((item: Omit<CartItem, "cartId">) => {
    setItems((prev) => [...prev, { ...item, cartId: uuidv4() }]);
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((cartId: string) => {
    setItems((prev) => prev.filter((i) => i.cartId !== cartId));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
  }, []);

  const total = items.reduce((sum, i) => sum + i.priceEur, 0);
  const count = items.length;

  return (
    <CartContext.Provider value={{
      items, addItem, removeItem, clearCart,
      total, count,
      isOpen, openCart: () => setIsOpen(true), closeCart: () => setIsOpen(false),
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
