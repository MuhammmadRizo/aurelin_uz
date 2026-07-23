'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Language } from '@/types';

interface LanguageContextType {
  lang: Language;
  changeLanguage: (newLang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'uz',
  changeLanguage: () => {},
  t: (key: string) => key
});

const translations: Record<Language, Record<string, string>> = {
  uz: {
    announcementText: "Xitoyning premium fabrikalaridan to'g'ridan-to'g'ri meva kiyimlar! O'zbekiston bo'ylab express yetkazib berish.",
    announcementBtn: "Katalogga o'tish",
    navHome: "Bosh sahifa",
    navShop: "Do'kon",
    navProducts: "Kiyimlar",
    navAbout: "Biz haqimizda",
    navContact: "Aloqa",
    heroSubtitle: "XITOYDAN TO'G'RIDAN-TO'G'RI IMPORT",
    heroTitle: "Eksklyuziv Kiyimlar va Zamonaviy Stil",
    heroDesc: "Aurelin.uz - Xitoyning eng sara kiyim-kechak fabrikalaridan to'g'ridan-to'g'ri keltirilgan sifatli va qulay kiyimlar to'plami. Uyingizga yetkazib beramiz!",
    heroShopBtn: "Kolleksiyani ko'rish",
    heroAboutBtn: "Biz haqimizda",
    advantageTitle: "Nega aynan Aurelin.uz?",
    adv1Title: "Fabrika Narxlari",
    adv1Desc: "Xitoy ishlab chiqaruvchilaridan vositachilarsiz to'g'ridan-to'g'ri import qilinadi.",
    adv2Title: "Premium Sifat",
    adv2Desc: "Har bir kiyim matosi va tikilishi sifat nazoratidan o'tkaziladi.",
    adv3Title: "Tezkor Yetkazish",
    adv3Desc: "Toshkent va barcha viloyat markazlariga 1-3 kun ichida yetkazib beriladi.",
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
    catMen: "Erkaklar kiyimi",
    catWomen: "Ayollar kiyimi",
    catHoodies: "Xudi & Svitshotlar",
    catJackets: "Kurtka & Palto",
    colorBlue: "Moviy",
    colorGrey: "Kulrang",
    colorRed: "Qizil",
    colorYellow: "Sariq",
    colorBrown: "Jigarrang",
    colorBeige: "Bej rang",
    colorBlack: "Qora",
    inStock: "Mavjud",
    chinaImportTag: "Xitoy Premium Importi",
    deliveryTimerUz: "Buyurtma bering 02:30:25 ichida va ertaga yetkazib beramiz!",
    selectSize: "O'lchamni tanlang",
    sizeGuide: "O'lchamlar jadvali",
    addToCart: "Savatchaga qo'shish",
    descAccordTitle: "Tavsif va Matosi",
    shippingAccordTitle: "Yetkazib berish va Qaytarish",
    descFitText: "Yumshoq paxta va premium sintetik aralashmasidan tayyorlangan zamonaviy kiyim. Erkin bichim (Loose Fit), fasl uchun juda qulay va chidamli mato.",
    shippingText: "Xitoy omboridan to'g'ridan-to'g'ri Toshkentga keltiriladi. O'zbekiston bo'ylab barcha pochta va kuryerlik xizmatlari orqali yetkazamiz.",
    reviewsTitle: "Mijozlar Sharhlari & Reyting",
    newReviewsCount: "(50 ta yangi sharhlar)",
    recommendTitle: "Sizga yoqishi mumkin",
    cartTitle: "Xarid Savatchangiz",
    cartEmptyMsg: "Savatchangiz hozircha bo'sh",
    cartTotal: "Jami",
    shippingCost: "Yetkazish xizmati",
    freeShipping: "BEPUL",
    checkoutBtn: "Buyurtmani Tasdiqlash",
    subscribeBtn: "Obuna",
    rightsText: "© 2026 Aurelin.uz. Barcha huquqlar himoyalangan. China-Direct Fashion Store."
  },
  ru: {
    announcementText: "Прямые поставки одежды от премиум фабрик Китая! Экспресс-доставка по всему Узбекистану.",
    announcementBtn: "Перейти в каталог",
    navHome: "Главная",
    navShop: "Магазин",
    navProducts: "Одежда",
    navAbout: "О нас",
    navContact: "Контакты",
    heroSubtitle: "ПРЯМОЙ ИМПОРТ ИЗ КИТАЯ",
    heroTitle: "Эксклюзивная Одежда и Современный Стиль",
    heroDesc: "Aurelin.uz — стильная и комфортная одежда напрямую от проверенных фабрик Китая. Доставим до вашей двери!",
    heroShopBtn: "Смотреть коллекцию",
    heroAboutBtn: "О нас",
    advantageTitle: "Почему выбирают Aurelin.uz?",
    adv1Title: "Цены от Фабрики",
    adv1Desc: "Прямой импорт без посредников от производителей Китая.",
    adv2Title: "Премиум Качество",
    adv2Desc: "Строгий контроль качества тканей и пошива каждой вещи.",
    adv3Title: "Быстрая Доставка",
    adv3Desc: "Доставка по Ташкенту и всем регионам Узбекистана за 1-3 дня.",
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
    catMen: "Мужская одежда",
    catWomen: "Женская одежда",
    catHoodies: "Худи и Свитшоты",
    catJackets: "Куртки и Пальто",
    colorBlue: "Синий",
    colorGrey: "Серый",
    colorRed: "Красный",
    colorYellow: "Желтый",
    colorBrown: "Коричневый",
    colorBeige: "Бежевый",
    colorBlack: "Черный",
    inStock: "В наличии",
    chinaImportTag: "Китай Премиум Импорт",
    deliveryTimerUz: "Закажите в течение 02:30:25 для быстрой доставки!",
    selectSize: "Выберите размер",
    sizeGuide: "Таблица размеров",
    addToCart: "Добавить в корзину",
    descAccordTitle: "Описание и Состав",
    shippingAccordTitle: "Доставка и Возврат",
    descFitText: "Стильная одежда из мягкого хлопка премиум-класса. Свободный крой (Loose Fit), удобный и долговечный материал.",
    shippingText: "Прямая поставка со склада Китая в Ташкент. Доставка курьером и почтой по всему Узбекистану.",
    reviewsTitle: "Отзывы клиентов и Рейтинг",
    newReviewsCount: "(50 новых отзывов)",
    recommendTitle: "Вам также может понравиться",
    cartTitle: "Ваша корзина",
    cartEmptyMsg: "Ваша корзина пока пуста",
    cartTotal: "Итого",
    shippingCost: "Доставка",
    freeShipping: "БЕСПЛАТНО",
    checkoutBtn: "Оформить заказ",
    subscribeBtn: "Подписаться",
    rightsText: "© 2026 Aurelin.uz. Все права защищены. China-Direct Fashion Store."
  },
  en: {
    announcementText: "Direct fashion imports from China's top factories! Express delivery across Uzbekistan.",
    announcementBtn: "Go to Catalog",
    navHome: "Home",
    navShop: "Shop",
    navProducts: "Products",
    navAbout: "About Us",
    navContact: "Contact",
    heroSubtitle: "DIRECT CHINA IMPORT",
    heroTitle: "Exclusive Apparel & Modern Style",
    heroDesc: "Aurelin.uz brings you curated fashion collections imported directly from premier Chinese manufacturers to your doorstep.",
    heroShopBtn: "Shop Collection",
    heroAboutBtn: "About Us",
    advantageTitle: "Why Choose Aurelin.uz?",
    adv1Title: "Factory Prices",
    adv1Desc: "Direct import without middleman markups straight from China factories.",
    adv2Title: "Premium Quality",
    adv2Desc: "Strict quality control on every fabric cut and garment stitching.",
    adv3Title: "Express Shipping",
    adv3Desc: "Fast delivery to Tashkent and all Uzbekistan regions within 1-3 days.",
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
    catMen: "Men's Fashion",
    catWomen: "Women's Fashion",
    catHoodies: "Hoodies & Sweatshirts",
    catJackets: "Jackets & Coats",
    colorBlue: "Blue",
    colorGrey: "Grey",
    colorRed: "Red",
    colorYellow: "Yellow",
    colorBrown: "Brown",
    colorBeige: "Beige",
    colorBlack: "Black",
    inStock: "In Stock",
    chinaImportTag: "China Premium Import",
    deliveryTimerUz: "Order in 02:30:25 to get next day delivery!",
    selectSize: "Select Size",
    sizeGuide: "Size Guide",
    addToCart: "Add to Cart",
    descAccordTitle: "Description & Fit",
    shippingAccordTitle: "Shipping & Returns",
    descFitText: "Loose-fit garment made from medium weight cotton-blend fabric with generous silhouette. Soft, brushed inside for maximum comfort.",
    shippingText: "Direct express shipment from China warehouse to Tashkent hub with local courier tracking across Uzbekistan.",
    reviewsTitle: "Rating & Reviews",
    newReviewsCount: "(50 New Reviews)",
    recommendTitle: "You might also like",
    cartTitle: "Your Shopping Bag",
    cartEmptyMsg: "Your cart is currently empty",
    cartTotal: "Total",
    shippingCost: "Shipping",
    freeShipping: "FREE",
    checkoutBtn: "Proceed to Checkout",
    subscribeBtn: "Subscribe",
    rightsText: "© 2026 Aurelin.uz. All rights reserved. China-Direct Fashion Store."
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>('uz');

  useEffect(() => {
    const saved = localStorage.getItem('aurelin_language') as Language;
    if (saved && translations[saved]) {
      setLang(saved);
      document.documentElement.lang = saved;
    }
  }, []);

  const changeLanguage = (newLang: Language) => {
    if (translations[newLang]) {
      setLang(newLang);
      localStorage.setItem('aurelin_language', newLang);
      document.documentElement.lang = newLang;
    }
  };

  const t = (key: string): string => {
    return translations[lang]?.[key] || translations['uz']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
