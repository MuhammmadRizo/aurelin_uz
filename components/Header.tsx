'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { lang, changeLanguage, t } = useLanguage();
  const { totalCount } = useCart();
  
  const [langOpen, setLangOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = () => {
    const q = prompt('Aurelin.uz katalogidan izlash:');
    if (q && q.trim()) {
      window.location.href = `/shop?search=${encodeURIComponent(q.trim())}`;
    }
  };

  return (
    <header className="header">
      <div className="container">
        <nav className="navbar">
          {/* Logo */}
          <Link href="/" className="logo">
            AURELIN<span className="dot">.</span>UZ
            <span className="logo-tag">China Direct</span>
          </Link>

          {/* Nav Links */}
          <ul 
            className={`nav-menu ${mobileMenuOpen ? 'mobile-open' : ''}`}
            style={mobileMenuOpen ? {
              display: 'flex',
              flexDirection: 'column',
              position: 'absolute',
              top: '80px',
              left: 0,
              right: 0,
              background: 'var(--bg-card)',
              borderBottom: '1px solid var(--border-subtle)',
              padding: '24px',
              gap: '16px',
              boxShadow: 'var(--shadow-lg)',
              zIndex: 99
            } : {}}
          >
            <li>
              <Link href="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`}>
                {t('navHome')}
              </Link>
            </li>
            <li>
              <Link href="/shop" className={`nav-link ${pathname === '/shop' ? 'active' : ''}`}>
                {t('navShop')}
              </Link>
            </li>
            <li>
              <Link href="/product-detail" className={`nav-link ${pathname === '/product-detail' ? 'active' : ''}`}>
                {t('navProducts')}
              </Link>
            </li>
            <li>
              <Link href="/about" className={`nav-link ${pathname === '/about' ? 'active' : ''}`}>
                {t('navAbout')}
              </Link>
            </li>
            <li>
              <Link href="/contact" className={`nav-link ${pathname === '/contact' ? 'active' : ''}`}>
                {t('navContact')}
              </Link>
            </li>
          </ul>

          {/* Right Controls */}
          <div className="nav-controls">
            {/* Language Selector */}
            <div className="lang-selector">
              <button 
                className="lang-btn" 
                onClick={() => setLangOpen(!langOpen)}
                aria-label="Change Language"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="2" y1="12" x2="22" y2="12"></line>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                </svg>
                <span>{lang.toUpperCase()}</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>

              {langOpen && (
                <div className="lang-dropdown active">
                  <div 
                    className={`lang-option ${lang === 'uz' ? 'selected' : ''}`}
                    onClick={() => { changeLanguage('uz'); setLangOpen(false); }}
                  >
                    🇺🇿 O'zbekcha
                  </div>
                  <div 
                    className={`lang-option ${lang === 'ru' ? 'selected' : ''}`}
                    onClick={() => { changeLanguage('ru'); setLangOpen(false); }}
                  >
                    🇷🇺 Русский
                  </div>
                  <div 
                    className={`lang-option ${lang === 'en' ? 'selected' : ''}`}
                    onClick={() => { changeLanguage('en'); setLangOpen(false); }}
                  >
                    🇬🇧 English
                  </div>
                </div>
              )}
            </div>

            {/* Theme Toggle Button */}
            <button className="theme-toggle-btn" onClick={toggleTheme} aria-label="Toggle Theme">
              {theme === 'dark' ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              )}
            </button>

            {/* Search Trigger */}
            <button className="icon-btn" onClick={handleSearch} aria-label="Search">
              <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </button>

            {/* Shopping Cart */}
            <Link href="/cart" className="icon-btn" aria-label="Shopping Cart">
              <svg viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
              {totalCount > 0 && <span className="badge-count">{totalCount}</span>}
            </Link>

            {/* Mobile Toggle */}
            <button 
              className="mobile-toggle" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
