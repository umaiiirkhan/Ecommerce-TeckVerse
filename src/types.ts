export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'gadgets' | 'watches' | 'phones' | 'laptops' | 'accessories';
  image: string;
  model3d?: string;
  features: string[];
  inStock: boolean;
  rating: number;
  tags: string[];
  colors?: string[];
  isFeatured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: 'gadgets' | 'watches' | 'phones' | 'laptops' | 'accessories';
  description: string;
  image: string;
  backgroundImage: string;
  themeColor: string;
}