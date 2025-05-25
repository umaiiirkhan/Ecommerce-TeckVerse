import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ShoppingCart, ArrowLeft, Heart, Share2, Check } from 'lucide-react';
import { getProductById, getProductsByCategory } from '../data/products';
import { useCart } from '../context/CartContext';
import { Product } from '../types';
import ProductThreeView from '../components/three/ProductThreeView';

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    if (id) {
      const productData = getProductById(id);
      if (productData) {
        setProduct(productData);
        setSelectedColor(productData.colors?.[0] || null);
        
        // Get related products from same category
        const related = getProductsByCategory(productData.category)
          .filter(p => p.id !== productData.id)
          .slice(0, 4);
        setRelatedProducts(related);
      }
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    }
  };

  if (!product) {
    return <div className="container-custom py-20">Loading...</div>;
  }

  return (
    <>
      <Helmet>
        <title>{product.name} - TechVerse</title>
        <meta name="description" content={product.description} />
      </Helmet>
      
      <section className="py-24 bg-gray-950">
        <div className="container-custom">
          <div className="mb-8">
            <Link to={`/category/${product.category}`} className="flex items-center text-gray-400 hover:text-primary-500 transition-colors">
              <ArrowLeft size={16} className="mr-2" />
              Back to {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image & 3D View */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gray-900 rounded-2xl overflow-hidden"
            >
              <div className="relative aspect-square">
                {/* 3D View would go here - simplified for this example */}
                <ProductThreeView category={product.category} />
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover z-10 opacity-90"
                />
              </div>
            </motion.div>
            
            {/* Product Details */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium text-white bg-${product.category}-500 mb-4`}>
                {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
              </span>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>
              
              <div className="flex items-center mb-6">
                <div className="flex mr-2">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-600'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-gray-400">({product.rating} rating)</span>
              </div>
              
              <p className="text-gray-300 mb-8 text-lg">{product.description}</p>
              
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-3">Key Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check size={18} className={`text-${product.category}-500 mr-2 flex-shrink-0 mt-1`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-3">Color</h3>
                  <div className="flex space-x-3">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`w-10 h-10 rounded-full border-2 ${
                          selectedColor === color ? 'border-primary-500' : 'border-transparent'
                        } overflow-hidden`}
                        style={{ backgroundColor: color.toLowerCase() }}
                        aria-label={`Select ${color} color`}
                      ></button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Price & Add to Cart */}
              <div className="mb-8">
                <div className="flex items-baseline mb-4">
                  <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
                  {product.price > 100 && (
                    <span className="ml-2 text-sm text-gray-400">
                      or ${(product.price / 12).toFixed(2)}/month with financing
                    </span>
                  )}
                </div>
                
                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex items-center border border-gray-700 rounded-full">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 flex items-center justify-center text-xl focus:outline-none"
                    >
                      −
                    </button>
                    <span className="w-10 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 flex items-center justify-center text-xl focus:outline-none"
                    >
                      +
                    </button>
                  </div>
                  
                  <motion.button
                    onClick={handleAddToCart}
                    className="flex-grow py-3 rounded-full font-medium transition-all duration-300 flex items-center justify-center bg-primary-600 hover:bg-primary-700 text-white"
                    whileTap={{ scale: 0.95 }}
                    disabled={addedToCart}
                  >
                    {addedToCart ? (
                      <>
                        <Check size={20} className="mr-2" />
                        Added to Cart
                      </>
                    ) : (
                      <>
                        <ShoppingCart size={20} className="mr-2" />
                        Add to Cart
                      </>
                    )}
                  </motion.button>
                </div>
                
                <div className="flex space-x-4">
                  <button className="flex items-center text-gray-400 hover:text-primary-500 transition-colors">
                    <Heart size={18} className="mr-2" />
                    Add to Wishlist
                  </button>
                  <button className="flex items-center text-gray-400 hover:text-primary-500 transition-colors">
                    <Share2 size={18} className="mr-2" />
                    Share
                  </button>
                </div>
              </div>
              
              {/* Tags */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-20">
              <h2 className="text-2xl font-bold mb-8">You Might Also Like</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <motion.div
                    key={relatedProduct.id}
                    className="product-card group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Link to={`/product/${relatedProduct.id}`} className="block">
                      <div className="relative overflow-hidden">
                        <img
                          src={relatedProduct.image}
                          alt={relatedProduct.name}
                          className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold mb-1">{relatedProduct.name}</h3>
                        <div className="flex justify-between items-center">
                          <span className="font-bold">${relatedProduct.price.toFixed(2)}</span>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              addToCart(relatedProduct);
                            }}
                            className="p-2 rounded-full bg-primary-500/20 hover:bg-primary-500 text-white transition-colors"
                            aria-label={`Add ${relatedProduct.name} to cart`}
                          >
                            <ShoppingCart size={16} />
                          </button>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default ProductPage;