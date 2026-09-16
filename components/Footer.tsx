'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="w-full bg-[#F5F3EE] border-t border-[#D9D6CF] pt-20 pb-12 mt-auto">
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Top Grid: Brand Philosophy & Newsletter & Links */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#D9D6CF]/70">
          {/* Brand Column */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <span className="text-[13px] font-bold tracking-[0.25em] text-[#111111] uppercase block">
                SCHAUBLETES CLOTHING &amp; CO.
              </span>
              <p className="mt-4 text-[13px] leading-relaxed text-[#777777] max-w-sm">
                Ifodali, minimalistik ko‘cha modasi va puxta o‘ylangan kiyim-kechaklarga
                yo‘naltirilgan zamonaviy mustaqil brend. Chikago (Illinoys, AQSh)
                studiyasida mehr bilan tayyorlangan va jamlangan.
              </p>
            </div>

            <div className="mt-8 text-[12px] font-medium tracking-[0.15em] text-[#111111] uppercase flex items-center space-x-2">
              <span>CHIKAGODA</span>
              <span className="text-red-600">❤</span>
              <span>BILAN TAYYORLANGAN</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 flex flex-col space-y-3">
            <span className="text-[11px] font-mono tracking-[0.2em] text-[#777777] uppercase mb-2">
              BO‘LIMLAR
            </span>
            <Link
              href="/shop"
              className="text-[12px] tracking-[0.2em] uppercase text-[#111111] hover:text-[#777777] transition-colors py-0.5"
            >
              DO‘KON
            </Link>
            <Link
              href="/about"
              className="text-[12px] tracking-[0.2em] uppercase text-[#111111] hover:text-[#777777] transition-colors py-0.5"
            >
              BIZ HAQIMIZDA
            </Link>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] tracking-[0.2em] uppercase text-[#111111] hover:text-[#777777] transition-colors py-0.5"
            >
              INSTAGRAM
            </a>
            <a
              href="mailto:studio@schaubletes.com"
              className="text-[12px] tracking-[0.2em] uppercase text-[#111111] hover:text-[#777777] transition-colors py-0.5"
            >
              BOG‘LANISH
            </a>
          </div>

          {/* Newsletter Signup */}
          <div className="md:col-span-4 flex flex-col justify-start">
            <span className="text-[11px] font-mono tracking-[0.2em] text-[#777777] uppercase mb-2">
              XABARNOMALAR
            </span>
            <p className="text-[13px] text-[#777777] mb-4">
              Mavsumiy relizlar va cheklangan studiya to‘plamlari haqida maxfiy xabarlarni qabul qiling.
            </p>
            <form onSubmit={handleSubscribe} className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="EMAIL MANZILINGIZNI KIRITING"
                className="w-full bg-transparent border-b border-[#111111] py-2.5 pr-10 text-[12px] tracking-[0.15em] placeholder:text-[#777777]/70 text-[#111111] focus:outline-none focus:border-[#111111] uppercase"
              />
              <button
                type="submit"
                className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-[#111111] hover:translate-x-1 transition-transform cursor-pointer"
                aria-label="Xabarnomaga obuna bo‘lish"
              >
                {subscribed ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <ArrowRight className="w-4 h-4" />
                )}
              </button>
            </form>
            {subscribed && (
              <span className="text-[11px] font-mono tracking-wider text-emerald-700 mt-2">
                RAHMAT. SIZ XABARNOMA RO‘YXATIGA MUVOFAQIYATLI QO‘SHILDINGIZ.
              </span>
            )}
          </div>
        </div>

        {/* Large Editorial Brand Wordmark Treatment (English brand name preserved) */}
        <div className="pt-12 pb-6 flex flex-col items-center select-none overflow-hidden">
          <span className="text-[11vw] leading-none font-bold tracking-[0.18em] text-[#111111]/90 uppercase text-center block w-full whitespace-nowrap pl-[0.18em]">
            SCHAUBLETES
          </span>
          <span className="text-[11px] sm:text-[13px] tracking-[0.45em] text-[#777777] uppercase mt-4 text-center">
            CLOTHING &amp; CO. — CHIKAGO STUDIYASI ARXIVI
          </span>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 mt-4 border-t border-[#D9D6CF]/50 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#777777] tracking-[0.15em] uppercase gap-4">
          <div>© {new Date().getFullYear()} SCHAUBLETES. BARCHA HUQUQLAR HIMOYALANGAN.</div>
          <div className="flex space-x-6">
            <span className="hover:text-[#111111] cursor-pointer">MAXFIYLIK SIYOSATI</span>
            <span className="hover:text-[#111111] cursor-pointer">FOYDALANISH SHARTLARI</span>
            <span className="hover:text-[#111111] cursor-pointer">YETKAZISH VA QAYTARISH</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
