import type { Metadata, Viewport } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://schaubletes.com'),
  title: {
    default: 'SCHAUBLETES — Clothing & Co.',
    template: '%s | SCHAUBLETES',
  },
  description:
    'Schaubletes Clothing & Co. — zamonaviy ko‘cha modasi, premium kiyim-kechaklar va cheklangan to‘plamlar.',
  keywords: [
    'Schaubletes',
    'Streetwear',
    'Kiyim-kechak',
    'Svtishertlar',
    'Ko‘cha modasi',
    'Chikago',
    'Minimalistik liboslar',
  ],
  authors: [{ name: 'Schaubletes Clothing & Co.' }],
  creator: 'Schaubletes Clothing & Co.',
  openGraph: {
    title: 'SCHAUBLETES — Clothing & Co.',
    description:
      'Schaubletes Clothing & Co. — zamonaviy ko‘cha modasi, premium kiyim-kechaklar va cheklangan to‘plamlar.',
    url: 'https://schaubletes.com',
    siteName: 'SCHAUBLETES',
    locale: 'uz_UZ',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SCHAUBLETES — Clothing & Co.',
    description:
      'Schaubletes Clothing & Co. — zamonaviy ko‘cha modasi, premium kiyim-kechaklar va cheklangan to‘plamlar.',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#F5F3EE',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz" className={geistSans.variable}>
      <body className="min-h-screen flex flex-col bg-[#F5F3EE] text-[#111111] antialiased selection:bg-[#111111] selection:text-[#F5F3EE]">
        <CartProvider>
          <Header />
          <main className="flex-1 w-full flex flex-col">
            {children}
          </main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
