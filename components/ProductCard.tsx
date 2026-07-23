'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { t } = useLanguage();

  return (
    <div className="product-card">
      <div className="product-img-wrapper">
        <div className="card-badges">
          {product.badge && (
            <span className={`badge-tag ${product.badgeType || 'china'}`}>
              {product.badge}
            </span>
          )}
        </div>
        <img src={product.image} alt={product.title} />
        <div className="card-quick-actions">
          <Link href="/product-detail" className="quick-action-btn" title="View Details">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          </Link>
        </div>
      </div>
      <div className="product-info">
        <span className="product-cat">{product.category}</span>
        <h3 className="product-title">
          <Link href="/product-detail">{product.title}</Link>
        </h3>
        <div className="color-swatches">
          <span className="swatch-dot swatch-brown active"></span>
          <span className="swatch-dot swatch-blue"></span>
          <span className="swatch-dot swatch-grey"></span>
        </div>
        <div className="price-row">
          <div className="price-box">
            <span className="price-uzs">{product.priceUzs.toLocaleString()} UZS</span>
            <span className="price-usd">${product.priceUsd}</span>
          </div>
          <button 
            className="cart-add-btn" 
            onClick={() => addToCart(product)}
          >
            + {t('addToCart')}
          </button>
        </div>
      </div>
    </div>
  );
}
