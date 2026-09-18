'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import Button from './Button';
import { ArrowLeft, Check, Minus, Plus, ShieldCheck, Truck } from 'lucide-react';

interface ProductDetailClientProps {
  product: Product;
}

function renderDetailContent(detail: string) {
  const colonIndex = detail.indexOf(':');
  if (colonIndex === -1) {
    return <span>{detail}</span>;
  }

  const label = detail.slice(0, colonIndex + 1);
  const rawValue = detail.slice(colonIndex + 1).trim();

  let url: string | null = null;

  if (rawValue.includes('@aurelin.uz')) {
    url = 'https://www.instagram.com/aurelin.uz/';
  } else if (rawValue.includes('@aurelin_uz_atziv')) {
    url = 'https://t.me/aurelin_uz_atziv';
  } else if (rawValue.includes('@Kimsanboyevkx')) {
    url = 'https://t.me/Kimsanboyevkx';
  } else {
    const match = rawValue.match(/@([a-zA-Z0-9_.]+)/);
    if (match) {
      const handle = match[1];
      if (label.toLowerCase().includes('instagram')) {
        url = `https://www.instagram.com/${handle}/`;
      } else {
        url = `https://t.me/${handle}`;
      }
    }
  }

  if (url) {
    return (
      <span>
        {label}{' '}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#111111] font-medium underline underline-offset-2 decoration-[#B5B2AA] hover:decoration-[#111111] hover:text-black transition-colors inline-flex items-center gap-0.5"
        >
          {rawValue}
          <span className="text-[10px] text-[#777777] leading-none select-none">↗</span>
        </a>
      </span>
    );
  }

  return <span>{detail}</span>;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const { addItem } = useCart();

  const galleryImages = product.gallery && product.gallery.length > 0
    ? product.gallery
    : [product.image];

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [quantity, setQuantity] = useState<number>(1);
  const [isAdded, setIsAdded] = useState<boolean>(false);

  const handleAddToCart = () => {
    const chosenImage = galleryImages[selectedImage] || product.image;
    addItem(product, selectedSize, quantity, chosenImage);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="w-full">
      {/* Back to Catalogue Navigation */}
      <div className="pb-8 mb-6 border-b border-[#D9D6CF]">
        <Link
          href="/shop"
          className="group inline-flex items-center space-x-2 text-[11px] font-mono tracking-[0.2em] text-[#777777] hover:text-[#111111] uppercase transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          <span>KATALOGGA QAYTISH</span>
        </Link>
      </div>

      {/* 60% Left Image Gallery / 40% Right Product Info Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        {/* LEFT: Product Image Gallery (approx 60% = 7 cols on lg) */}
        <div className="lg:col-span-7 flex flex-col space-y-4">
          {/* Main Large Image Container (4:5 aspect ratio) */}
          <div
            data-cursor="drag"
            className="relative w-full aspect-[4/5] bg-[#EAE7DF] border border-[#D9D6CF]/70 overflow-hidden flex items-center justify-center"
          >
            <Image
              src={galleryImages[selectedImage]}
              alt={`${product.name} — ko‘rinish ${selectedImage + 1}`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-contain p-8 transition-all duration-500 ease-out"
            />

            {product.label && (
              <div className="absolute top-4 left-4">
                <span className="text-[10px] font-mono tracking-[0.25em] uppercase px-2.5 py-1 bg-[#F5F3EE]/95 border border-[#D9D6CF] text-[#111111]">
                  {product.label}
                </span>
              </div>
            )}
          </div>

          {/* Gallery Thumbnails (if multiple images) */}
          {galleryImages.length > 1 && (
            <div className="flex space-x-3 overflow-x-auto pb-2">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative w-20 h-24 bg-[#EAE7DF] border shrink-0 transition-all cursor-pointer ${
                    selectedImage === idx
                      ? 'border-[#111111] opacity-100 ring-1 ring-[#111111]'
                      : 'border-[#D9D6CF] opacity-60 hover:opacity-100'
                  }`}
                  aria-label={`Rasm tanlash: ${idx + 1}`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} miniatyura ${idx + 1}`}
                    fill
                    sizes="80px"
                    className="object-contain p-2"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT: Product Information (approx 40% = 5 cols on lg) */}
        <div className="lg:col-span-5 flex flex-col space-y-8 lg:sticky lg:top-28">
          {/* Category & Collection Header */}
          <div className="border-b border-[#D9D6CF] pb-6">
            <div className="flex items-center justify-between text-[11px] font-mono tracking-[0.2em] text-[#777777] uppercase mb-2">
              <span>{product.category}</span>
              <span>SOTUVDA MAVJUD</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-[0.06em] text-[#111111] uppercase leading-tight">
              {product.name}
            </h1>

            <div className="mt-4 text-2xl font-mono font-bold text-[#111111]">
              {formatPrice(product.price)}
            </div>
          </div>

          {/* Description */}
          <p className="text-[14px] text-[#555555] leading-relaxed tracking-wide">
            {product.description}
          </p>

          {/* Size Selector */}
          <div className="space-y-3 pt-2">
            <div className="flex justify-between items-baseline">
              <label className="text-[11px] font-mono tracking-[0.2em] text-[#111111] uppercase">
                O‘LCHAMNI TANLANG:
              </label>
              <span className="text-[10px] font-mono text-[#777777] uppercase">
                STANDART KO‘CHA BICHIMI
              </span>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {product.sizes.map((size) => {
                const isSelected = selectedSize === size;
                return (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 text-[12px] font-mono tracking-widest uppercase transition-all duration-200 cursor-pointer border ${
                      isSelected
                        ? 'bg-[#111111] text-[#F5F3EE] border-[#111111]'
                        : 'bg-transparent text-[#111111] border-[#D9D6CF] hover:border-[#111111]'
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quantity Selector & Add to Cart */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center space-x-4">
              {/* Quantity Counter */}
              <div className="flex items-center border border-[#111111] bg-transparent h-12">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3.5 h-full text-[#111111] hover:bg-[#D9D6CF]/50 transition-colors cursor-pointer"
                  aria-label="Miqdorni kamaytirish"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-4 font-mono text-[13px] text-[#111111]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3.5 h-full text-[#111111] hover:bg-[#D9D6CF]/50 transition-colors cursor-pointer"
                  aria-label="Miqdorni oshirish"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Add To Cart CTA */}
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={handleAddToCart}
                data-cursor="cart"
                className="h-12"
              >
                {isAdded ? (
                  <span className="flex items-center justify-center space-x-2">
                    <Check className="w-4 h-4" />
                    <span>SAVATGA QO‘SHILDI</span>
                  </span>
                ) : (
                  <span>SAVATGA QO‘SHISH — {formatPrice(product.price * quantity)}</span>
                )}
              </Button>
            </div>
          </div>

          {/* Garment Details / Specifications */}
          {product.details && product.details.length > 0 && (
            <div className="pt-6 border-t border-[#D9D6CF] space-y-3">
              <span className="text-[11px] font-mono tracking-[0.2em] text-[#111111] uppercase block">
                TEXNIK XUSUSIYATLAR VA MAHORAT
              </span>
              <ul className="space-y-2 text-[12px] text-[#555555]">
                {product.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-[#111111] mt-0.5">•</span>
                    {renderDetailContent(detail)}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Composition */}
          {product.composition && (
            <div className="pt-4 border-t border-[#D9D6CF]/60 flex flex-col space-y-1">
              <span className="text-[10px] font-mono tracking-[0.2em] text-[#777777] uppercase">
                MATO TARKIBI:
              </span>
              <span className="text-[12px] font-mono text-[#111111]">
                {product.composition}
              </span>
            </div>
          )}

          {/* Shipping & Authenticity Badges */}
          <div className="pt-6 border-t border-[#D9D6CF] flex flex-col space-y-3 text-[11px] font-mono tracking-wider text-[#777777] uppercase">
            <div className="flex items-center space-x-2">
              <Truck className="w-4 h-4 text-[#111111]" />
              <span>800 000 SO‘MDAN YUQORI BUYURTMALARGA BEPUL YETKAZISH</span>
            </div>
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-[#111111]" />
              <span>XITOYDAN ORIGINAL MAHSULOTLAR</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
