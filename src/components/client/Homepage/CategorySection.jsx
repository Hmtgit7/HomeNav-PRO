import React from 'react';
import { motion } from 'framer-motion';
import CategoryCard from '../../shared/CategoryCard';
import { useTheme } from '../../../context/ThemeContext';

/**
 * Category Section component for homepage
 * Displays featured product categories
 */
const CategorySection = () => {
  const { theme } = useTheme();
  
  // Mock data for categories
  const categories = [
    {
      id: 1,
      title: 'Clothing',
      description: 'Shop our latest styles in men\'s and women\'s clothing for all occasions.',
      image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      link: '/categories/clothing'
    },
    {
      id: 2,
      title: 'Accessories',
      description: 'Complete your look with our wide selection of accessories.',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      link: '/categories/accessories'
    },
    {
      id: 3,
      title: 'Home Decor',
      description: 'Transform your space with stylish and modern home decor items.',
      image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      link: '/categories/home-decor'
    },
    {
      id: 4,
      title: 'Electronics',
      description: 'Discover the latest tech gadgets and electronics for your lifestyle.',
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      link: '/categories/electronics'
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

  return (
    <section className={`py-16 ${theme === 'dark' ? 'bg-dark-bg' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Featured Categories
          </h2>
          <p className={`max-w-2xl mx-auto ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Browse our handpicked categories featuring the best products for every need.
          </p>
        </motion.div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CategorySection;