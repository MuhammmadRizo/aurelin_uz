export type Language = 'uz' | 'ru' | 'en';
export type Theme = 'light' | 'dark';

export interface Product {
  id: string;
  title: string;
  category: string;
  priceUzs: number;
  priceUsd: number;
  badge?: string;
  badgeType?: 'china' | 'sale';
  color?: string;
  image: string;
  size?: string;
  quantity?: number;
}

export interface CartItem extends Product {
  size: string;
  color: string;
  quantity: number;
}
