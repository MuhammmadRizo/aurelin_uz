export interface Product {
  id: string;
  slug: string;
  name: string;
  category: 'Svtishertlar' | 'Futbolkalar' | 'Ustki kiyimlar' | string;
  price: number;
  image: string;
  gallery?: string[];
  description: string;
  details?: string[];
  composition?: string;
  sizes: string[];
  featured?: boolean;
  label?: string;
}

export interface CartItem {
  id: string;
  product: Product;
  size: string;
  quantity: number;
  selectedImage?: string;
}
