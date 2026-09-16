'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import MobileMenu from './MobileMenu';
import { ShoppingBag } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const { totalCount, openCart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: "DO'KON", href: '/shop' },
    { label: 'BIZ HAQIMIZDA', href: '/about' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled
            ? 'bg-[#F5F3EE]/95 backdrop-blur-md shadow-xs'
            : 'bg-[#F5F3EE]'
        } border-b border-[#D9D6CF]`}
      >
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 h-20 flex items-center justify-between">
          {/* Brand Logo / Left (In English as allowed by user) */}
          <div className="flex items-center">
            <Link
              href="/"
              className="flex flex-col group text-left focus-visible:outline-none"
            >
              <span className="text-[14px] sm:text-[15px] font-bold tracking-[0.28em] text-[#111111] transition-transform duration-300 group-hover:opacity-80">
                SCHAUBLETES
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-[0.38em] text-[#777777] uppercase font-medium">
                CLOTHING &amp; CO.
              </span>
            </Link>
          </div>

          {/* Desktop Center / Right Navigation */}
          <nav className="hidden md:flex items-center space-x-10 lg:space-x-14">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-[12px] uppercase tracking-[0.25em] font-medium transition-all duration-200 relative py-1 ${
                    isActive
                      ? 'text-[#111111] font-semibold'
                      : 'text-[#777777] hover:text-[#111111]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#111111]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right: Cart and Mobile Menu Trigger */}
          <div className="flex items-center space-x-5 sm:space-x-8">
            <button
              onClick={openCart}
              className="group flex items-center space-x-2 text-[#111111] hover:text-[#777777] transition-colors cursor-pointer text-[12px] font-medium tracking-[0.2em] uppercase py-2 focus-visible:outline-none"
              aria-label={`Xarid savati: ${totalCount} ta mahsulot`}
            >
              <ShoppingBag className="w-4 h-4 stroke-[1.75]" />
              <span className="hidden sm:inline">SAVAT</span>
              <span className="font-mono text-[12px] tracking-normal">
                [{totalCount}]
              </span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden text-[12px] font-medium tracking-[0.2em] uppercase text-[#111111] hover:text-[#777777] transition-colors py-2 focus-visible:outline-none"
              aria-label="Mobil menyuni ochish"
            >
              MENYU
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        cartCount={totalCount}
        onOpenCart={openCart}
      />
    </>
  );
}
