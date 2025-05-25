import { Product } from '../types';

export const products: Product[] = [
  // Gadgets
  {
    id: 'gadget-1',
    name: 'Smart Home Hub',
    description: 'Control your entire home with voice commands and smart automation',
    price: 249.99,
    category: 'gadgets',
    image: 'https://images.pexels.com/photos/4219528/pexels-photo-4219528.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    features: [
      'Voice control integration',
      'Smart home automation',
      'Energy monitoring',
      'Security system integration',
      'Custom routines and scenes'
    ],
    inStock: true,
    rating: 4.7,
    tags: ['smart home', 'voice control', 'automation'],
    isFeatured: true
  },
  {
    id: 'gadget-2',
    name: 'AR Glasses',
    description: 'Experience augmented reality with these lightweight smart glasses',
    price: 599.99,
    category: 'gadgets',
    image: 'https://images.pexels.com/photos/3095527/pexels-photo-3095527.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    features: [
      'HD augmented reality display',
      'Voice and gesture control',
      'All-day battery life',
      'Smartphone connectivity',
      'Spatial audio'
    ],
    inStock: true,
    rating: 4.2,
    tags: ['AR', 'wearable tech', 'smart glasses']
  },
  {
    id: 'gadget-3',
    name: 'Smart Fitness Scale',
    description: 'Track weight, BMI, muscle mass and more with this smart scale',
    price: 89.99,
    category: 'gadgets',
    image: 'https://images.pexels.com/photos/4386464/pexels-photo-4386464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    features: [
      'Weight tracking',
      'Body composition analysis',
      'Multi-user support',
      'App connectivity',
      'Trend tracking and goals'
    ],
    inStock: true,
    rating: 4.5,
    tags: ['fitness', 'health', 'smart scale']
  },

  // Watches
  {
    id: 'watch-1',
    name: 'TechVerse Watch Pro',
    description: 'Premium smartwatch with advanced health monitoring and cellular connectivity',
    price: 399.99,
    category: 'watches',
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    features: [
      'Always-on OLED display',
      'ECG and blood oxygen monitoring',
      'GPS and cellular connectivity',
      '5 ATM water resistance',
      '7-day battery life'
    ],
    inStock: true,
    rating: 4.8,
    tags: ['smartwatch', 'fitness', 'cellular'],
    colors: ['Black', 'Silver', 'Gold'],
    isFeatured: true
  },
  {
    id: 'watch-2',
    name: 'Fitness Tracker Ultra',
    description: 'Advanced fitness tracking with built-in GPS and heart rate monitoring',
    price: 149.99,
    category: 'watches',
    image: 'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    features: [
      '24/7 heart rate monitoring',
      'Built-in GPS',
      'Sleep tracking',
      '14-day battery life',
      'Waterproof to 50m'
    ],
    inStock: true,
    rating: 4.6,
    tags: ['fitness tracker', 'GPS', 'waterproof'],
    colors: ['Black', 'Blue', 'Red']
  },
  {
    id: 'watch-3',
    name: 'Minimalist Smart Watch',
    description: 'Elegant design with essential smart features and long battery life',
    price: 179.99,
    category: 'watches',
    image: 'https://images.pexels.com/photos/266666/pexels-photo-266666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    features: [
      'Hybrid analog/digital display',
      'Activity tracking',
      'Notification alerts',
      '30-day battery life',
      'Sapphire crystal glass'
    ],
    inStock: true,
    rating: 4.4,
    tags: ['hybrid watch', 'elegant', 'long battery'],
    colors: ['Silver', 'Rose Gold', 'Black']
  },

  // Phones
  {
    id: 'phone-1',
    name: 'TechVerse Pro Max',
    description: 'Flagship smartphone with cutting-edge camera system and powerful processor',
    price: 1099.99,
    category: 'phones',
    image: 'https://images.pexels.com/photos/1786433/pexels-photo-1786433.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    features: [
      '6.7" AMOLED display',
      'Triple camera system with 108MP main sensor',
      'Latest processor with AI capabilities',
      '512GB storage',
      'All-day battery life'
    ],
    inStock: true,
    rating: 4.9,
    tags: ['flagship', 'camera', 'performance'],
    colors: ['Midnight Black', 'Silver Frost', 'Ocean Blue'],
    isFeatured: true
  },
  {
    id: 'phone-2',
    name: 'Ultra Lite Phone',
    description: 'Lightweight mid-range smartphone with excellent battery life',
    price: 499.99,
    category: 'phones',
    image: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    features: [
      '6.2" LCD display',
      'Quad camera system',
      'Mid-range processor',
      '128GB storage expandable',
      '2-day battery life'
    ],
    inStock: true,
    rating: 4.5,
    tags: ['mid-range', 'battery life', 'affordable'],
    colors: ['Green', 'White', 'Black']
  },
  {
    id: 'phone-3',
    name: 'Gaming Phone X',
    description: 'Designed for mobile gaming with cooling system and high refresh rate',
    price: 799.99,
    category: 'phones',
    image: 'https://images.pexels.com/photos/110854/pexels-photo-110854.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    features: [
      '6.8" 144Hz AMOLED display',
      'Gaming-focused processor',
      'Advanced cooling system',
      'Shoulder triggers',
      '6000mAh battery'
    ],
    inStock: true,
    rating: 4.7,
    tags: ['gaming', 'performance', 'cooling'],
    colors: ['Stealth Black', 'Neon Red']
  },

  // Laptops
  {
    id: 'laptop-1',
    name: 'TechVerse Ultrabook',
    description: 'Ultra-thin laptop with premium build quality and all-day battery life',
    price: 1299.99,
    category: 'laptops',
    image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    features: [
      '14" 4K touchscreen display',
      'Latest generation processor',
      '16GB RAM, 512GB SSD',
      'Fingerprint sensor',
      '15-hour battery life'
    ],
    inStock: true,
    rating: 4.8,
    tags: ['ultrabook', 'lightweight', 'premium'],
    colors: ['Silver', 'Space Gray'],
    isFeatured: true
  },
  {
    id: 'laptop-2',
    name: 'Gaming Powerhouse',
    description: 'High-performance gaming laptop with dedicated graphics and RGB keyboard',
    price: 1799.99,
    category: 'laptops',
    image: 'https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    features: [
      '15.6" 240Hz display',
      'Top-tier processor',
      'Dedicated high-end graphics',
      '32GB RAM, 1TB SSD',
      'Advanced cooling system'
    ],
    inStock: true,
    rating: 4.7,
    tags: ['gaming', 'high-performance', 'RGB'],
    colors: ['Black']
  },
  {
    id: 'laptop-3',
    name: 'Content Creator Pro',
    description: 'Designed for creative professionals with color-accurate display',
    price: 1999.99,
    category: 'laptops',
    image: 'https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    features: [
      '16" 4K color-calibrated display',
      'Creative-focused processor',
      'Professional graphics card',
      '32GB RAM, 2TB SSD',
      'SD card reader and multiple ports'
    ],
    inStock: true,
    rating: 4.9,
    tags: ['creative', 'color-accurate', 'professional'],
    colors: ['Silver']
  },

  // Accessories
  {
    id: 'acc-1',
    name: 'Wireless Earbuds Pro',
    description: 'Premium wireless earbuds with active noise cancellation and spatial audio',
    price: 199.99,
    category: 'accessories',
    image: 'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    features: [
      'Active noise cancellation',
      'Spatial audio with head tracking',
      '8-hour battery life (24 with case)',
      'Wireless charging case',
      'Water and sweat resistant'
    ],
    inStock: true,
    rating: 4.8,
    tags: ['earbuds', 'wireless', 'noise cancellation'],
    colors: ['White', 'Black', 'Blue'],
    isFeatured: true
  },
  {
    id: 'acc-2',
    name: 'Ultra Fast Charger',
    description: '100W fast charger with multiple USB-C and USB-A ports',
    price: 79.99,
    category: 'accessories',
    image: 'https://images.pexels.com/photos/4526407/pexels-photo-4526407.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    features: [
      '100W total output',
      '2 USB-C and 2 USB-A ports',
      'Intelligent power distribution',
      'Compact design',
      'Universal compatibility'
    ],
    inStock: true,
    rating: 4.7,
    tags: ['charger', 'fast charging', 'USB-C'],
    colors: ['White', 'Black']
  },
  {
    id: 'acc-3',
    name: 'Premium Laptop Sleeve',
    description: 'Elegant and protective sleeve for laptops up to 15 inches',
    price: 49.99,
    category: 'accessories',
    image: 'https://images.pexels.com/photos/1037999/pexels-photo-1037999.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    features: [
      'Premium vegan leather',
      'Soft microfiber interior',
      'Water-resistant',
      'Additional pocket for accessories',
      'Magnetic closure'
    ],
    inStock: true,
    rating: 4.6,
    tags: ['laptop sleeve', 'protection', 'elegant'],
    colors: ['Black', 'Brown', 'Navy']
  }
];

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.isFeatured);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};