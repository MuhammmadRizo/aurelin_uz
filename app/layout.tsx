import './globals.css';
import React from 'react';
import { ThemeProvider } from '@/context/ThemeContext';
import { LanguageProvider } from '@/context/LanguageContext';
import { CartProvider } from '@/context/CartContext';
import MarqueeBar from '@/components/MarqueeBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Aurelin.uz — High-Fashion & China Direct Apparel',
  description: "Aurelin.uz - Xitoyning eng sara kiyim-kechak fabrikalaridan to'g'ridan-to'g'ri keltirilgan eksklyuziv kiyimlar to'plami."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html 
      lang="uz" 
      data-theme="light" 
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <ThemeProvider>
          <LanguageProvider>
            <CartProvider>
              <MarqueeBar />
              <Header />
              <main style={{ minHeight: 'calc(100vh - 200px)' }}>
                {children}
              </main>
              <Footer />
            </CartProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
