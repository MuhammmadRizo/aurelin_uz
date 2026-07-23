/* ==========================================
   AURELIN.UZ - Shopping Cart State Manager
   ========================================== */

(function () {
  const CART_KEY = 'aurelin_cart_items';

  function getCart() {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    } catch (e) {
      return [];
    }
  }

  function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartBadges();
  }

  function updateCartBadges() {
    const cart = getCart();
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    document.querySelectorAll('.cart-count-badge').forEach(badge => {
      badge.textContent = totalCount;
      badge.style.display = totalCount > 0 ? 'flex' : 'none';
    });
  }

  window.addToAurelinCart = function (product) {
    const cart = getCart();
    const existingIndex = cart.findIndex(item => 
      item.id === product.id && item.size === product.size && item.color === product.color
    );

    if (existingIndex > -1) {
      cart[existingIndex].quantity += (product.quantity || 1);
    } else {
      cart.push({
        id: product.id || 'prod-' + Date.now(),
        title: product.title || 'Classic Aurelin Apparel',
        priceUzs: product.priceUzs || 310000,
        priceUsd: product.priceUsd || 24.99,
        size: product.size || 'M',
        color: product.color || 'Default',
        image: product.image || 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80',
        quantity: product.quantity || 1
      });
    }

    saveCart(cart);
    showCartToast(product.title);
  };

  window.removeFromAurelinCart = function (id, size, color) {
    let cart = getCart();
    cart = cart.filter(item => !(item.id === id && item.size === size && item.color === color));
    saveCart(cart);
    if (window.renderCartPage) {
      window.renderCartPage();
    }
  };

  window.updateAurelinCartQty = function (id, size, color, newQty) {
    let cart = getCart();
    const item = cart.find(i => i.id === id && i.size === size && i.color === color);
    if (item) {
      item.quantity = Math.max(1, newQty);
      saveCart(cart);
      if (window.renderCartPage) {
        window.renderCartPage();
      }
    }
  };

  function showCartToast(title) {
    let toast = document.getElementById('aurelin-cart-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'aurelin-cart-toast';
      toast.style.cssText = `
        position: fixed;
        bottom: 24px;
        right: 24px;
        background: var(--text-main);
        color: var(--bg-surface);
        padding: 14px 24px;
        border-radius: var(--radius-md);
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        z-index: 9999;
        font-weight: 700;
        font-size: 14px;
        display: flex;
        align-items: center;
        gap: 12px;
        transform: translateY(100px);
        opacity: 0;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      `;
      document.body.appendChild(toast);
    }

    toast.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
      <span>"${title || 'Mahsulot'}" savatchaga qo'shildi!</span>
    `;

    setTimeout(() => {
      toast.style.transform = 'translateY(0)';
      toast.style.opacity = '1';
    }, 10);

    setTimeout(() => {
      toast.style.transform = 'translateY(100px)';
      toast.style.opacity = '0';
    }, 3000);
  }

  window.getAurelinCart = getCart;

  document.addEventListener('DOMContentLoaded', () => {
    updateCartBadges();
  });
})();
