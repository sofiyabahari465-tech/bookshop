'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { products, Product } from './data';

interface CartItem extends Product {
  qty: number;
}

interface StoreContextType {
  cart: CartItem[];
  wishlist: number[];
  addToCart: (id: number) => void;
  removeFromCart: (id: number) => void;
  changeQty: (id: number, delta: number) => void;
  toggleWishlist: (id: number) => void;
  cartTotal: number;
  cartCount: number;
  isCartOpen: boolean;
  setCartOpen: (v: boolean) => void;
  isWishOpen: boolean;
  setWishOpen: (v: boolean) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (p: Product | null) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const getInitial = <T,>(key: string, fallback: T): T => {
  if (typeof window === 'undefined') return fallback;
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch {
    return fallback;
  }
};

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => getInitial('dokhtarane-cart', []));
  const [wishlist, setWishlist] = useState<number[]>(() => getInitial('dokhtarane-wishlist', []));
  const [isCartOpen, setCartOpen] = useState(false);
  const [isWishOpen, setWishOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => getInitial('dokhtarane-theme', 'light'));

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const persist = useCallback((key: string, value: unknown) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  }, []);

  useEffect(() => { persist('dokhtarane-cart', cart); }, [cart, persist]);
  useEffect(() => { persist('dokhtarane-wishlist', wishlist); }, [wishlist, persist]);
  useEffect(() => { persist('dokhtarane-theme', theme); }, [theme, persist]);

  const addToCart = useCallback((id: number) => {
    const product = products.find(p => p.id === id);
    if (!product) return;
    setCart(prev => {
      const existing = prev.find(i => i.id === id);
      if (existing) {
        return prev.map(i => i.id === id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...product, qty: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((id: number) => {
    setCart(prev => prev.filter(i => i.id !== id));
  }, []);

  const changeQty = useCallback((id: number, delta: number) => {
    setCart(prev => {
      const item = prev.find(i => i.id === id);
      if (!item) return prev;
      if (item.qty + delta <= 0) {
        return prev.filter(i => i.id !== id);
      }
      return prev.map(i => i.id === id ? { ...i, qty: i.qty + delta } : i);
    });
  }, []);

  const toggleWishlist = useCallback((id: number) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(t => t === 'light' ? 'dark' : 'light');
  }, []);

  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <StoreContext.Provider value={{
      cart, wishlist, addToCart, removeFromCart, changeQty, toggleWishlist,
      cartTotal, cartCount, isCartOpen, setCartOpen, isWishOpen, setWishOpen,
      selectedProduct, setSelectedProduct, theme, toggleTheme
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}
