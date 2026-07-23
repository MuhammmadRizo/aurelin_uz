'use client';

export default function AboutPage() {
  return (
    <main style={{ padding: '80px 0 112px' }}>
      <div className="container">
        <div style={{ maxWidth: '840px', margin: '0 auto', textAlign: 'center', marginBottom: '72px' }}>
          <span className="section-tag">OUR STORY</span>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '48px', fontWeight: 800, marginBottom: '20px' }}>
            Aurelin.uz — Sifatli Stil va Fabrika Narxlari
          </h1>
          <p style={{ fontSize: '18px', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            Biz O'zbekiston kiyim bozoriga Xitoyning eng ilg'or va nufuzli kiyim fabrikalaridan to'g'ridan-to'g'ri yuqori sifatli kiyimlarni taklif etamiz. Ortiqcha vositachilar va ustamalar yo'q!
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '56px', alignItems: 'center' }}>
          <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80" alt="Factory Logistics" style={{ borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-md)' }} />
          <div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '32px', fontWeight: 800, marginBottom: '20px' }}>
              Xitoy Logistikasi va Sifat Nazorati
            </h2>
            <p style={{ fontSize: '16px', color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: 1.7 }}>
              Har bir Aurelin.uz to'plami Guanchjou va Chjejang fabrikalarida mahsulot tayyor bo'lishi bilanoq shaxsan mutaxassislarimiz tomonidan sifat testidan o'tkaziladi. Matoning chidamliligi va choklarning mustahkamligi kafolatlanadi.
            </p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '15px', fontWeight: 700 }}>
              <li>🇨🇳 100% Asl Xitoy Fabrika Sifati</li>
              <li>🚚 1-3 kunlik tezkor Express yetkazish</li>
              <li>👕 Kiyib ko'rib to'lov qilish imkoniyati</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
