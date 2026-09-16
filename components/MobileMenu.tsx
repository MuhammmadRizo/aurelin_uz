'use client';

import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  cartCount: number;
  onOpenCart: () => void;
}

export default function MobileMenu({
  isOpen,
  onClose,
  cartCount,
  onOpenCart,
}: MobileMenuProps) {
  const menuLinks = [
    { label: 'BARCHASI', href: '/shop', subtitle: 'To‘liq katalog' },
    { label: "LOOK TO'PLAMLAR", href: "/shop?category=LOOK%20TO'PLAMLAR", subtitle: 'Komplektlar va obrazlar' },
    { label: 'FUTBOLKALAR & POLO', href: '/shop?category=FUTBOLKALAR%20%26%20POLO', subtitle: 'Klassik va grafik kiyimlar' },
    { label: 'SVITER & POLUZAMOK', href: '/shop?category=SVITER%20%26%20POLUZAMOK', subtitle: 'Issiq va qulay to‘qimalar' },
    { label: 'SHIM & KO‘YLAKLAR', href: '/shop?category=SHIM%20%26%20KO‘YLAKLAR', subtitle: 'Zamonaviy pastki va ustki kiyimlar' },
    { label: 'BIZ HAQIMIZDA', href: '/about', subtitle: 'Falsafa va yetkazish' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 bg-[#F5F3EE] flex flex-col justify-between p-6 sm:p-10 md:hidden overflow-y-auto"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between border-b border-[#D9D6CF] pb-6">
            <Link
              href="/"
              onClick={onClose}
              className="flex flex-col group text-left"
            >
              <span className="text-[13px] font-semibold tracking-[0.25em] text-[#111111]">
                SCHAUBLETES
              </span>
              <span className="text-[9px] tracking-[0.3em] text-[#777777]">
                CLOTHING &amp; CO.
              </span>
            </Link>

            <button
              onClick={onClose}
              className="p-2 -mr-2 text-[#111111] hover:text-[#777777] transition-colors focus-visible:outline-none"
              aria-label="Menyuni yopish"
            >
              <X className="w-6 h-6 stroke-[1.5]" />
            </button>
          </div>

          {/* Nav links */}
          <motion.nav
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col space-y-5 my-auto py-6"
          >
            {menuLinks.map((link, idx) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.08 + idx * 0.04 }}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="group flex items-baseline justify-between py-2 border-b border-[#D9D6CF]/40"
                >
                  <span className="text-xl font-normal tracking-[0.08em] text-[#111111] group-hover:tracking-[0.12em] transition-all duration-300">
                    {link.label}
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] tracking-[0.1em] text-[#777777] uppercase font-mono hidden sm:inline">
                      {link.subtitle}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-[#777777] group-hover:text-[#111111] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.35 }}
            >
              <button
                onClick={() => {
                  onClose();
                  onOpenCart();
                }}
                className="w-full flex items-baseline justify-between py-3 border-b border-[#111111] text-left cursor-pointer"
              >
                <span className="text-xl font-normal tracking-[0.1em] text-[#111111]">
                  SAVAT ({cartCount})
                </span>
                <span className="text-[11px] font-mono tracking-widest text-[#111111] uppercase">
                  SAVATNI KO‘RISH
                </span>
              </button>
            </motion.div>
          </motion.nav>

          {/* Footer inside mobile menu */}
          <div className="pt-6 border-t border-[#D9D6CF] flex flex-col space-y-3">
            <div className="flex justify-between text-[11px] tracking-[0.15em] text-[#777777] uppercase">
              <span>TELEGRAM: @AURELIN_UZ</span>
              <span>© {new Date().getFullYear()} SCHAUBLETES</span>
            </div>
            <div className="text-[10px] tracking-[0.2em] text-[#777777] uppercase">
              SEVGI BILAN TAYYORLANGAN
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
