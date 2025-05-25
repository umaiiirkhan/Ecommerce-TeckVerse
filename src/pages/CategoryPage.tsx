import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { getProductsByCategory } from '../data/products';
import { categories } from '../data/categories';
import { useTheme } from '../context/ThemeContext';
import { Product } from '../types';
import { Link } from 'react-router-dom';
import { ShoppingCart, Eye, Filter } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const { setTheme } = useTheme();
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categoryInfo, setCategoryInfo] = useState<any>(null);
  const [sortOption, setSortOption] = useState('featured');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (category) {
      // Find category info
      const catInfo = categories.find(cat => cat.slug === category);
      setCategoryInfo(catInfo);
      
      // Set theme based on category
      setTheme(category as any);
      
      // Get products
      const categoryProducts = getProductsByCategory(category);
      setProducts(categoryProducts);
      setFilteredProducts(categoryProducts);
    }
  }, [category, setTheme]);

  useEffect(() => {
    if (products.length > 0) {
      let result = [...products];
      
      // Apply price filter
      result = result.filter(product => 
        product.price >= priceRange[0] && product.price <= priceRange[1]
      );
      
      // Apply sorting
      switch (sortOption) {
        case 'price-low-high':
          result.sort((a, b) => a.price - b.price);
          break;
        case 'price-high-low':
          result.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          result.sort((a, b) => b.rating - a.rating);
          break;
        // 'featured' is default, no sorting needed
        default:
          break;
      }
      
      setFilteredProducts(result);
    }
  }, [products, sortOption, priceRange]);

  if (!categoryInfo) {
    return <div className="container-custom py-20">Loading...</div>;
  }

  return (
    <>
      <Helmet>
        <title>{categoryInfo.name} - TechVerse</title>
        <meta name="description" content={categoryInfo.description} />
      </Helmet>
      
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${categoryInfo.backgroundImage})` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
        
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {categoryInfo.name}
            </h1>
            <p className="text-xl text-gray-300 max-w-xl mb-8">
              {categoryInfo.description}
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Products Section */}
      <section className="py-16 bg-gray-950">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters - Mobile Toggle */}
            <div className="lg:hidden mb-4">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="w-full flex items-center justify-between p-4 bg-gray-900 rounded-lg"
              >
                <span className="flex items-center">
                  <Filter size={20} className="mr-2" />
                  Filters & Sorting
                </span>
                <span>{showFilters ? '−' : '+'}</span>
              </button>
            </div>
            
            {/* Filters - Sidebar */}
            <motion.div 
              className={`lg:w-1/4 ${showFilters ? 'block' : 'hidden'} lg:block`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-gray-900 rounded-lg p-6 sticky top-24">
                <h3 className="text-xl font-semibold mb-6">Filters</h3>
                
                {/* Sort Options */}
                <div className="mb-8">
                  <h4 className="text-lg font-medium mb-4">Sort By</h4>
                  <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low-high">Price: Low to High</option>
                    <option value="price-high-low">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>
                
                {/* Price Range */}
                <div className="mb-8">
                  <h4 className="text-lg font-medium mb-4">Price Range</h4>
                  <div className="flex items-center justify-between mb-2">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="2000"
                    step="50"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full accent-primary-500"
                  />
                </div>
              </div>
            </motion.div>
            
            {/* Products Grid */}
            <motion.div 
              className="lg:w-3/4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="mb-6 flex justify-between items-center">
                <h2 className="text-2xl font-bold">
                  {filteredProducts.length} Products
                </h2>
              </div>
              
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      className="product-card group"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                          <div className="flex space-x-2 mb-4">
                            <button
                              onClick={() => addToCart(product)}
                              className="p-3 bg-primary-500 rounded-full text-white hover:bg-primary-600 transition-colors"
                              aria-label={`Add ${product.name} to cart`}
                            >
                              <ShoppingCart size={18} />
                            </button>
                            <Link
                              to={`/product/${product.id}`}
                              className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                              aria-label={`View ${product.name} details`}
                            >
                              <Eye size={18} />
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
                        <p className="text-gray-400 text-sm mb-2">{product.description.substring(0, 60)}...</p>
                        <div className="flex justify-between items-center mt-4">
                          <span className="text-xl font-bold text-white">${product.price.toFixed(2)}</span>
                          <div className="flex items-center">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <svg
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-600'
                                  }`}
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                            <span className="text-xs text-gray-400 ml-1">({product.rating})</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-900 rounded-lg">
                  <p className="text-xl">No products found matching your criteria.</p>
                  <button 
                    onClick={() => setPriceRange([0, 2000])}
                    className="mt-4 btn btn-outline"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CategoryPage;