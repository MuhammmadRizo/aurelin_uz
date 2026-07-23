/* ==========================================
   AURELIN.UZ - Multilingual i18n Translation Engine
   Supports: Uzbek (UZ), Russian (RU), English (EN)
   ========================================== */

(function () {
  const LANG_KEY = 'aurelin_language';

  const translations = {
    uz: {
      // Announcement
      announcementText: "Xitoyning premium fabrikalaridan to'g'ridan-to'g meva kiyimlar! O'zbekiston bo'ylab express yetkazib berish.",
      announcementBtn: "Katalogga o'tish",
      
      // Header Navigation
      navHome: "Bosh sahifa",
      navShop: "Do'kon",
      navProducts: "Kiyimlar",
      navAbout: "Biz haqimizda",
      navContact: "Aloqa",
      
      // Hero & Highlights
      heroSubtitle: "XITOYDAN TO'G'RIDAN-TO'G'RI IMPORT",
      heroTitle: "Premium Sifat & Eksklyuziv Zamonaviy Kiyimlar",
      heroDesc: "Aurelin.uz - Xitoyning eng sara kiyim-kechak fabrikalaridan to'g'ridan-to'g'ri keltirilgan sifatli va qulay kiyimlar to'plami. Uyingizga yetkazib beramiz!",
      heroShopBtn: "Kolleksiyani ko'rish",
      heroAboutBtn: "Batafsil ma'lumot",
      
      // China Advantage Section
      advantageTitle: "Nega aynan Aurelin.uz?",
      adv1Title: "Fabrika Narxlari",
      adv1Desc: "Xitoy ishlab chiqaruvchilaridan vositachilarsiz to'g'ridan-to'g'ri import qilinadi.",
      adv2Title: "Premium Sifat",
      adv2Desc: "Har bir kiyim matosi va tikilishi sifat nazoratidan o'tkaziladi.",
      adv3Title: "Tezkor Yetkazish",
      adv3Desc: "Toshkent va barcha viloyat markazlariga 1-3 kun ichida yetkazib beriladi.",
      
      // Shop Page Filters & UI
      shopHeading: "Do'kon Katalogi",
      filterCategories: "Kategoriyalar",
      filterColor: "Ranglar",
      filterSize: "O'lcham",
      filterPrice: "Narx",
      filterBrand: "Brend",
      sortDefault: "Odatiy saralash",
      sortPriceLow: "Narx: Arzondan qimmatga",
      sortPriceHigh: "Narx: Qimmatdan arzonga",
      sortNewest: "Yangi kelganlar",
      
      // Categories
      catMen: "Erkaklar kiyimi",
      catWomen: "Ayollar kiyimi",
      catHoodies: "Xudi & Svitshotlar",
      catJackets: "Kurtka & Palto",
      catShorts: "Shortilar & Shimlar",
      
      // Colors
      colorBlue: "Moviy",
      colorGrey: "Kulrang",
      colorRed: "Qizil",
      colorYellow: "Sariq",
      colorBrown: "Jigarrang",
      colorBeige: "Bej rang",
      colorBlack: "Qora",
      
      // Product Detail Page
      inStock: "Mavjud",
      chinaImportTag: "Xitoy Premium Impori",
      deliveryTimer: "Order in <strong>02:30:25</strong> to get next day delivery",
      deliveryTimerUz: "Buyurtma bering <strong>02:30:25</strong> ichida va ertaga yetkazib beramiz!",
      selectSize: "O'lchamni tanlang",
      sizeGuide: "O'lchamlar jadvali",
      addToCart: "Savatchaga qo'shish",
      buyNowTelegram: "Telegram orqali buyurtma",
      
      descAccordTitle: "Tavsif va Matosi",
      shippingAccordTitle: "Yetkazib berish va Qaytarish",
      descFitText: "Yumshoq paxta va premium sintetik aralashmasidan tayyorlangan zamonaviy kiyim. Erkin bichim (Loose Fit), fasl uchun juda qulay va chidamli mato.",
      shippingText: "Xitoy omboridan to'g'ridan-to'g'ri Toshkentga keltiriladi. O'zbekiston bo'ylab barcha pochta va kuryerlik xizmatlari orqali yetkazamiz.",
      
      // Reviews
      reviewsTitle: "Mijozlar Sharhlari & Reyting",
      newReviewsCount: "(50 ta yangi sharhlar)",
      recommendTitle: "Sizga yoqishi mumkin",
      
      // Cart Page
      cartTitle: "Savatchangiz",
      cartEmptyMsg: "Savatchangiz hozircha bo'sh",
      cartTotal: "Jami",
      shippingCost: "Yetkazish xizmati",
      freeShipping: "Bepul",
      checkoutBtn: "Rasmiylashtirishga o'tish",
      promoCodePlaceholder: "Promokod kiritish",
      applyBtn: "Qo'llash",
      
      // Footer
      newsletterTitle: "Aksiyalar va chegirmalardan xabardor bo'ling",
      newsletterDesc: "Ro'yxatdan o'ting va birinchi buyurtmangiz uchun 15% chegirma promokodini oling.",
      subscribeBtn: "Azo bo'lish",
      rightsText: "© 2026 Aurelin.uz. Barcha huquqlar himoyalangan. China-Direct Fashion Store."
    },
    
    ru: {
      // Announcement
      announcementText: "Прямые поставки одежды от премиум фабрик Китая! Экспресс-доставка по всему Узбекистану.",
      announcementBtn: "Перейти в каталог",
      
      // Header Navigation
      navHome: "Главная",
      navShop: "Магазин",
      navProducts: "Одежда",
      navAbout: "О нас",
      navContact: "Контакты",
      
      // Hero & Highlights
      heroSubtitle: "ПРЯМОЙ ИМПОРТ ИЗ КИТАЯ",
      heroTitle: "Премиум Качество и Эксклюзивный Стиль",
      heroDesc: "Aurelin.uz — стильная и комфортная одежда напрямую от проверенных фабрик Китая. Доставим до вашей двери!",
      heroShopBtn: "Смотреть коллекцию",
      heroAboutBtn: "Подробнее",
      
      // China Advantage Section
      advantageTitle: "Почему выбирают Aurelin.uz?",
      adv1Title: "Цены от Фабрики",
      adv1Desc: "Прямой импорт без посредников от производителей Китая.",
      adv2Title: "Премиум Качество",
      adv2Desc: "Строгий контроль качества тканей и пошива каждой вещи.",
      adv3Title: "Быстрая Доставка",
      adv3Desc: "Доставка по Ташкенту и всем регионам Узбекистана за 1-3 дня.",
      
      // Shop Page Filters & UI
      shopHeading: "Каталог Магазина",
      filterCategories: "Категории",
      filterColor: "Цвет",
      filterSize: "Размер",
      filterPrice: "Цена",
      filterBrand: "Бренд",
      sortDefault: "Сортировка по умолчанию",
      sortPriceLow: "Цена: от дешевых к дорогим",
      sortPriceHigh: "Цена: от дорогих к дешевым",
      sortNewest: "Новые поступления",
      
      // Categories
      catMen: "Мужская одежда",
      catWomen: "Женская одежда",
      catHoodies: "Худи и Свитшоты",
      catJackets: "Куртки и Пальто",
      catShorts: "Шорты и Брюки",
      
      // Colors
      colorBlue: "Синий",
      colorGrey: "Серый",
      colorRed: "Красный",
      colorYellow: "Желтый",
      colorBrown: "Коричневый",
      colorBeige: "Бежевый",
      colorBlack: "Черный",
      
      // Product Detail Page
      inStock: "В наличии",
      chinaImportTag: "Китай Премиум Импорт",
      deliveryTimer: "Order in <strong>02:30:25</strong> to get next day delivery",
      deliveryTimerUz: "Закажите в течение <strong>02:30:25</strong> для быстрой доставки!",
      selectSize: "Выберите размер",
      sizeGuide: "Таблица размеров",
      addToCart: "Добавить в корзину",
      buyNowTelegram: "Заказать через Telegram",
      
      descAccordTitle: "Описание и Состав",
      shippingAccordTitle: "Доставка и Возврат",
      descFitText: "Стильная одежда из мягкого хлопка премиум-класса. Свободный крой (Loose Fit), удобный и долговечный материал.",
      shippingText: "Прямая поставка со склада Китая в Ташкент. Доставка курьером и почтой по всему Узбекистану.",
      
      // Reviews
      reviewsTitle: "Отзывы клиентов и Рейтинг",
      newReviewsCount: "(50 новых отзывов)",
      recommendTitle: "Вам также может понравиться",
      
      // Cart Page
      cartTitle: "Ваша корзина",
      cartEmptyMsg: "Ваша корзина пока пуста",
      cartTotal: "Итого",
      shippingCost: "Доставка",
      freeShipping: "Бесплатно",
      checkoutBtn: "Перейти к оформлению",
      promoCodePlaceholder: "Введите промокод",
      applyBtn: "Применить",
      
      // Footer
      newsletterTitle: "Будьте в курсе скидок и акций",
      newsletterDesc: "Подпишитесь и получите промокод на скидку 15% на первый заказ.",
      subscribeBtn: "Подписаться",
      rightsText: "© 2026 Aurelin.uz. Все права защищены. China-Direct Fashion Store."
    },
    
    en: {
      // Announcement
      announcementText: "Direct fashion imports from China's top factories! Express delivery across Uzbekistan.",
      announcementBtn: "Go to Catalog",
      
      // Header Navigation
      navHome: "Home",
      navShop: "Shop",
      navProducts: "Products",
      navAbout: "About Us",
      navContact: "Contact",
      
      // Hero & Highlights
      heroSubtitle: "DIRECT CHINA IMPORT",
      heroTitle: "Premium Quality & Exclusive Modern Apparel",
      heroDesc: "Aurelin.uz brings you curated fashion collections imported directly from premier Chinese manufacturers to your doorstep.",
      heroShopBtn: "Shop Collection",
      heroAboutBtn: "Learn More",
      
      // China Advantage Section
      advantageTitle: "Why Choose Aurelin.uz?",
      adv1Title: "Factory Prices",
      adv1Desc: "Direct import without middleman markups straight from China factories.",
      adv2Title: "Premium Quality",
      adv2Desc: "Strict quality control on every fabric cut and garment stitching.",
      adv3Title: "Express Shipping",
      adv3Desc: "Fast delivery to Tashkent and all Uzbekistan regions within 1-3 days.",
      
      // Shop Page Filters & UI
      shopHeading: "Shop Catalog",
      filterCategories: "Categories",
      filterColor: "Color",
      filterSize: "Size",
      filterPrice: "Price",
      filterBrand: "Brand",
      sortDefault: "Default Sorting",
      sortPriceLow: "Price: Low to High",
      sortPriceHigh: "Price: High to Low",
      sortNewest: "New Arrivals",
      
      // Categories
      catMen: "Men's Fashion",
      catWomen: "Women's Fashion",
      catHoodies: "Hoodies & Sweatshirts",
      catJackets: "Jackets & Coats",
      catShorts: "Shorts & Pants",
      
      // Colors
      colorBlue: "Blue",
      colorGrey: "Grey",
      colorRed: "Red",
      colorYellow: "Yellow",
      colorBrown: "Brown",
      colorBeige: "Beige",
      colorBlack: "Black",
      
      // Product Detail Page
      inStock: "In Stock",
      chinaImportTag: "China Premium Import",
      deliveryTimer: "Order in <strong>02:30:25</strong> to get next day delivery",
      deliveryTimerUz: "Order in <strong>02:30:25</strong> to get next day delivery",
      selectSize: "Select Size",
      sizeGuide: "Size Guide",
      addToCart: "Add to Cart",
      buyNowTelegram: "Order via Telegram",
      
      descAccordTitle: "Description & Fit",
      shippingAccordTitle: "Shipping & Returns",
      descFitText: "Loose-fit garment made from medium weight cotton-blend fabric with generous silhouette. Soft, brushed inside for maximum comfort.",
      shippingText: "Direct express shipment from China warehouse to Tashkent hub with local courier tracking across Uzbekistan.",
      
      // Reviews
      reviewsTitle: "Rating & Reviews",
      newReviewsCount: "(50 New Reviews)",
      recommendTitle: "You might also like",
      
      // Cart Page
      cartTitle: "Your Shopping Bag",
      cartEmptyMsg: "Your cart is currently empty",
      cartTotal: "Total",
      shippingCost: "Shipping",
      freeShipping: "Free",
      checkoutBtn: "Proceed to Checkout",
      promoCodePlaceholder: "Enter promo code",
      applyBtn: "Apply",
      
      // Footer
      newsletterTitle: "Receive exclusive discounts & novelties",
      newsletterDesc: "Sign up now and get a 15% discount promo code for your first order.",
      subscribeBtn: "Subscribe",
      rightsText: "© 2026 Aurelin.uz. All rights reserved. China-Direct Fashion Store."
    }
  };

  function getCurrentLang() {
    return localStorage.getItem(LANG_KEY) || 'uz';
  }

  function setLanguage(lang) {
    if (!translations[lang]) return;
    localStorage.setItem(LANG_KEY, lang);
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
    
    // Update all elements with data-i18n attribute
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang][key]) {
        if (el.tagName === 'INPUT' && el.getAttribute('placeholder')) {
          el.placeholder = translations[lang][key];
        } else {
          el.innerHTML = translations[lang][key];
        }
      }
    });
    
    // Update current language label on dropdown pill
    const langLabel = document.querySelector('.current-lang-text');
    if (langLabel) {
      langLabel.textContent = lang.toUpperCase();
    }
    
    // Update selected checkmarks in dropdown
    document.querySelectorAll('.lang-option').forEach(opt => {
      if (opt.getAttribute('data-lang') === lang) {
        opt.classList.add('selected');
      } else {
        opt.classList.remove('selected');
      }
    });
  }

  window.changeAurelinLang = function (lang) {
    setLanguage(lang);
    const dropdown = document.querySelector('.lang-dropdown');
    if (dropdown) dropdown.classList.remove('active');
  };

  document.addEventListener('DOMContentLoaded', () => {
    const lang = getCurrentLang();
    setLanguage(lang);
    
    // Setup dropdown click listeners
    const langBtn = document.querySelector('.lang-btn');
    const langDropdown = document.querySelector('.lang-dropdown');
    
    if (langBtn && langDropdown) {
      langBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        langDropdown.classList.toggle('active');
      });
      
      document.addEventListener('click', () => {
        langDropdown.classList.remove('active');
      });
    }
    
    document.querySelectorAll('.lang-option').forEach(opt => {
      opt.addEventListener('click', () => {
        const selectedLang = opt.getAttribute('data-lang');
        setLanguage(selectedLang);
      });
    });
  });

  window.aurelinI18n = {
    get: function(key) {
      const lang = getCurrentLang();
      return translations[lang] ? translations[lang][key] || key : key;
    },
    getCurrentLang: getCurrentLang
  };
})();
