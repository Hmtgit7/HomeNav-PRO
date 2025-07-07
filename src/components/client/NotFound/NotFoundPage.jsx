import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiHome, FiArrowLeft, FiSearch } from 'react-icons/fi';
import { useTheme } from '../../../context/ThemeContext';

const NotFoundPage = () => {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg flex items-center justify-center px-4">
      <div className="max-w-md mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* 404 Number */}
          <div className="relative mb-8">
            <h1 className="text-9xl font-bold text-gray-200 dark:text-gray-700">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <FiSearch className="h-16 w-16 text-primary" />
            </div>
          </div>

          {/* Content */}
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="btn btn-primary flex items-center justify-center"
            >
              <FiHome className="h-5 w-5 mr-2" />
              Go Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="btn btn-outline flex items-center justify-center"
            >
              <FiArrowLeft className="h-5 w-5 mr-2" />
              Go Back
            </button>
          </div>

          {/* Additional Help */}
          <div className="mt-12 p-6 bg-white dark:bg-dark-card rounded-lg shadow-sm border border-gray-200 dark:border-dark-border">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Need Help?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Try these popular pages:
            </p>
            <div className="space-y-2">
              <Link
                to="/products"
                className="block text-primary hover:text-primary-dark dark:text-primary-light transition-colors duration-200"
              >
                Browse Products
              </Link>
              <Link
                to="/about"
                className="block text-primary hover:text-primary-dark dark:text-primary-light transition-colors duration-200"
              >
                About Us
              </Link>
              <Link
                to="/contact"
                className="block text-primary hover:text-primary-dark dark:text-primary-light transition-colors duration-200"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFoundPage; 