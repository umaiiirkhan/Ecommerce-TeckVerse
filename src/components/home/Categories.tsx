import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { categories } from '../../data/categories';

const Categories = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

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
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section ref={sectionRef} className="section bg-black py-20">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Shop By Category</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore our comprehensive range of tech products across different categories
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {categories.map((category) => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              className="relative group overflow-hidden rounded-2xl h-80"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${category.backgroundImage})` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
              
              <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
                <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                <p className="text-gray-300 mb-4">{category.description}</p>
                <Link 
                  to={`/category/${category.slug}`}
                  className={`inline-block py-2 px-6 rounded-full bg-${category.slug}-500 text-white hover:bg-opacity-90 transition-colors w-fit`}
                  style={{ backgroundColor: category.themeColor }}
                >
                  Shop Now
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Categories;