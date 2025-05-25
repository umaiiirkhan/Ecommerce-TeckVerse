import { Helmet } from 'react-helmet-async';
import Hero from '../components/home/Hero';
import FeaturedProducts from '../components/home/FeaturedProducts';
import Categories from '../components/home/Categories';
import Newsletter from '../components/home/Newsletter';

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>TechVerse - Premium Tech Store</title>
        <meta name="description" content="Discover the latest gadgets, smart watches, phones, laptops, and accessories with immersive 3D shopping experience." />
      </Helmet>
      
      <Hero />
      <FeaturedProducts />
      <Categories />
      <Newsletter />
    </>
  );
};

export default HomePage;