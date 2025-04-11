import React from 'react';
import { motion } from 'framer-motion';
import { FiTruck, FiCreditCard, FiRefreshCw, FiHeadphones } from 'react-icons/fi';
import { useTheme } from '../../../context/ThemeContext';

/**
 * Feature Section component for homepage
 * Highlights key store features and benefits
 */
const FeatureSection = () => {
  const { theme } = useTheme();

  // Features data
  const features = [
    {
      icon: <FiTruck className="w-8 h-8" />,
      title: 'Free Shipping',
      description: 'Free shipping on all orders over $50'
    },
    {
      icon: <FiCreditCard className="w-8 h-8" />,
      title: 'Secure Payments',
      description: 'All transactions are 100% secure'
    },
    {
      icon: <FiRefreshCw className="w-8 h-8" />,
      title: 'Easy Returns',
      description: '30-day money back guarantee'
    },
    {
      icon: <FiHeadphones className="w-8 h-8" />,
      title: '24/7 Support',
      description: 'Customer service available anytime'
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className={`py-16 ${theme === 'dark' ? 'bg-dark-bg' : 'bg-white'}`}>
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10, transition: { type: 'spring', stiffness: 300 } }}
              className={`p-6 rounded-lg text-center ${theme === 'dark'
                ? 'bg-dark-card border border-dark-border'
                : 'bg-white border border-gray-100 shadow-md'
                }`}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-primary bg-opacity-10 text-primary">
                {feature.icon}
              </div>
              <h3 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {feature.title}
              </h3>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureSection;