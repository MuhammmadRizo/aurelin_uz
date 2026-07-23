'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';

const thumbnails = [
  'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80'
];

export default function ProductDetailPage() {
  const { t } = useLanguage();
  const { addToCart } = useCart();
  
  const [selectedImg, setSelectedImg] = useState(thumbnails[0]);
  const [selectedSize, setSelectedSize] = useState('M');
  const [qty, setQty] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState<string | null>('desc');
  const [timerText, setTimerText] = useState('02:30:25');

  useEffect(() => {
    let seconds = 2 * 3600 + 30 * 60 + 25;
    const interval = setInterval(() => {
      if (seconds <= 0) seconds = 24 * 3600;
      seconds--;
      const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
      const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
      const s = String(seconds % 60).padStart(2, '0');
      setTimerText(`${h}:${m}:${s}`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAdd = () => {
    addToCart({
      id: 'p2',
      title: 'Loose Fit Burgundy Hoodie',
      priceUzs: 310000,
      priceUsd: 24.99,
      size: selectedSize,
      color: 'Burgundy',
      image: selectedImg,
      quantity: qty
    });
  };

  return (
    <div className="product-detail-section">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb" style={{ marginBottom: '32px' }}>
          <Link href="/">{t('navHome')}</Link>
          <span className="breadcrumb-separator">&rsaquo;</span>
          <Link href="/shop">{t('navShop')}</Link>
          <span className="breadcrumb-separator">&rsaquo;</span>
          <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>Loose Fit Burgundy Hoodie</span>
        </nav>

        {/* Gallery + Meta Grid */}
        <div className="product-detail-container">
          {/* Gallery */}
          <div className="product-gallery">
            <div className="main-image-box">
              <img src={selectedImg} alt="Hoodie Main" />
            </div>
            <div className="thumbnails-row">
              {thumbnails.map((src, i) => (
                <div 
                  key={i} 
                  className={`thumb-item ${selectedImg === src ? 'active' : ''}`}
                  onClick={() => setSelectedImg(src)}
                >
                  <img src={src} alt={`Thumb ${i}`} />
                </div>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="product-details-content">
            <div className="product-tag-row">
              <span className="china-direct-badge">🇨🇳 {t('chinaImportTag')}</span>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 600 }}>{t('inStock')}</span>
            </div>

            <h1 className="product-main-title">Loose Fit Burgundy Hoodie</h1>

            <div className="product-detail-price">
              310,000 UZS <span style={{ fontSize: '16px', fontWeight: 500, color: 'var(--text-muted)' }}>($24.99)</span>
            </div>

            {/* Timer Banner */}
            <div className="delivery-timer-box">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 16 14"></polyline></svg>
              <span>Buyurtma bering <strong style={{ color: 'var(--accent-gold)' }}>{timerText}</strong> ichida va ertaga yetkazib beramiz!</span>
            </div>

            {/* Sizes */}
            <div className="option-group">
              <div className="option-label">
                <span>{t('selectSize')}</span>
                <a href="#" style={{ color: 'var(--text-primary)', fontWeight: 800 }} onClick={(e) => { e.preventDefault(); alert('S (46-48), M (48-50), L (50-52), XL (52-54)'); }}>
                  {t('sizeGuide')}
                </a>
              </div>
              <div className="size-picker">
                {['S', 'M', 'L', 'XL', 'XXL'].map((sz) => (
                  <button 
                    key={sz} 
                    className={`size-pill ${selectedSize === sz ? 'active' : ''}`}
                    onClick={() => setSelectedSize(sz)}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Purchase Actions */}
            <div className="purchase-actions-row">
              <div className="quantity-stepper">
                <button className="step-btn" onClick={() => setQty(Math.max(1, qty - 1))}>-</button>
                <span className="qty-val">{qty}</span>
                <button className="step-btn" onClick={() => setQty(qty + 1)}>+</button>
              </div>
              <button className="btn btn-primary btn-add-main" onClick={handleAdd}>
                {t('addToCart')}
              </button>
            </div>

            {/* Accordions */}
            <div className="accordion-list">
              <div className={`accordion-item ${activeAccordion === 'desc' ? 'active' : ''}`}>
                <button className="accordion-header" onClick={() => setActiveAccordion(activeAccordion === 'desc' ? null : 'desc')}>
                  <span>{t('descAccordTitle')}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </button>
                <div className="accordion-body">{t('descFitText')}</div>
              </div>

              <div className={`accordion-item ${activeAccordion === 'shipping' ? 'active' : ''}`}>
                <button className="accordion-header" onClick={() => setActiveAccordion(activeAccordion === 'shipping' ? null : 'shipping')}>
                  <span>{t('shippingAccordTitle')}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </button>
                <div className="accordion-body">{t('shippingText')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
