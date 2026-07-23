'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="logo">
              AURELIN<span className="dot">.</span>UZ
            </Link>
            <p>{t('heroDesc')}</p>
          </div>

          <div>
            <h4 className="footer-title">{t('navShop')}</h4>
            <ul className="footer-links">
              <li><Link href="/shop">{t('catMen')}</Link></li>
              <li><Link href="/shop">{t('catWomen')}</Link></li>
              <li><Link href="/shop">{t('catHoodies')}</Link></li>
              <li><Link href="/shop">{t('catJackets')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-title">{t('navAbout')}</h4>
            <ul className="footer-links">
              <li><Link href="/about">Aurelin Tarixi</Link></li>
              <li><Link href="/about">Xitoy Fabrikalari</Link></li>
              <li><Link href="/contact">Yetkazib berish</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-title">{t('navContact')}</h4>
            <ul className="footer-links">
              <li>📍 Toshkent sh., Chilonzor t.</li>
              <li>📱 +998 (90) 123-45-67</li>
              <li>💬 Telegram: @aurelin_uz</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div>{t('rightsText')}</div>
        </div>
      </div>
    </footer>
  );
}
