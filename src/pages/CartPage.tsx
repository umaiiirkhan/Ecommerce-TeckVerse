import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Trash2, ArrowLeft, CreditCard } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, totalItems, totalPrice } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would process the payment here
    alert('Thank you for your order! This is a demo, so no actual payment will be processed.');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <>
      <Helmet>
        <title>Your Cart - TechVerse</title>
        <meta name="description" content="View and manage your shopping cart" />
      </Helmet>
      
      <section className="py-24 bg-gray-950">
        <div className="container-custom">
          <div className="mb-8">
            <Link to="/" className="flex items-center text-gray-400 hover:text-primary-500 transition-colors">
              <ArrowLeft size={16} className="mr-2" />
              Continue Shopping
            </Link>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-8 flex items-center">
            <ShoppingCart size={30} className="mr-3" />
            Your Cart {totalItems > 0 && `(${totalItems} ${totalItems === 1 ? 'item' : 'items'})`}
          </h1>
          
          {cartItems.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <motion.div 
                className="lg:col-span-2"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    variants={itemVariants}
                    className="flex flex-col sm:flex-row items-start sm:items-center bg-gray-900 rounded-xl p-4 mb-4"
                  >
                    <Link to={`/product/${item.id}`} className="flex-shrink-0 mb-4 sm:mb-0">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full sm:w-24 h-24 object-cover rounded-lg"
                      />
                    </Link>
                    
                    <div className="sm:ml-6 flex-grow">
                      <div className="flex flex-col sm:flex-row sm:justify-between">
                        <Link to={`/product/${item.id}`} className="text-lg font-semibold hover:text-primary-500 transition-colors">
                          {item.name}
                        </Link>
                        <span className="text-lg font-bold mt-2 sm:mt-0">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                      
                      <p className="text-gray-400 text-sm mt-1 mb-4">
                        {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                      </p>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center border border-gray-700 rounded-full">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center focus:outline-none"
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center focus:outline-none"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                        
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors flex items-center"
                          aria-label={`Remove ${item.name} from cart`}
                        >
                          <Trash2 size={18} className="mr-1" />
                          <span className="hidden sm:inline">Remove</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
              
              {/* Order Summary */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="bg-gray-900 rounded-xl p-6 sticky top-24">
                  <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Subtotal</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Shipping</span>
                      <span>{totalPrice > 100 ? 'Free' : '$10.00'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Tax</span>
                      <span>${(totalPrice * 0.08).toFixed(2)}</span>
                    </div>
                    <div className="border-t border-gray-800 pt-4 flex justify-between">
                      <span className="font-semibold">Total</span>
                      <span className="font-bold text-xl">
                        ${(totalPrice + (totalPrice > 100 ? 0 : 10) + totalPrice * 0.08).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setIsCheckingOut(true)}
                    className="w-full py-3 rounded-full font-medium transition-all duration-300 flex items-center justify-center bg-primary-600 hover:bg-primary-700 text-white"
                  >
                    <CreditCard size={20} className="mr-2" />
                    Proceed to Checkout
                  </button>
                </div>
              </motion.div>
            </div>
          ) : (
            <div className="text-center py-16 bg-gray-900 rounded-xl">
              <div className="mb-6 flex justify-center">
                <ShoppingCart size={60} className="text-gray-600" />
              </div>
              <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
              <p className="text-gray-400 mb-8 max-w-md mx-auto">
                Looks like you haven't added any products to your cart yet.
              </p>
              <Link to="/" className="btn btn-primary">
                Start Shopping
              </Link>
            </div>
          )}
        </div>
      </section>
      
      {/* Checkout Modal */}
      {isCheckingOut && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <motion.div 
            className="bg-gray-900 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Checkout</h2>
                <button 
                  onClick={() => setIsCheckingOut(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>
              
              <form onSubmit={handleCheckout}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={customerInfo.name}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={customerInfo.email}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-400 mb-1">Address</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={customerInfo.address}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-400 mb-1">City</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={customerInfo.city}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="postalCode" className="block text-sm font-medium text-gray-400 mb-1">Postal Code</label>
                    <input
                      type="text"
                      id="postalCode"
                      name="postalCode"
                      value={customerInfo.postalCode}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="country" className="block text-sm font-medium text-gray-400 mb-1">Country</label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      value={customerInfo.country}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
                    />
                  </div>
                </div>
                
                <div className="border-t border-gray-800 pt-6 mb-6">
                  <h3 className="text-lg font-semibold mb-4">Payment Details</h3>
                  
                  <div className="mb-4">
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-400 mb-1">Card Number</label>
                    <input
                      type="text"
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="expiry" className="block text-sm font-medium text-gray-400 mb-1">Expiry Date</label>
                      <input
                        type="text"
                        id="expiry"
                        placeholder="MM/YY"
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label htmlFor="cvc" className="block text-sm font-medium text-gray-400 mb-1">CVC</label>
                      <input
                        type="text"
                        id="cvc"
                        placeholder="123"
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-800 pt-6 mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400">Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400">Shipping</span>
                    <span>{totalPrice > 100 ? 'Free' : '$10.00'}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400">Tax</span>
                    <span>${(totalPrice * 0.08).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-800">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold text-xl">
                      ${(totalPrice + (totalPrice > 100 ? 0 : 10) + totalPrice * 0.08).toFixed(2)}
                    </span>
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="w-full py-3 rounded-full font-medium transition-all duration-300 flex items-center justify-center bg-primary-600 hover:bg-primary-700 text-white"
                >
                  Complete Purchase
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default CartPage;