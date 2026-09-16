import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import PageTransition from '@/components/PageTransition';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Biz haqimizda',
  description:
    'Schaubletes Clothing & Co. — Chikagoda joylashgan ifodali, minimalistik ko‘cha modasi va puxta o‘ylangan kiyim-kechaklarga ixtisoslashgan zamonaviy mustaqil brend.',
};

export default function AboutPage() {
  return (
    <PageTransition className="w-full py-16 sm:py-24">
      <div className="w-full max-w-5xl mx-auto px-6 sm:px-10">
        {/* Intro Header */}
        <div className="border-b border-[#D9D6CF] pb-16">
          <span className="text-[11px] font-mono tracking-[0.3em] text-[#777777] uppercase block mb-6">
            BIZ HAQIMIZDA / SCHAUBLETES
          </span>

          <h1 className="text-4xl sm:text-6xl font-bold tracking-[0.06em] text-[#111111] uppercase leading-none">
            SCHAUBLETES
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
        <div className="py-16 border-b border-[#D9D6CF] grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-4 flex justify-center md:justify-start">
            <div className="relative w-48 h-48 bg-[#EAE7DF] border border-[#D9D6CF] flex items-center justify-center p-6">
              <Image
                src="/images/products/brand-logo.png"
                alt="Schaubletes SC&C brend emblemasi"
                width={160}
                height={160}
                className="object-contain"
              />
            </div>
          </div>
          <div className="md:col-span-8 space-y-4">
            <span className="text-[11px] font-mono tracking-[0.25em] text-[#777777] uppercase">
              ASOSIY FALSAFA
            </span>
            <blockquote className="text-lg text-[#111111] font-normal leading-relaxed">
              &ldquo;SC&amp;C da biz sizning kundalik garderobingizdagi eng sevimli
              va ajralmas kiyimlarni yaratishga intilamiz. Yuqori sifatli, tabiatga
              ehtiyotkorona ishlab chiqarish usullari va mukammal bichim orqali biz
              har bir xaridorga munosib kiyimlarni taqdim etamiz.&rdquo;
            </blockquote>
            <span className="text-[11px] font-mono tracking-widest text-[#777777] uppercase block">
              — CHIKAGO, AQSH
            </span>
          </div>
        </div>

        {/* Four Main Editorial Sections */}
        <div className="divide-y divide-[#D9D6CF]">
          {/* Section 01: BIZNING YONDASHUV */}
          <section className="py-16 grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-4">
              <span className="text-[11px] font-mono tracking-[0.25em] text-[#777777] uppercase block mb-2">
                01 / FALSAFA
              </span>
              <h2 className="text-2xl font-semibold tracking-[0.08em] text-[#111111] uppercase">
                BIZNING YONDASHUV
              </h2>
            </div>
            <div className="md:col-span-8 space-y-4 text-[14px] leading-relaxed text-[#555555]">
              <p>
                Biz an‘anaviy mavsumiy taqvimlarga yoki o‘tkinchi mikro-trendlarga
                ergashmaymiz. Schaubletes katalogidagi har bir buyum qulaylik va dadil
                tipografik ifoda o‘rtasidagi uzluksiz uyg‘unlik sifatida yaratiladi.
              </p>
              <p>
                Kichik va cheklangan partiyalarda ishlab chiqarish orqali biz ortiqcha
                isrofgarchilikning oldini olamiz hamda har bir chok, manjet va bosma
                Chikago ustaxonamiz standartlariga to‘liq javob berishini ta‘minlaymiz.
              </p>
            </div>
          </section>

          {/* Section 02: MATOLAR */}
          <section className="py-16 grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-4">
              <span className="text-[11px] font-mono tracking-[0.25em] text-[#777777] uppercase block mb-2">
                02 / MATERIALLAR
              </span>
              <h2 className="text-2xl font-semibold tracking-[0.08em] text-[#111111] uppercase">
                MATO VA TO‘QIMA
              </h2>
            </div>
            <div className="md:col-span-8 space-y-4 text-[14px] leading-relaxed text-[#555555]">
              <p>
                Matoning his qilinadigan sifati — bizning eng birinchi poydevorimizdir.
                Asosiy svtishertlarimiz 420–450 GSM zichlikdagi taroqlangan halqasimon
                paxta flisidan to‘qilgan bo‘lib, kiyilganda o‘zining aniq me‘moriy
                siluetini mukammal saqlab qoladi.
              </p>
              <p>
                Biz faqatgina sertifikatlangan organik paxta fabrikalari bilan hamkorlik
                qilamiz va ekologik xavfsiz tolali reaktiv bo‘yoqlardan foydalanamiz. Bu
                esa matoga chuqur rang jozibasini beradi va uning uzoq muddatli
                chidamliligini kafolatlaydi.
              </p>
            </div>
          </section>

          {/* Section 03: DIZAYN */}
          <section className="py-16 grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-4">
              <span className="text-[11px] font-mono tracking-[0.25em] text-[#777777] uppercase block mb-2">
                03 / ESTETIKA
              </span>
              <h2 className="text-2xl font-semibold tracking-[0.08em] text-[#111111] uppercase">
                DIZAYN VA BICHIM
              </h2>
            </div>
            <div className="md:col-span-8 space-y-4 text-[14px] leading-relaxed text-[#555555]">
              <p>
                Schaubletes vizual tili Shveytsariya grafik aniqligi hamda Amerika
                o‘rta-g‘arbiy ko‘cha madaniyatini o‘zida mujassamlashtiradi.
                Tipografiyamizda yuqori kontrastli grotesk shriftlar, hisoblangan
                bo‘shliqlar va vazmin ifoda ustuvorlik qiladi.
              </p>
              <p>
                Har bir siluet tushirilgan yelkalar, qulay bilak manjetlari va vaqt
                o‘tishi bilan cho‘zilib ketmaydigan mustahkam elastan xotirali yoqa
                bilan jihozlangan.
              </p>
            </div>
          </section>

          {/* Section 04: BOG'LANISH */}
          <section className="py-16 grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-4">
              <span className="text-[11px] font-mono tracking-[0.25em] text-[#777777] uppercase block mb-2">
                04 / DISPETCHERLIK VA STUDIYA
              </span>
              <h2 className="text-2xl font-semibold tracking-[0.08em] text-[#111111] uppercase">
                BOG‘LANISH
              </h2>
            </div>
            <div className="md:col-span-8 space-y-6 text-[14px] leading-relaxed text-[#555555]">
              <p>
                Buyurtmalar bo‘yicha yordam, shaxsiy maslahat yoki hamkorlik takliflari
                uchun Chikagodagi studiyamiz bilan to‘g‘ridan-to‘g‘ri elektron pochta
                orqali bog‘lanishingiz mumkin.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 font-mono text-[12px] uppercase">
                <div>
                  <span className="text-[#777777] block text-[10px] mb-1">
                    BUYURTMA VA SAVOLLAR
                  </span>
                  <a
                    href="mailto:orders@schaubletes.com"
                    className="text-[#111111] hover:underline"
                  >
                    ORDERS@SCHAUBLETES.COM
                  </a>
                </div>

                <div>
                  <span className="text-[#777777] block text-[10px] mb-1">
                    STUDIYA MANZILI
                  </span>
                  <span className="text-[#111111] block">
                    WEST LOOP / CHIKAGO, IL, AQSH
                  </span>
                </div>
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
