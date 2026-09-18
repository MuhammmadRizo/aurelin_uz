import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import PageTransition from '@/components/PageTransition';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Biz haqimizda',
  description:
    'AURELIN Clothing & Co. — Chikagoda joylashgan ifodali, minimalistik ko‘cha modasi va puxta o‘ylangan kiyim-kechaklarga ixtisoslashgan zamonaviy mustaqil brend.',
};

export default function AboutPage() {
  return (
    <PageTransition className="w-full py-16 sm:py-24">
      <div className="w-full max-w-5xl mx-auto px-6 sm:px-10">
        {/* Intro Header */}
        <div className="border-b border-[#D9D6CF] pb-16">
          <span className="text-[11px] font-mono tracking-[0.3em] text-[#777777] uppercase block mb-6">
            BIZ HAQIMIZDA / AURELIN
          </span>

          <h1 className="text-4xl sm:text-6xl font-bold tracking-[0.06em] text-[#111111] uppercase leading-none">
            AURELIN
            <br />
            <span className="text-2xl sm:text-4xl font-light tracking-[0.14em] text-[#777777]">
              CLOTHING &amp; CO.
            </span>
          </h1>

          <p className="mt-8 text-xl sm:text-2xl font-light tracking-[0.02em] text-[#111111] leading-relaxed max-w-3xl">
            Ifodali, minimalistik ko‘cha modasi va puxta o‘ylangan kiyim-kechaklarga
            yo‘naltirilgan zamonaviy mustaqil brend.
          </p>
        </div>

        {/* Brand Insignia & Quote */}
       

        {/* Four Main Editorial Sections */}
        <div className="divide-y divide-[#D9D6CF]">
          {/* Section 01: BIZNING YONDASHUV */}
          {/* Section 04: BOG'LANISH */}
          <section className="py-16 grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-4">
              <h2 className="text-2xl font-semibold tracking-[0.08em] text-[#111111] uppercase">
                BOG‘LANISH
              </h2>
            </div>
            <div className="md:col-span-8 space-y-6 text-[14px] leading-relaxed text-[#555555]">
              <p>
                Buyurtmalar bo‘yicha yordam, shaxsiy maslahat yoki hamkorlik takliflari
                uchun to‘g‘ridan-to‘g‘ri bog‘lanishingiz mumkin.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 font-mono text-[12px] uppercase">
                <div>
                  <span className="text-[#777777] block text-[10px] mb-1">
                    BUYURTMA VA SAVOLLAR
                  </span>
                  <a
                    href="https://t.me/Kimsanboyevkx"
                    className="text-[#111111] hover:underline"
                  >
                    @Kimsanboyevkx
                  </a>
                </div>

                {/* <div>
                  <span className="text-[#777777] block text-[10px] mb-1">
                    STUDIYA MANZILI
                  </span>
                  <span className="text-[#111111] block">
                    WEST LOOP / CHIKAGO, IL, AQSH
                  </span>
                </div> */}
              </div>

              <div className="pt-6">
                <Link
                  href="/shop"
                  className="inline-flex items-center space-x-2 text-[12px] font-medium tracking-[0.2em] uppercase text-[#111111] border-b border-[#111111] pb-1 hover:text-[#777777] transition-colors"
                >
                  <span>HOZIRGI TO‘PLAMNI KO‘RISH</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </PageTransition>
  );
}
