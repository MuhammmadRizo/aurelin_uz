import React from 'react';
import Link from 'next/link';
import { products } from '@/data/products';
import ProductGrid from '@/components/ProductGrid';
import PageTransition from '@/components/PageTransition';
import { ArrowRight } from 'lucide-react';

export default function HomePage() {
  // Primary catalogue products for the home page showcase
  const featuredProducts = products.slice(0, 6);

  return (
    <PageTransition className="w-full">
      {/* Editorial Hero / Product Intro Section */}
      <section className="w-full border-b border-[#D9D6CF] py-16 sm:py-24 lg:py-28">
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex flex-col space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono tracking-[0.25em] text-[#777777] uppercase">
                WEBSITE Kerakmi —  <Link href={"https://t.me/rizo_adilov"} target='_blank'>@rizo_adilov</Link>
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-[0.08em] text-[#111111] uppercase leading-none max-w-4xl">
              AURELIN
              <br />
              <span className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-[0.14em] text-[#777777]">
                CLOTHING &amp; CO.
              </span>
            </h1>

            <div className="pt-4 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <p className="text-[13px] sm:text-[14px] text-[#777777] max-w-lg leading-relaxed uppercase tracking-[0.05em]">
                Og‘ir to‘qimali matolar, sezilarli grafikalar va aniq siluetlarga
                ega premium ko‘cha kiyimlarini yaratuvchi mustaqil brend.
              </p>

              <Link
                href="/shop"
                className="group inline-flex items-center space-x-2 text-[12px] font-medium tracking-[0.2em] uppercase text-[#111111] hover:text-[#777777] transition-colors border-b border-[#111111] pb-1 self-start sm:self-auto"
              >
                <span>TO‘LIQ KATALOGNI KO‘RISH</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Catalogue Grid Section */}
      <section className="w-full py-16 sm:py-24">
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          {/* Sub-header / Catalogue metadata */}
          <div className="flex items-baseline justify-between border-b border-[#D9D6CF] pb-4 mb-12 sm:mb-16">
            <span className="text-[12px] font-semibold tracking-[0.2em] uppercase text-[#111111]">
              SARALANGAN KIYIMLAR
            </span>
            <span className="text-[11px] font-mono tracking-widest text-[#777777] uppercase">
              BARCHA {products.length} TA USLUBDAN 6 TASI KO‘RSATILMOQDA
            </span>
          </div>

          {/* Product Grid */}
          <ProductGrid products={featuredProducts} />

          {/* Editorial Interlude / Statement */}
          <div className="mt-20 sm:mt-28 py-16 sm:py-24 border-y border-[#D9D6CF] text-center flex flex-col items-center">
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#777777] mb-4">
              EDITORIAL BAYONOT
            </span>
            <blockquote className="text-xl sm:text-2xl lg:text-3xl font-light tracking-[0.08em] text-[#111111] uppercase max-w-3xl leading-relaxed">
              &ldquo;BIZNING DIZAYNIMIZ QAT‘IY SODDALIKKA ASOSLANGAN BO‘LIB, CHIKAGODA
              ENG SARALANGAN PAXTA MATOLARIDAN TIKILADI.&rdquo;
            </blockquote>
            <div className="mt-8">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#111111] text-[#F5F3EE] hover:bg-black text-[12px] font-medium tracking-[0.2em] uppercase transition-all duration-300 hover:tracking-[0.25em]"
              >
                TO‘LIQ ARXIVNI KO‘ZDATAN KECHIRISH
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
