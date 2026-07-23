'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, totalPriceUzs, clearCart } = useCart();
  const { t } = useLanguage();

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Rahmat! Buyurtmangiz qabul qilindi. Menejerimiz tez orada siz bilan bog\'lanadi.');
    clearCart();
    window.location.href = '/';
  };

  const handleTelegramOrder = () => {
    if (cart.length === 0) {
      alert('Savatchangiz bo\'sh!');
      return;
    }
    let text = 'Aurelin.uz orqali yangi buyurtma:%0A';
    cart.forEach((i) => {
      text += `- ${i.title} (${i.size}) x${i.quantity}: ${(i.priceUzs * i.quantity).toLocaleString()} UZS%0A`;
    });
    window.open(`https://t.me/aurelin_uz?text=${text}`, '_blank');
  };

  return (
    <div className="container">
      <div style={{ marginTop: '40px' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '36px', fontWeight: 800 }}>{t('cartTitle')}</h1>
      </div>

      <div className="cart-layout">
        <div>
          <table className="cart-items-table">
            <thead>
              <tr>
                <th>Mahsulot</th>
                <th>Narxi</th>
                <th>Soni</th>
                <th>Jami</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: '48px', color: 'var(--text-muted)' }}>
                    {t('cartEmptyMsg')}. <Link href="/shop" style={{ color: 'var(--text-primary)', fontWeight: 800, textDecoration: 'underline' }}>Katalogga o'tish &rsaquo;</Link>
                  </td>
                </tr>
              ) : (
                cart.map((item) => (
                  <tr key={`${item.id}-${item.size}-${item.color}`}>
                    <td>
                      <div className="cart-item-row">
                        <img src={item.image} className="cart-item-thumb" alt={item.title} />
                        <div>
                          <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '15px' }}>{item.title}</div>
                          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>O'lcham: {item.size}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ fontWeight: 700 }}>{item.priceUzs.toLocaleString()} UZS</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <button className="step-btn" style={{ width: '30px', height: '30px', borderRadius: '4px', border: '1px solid var(--border-subtle)' }} onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}>-</button>
                        <span style={{ fontWeight: 700 }}>{item.quantity}</span>
                        <button className="step-btn" style={{ width: '30px', height: '30px', borderRadius: '4px', border: '1px solid var(--border-subtle)' }} onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}>+</button>
                      </div>
                    </td>
                    <td style={{ fontFamily: 'var(--font-heading)', fontWeight: 800 }}>{(item.priceUzs * item.quantity).toLocaleString()} UZS</td>
                    <td>
                      <button style={{ color: '#ef4444', fontWeight: 800, fontSize: '20px' }} onClick={() => removeFromCart(item.id, item.size, item.color)}>&times;</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Checkout Form */}
          <div style={{ background: 'var(--bg-card)', padding: '32px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', marginTop: '28px' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: 800, marginBottom: '20px' }}>Mijoz Ma'lumotlari</h3>
            <form onSubmit={handleCheckout}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <input type="text" placeholder="Ismingiz" required style={{ background: 'var(--bg-elevated)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }} />
                <input type="tel" placeholder="+998 (90) 123-45-67" required style={{ background: 'var(--bg-elevated)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }} />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <input type="text" placeholder="Yetkazib berish manzili (Viloyat, shahar, ko'cha)" required style={{ width: '100%', background: 'var(--bg-elevated)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }} />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '16px', fontSize: '15px' }}>
                {t('checkoutBtn')}
              </button>
            </form>
          </div>
        </div>

        {/* Summary Card */}
        <div className="checkout-summary-card">
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: 800, marginBottom: '24px' }}>Buyurtma Xulosasi</h3>
          <div className="summary-row">
            <span>Mahsulotlar narxi:</span>
            <strong>{totalPriceUzs.toLocaleString()} UZS</strong>
          </div>
          <div className="summary-row">
            <span>{t('shippingCost')}:</span>
            <span style={{ color: '#10b981', fontWeight: 800 }}>{t('freeShipping')}</span>
          </div>
          <div className="summary-row total">
            <span>{t('cartTotal')}:</span>
            <span style={{ color: 'var(--accent-gold)' }}>{totalPriceUzs.toLocaleString()} UZS</span>
          </div>

          <div style={{ marginTop: '28px' }}>
            <button className="btn btn-gold" style={{ width: '100%', fontSize: '13px' }} onClick={handleTelegramOrder}>
              💬 Telegram orqali xarid qilish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
