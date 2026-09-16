import React from 'react';
import { Product } from '@/types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  className?: string;
}

export default function ProductGrid({ products, className = '' }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="w-full py-24 text-center border-y border-[#D9D6CF]">
        <p className="text-[13px] font-mono tracking-[0.2em] text-[#777777] uppercase">
          USHBU BO‘LIMDA HOZIRCHA MAHSULOTLAR MAVJUD EMAS.
        </p>
      </div>
    );
  }

  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 sm:gap-x-8 lg:gap-x-12 gap-y-12 sm:gap-y-16 ${className}`}
    >
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          priority={index < 3}
        />
      ))}
    </div>
  );
}
