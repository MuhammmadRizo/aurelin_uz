import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { products, getAllCategories } from '@/data/products';
import ShopCatalog from '@/components/ShopCatalog';
import PageTransition from '@/components/PageTransition';

export const metadata: Metadata = {
  title: 'Barcha kiyimlar katalogi',
  description:
    'Schaubletes og‘ir svtishertlari, minimalistik futbolkalari va texnik ustki kiyimlari to‘liq katalogini kashf eting.',
};

export default function ShopPage() {
  const categories = getAllCategories();

  return (
    <PageTransition className="w-full py-12 sm:py-20">
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Page Header */}
        <div className="flex flex-col space-y-4 pb-8">
          <div className="text-[11px] font-mono tracking-[0.25em] text-[#777777] uppercase">
            KATALOG / 2026
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold tracking-[0.08em] text-[#111111] uppercase">
            BARCHA MAHSULOTLAR
          </h1>

          <p className="text-[13px] text-[#777777] max-w-lg leading-relaxed uppercase tracking-[0.05em]">
            Arxiv ko‘cha kiyimlari, og‘ir svitshotlar va funksional qatlamlar. Barcha
            siluetlar uzoq muddatli shakl va yuqori sifatli qulaylik uchun loyihalangan.
          </p>
        </div>

        {/* Catalog with Suspense for URL search params */}
        <Suspense
          fallback={
            <div className="w-full py-24 text-center">
              <span className="text-[12px] font-mono tracking-widest text-[#777777] uppercase animate-pulse">
                ARXIV YUKLANMOQDA...
              </span>
            </div>
          }
        >
          <ShopCatalog initialProducts={products} categories={categories} />
        </Suspense>
      </div>
    </PageTransition>
  );
}
