'use client';

import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Product } from '@/types';
import ProductGrid from './ProductGrid';

interface ShopCatalogProps {
  initialProducts: Product[];
  categories: string[];
}

export default function ShopCatalog({
  initialProducts,
  categories,
}: ShopCatalogProps) {
  const searchParams = useSearchParams();
  const queryCategory = searchParams.get('category');

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const activeCategory =
    selectedCategory ??
    (queryCategory &&
    categories.some((c) => c.toUpperCase() === queryCategory.toUpperCase())
      ? categories.find(
          (c) => c.toUpperCase() === queryCategory.toUpperCase()
        )!
      : 'BARCHASI');

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'BARCHASI') {
      return initialProducts;
    }
    return initialProducts.filter(
      (p) => p.category.toLowerCase() === activeCategory.toLowerCase()
    );
  }, [initialProducts, activeCategory]);

  return (
    <div className="w-full">
      {/* Category Filter Navigation Bar */}
      <div className="border-b border-[#D9D6CF] py-4 mb-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        {/* Category Buttons */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-[11px] sm:text-[12px] font-mono tracking-[0.15em] uppercase py-1.5 px-3 transition-all duration-200 cursor-pointer border ${
                  isSelected
                    ? 'bg-[#111111] text-[#F5F3EE] border-[#111111]'
                    : 'bg-transparent text-[#777777] border-transparent hover:text-[#111111] hover:border-[#D9D6CF]'
                }`}
                aria-pressed={isSelected}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Counter */}
        <div className="text-[11px] font-mono tracking-widest text-[#777777] uppercase self-end lg:self-auto">
          [{filteredProducts.length} TA MAHSULOT]
        </div>
      </div>

      {/* Grid */}
      <ProductGrid products={filteredProducts} />
    </div>
  );
}
