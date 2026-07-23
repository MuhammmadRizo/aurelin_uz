'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartItem, Product } from '@/types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Partial<Product> & { id: string; title: string; priceUzs: number; image: string }) => void;
  removeFromCart: (id: string, size: string, color: string) => void;
  updateQuantity: (id: string, size: string, color: string, newQty: number) => void;
  clearCart: () => void;
  totalCount: number;
  totalPriceUzs: number;
}

const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  totalCount: 0,
  totalPriceUzs: 0
});

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('aurelin_cart_items');
      if (saved) {
        setCart(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('aurelin_cart_items', JSON.stringify(newCart));
  };

  const addToCart = (product: Partial<Product> & { id: string; title: string; priceUzs: number; image: string }) => {
    const itemSize = product.size || 'M';
    const itemColor = product.color || 'Default';

    const existingIndex = cart.findIndex(
      (item) => item.id === product.id && item.size === itemSize && item.color === itemColor
    );

    let updated: CartItem[];
    if (existingIndex > -1) {
      updated = [...cart];
      updated[existingIndex].quantity += product.quantity || 1;
    } else {
      updated = [
        ...cart,
        {
          id: product.id,
          title: product.title,
          category: product.category || 'Aurelin Apparel',
          priceUzs: product.priceUzs,
          priceUsd: product.priceUsd || 24.99,
          size: itemSize,
          color: itemColor,
          image: product.image,
          quantity: product.quantity || 1
        }
      ];
    }
    saveCart(updated);
    triggerToast(`"${product.title}" savatchaga qo'shildi!`);
  };

  const removeFromCart = (id: string, size: string, color: string) => {
    const updated = cart.filter(
      (item) => !(item.id === id && item.size === size && item.color === color)
    );
    saveCart(updated);
  };

  const updateQuantity = (id: string, size: string, color: string, newQty: number) => {
    if (newQty < 1) return;
    const updated = cart.map((item) => {
      if (item.id === id && item.size === size && item.color === color) {
        return { ...item, quantity: newQty };
      }
      return item;
    });
    saveCart(updated);
  };

  const clearCart = () => {
    saveCart([]);
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPriceUzs = cart.reduce((sum, item) => sum + item.priceUzs * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalCount,
        totalPriceUzs
      }}
    >
      {children}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            background: 'var(--accent-primary)',
            color: 'var(--bg-main)',
            padding: '14px 24px',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-lg)',
            zIndex: 9999,
            fontWeight: 700,
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            animation: 'popIn 0.3s ease'
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>{toastMessage}</span>
        </div>
      )}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
