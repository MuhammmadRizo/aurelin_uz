'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import Button from '@/components/Button';
import PageTransition from '@/components/PageTransition';
import { Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, totalCount, openCart } = useCart();

  return (
    <PageTransition className="w-full py-16 sm:py-24">
      <div className="w-full max-w-5xl mx-auto px-6 sm:px-10">
        <div className="border-b border-[#D9D6CF] pb-6 flex items-baseline justify-between">
          <h1 className="text-3xl sm:text-5xl font-bold tracking-[0.08em] text-[#111111] uppercase">
            XARID SAVATI
          </h1>
          <span className="text-[12px] font-mono tracking-widest text-[#777777] uppercase">
            [{totalCount} TA MAHSULOT]
          </span>
        </div>

        {items.length === 0 ? (
          <div className="py-24 text-center space-y-4">
            <ShoppingBag className="w-10 h-10 text-[#777777] stroke-[1] mx-auto" />
            <p className="text-[13px] font-mono tracking-[0.2em] text-[#777777] uppercase">
              SAVATINGIZ HOZIRCHA BO‘SH.
            </p>
            <div className="pt-4">
              <Link href="/shop">
                <Button variant="primary" size="md">
                  KATALOGNI KO‘RISH
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8">
            <div className="lg:col-span-8 divide-y divide-[#D9D6CF]">
              {items.map((item) => (
                <div key={item.id} className="py-6 flex space-x-6">
                  <div className="relative w-24 h-32 bg-[#EAE7DF] border border-[#D9D6CF] shrink-0 overflow-hidden">
                    <Image
                      src={item.selectedImage || item.product.image}
                      alt={item.product.name}
                      fill
                      sizes="96px"
                      className="object-contain p-2"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <Link
                          href={`/shop/${item.product.slug}`}
                          className="text-[14px] font-medium tracking-wide uppercase text-[#111111] hover:text-[#777777] transition-colors"
                        >
                          {item.product.name}
                        </Link>
                        <span className="font-mono text-[14px] font-bold text-[#111111] ml-4">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center space-x-2">
                        <span className="text-[11px] font-mono text-[#777777] uppercase">
                          O‘LCHAM: {item.size}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-[#111111] bg-transparent">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1.5 hover:bg-[#D9D6CF]/50 transition-colors cursor-pointer"
                          aria-label="Miqdorni kamaytirish"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-[12px] font-mono">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 hover:bg-[#D9D6CF]/50 transition-colors cursor-pointer"
                          aria-label="Miqdorni oshirish"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-[11px] font-mono tracking-wider text-[#777777] hover:text-[#111111] underline underline-offset-2 uppercase cursor-pointer"
                      >
                        O‘CHIRISH
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-4 p-6 border border-[#D9D6CF] bg-[#EAE7DF]/40 space-y-6 self-start">
              <span className="text-[12px] font-mono tracking-[0.2em] text-[#111111] uppercase block pb-3 border-b border-[#D9D6CF]">
                XULOSA
              </span>

              <div className="flex justify-between items-baseline text-[13px] font-mono">
                <span className="text-[#777777] uppercase">ORALIQ JAMI</span>
                <span className="font-bold text-[#111111]">{formatPrice(subtotal)}</span>
              </div>

              <div className="flex justify-between items-baseline text-[13px] font-mono">
                <span className="text-[#777777] uppercase">YETKAZIB BERISH</span>
                <span className="text-[#111111]">{subtotal >= 800000 ? 'BEPUL' : '30 000 so‘m'}</span>
              </div>

              <div className="pt-4 border-t border-[#D9D6CF] flex justify-between items-baseline text-[15px] font-mono font-bold">
                <span className="uppercase">JAMI</span>
                <span>{formatPrice(subtotal >= 800000 ? subtotal : subtotal + 30000)}</span>
              </div>

              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={openCart}
              >
                <span className="flex items-center space-x-2">
                  <span>BUYURTMANI RASMIYLASHTIRISH</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
}
