/* ==========================================
   AURELIN.UZ - Shared Layout & Navbar Controller
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Highlight active menu item based on current location
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Mobile menu drawer toggle
  const mobileBtn = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (mobileBtn && navMenu) {
    mobileBtn.addEventListener('click', () => {
      navMenu.classList.toggle('mobile-open');
      if (navMenu.classList.contains('mobile-open')) {
        navMenu.style.cssText = `
          display: flex;
          flex-direction: column;
          position: absolute;
          top: 76px;
          left: 0;
          right: 0;
          background: var(--bg-surface);
          border-bottom: 1px solid var(--border-color);
          padding: 24px;
          gap: 16px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          z-index: 99;
        `;
      } else {
        navMenu.style.cssText = '';
      }
    });
  }

  // Quick Search Modal Trigger
  const searchBtn = document.querySelector('.search-trigger-btn');
  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      const query = prompt('Aurelin.uz katalogidan izlash (masalan: Hoodie, Coat, Short):');
      if (query && query.trim() !== '') {
        window.location.href = `shop.html?search=${encodeURIComponent(query.trim())}`;
      }
    });
  }
});
