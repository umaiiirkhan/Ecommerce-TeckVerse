import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ThreeScene from '../three/ThreeScene';

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      {/* Background Canvas */}
      <div className="absolute inset-0 z-0">
        <ThreeScene />
      </div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80 z-10"></div>
      
      {/* Content */}
      <div className="container-custom relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
              Discover the Future of <span className="text-primary-500">Technology</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-xl">
              Explore our premium collection of gadgets, watches, phones, laptops, and accessories with an immersive 3D shopping experience.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/category/gadgets" 
                className="btn btn-primary"
              >
                Shop Now <ArrowRight className="ml-2" size={20} />
              </Link>
              <Link 
                to="#featured" 
                className="btn btn-outline"
              >
                Featured Products
              </Link>
            </div>
          </motion.div>
          
          {/* 3D Product Showcase would typically go here, but it's handled by ThreeScene */}
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.8, 
          delay: 1.2,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 0.2
        }}
      >
        <div className="flex flex-col items-center">
          <span className="text-gray-400 text-sm mb-2">Scroll Down</span>
          <div className="w-5 h-10 rounded-full border-2 border-gray-400 flex justify-center items-start p-1">
            <motion.div 
              className="w-1.5 h-1.5 bg-white rounded-full"
              animate={{ y: [0, 14, 0] }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                repeatType: "loop",
              }}
            ></motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;