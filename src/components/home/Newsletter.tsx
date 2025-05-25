import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send } from 'lucide-react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup (would connect to a backend)
    setIsSubmitted(true);
  };

  return (
    <section 
      ref={sectionRef}
      className="py-20 bg-gray-900"
    >
      <div className="container-custom">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Updated with TechVerse</h2>
          <p className="text-gray-400 mb-8">
            Subscribe to our newsletter for the latest product releases, tech news, and exclusive offers.
          </p>
          
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-grow px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button
                type="submit"
                className="btn btn-primary whitespace-nowrap"
              >
                Subscribe <Send size={18} className="ml-2" />
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-primary-500/20 border border-primary-500/30 text-white p-4 rounded-lg max-w-lg mx-auto"
            >
              <p className="font-medium">Thank you for subscribing!</p>
              <p className="text-sm text-gray-300 mt-1">We've sent a confirmation email to your inbox.</p>
            </motion.div>
          )}
          
          <p className="text-gray-500 text-sm mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;