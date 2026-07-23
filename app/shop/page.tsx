'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types';

const catalogProducts: Product[] = [
  { id: 'p1', title: 'Suede Zip Shirt Cut II', category: 'Kurtka & Palto', priceUzs: 420000, priceUsd: 36.00, badge: 'Direct China', badgeType: 'china', color: 'brown', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80' },
  { id: 'p2', title: 'Loose Fit Burgundy Hoodie', category: 'Xudi & Svitshotlar', priceUzs: 310000, priceUsd: 24.99, badge: '-20% SALE', badgeType: 'sale', color: 'red', image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80' },
  { id: 'p3', title: 'Cropped Leather Biker Jacket', category: 'Ayollar kiyimi', priceUzs: 490000, priceUsd: 42.00, badge: 'Direct China', badgeType: 'china', color: 'black', image: 'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?auto=format&fit=crop&w=600&q=80' },
  { id: 'p4', title: 'Soft Cotton Knit Polo Sweater', category: 'Erkaklar kiyimi', priceUzs: 240000, priceUsd: 19.50, color: 'blue', image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=600&q=80' },
  { id: 'p5', title: 'Printed Graphic Sweatshirt', category: 'Xudi & Svitshotlar', priceUzs: 380000, priceUsd: 30.00, color: 'blue', image: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=600&q=80' },
  { id: 'p6', title: 'Camel Wool Long Coat', category: 'Kurtka & Palto', priceUzs: 550000, priceUsd: 48.00, badge: 'Direct China', badgeType: 'china', color: 'brown', image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=600&q=80' },
  { id: 'p7', title: 'Heavyweight Flannel Shirt', category: 'Erkaklar kiyimi', priceUzs: 290000, priceUsd: 22.00, color: 'yellow', image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=80' },
  { id: 'p8', title: 'Belted Trench Coat & Scarf', category: 'Ayollar kiyimi', priceUzs: 410000, priceUsd: 34.00, color: 'beige', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80' }
];

export default function ShopPage() {
  const { t } = useLanguage();
  const [cols, setCols] = useState(4);
  const [colorFilter, setColorFilter] = useState('all');
  const [sortOption, setSortOption] = useState('default');
  const [openPopover, setOpenPopover] = useState<string | null>(null);

  const filteredProducts = catalogProducts.filter(p => {
    if (colorFilter === 'all') return true;
    return p.color === colorFilter;
  }).sort((a, b) => {
    if (sortOption === 'low-high') return a.priceUzs - b.priceUzs;
    if (sortOption === 'high-low') return b.priceUzs - a.priceUzs;
    return 0;
  });

  return (
    <div>
      {/* Shop Hero */}
      <section className="shop-hero">
        <div className="container">
          <h1 className="shop-title">{t('shopHeading')}</h1>
          <nav className="breadcrumb">
            <Link href="/">{t('navHome')}</Link>
            <span className="breadcrumb-separator">&rsaquo;</span>
            <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>{t('navShop')}</span>
          </nav>
        </div>
      </section>

      {/* Main Catalog */}
      <main className="container" style={{ marginBottom: '96px' }}>
        {/* Filter Toolbar */}
        <div className="filter-toolbar">
          <div className="filter-left-group">
            <span className="filter-label-title">Filter by:</span>

            {/* Color Popover */}
            <div style={{ position: 'relative' }}>
              <button 
                className="filter-dropdown-btn"
                onClick={() => setOpenPopover(openPopover === 'color' ? null : 'color')}
              >
                <span>{t('filterColor')}</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </button>
              {openPopover === 'color' && (
                <div className="filter-popover active">
                  <div className="color-option-item" onClick={() => { setColorFilter('all'); setOpenPopover(null); }}>Barchasi</div>
                  <div className="color-option-item" onClick={() => { setColorFilter('brown'); setOpenPopover(null); }}><span className="color-dot swatch-brown"></span> Jigarrang</div>
                  <div className="color-option-item" onClick={() => { setColorFilter('blue'); setOpenPopover(null); }}><span className="color-dot swatch-blue"></span> Moviy</div>
                  <div className="color-option-item" onClick={() => { setColorFilter('red'); setOpenPopover(null); }}><span className="color-dot swatch-red"></span> Qizil</div>
                  <div className="color-option-item" onClick={() => { setColorFilter('black'); setOpenPopover(null); }}><span className="color-dot swatch-black"></span> Qora</div>
                </div>
              )}
            </div>

            {/* Size Dropdown */}
            <div style={{ position: 'relative' }}>
              <button 
                className="filter-dropdown-btn"
                onClick={() => setOpenPopover(openPopover === 'size' ? null : 'size')}
              >
                <span>{t('filterSize')}</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </button>
              {openPopover === 'size' && (
                <div className="filter-popover active">
                  <div className="color-option-item" onClick={() => setOpenPopover(null)}>S (Small)</div>
                  <div className="color-option-item" onClick={() => setOpenPopover(null)}>M (Medium)</div>
                  <div className="color-option-item" onClick={() => setOpenPopover(null)}>L (Large)</div>
                  <div className="color-option-item" onClick={() => setOpenPopover(null)}>XL (Extra Large)</div>
                  <div className="color-option-item" onClick={() => setOpenPopover(null)}>XXL (Double XL)</div>
                </div>
              )}
            </div>
          </div>

          {/* Right Controls */}
          <div className="filter-right-group">
            <select 
              className="sort-select" 
              value={sortOption} 
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="default">{t('sortDefault')}</option>
              <option value="low-high">{t('sortPriceLow')}</option>
              <option value="high-low">{t('sortPriceHigh')}</option>
            </select>

            <div className="grid-view-toggles">
              <button className={`grid-toggle-btn ${cols === 2 ? 'active' : ''}`} onClick={() => setCols(2)}>
                <svg viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="18" rx="1"></rect><rect x="14" y="3" width="7" height="18" rx="1"></rect></svg>
              </button>
              <button className={`grid-toggle-btn ${cols === 3 ? 'active' : ''}`} onClick={() => setCols(3)}>
                <svg viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="3" width="5" height="18" rx="1"></rect><rect x="9.5" y="3" width="5" height="18" rx="1"></rect><rect x="17" y="3" width="5" height="18" rx="1"></rect></svg>
              </button>
              <button className={`grid-toggle-btn ${cols === 4 ? 'active' : ''}`} onClick={() => setCols(4)}>
                <svg viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="3" width="4" height="18" rx="1"></rect><rect x="7.5" y="3" width="4" height="18" rx="1"></rect><rect x="13" y="3" width="4" height="18" rx="1"></rect><rect x="18.5" y="3" width="4" height="18" rx="1"></rect></svg>
              </button>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="product-grid" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
          {filteredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        {/* Pagination */}
        <div className="pagination-wrapper">
          <button className="page-num active">1</button>
          <button className="page-num">2</button>
          <button className="page-num">3</button>
          <button className="page-next" title="Next">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </div>
      </main>
    </div>
  );
}
