'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  return (
    <div className="group relative flex flex-col w-full text-left">
      <Link
        href={`/shop/${product.slug}`}
        className="block w-full focus-visible:outline-none"
        aria-label={`${product.name} tafsilotlarini ko‘rish`}
      >
        {/* Product Image Container with 4:5 Aspect Ratio */}
        <div className="relative w-full aspect-[4/5] bg-[#EAE7DF] overflow-hidden border border-[#D9D6CF]/60 transition-colors duration-500 group-hover:border-[#111111]/40">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={priority}
            className="object-contain object-center p-6 transition-transform duration-700 ease-out will-change-transform group-hover:scale-[1.035]"
          />

          {/* Minimal Editorial Badge / Collection Label */}
          {product.label && (
            <div className="absolute top-3 left-3">
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase px-2 py-1 bg-[#F5F3EE]/90 backdrop-blur-xs text-[#111111] border border-[#D9D6CF]/50">
                {product.label}
              </span>
            </div>
          )}
        </div>

        {/* Product Information Metadata */}
        <div className="mt-4 flex flex-col space-y-1 transition-transform duration-500 ease-out group-hover:translate-x-0.5">
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#777777]">
              {product.category}
            </span>
            <span className="text-[13px] font-mono tracking-wider font-semibold text-[#111111]">
              {formatPrice(product.price)}
            </span>
          </div>

          <h3 className="text-[14px] sm:text-[15px] font-medium tracking-[0.06em] text-[#111111] uppercase leading-snug line-clamp-2">
            {product.name}
          </h3>
        </div>
      </Link>
    </div>
  );
}
