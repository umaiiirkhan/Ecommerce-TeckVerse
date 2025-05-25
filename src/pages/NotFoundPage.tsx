import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found - TechVerse</title>
        <meta name="description" content="The page you are looking for does not exist." />
      </Helmet>
      
      <div className="min-h-[70vh] flex items-center justify-center bg-gray-950 py-20">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-9xl font-bold text-primary-500 mb-4">404</h1>
            <h2 className="text-3xl font-bold mb-6">Page Not Found</h2>
            <p className="text-gray-400 max-w-md mx-auto mb-8">
              The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <Link to="/" className="btn btn-primary inline-flex items-center">
              <Home size={18} className="mr-2" />
              Back to Home
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;