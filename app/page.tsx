'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types';

const sampleProducts: Product[] = [
  {
    id: 'p1',
    title: 'Suede Zip Shirt Cut II',
    category: 'Kurtka & Palto',
    priceUzs: 420000,
    priceUsd: 36.00,
    badge: 'Direct China',
    badgeType: 'china',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'p2',
    title: 'Loose Fit Burgundy Hoodie',
    category: 'Xudi & Svitshotlar',
    priceUzs: 310000,
    priceUsd: 24.99,
    badge: '-20% SALE',
    badgeType: 'sale',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'p3',
    title: 'Cropped Leather Biker Jacket',
    category: 'Ayollar kiyimi',
    priceUzs: 490000,
    priceUsd: 42.00,
    badge: 'Direct China',
    badgeType: 'china',
    image: 'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'p4',
    title: 'Soft Cotton Knit Polo Sweater',
    category: 'Erkaklar kiyimi',
    priceUzs: 240000,
    priceUsd: 19.50,
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=600&q=80'
  }
];

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <div>
      {/* Hero Showcase */}
      <section className="hero-wrapper">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content">
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                padding: '6px 16px',
                borderRadius: 'var(--radius-pill)',
                fontSize: '12px',
                fontWeight: 800,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                marginBottom: '24px',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <span style={{ color: 'var(--accent-gold)' }}>⚡ NEW ARRIVALS 2026</span>
                <span style={{ opacity: 0.3 }}>|</span>
                <span>{t('heroSubtitle')}</span>
              </div>

              <h1>
                Eksklyuziv <span className="gradient-text">Kiyimlar</span> va Zamonaviy Stil.
              </h1>

              <p>{t('heroDesc')}</p>

              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <Link href="/shop" className="btn btn-primary">
                  {t('heroShopBtn')} &rarr;
                </Link>
                <Link href="/about" className="btn btn-secondary">
                  {t('heroAboutBtn')}
                </Link>
              </div>

              <div className="hero-stats">
                <div className="stat-item">
                  <h4>10,000+</h4>
                  <p>Mijozlarimiz</p>
                </div>
                <div className="stat-item">
                  <h4>100%</h4>
                  <p>Fabrika Sifati</p>
                </div>
                <div className="stat-item">
                  <h4>1-3 Kun</h4>
                  <p>Express Yetkazish</p>
                </div>
              </div>
            </div>

            <div className="hero-card-stack">
              <div className="hero-main-card">
                <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=80" alt="Aurelin Fashion Model" />
                <div className="hero-floating-glass">
                  <div>
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 800 }}>Haute Outerwear 2026</div>
                    <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Direct Factory Shipment to Tashkent</div>
                  </div>
                  <Link href="/product-detail" className="btn btn-gold" style={{ padding: '10px 20px', fontSize: '12px' }}>
                    Ko'rish
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section style={{ padding: '64px 0', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)', background: 'var(--bg-card)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">CATEGORIES</span>
            <h2 className="section-title">Aurelin Kiyim To'plamlari</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            <Link href="/shop" style={{ position: 'relative', height: '320px', borderRadius: 'var(--radius-md)', overflow: 'hidden', display: 'flex', alignItems: 'flex-end', padding: '24px', color: '#fff' }}>
              <img src="https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=600&q=80" alt="Erkaklar" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)' }}></div>
              <div style={{ position: 'relative', zIndex: 2 }}>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: 800 }}>{t('catMen')}</div>
                <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--accent-gold)' }}>Ko'rish &rarr;</span>
              </div>
            </Link>

            <Link href="/shop" style={{ position: 'relative', height: '320px', borderRadius: 'var(--radius-md)', overflow: 'hidden', display: 'flex', alignItems: 'flex-end', padding: '24px', color: '#fff' }}>
              <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80" alt="Ayollar" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)' }}></div>
              <div style={{ position: 'relative', zIndex: 2 }}>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: 800 }}>{t('catWomen')}</div>
                <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--accent-gold)' }}>Ko'rish &rarr;</span>
              </div>
            </Link>

            <Link href="/shop" style={{ position: 'relative', height: '320px', borderRadius: 'var(--radius-md)', overflow: 'hidden', display: 'flex', alignItems: 'flex-end', padding: '24px', color: '#fff' }}>
              <img src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80" alt="Xudi" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)' }}></div>
              <div style={{ position: 'relative', zIndex: 2 }}>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: 800 }}>{t('catHoodies')}</div>
                <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--accent-gold)' }}>Ko'rish &rarr;</span>
              </div>
            </Link>

            <Link href="/shop" style={{ position: 'relative', height: '320px', borderRadius: 'var(--radius-md)', overflow: 'hidden', display: 'flex', alignItems: 'flex-end', padding: '24px', color: '#fff' }}>
              <img src="https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80" alt="Kurtka" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)' }}></div>
              <div style={{ position: 'relative', zIndex: 2 }}>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: 800 }}>{t('catJackets')}</div>
                <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--accent-gold)' }}>Ko'rish &rarr;</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Best Sellers Grid */}
      <section style={{ padding: '96px 0' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">BESTSELLERS</span>
            <h2 className="section-title">Ommabop Kiyimlar Katalogi</h2>
          </div>

          <div className="product-grid">
            {sampleProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '56px' }}>
            <Link href="/shop" className="btn btn-outline" style={{ padding: '16px 48px' }}>
              Barcha kiyimlarni ko'rish &rarr;
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
