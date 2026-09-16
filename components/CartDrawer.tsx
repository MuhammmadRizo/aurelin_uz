'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Plus,
  Minus,
  ArrowRight,
  ArrowLeft,
  ShoppingBag,
  CheckCircle,
  Send,
  Phone,
  User,
  MapPin,
  MessageSquare,
} from 'lucide-react';
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

  const [viewMode, setViewMode] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('+998 ');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [lastSubmittedOrder, setLastSubmittedOrder] = useState<{
    name: string;
    phone: string;
    total: number;
    text: string;
  } | null>(null);

  const freeShippingThreshold = 800000;
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const amountNeeded = freeShippingThreshold - subtotal;
  const shippingFee = subtotal >= freeShippingThreshold ? 0 : 30000;
  const grandTotal = subtotal + shippingFee;

  const handleClose = useCallback(() => {
    if (viewMode === 'success') {
      clearCart();
    }
    setViewMode('cart');
    setSubmitError(null);
    closeCart();
  }, [viewMode, clearCart, closeCart]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleClose]);

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

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (!val.startsWith('+998') && !val.startsWith('+')) {
      const digits = val.replace(/\D/g, '');
      val = '+998 ' + digits;
    }
    setPhone(val);
  };

  const handleProceedToCheckout = () => {
    setViewMode('checkout');
    setSubmitError(null);
  };

  const handleBackToCart = () => {
    setViewMode('cart');
    setSubmitError(null);
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!phone || phone.trim().length < 9) {
      setSubmitError('Iltimos, to‘g‘ri telefon raqamingizni kiriting');
      return;
    }

    if (items.length === 0) {
      setSubmitError('Savatchangiz bo‘sh');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    const orderPayload = {
      customerName: customerName.trim() || 'Ism kiritilmagan',
      phone: phone.trim(),
      address: address.trim(),
      notes: notes.trim(),
      items: items.map((i) => ({
        id: i.product.id,
        name: i.product.name,
        slug: i.product.slug,
        image: i.selectedImage || i.product.image,
        size: i.size,
        quantity: i.quantity,
        price: i.product.price,
      })),
      subtotal,
      shipping: shippingFee,
      total: grandTotal,
    };

    try {
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderPayload),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || 'Buyurtma yuborishda xatolik');
      }

      // Generate direct telegram message text for fallback/quick chat
      const directItemsSummary = items
        .map(
          (i) =>
            `• ${i.product.name} (${i.size}) x${i.quantity} — ${formatPrice(i.product.price * i.quantity)}`
        )
        .join('\n');
      const directText = `Assalomu alaykum! Sayt orqali buyurtma berdim.\n\n👤 Ismim: ${customerName || 'Mijoz'}\n📞 Telefon: ${phone}\n\n📦 Mahsulotlar:\n${directItemsSummary}\n\n💰 Jami to‘lov: ${formatPrice(grandTotal)}`;

      setLastSubmittedOrder({
        name: customerName,
        phone: phone,
        total: grandTotal,
        text: directText,
      });

      clearCart();
      setViewMode('success');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

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
              <div className="flex items-center space-x-3">
                {viewMode === 'checkout' && (
                  <button
                    onClick={handleBackToCart}
                    className="p-1 -ml-1 text-[#111111] hover:text-[#777777] transition-colors cursor-pointer"
                    aria-label="Savatchaga qaytish"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                )}
                <div className="flex items-baseline space-x-2">
                  <span className="text-[13px] sm:text-[14px] font-semibold tracking-[0.2em] text-[#111111] uppercase">
                    {viewMode === 'cart' && 'XARID SAVATI'}
                    {viewMode === 'checkout' && 'BUYURTMA MA‘LUMOTLARI'}
                    {viewMode === 'success' && 'BUYURTMA TASDIQLANDI'}
                  </span>
                  {viewMode === 'cart' && (
                    <span className="text-[11px] font-mono text-[#777777]">
                      ({totalCount} TA MAHSULOT)
                    </span>
                  )}
                </div>
              </div>

              <button
                onClick={handleClose}
                className="p-1 text-[#111111] hover:text-[#777777] transition-colors focus-visible:outline-none cursor-pointer"
                aria-label="Savatni yopish"
              >
                <X className="w-5 h-5 stroke-[1.5]" />
              </button>
            </div>

            {/* Free Shipping Progress Indicator (Cart view only) */}
            {viewMode === 'cart' && items.length > 0 && (
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

            {/* Drawer Body - VIEW 1: CART ITEMS */}
            {viewMode === 'cart' && (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-4">
                  {items.length === 0 ? (
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
                              src={item.selectedImage || item.product.image}
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

                {/* Cart Footer */}
                {items.length > 0 && (
                  <div className="p-6 border-t border-[#D9D6CF] bg-[#F5F3EE] space-y-4">
                    <div className="flex justify-between items-baseline text-[12px] font-medium uppercase tracking-[0.1em]">
                      <span className="text-[#777777]">ORALIQ JAMI</span>
                      <span className="text-base font-mono font-bold text-[#111111]">
                        {formatPrice(subtotal)}
                      </span>
                    </div>

                    <p className="text-[10px] text-[#777777] tracking-wider uppercase font-mono">
                      YETKAZISH VA TO‘LOV TELEGRAM ORQALI KELISHILADI
                    </p>

                    <Button
                      variant="primary"
                      size="lg"
                      fullWidth
                      onClick={handleProceedToCheckout}
                    >
                      <span className="flex items-center space-x-2">
                        <span>BUYURTMANI RASMIYLASHTIRISH</span>
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </span>
                    </Button>

                    <button
                      onClick={handleClose}
                      className="w-full text-center text-[10px] font-mono tracking-[0.18em] text-[#777777] hover:text-[#111111] transition-colors uppercase pt-1 cursor-pointer"
                    >
                      YOKI XARIDNI DAVOM ETTIRISH
                    </button>
                  </div>
                )}
              </>
            )}

            {/* Drawer Body - VIEW 2: CHECKOUT & PHONE PROMPT */}
            {viewMode === 'checkout' && (
              <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col justify-between">
                <form onSubmit={handleSubmitOrder} className="space-y-5">
                  <div className="bg-[#EAE7DF] p-3.5 border border-[#D9D6CF] text-[11px] font-mono text-[#555555] leading-relaxed">
                    Telefon raqamingizni kiriting. Ma‘lumotlar darhol Telegram guruhimizga tushadi va operator siz bilan bog‘lanadi.
                  </div>

                  {submitError && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-[11px] font-mono">
                      {submitError}
                    </div>
                  )}

                  {/* Customer Name Input */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono tracking-[0.15em] text-[#111111] uppercase flex items-center space-x-1.5">
                      <User className="w-3.5 h-3.5 text-[#777777]" />
                      <span>ISM VA FAMILIYANGIZ</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Masalan: Aziz Rahimov"
                      className="w-full bg-[#EAE7DF] border border-[#D9D6CF] px-3.5 py-2.5 text-[13px] text-[#111111] placeholder:text-[#777777]/70 focus:outline-none focus:border-[#111111] transition-colors"
                    />
                  </div>

                  {/* Phone Input */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono tracking-[0.15em] text-[#111111] uppercase flex items-center space-x-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#777777]" />
                      <span>TELEFON RAQAMINGIZ *</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={handlePhoneChange}
                      placeholder="+998 90 123 45 67"
                      className="w-full bg-[#EAE7DF] border border-[#D9D6CF] px-3.5 py-2.5 text-[13px] font-mono text-[#111111] placeholder:text-[#777777]/70 focus:outline-none focus:border-[#111111] transition-colors"
                    />
                  </div>

                  {/* Delivery Address Input */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono tracking-[0.15em] text-[#111111] uppercase flex items-center space-x-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#777777]" />
                      <span>YETKAZISH MANZILI (IXTIYORIY)</span>
                    </label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Toshkent shahri, Chilonzor tumani..."
                      className="w-full bg-[#EAE7DF] border border-[#D9D6CF] px-3.5 py-2.5 text-[13px] text-[#111111] placeholder:text-[#777777]/70 focus:outline-none focus:border-[#111111] transition-colors"
                    />
                  </div>

                  {/* Notes Input */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono tracking-[0.15em] text-[#111111] uppercase flex items-center space-x-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-[#777777]" />
                      <span>QO‘SHIMCHA IZOH (IXTIYORIY)</span>
                    </label>
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Qo‘shimcha talab yoki qulay vaqt..."
                      className="w-full bg-[#EAE7DF] border border-[#D9D6CF] px-3.5 py-2 text-[13px] text-[#111111] placeholder:text-[#777777]/70 focus:outline-none focus:border-[#111111] transition-colors resize-none"
                    />
                  </div>

                  {/* Order Summary Box */}
                  <div className="pt-3 border-t border-[#D9D6CF] space-y-2 font-mono text-[11px]">
                    <div className="flex justify-between text-[#777777]">
                      <span>MAHSULOTLAR ({totalCount} TA):</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-[#777777]">
                      <span>YETKAZIB BERISH:</span>
                      <span>{shippingFee === 0 ? 'BEPUL' : '30 000 so‘m'}</span>
                    </div>
                    <div className="flex justify-between text-[#111111] font-bold text-[13px] pt-1 border-t border-[#D9D6CF]/60">
                      <span>UMUMIY TO‘LOV:</span>
                      <span>{formatPrice(grandTotal)}</span>
                    </div>
                  </div>

                  {/* Submit CTA */}
                  <div className="pt-2 space-y-2">
                    <Button
                      variant="primary"
                      size="lg"
                      fullWidth
                      disabled={isSubmitting}
                      type="submit"
                    >
                      {isSubmitting ? (
                        <span>YUBORILMOQDA...</span>
                      ) : (
                        <span className="flex items-center justify-center space-x-2">
                          <Send className="w-4 h-4 mr-1" />
                          <span>TELEGRAM GURUHGA YUBORISH</span>
                        </span>
                      )}
                    </Button>

                    <button
                      type="button"
                      onClick={handleBackToCart}
                      className="w-full text-center text-[10px] font-mono tracking-[0.18em] text-[#777777] hover:text-[#111111] transition-colors uppercase pt-1 cursor-pointer"
                    >
                      BEKOR QILISH VA SAVATGA QAYTISH
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Drawer Body - VIEW 3: SUCCESS CONFIRMATION */}
            {viewMode === 'success' && (
              <div className="flex-1 overflow-y-auto px-6 py-10 flex flex-col items-center justify-center text-center space-y-5">
                <div className="w-14 h-14 rounded-full border-2 border-emerald-600 flex items-center justify-center text-emerald-600">
                  <CheckCircle className="w-8 h-8 stroke-[1.75]" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-bold tracking-[0.15em] text-[#111111] uppercase">
                    BUYURTMA GURUHGA YUBORILDI!
                  </h3>
                  <p className="text-[13px] text-[#555555] max-w-xs leading-relaxed">
                    {lastSubmittedOrder?.name ? `${lastSubmittedOrder.name}, ` : ''}buyurtmangiz
                    muvaffaqiyatli qabul qilindi. Operatorimiz tez orada{' '}
                    <span className="font-mono font-semibold text-[#111111]">
                      {lastSubmittedOrder?.phone}
                    </span>{' '}
                    raqami orqali bog‘lanadi.
                  </p>
                </div>

                {/* Recap Box */}
                <div className="w-full p-4 bg-[#EAE7DF] border border-[#D9D6CF] text-left space-y-2 font-mono text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-[#777777]">TELEFON:</span>
                    <span className="font-semibold text-[#111111]">{lastSubmittedOrder?.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#777777]">JAMI SUMMA:</span>
                    <span className="font-bold text-[#111111]">
                      {lastSubmittedOrder ? formatPrice(lastSubmittedOrder.total) : ''}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#777777]">YETKAZISH:</span>
                    <span className="text-[#111111]">8–12 KUN (XITOYDAN)</span>
                  </div>
                </div>

                {/* Direct Telegram Chat Button */}
                {lastSubmittedOrder?.text && (
                  <a
                    href={`https://t.me/Kimsanboyevkx?text=${encodeURIComponent(lastSubmittedOrder.text)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center px-6 py-3.5 bg-[#229ED9] hover:bg-[#1e8ec3] text-white font-medium text-[12px] uppercase tracking-[0.15em] transition-all cursor-pointer shadow-xs"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    <span>TELEGRAMDA MENEYER BILAN BOG‘LANISH</span>
                  </a>
                )}

                <Button
                  variant="outline"
                  size="md"
                  fullWidth
                  onClick={handleClose}
                  className="mt-2"
                >
                  XARIDNI DAVOM ETTIRISH
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
