import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

/**
 * CategoryCard component for displaying category items
 * @param {Object} category - Category object with image, title, description, and link
 */
const CategoryCard = ({ category }) => {
  const { theme } = useTheme();
  
  return (
    <motion.div
      whileHover={{ y: -10, transition: { type: 'spring', stiffness: 300 } }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className={`group overflow-hidden rounded-lg shadow-md ${
        theme === 'dark' ? 'bg-dark-card border border-dark-border' : 'bg-white border border-gray-100'
      }`}
    >
      <div className="relative overflow-hidden h-60">
        <motion.img
          src={category.image}
          alt={category.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
        <div className="absolute bottom-0 left-0 p-4 w-full">
          <h3 className="text-xl font-bold text-white mb-1">{category.title}</h3>
        </div>
      </div>
      <div className={`p-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
        <p className="mb-4 text-sm">{category.description}</p>
        <Link to={category.link}>
          <motion.div
            whileHover={{ x: 5 }}
            className={`inline-flex items-center font-medium ${
              theme === 'dark' ? 'text-primary-light' : 'text-primary'
            }`}
          >
            Shop now
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </motion.div>
        </Link>
      </div>
    </motion.div>
  );
};

export default CategoryCard;