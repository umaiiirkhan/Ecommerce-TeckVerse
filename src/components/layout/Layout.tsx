import { Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';
import AudioPlayer from '../common/AudioPlayer';
import SEO from '../common/SEO';
import { useTheme } from '../../context/ThemeContext';
import { useEffect } from 'react';
import { categories } from '../../data/categories';

const Layout = () => {
  const location = useLocation();
  const { setTheme } = useTheme();

  useEffect(() => {
    // Set theme based on route
    const path = location.pathname;
    
    if (path.includes('/category/')) {
      const categorySlug = path.split('/category/')[1];
      const category = categories.find(cat => cat.slug === categorySlug);
      if (category) {
        setTheme(category.slug);
      }
    } else if (path.includes('/product/')) {
      // Could set theme based on product category if needed
    } else {
      setTheme('default');
    }
  }, [location, setTheme]);

  return (
    <>
      <SEO />
      <div className="min-h-screen flex flex-col bg-black text-white">
        <Header />
        <motion.main 
          className="flex-grow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Outlet />
        </motion.main>
        <Footer />
      </div>
      <AudioPlayer />
    </>
  );
};

export default Layout;