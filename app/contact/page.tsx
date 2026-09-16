import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import PageTransition from '@/components/PageTransition';
import { ArrowLeft, Mail, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Bog‘lanish va Studiya',
  description: 'Schaubletes Clothing & Co. Chikago studiyasi bilan bog‘lanish.',
};

export default function ContactPage() {
  return (
    <PageTransition className="w-full py-16 sm:py-24">
      <div className="w-full max-w-4xl mx-auto px-6 sm:px-10">
        <div className="pb-8 mb-8 border-b border-[#D9D6CF]">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-[11px] font-mono tracking-[0.2em] text-[#777777] hover:text-[#111111] uppercase transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>ARXIVGA QAYTISH</span>
          </Link>
        </div>

        <div className="space-y-6 pb-12 border-b border-[#D9D6CF]">
          <span className="text-[11px] font-mono tracking-[0.3em] text-[#777777] uppercase">
            BOG‘LANISH
          </span>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-[0.08em] text-[#111111] uppercase">
            CHIKAGO STUDIYASI
          </h1>
          <p className="text-[14px] text-[#777777] max-w-xl leading-relaxed">
            Kiyim relizlari, bichim xususiyatlari, buyurtmalarni yetkazish yoki
            hamkorlik loyihalari bo‘yicha murojaat qiling.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-12">
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <Mail className="w-5 h-5 text-[#111111] mt-1 shrink-0" />
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#777777] uppercase block mb-1">
                  ELEKTRON POCHTA
                </span>
                <a
                  href="mailto:orders@schaubletes.com"
                  className="text-[14px] font-mono font-medium text-[#111111] hover:underline uppercase block"
                >
                  ORDERS@SCHAUBLETES.COM
                </a>
                <a
                  href="mailto:studio@schaubletes.com"
                  className="text-[14px] font-mono font-medium text-[#111111] hover:underline uppercase block mt-1"
                >
                  STUDIO@SCHAUBLETES.COM
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-4 pt-4">
              <MapPin className="w-5 h-5 text-[#111111] mt-1 shrink-0" />
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#777777] uppercase block mb-1">
                  USTAXONA VA ARXIV
                </span>
                <span className="text-[14px] text-[#111111] uppercase font-mono block">
                  WEST LOOP, CHIKAGO, ILLINOYS, AQSH
                </span>
                <span className="text-[11px] text-[#777777] font-mono block mt-1">
                  SHAXSIY TASHRIFLAR FAQAT OLDINDAN YOZILISH ORQALI
                </span>
              </div>
            </div>
          </div>

          <div className="p-8 border border-[#D9D6CF] bg-[#EAE7DF]/40 space-y-4">
            <span className="text-[11px] font-mono tracking-widest text-[#111111] uppercase block">
              MATBUOT VA ULGURJI HAMKORLIK
            </span>
            <p className="text-[12px] text-[#555555] leading-relaxed">
              Biz sifatli to‘qima va minimalistik ko‘cha modasiga bo‘lgan qarashlarimizni baham ko‘radigan mustaqil butiklar bilan hamkorlik qilamiz.
            </p>
            <div className="pt-2 text-[11px] font-mono tracking-widest text-[#111111] uppercase">
              JAVOB BERISH MUDDATI: 24–48 SOAT
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
