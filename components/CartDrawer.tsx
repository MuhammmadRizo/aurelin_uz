'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ArrowRight, ShoppingBag, CheckCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import Button from './Button';

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    subtotal,
    totalCount,
    clearCart,
  } = useCart();

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  const handleClose = () => {
    setCheckoutComplete(false);
    closeCart();
  };

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeCart();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeCart]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleSimulateCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutComplete(true);
      clearCart();
    }, 1200);
  };

  const freeShippingThreshold = 800000;
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const amountNeeded = freeShippingThreshold - subtotal;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleClose}
            className="absolute inset-0 bg-[#111111]/40 backdrop-blur-xs cursor-pointer"
            aria-hidden="true"
          />

          {/* Slide-out Drawer Panel from Right */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-[#F5F3EE] shadow-2xl flex flex-col z-10 border-l border-[#D9D6CF]"
            role="dialog"
            aria-modal="true"
            aria-label="Xarid savati oynasi"
          >
            {/* Drawer Header */}
            <div className="px-6 py-5 border-b border-[#D9D6CF] flex items-center justify-between">
              <div className="flex items-baseline space-x-2">
                <span className="text-[14px] font-semibold tracking-[0.2em] text-[#111111] uppercase">
                  XARID SAVATI
                </span>
                <span className="text-[11px] font-mono text-[#777777]">
                  ({totalCount} TA MAHSULOT)
                </span>
              </div>
              <button
                onClick={handleClose}
                className="p-1 text-[#111111] hover:text-[#777777] transition-colors focus-visible:outline-none cursor-pointer"
                aria-label="Savatni yopish"
              >
                <X className="w-5 h-5 stroke-[1.5]" />
              </button>
            </div>

            {/* Free Shipping Progress Indicator */}
            {items.length > 0 && !checkoutComplete && (
              <div className="bg-[#EAE7DF] px-6 py-2.5 border-b border-[#D9D6CF]/70">
                <p className="text-[10px] font-mono tracking-wider text-[#111111] uppercase">
                  {amountNeeded > 0
                    ? `BEPUL YETKAZISH UCHUN YANA ${formatPrice(amountNeeded)} QO‘SHING`
                    : 'SIZ BEPUL YETKAZIB BERISH HUQUQIGA EGA BO‘LDINGIZ'}
                </p>
                <div className="w-full bg-[#D9D6CF] h-[2px] mt-1.5 overflow-hidden">
                  <div
                    className="bg-[#111111] h-full transition-all duration-500"
                    style={{ width: `${progressToFreeShipping}%` }}
                  />
                </div>
              </div>
            )}

            {/* Cart Body */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {checkoutComplete ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
                  <div className="w-12 h-12 rounded-full border border-[#111111] flex items-center justify-center text-[#111111]">
                    <CheckCircle className="w-6 h-6 stroke-[1.5]" />
                  </div>
                  <h3 className="text-base font-semibold tracking-[0.15em] text-[#111111] uppercase">
                    BUYURTMA TASDIQLANDI
                  </h3>
                  <p className="text-[12px] text-[#777777] max-w-xs leading-relaxed">
                    Xaridingiz uchun tashakkur! Buyurtma tafsilotlari va kuzatuv kodi elektron pochtangizga yuboriladi.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleClose}
                    className="mt-4"
                  >
                    XARIDNI DAVOM ETTIRISH
                  </Button>
                </div>
              ) : items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
                  <ShoppingBag className="w-8 h-8 text-[#777777] stroke-[1]" />
                  <p className="text-[12px] font-mono tracking-[0.2em] uppercase text-[#777777]">
                    SAVATINGIZ HOZIRCHA BO‘SH
                  </p>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleClose}
                    className="mt-2"
                  >
                    TO‘PLAMNI KO‘RISH
                  </Button>
                </div>
              ) : (
                <div className="divide-y divide-[#D9D6CF]/70">
                  {items.map((item) => (
                    <div key={item.id} className="py-4 flex space-x-4">
                      {/* Product Thumbnail */}
                      <div className="relative w-20 h-24 bg-[#EAE7DF] border border-[#D9D6CF]/60 shrink-0 overflow-hidden">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          sizes="80px"
                          className="object-contain p-2"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <Link
                              href={`/shop/${item.product.slug}`}
                              onClick={handleClose}
                              className="text-[12px] font-medium tracking-[0.05em] uppercase text-[#111111] hover:text-[#777777] transition-colors line-clamp-1"
                            >
                              {item.product.name}
                            </Link>
                            <span className="text-[12px] font-mono font-semibold text-[#111111] ml-2">
                              {formatPrice(item.product.price * item.quantity)}
                            </span>
                          </div>

                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-[10px] font-mono uppercase text-[#777777]">
                              O‘LCHAM:
                            </span>
                            <span className="text-[10px] font-mono font-semibold uppercase px-1.5 py-0.5 bg-[#EAE7DF] border border-[#D9D6CF]/80 text-[#111111]">
                              {item.size}
                            </span>
                          </div>
                        </div>

                        {/* Quantity controls and remove */}
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-[#D9D6CF] bg-[#EAE7DF]">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 hover:bg-[#D9D6CF] text-[#111111] transition-colors cursor-pointer"
                              aria-label="Miqdorni kamaytirish"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2.5 text-[11px] font-mono text-[#111111]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 hover:bg-[#D9D6CF] text-[#111111] transition-colors cursor-pointer"
                              aria-label="Miqdorni oshirish"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-[10px] font-mono tracking-wider text-[#777777] hover:text-[#111111] underline underline-offset-2 transition-colors cursor-pointer uppercase"
                          >
                            O‘CHIRISH
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Drawer Footer / Subtotal & Checkout */}
            {items.length > 0 && !checkoutComplete && (
              <div className="p-6 border-t border-[#D9D6CF] bg-[#F5F3EE] space-y-4">
                <div className="flex justify-between items-baseline text-[12px] font-medium uppercase tracking-[0.1em]">
                  <span className="text-[#777777]">ORALIQ JAMI</span>
                  <span className="text-base font-mono font-bold text-[#111111]">
                    {formatPrice(subtotal)}
                  </span>
                </div>

                <p className="text-[10px] text-[#777777] tracking-wider uppercase font-mono">
                  SOLIQLAR VA YETKAZISH TO‘LOV BOSQICHIDA HISOBLANADI
                </p>

                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  disabled={isCheckingOut}
                  onClick={handleSimulateCheckout}
                >
                  {isCheckingOut ? (
                    'BUYURTMA ISHLANMOQDA...'
                  ) : (
                    <span className="flex items-center space-x-2">
                      <span>BUYURTMANI RASMIYLASHTIRISH</span>
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </span>
                  )}
                </Button>

                <button
                  onClick={handleClose}
                  className="w-full text-center text-[10px] font-mono tracking-[0.18em] text-[#777777] hover:text-[#111111] transition-colors uppercase pt-1 cursor-pointer"
                >
                  YOKI XARIDNI DAVOM ETTIRISH
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
