/* ==========================================
   AURELIN.UZ - Product Detail Controller
   (Inspired by Nextgen Detail UI - Reference Image 2)
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Gallery Thumbnail Switcher
  const mainImg = document.getElementById('main-product-img');
  const thumbs = document.querySelectorAll('.thumb-item');

  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      thumbs.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
      const newSrc = thumb.getAttribute('data-img');
      if (mainImg && newSrc) {
        mainImg.src = newSrc;
      }
    });
  });

  // 2. Size Selector Pills
  const sizePills = document.querySelectorAll('.size-pill');
  sizePills.forEach(pill => {
    pill.addEventListener('click', () => {
      sizePills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
    });
  });

  // 3. Accordions (Description & Shipping)
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isOpen = item.classList.contains('active');

      // Close other accordions
      document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));

      if (!isOpen) {
        item.classList.add('active');
      }
    });
  });

  // 4. Delivery Countdown Timer (Image 2 style)
  const timerElem = document.getElementById('countdown-timer');
  if (timerElem) {
    let secondsLeft = 2 * 3600 + 30 * 60 + 25; // 02:30:25 initial
    setInterval(() => {
      if (secondsLeft <= 0) secondsLeft = 24 * 3600;
      secondsLeft--;
      const hrs = String(Math.floor(secondsLeft / 3600)).padStart(2, '0');
      const mins = String(Math.floor((secondsLeft % 3600) / 60)).padStart(2, '0');
      const secs = String(secondsLeft % 60).padStart(2, '0');
      timerElem.textContent = `${hrs}:${mins}:${secs}`;
    }, 1000);
  }

  // 5. Quantity Stepper
  const qtyVal = document.getElementById('qty-val');
  const btnMinus = document.getElementById('btn-qty-minus');
  const btnPlus = document.getElementById('btn-qty-plus');

  if (qtyVal && btnMinus && btnPlus) {
    btnMinus.addEventListener('click', () => {
      let current = parseInt(qtyVal.textContent, 10) || 1;
      if (current > 1) qtyVal.textContent = current - 1;
    });
    btnPlus.addEventListener('click', () => {
      let current = parseInt(qtyVal.textContent, 10) || 1;
      qtyVal.textContent = current + 1;
    });
  }

  // 6. Wishlist Toggle
  const wishlistBtn = document.querySelector('.btn-wishlist');
  if (wishlistBtn) {
    wishlistBtn.addEventListener('click', () => {
      const svg = wishlistBtn.querySelector('svg');
      if (svg) {
        if (svg.getAttribute('fill') === 'currentColor') {
          svg.setAttribute('fill', 'none');
        } else {
          svg.setAttribute('fill', 'currentColor');
          svg.style.color = '#ef4444';
        }
      }
    });
  }

  // 7. Add to Cart from Detail Page
  const detailAddCartBtn = document.getElementById('detail-add-cart-btn');
  if (detailAddCartBtn) {
    detailAddCartBtn.addEventListener('click', () => {
      const activeSize = document.querySelector('.size-pill.active');
      const selectedSize = activeSize ? activeSize.textContent.trim() : 'M';
      const qty = parseInt(document.getElementById('qty-val')?.textContent || '1', 10);
      const title = document.querySelector('.product-main-title')?.textContent || 'Loose Fit Hoodie';
      const priceText = document.querySelector('.product-detail-price')?.textContent || '$24.99';
      const img = document.getElementById('main-product-img')?.src || '';

      if (window.addToAurelinCart) {
        window.addToAurelinCart({
          id: 'prod-loose-fit-hoodie',
          title: title,
          priceUzs: 310000,
          priceUsd: 24.99,
          size: selectedSize,
          color: 'Burgundy',
          image: img,
          quantity: qty
        });
      }
    });
  }
});
