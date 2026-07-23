/* ==========================================
   AURELIN.UZ - Shop Catalog & Filter Controller
   (Inspired by Guza Shop UI - Reference Image 1)
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Popover toggles for Categories, Colors, Sizes, Price
  const filterBtns = document.querySelectorAll('.filter-dropdown-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const popover = btn.querySelector('.filter-popover');
      // Close other popovers
      document.querySelectorAll('.filter-popover').forEach(p => {
        if (p !== popover) p.classList.remove('active');
      });
      if (popover) {
        popover.classList.toggle('active');
      }
    });
  });

  document.addEventListener('click', () => {
    document.querySelectorAll('.filter-popover').forEach(p => p.classList.remove('active'));
  });

  // Grid Layout Toggles (2 cols, 3 cols, 4 cols)
  const gridContainer = document.querySelector('.product-grid');
  const gridBtns = document.querySelectorAll('.grid-toggle-btn');

  gridBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cols = btn.getAttribute('data-cols');
      gridBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (gridContainer) {
        gridContainer.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
      }
    });
  });

  // Quick category / color filtering mock logic
  document.querySelectorAll('.color-option-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      const colorName = item.getAttribute('data-color');
      filterProductsByColor(colorName);
    });
  });

  function filterProductsByColor(color) {
    const cards = document.querySelectorAll('.product-card');
    cards.forEach(card => {
      const cardColors = card.getAttribute('data-colors') || '';
      if (!color || color === 'all' || cardColors.includes(color)) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  // Price sorting selector
  const sortSelect = document.querySelector('.sort-select');
  if (sortSelect && gridContainer) {
    sortSelect.addEventListener('change', () => {
      const val = sortSelect.value;
      const cards = Array.from(gridContainer.children);

      cards.sort((a, b) => {
        const priceA = parseFloat(a.getAttribute('data-price') || 0);
        const priceB = parseFloat(b.getAttribute('data-price') || 0);

        if (val === 'low-high') return priceA - priceB;
        if (val === 'high-low') return priceB - priceA;
        return 0;
      });

      cards.forEach(card => gridContainer.appendChild(card));
    });
  }
});
