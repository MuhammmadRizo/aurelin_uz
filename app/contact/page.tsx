'use client';

import React from 'react';

export default function ContactPage() {
  return (
    <main style={{ padding: '80px 0 112px' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 56px' }}>
          <span className="section-tag">SUPPORT & INQUIRIES</span>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '42px', fontWeight: 800, marginBottom: '16px' }}>Biz Bilan Bog'laning</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>Savollaringiz bormi? Telegram qo'llab-quvvatlash markazimiz 24/7 xizmatingizda!</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '48px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ background: 'var(--bg-card)', padding: '28px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: '20px', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: '#0088cc15', color: '#0088cc', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>💬</div>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>Telegram Qo'llab-quvvatlash</div>
                <a href="https://t.me/aurelin_uz" target="_blank" rel="noreferrer" style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 800, color: '#0088cc' }}>@aurelin_uz</a>
              </div>
            </div>

            <div style={{ background: 'var(--bg-card)', padding: '28px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: '20px', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: '#e1306c15', color: '#e1306c', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>📸</div>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>Instagram Sahifamiz</div>
                <a href="https://instagram.com/aurelin.uz" target="_blank" rel="noreferrer" style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 800, color: '#e1306c' }}>@aurelin.uz</a>
              </div>
            </div>

            <div style={{ background: 'var(--bg-card)', padding: '28px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: '20px', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'var(--bg-elevated)', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>📱</div>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>Telefon Raqamimiz</div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 800 }}>+998 (90) 123-45-67</div>
              </div>
            </div>
          </div>

          <div style={{ background: 'var(--bg-card)', padding: '40px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-md)' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: 800, marginBottom: '24px' }}>Xabar qoldiring</h3>
            <form onSubmit={(e: React.FormEvent) => { e.preventDefault(); alert('Xabaringiz yuborildi! Rahmat.'); }}>
              <div style={{ marginBottom: '16px' }}>
                <input type="text" placeholder="Ismingiz" required style={{ width: '100%', background: 'var(--bg-elevated)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }} />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <input type="tel" placeholder="Telefon raqamingiz" required style={{ width: '100%', background: 'var(--bg-elevated)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }} />
              </div>
              <div style={{ marginBottom: '24px' }}>
                <textarea rows={4} placeholder="Xabaringiz yoki savolingiz..." required style={{ width: '100%', background: 'var(--bg-elevated)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', resize: 'vertical' }}></textarea>
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '16px' }}>
                Xabarni Yuborish &rarr;
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
