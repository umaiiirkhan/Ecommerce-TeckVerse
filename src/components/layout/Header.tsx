import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, ShoppingCart, Search } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { categories } from '../../data/categories';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { totalItems } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu on route change
    setMobileMenuOpen(false);
  }, [location]);

  const headerVariants = {
    top: {
      backgroundColor: 'rgba(0, 0, 0, 0)',
      boxShadow: 'none',
    },
    scrolled: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
      backdropFilter: 'blur(10px)',
    },
  };

  return (
    <motion.header
      className="fixed w-full z-50 transition-all duration-300"
      variants={headerVariants}
      animate={isScrolled ? 'scrolled' : 'top'}
    >
      <div className="container-custom py-4 px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-white">
            Tech<span className="text-primary-500">Verse</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
            {categories.map((category) => (
              <NavLink
                key={category.id}
                to={`/category/${category.slug}`}
                className="nav-link"
              >
                {category.name}
              </NavLink>
            ))}
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            
            <Link to="/cart" className="p-2 rounded-full hover:bg-white/10 transition-colors relative">
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="p-2 rounded-full hover:bg-white/10 transition-colors md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-4"
          >
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-full px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </motion.div>
        )}
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-gray-900/95 backdrop-blur-lg"
        >
          <div className="container-custom py-4 px-4 flex flex-col space-y-4">
            <NavLink to="/" className="nav-link py-2 border-b border-white/10">
              Home
            </NavLink>
            {categories.map((category) => (
              <NavLink
                key={category.id}
                to={`/category/${category.slug}`}
                className="nav-link py-2 border-b border-white/10"
              >
                {category.name}
              </NavLink>
            ))}
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Header;