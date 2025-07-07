import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingCart, FiTrash2, FiArrowLeft, FiEye } from 'react-icons/fi';
import { useTheme } from '../../../context/ThemeContext';
import { useNotification } from '../../../context/NotificationContext';

const WishlistPage = () => {
  const { theme } = useTheme();
  const { showCartNotification, showWishlistNotification } = useNotification();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart') || '[]'));
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);

  // Load wishlist from localStorage
  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setWishlist(savedWishlist);
    setLoading(false);
  }, []);

  // Persist cart to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Fetch wishlist products from DummyJSON
  const [wishlistProducts, setWishlistProducts] = useState([]);

  useEffect(() => {
    const fetchWishlistProducts = async () => {
      if (wishlist.length === 0) {
        setWishlistProducts([]);
        return;
      }

      try {
        const products = [];
        for (const productId of wishlist) {
          const response = await fetch(`https://dummyjson.com/products/${productId}`);
          if (response.ok) {
            const product = await response.json();
            products.push(product);
          }
        }
        setWishlistProducts(products);
      } catch (error) {
        console.error('Error fetching wishlist products:', error);
      }
    };

    fetchWishlistProducts();
  }, [wishlist]);

  const removeFromWishlist = (productId) => {
    const product = wishlistProducts.find(p => p.id === productId);
    const newWishlist = wishlist.filter(id => id !== productId);
    setWishlist(newWishlist);
    localStorage.setItem('wishlist', JSON.stringify(newWishlist));
    
    if (product) {
      showWishlistNotification(product.title, false);
    }
  };

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(prev => prev.map(item => 
        item.id === product.id 
          ? { ...item, qty: item.qty + 1 }
          : item
      ));
    } else {
      setCart(prev => [...prev, { ...product, qty: 1 }]);
    }
    showCartNotification(product.title);
  };

  const isInCart = (productId) => {
    return cart.some(item => item.id === productId);
  };

  // Pagination functions
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = wishlistProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(wishlistProducts.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark-bg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className={`mt-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Loading wishlist...</p>
        </div>
      </div>
    );
  }

  if (wishlistProducts.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="mb-8">
              <div className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center ${
                theme === 'dark' ? 'bg-dark-border' : 'bg-gray-100'
              }`}>
                <FiHeart className="h-12 w-12 text-red-500" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Your Wishlist is Empty
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Start adding products to your wishlist to see them here.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/products"
                className="btn btn-primary"
              >
                Start Shopping
              </Link>
              <Link
                to="/"
                className="btn btn-outline"
              >
                Continue Browsing
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              My Wishlist
            </h1>
            <Link
              to="/products"
              className="flex items-center text-primary hover:text-primary-dark dark:text-primary-light transition-colors duration-200"
            >
              <FiArrowLeft className="h-4 w-4 mr-2" />
              Continue Shopping
            </Link>
          </div>
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 mt-2">
            <p className="text-gray-600 dark:text-gray-300">
              Showing {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, wishlistProducts.length)} of {wishlistProducts.length} item{wishlistProducts.length !== 1 ? 's' : ''} in your wishlist
            </p>
            {totalPages > 1 && (
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Page {currentPage} of {totalPages}
              </span>
            )}
          </div>
        </motion.div>

        {/* Wishlist Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {currentProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`group relative rounded-lg overflow-hidden ${theme === 'dark' ? 'bg-dark-card border border-dark-border' : 'bg-white border border-gray-100 shadow-md'}`}
              >
                {/* Product Image */}
                <div className="relative overflow-hidden h-64">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Quick action buttons */}
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 bg-white rounded-full text-gray-800 hover:text-primary"
                      onClick={() => addToCart(product)}
                      disabled={isInCart(product.id)}
                    >
                      <FiShoppingCart className="w-5 h-5" />
                    </motion.button>
                    <Link to={`/products/${product.id}`}>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 bg-white rounded-full text-gray-800 hover:text-primary"
                      >
                        <FiEye className="w-5 h-5" />
                      </motion.button>
                    </Link>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 bg-white rounded-full text-red-500 hover:text-red-600"
                      onClick={() => removeFromWishlist(product.id)}
                    >
                      <FiTrash2 className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                    {product.category}
                  </div>
                  <h3 className={`font-semibold mb-2 line-clamp-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {product.title}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`}
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className={`ml-1 text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      ({product.rating})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-lg font-bold text-primary">${product.price}</span>
                      {product.discountPercentage > 0 && (
                        <span className="ml-2 text-sm line-through text-gray-500">
                          ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => addToCart(product)}
                      disabled={isInCart(product.id)}
                      className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${
                        isInCart(product.id)
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-primary text-white hover:bg-primary-dark'
                      }`}
                    >
                      {isInCart(product.id) ? 'In Cart' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-8">
            <nav className="flex items-center space-x-1">
              {/* Previous Button */}
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  currentPage === 1
                    ? 'text-gray-400 dark:text-gray-500 cursor-not-allowed'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-border'
                }`}
              >
                Previous
              </button>

              {/* Page Numbers */}
              <div className="flex items-center space-x-1">
                {Array.from({ length: totalPages }, (_, index) => {
                  const pageNumber = index + 1;
                  const isCurrentPage = pageNumber === currentPage;
                  const isNearCurrent = Math.abs(pageNumber - currentPage) <= 2;
                  const isFirstOrLast = pageNumber === 1 || pageNumber === totalPages;
                  
                  if (isCurrentPage || isNearCurrent || isFirstOrLast) {
                    return (
                      <button
                        key={pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                        className={`px-3 py-2 text-sm font-medium rounded-md ${
                          isCurrentPage
                            ? 'bg-primary text-white'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-border'
                        }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  } else if (pageNumber === currentPage - 3 || pageNumber === currentPage + 3) {
                    return (
                      <span key={pageNumber} className="px-2 py-2 text-gray-500 dark:text-gray-400">
                        ...
                      </span>
                    );
                  }
                  return null;
                })}
              </div>

              {/* Next Button */}
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  currentPage === totalPages
                    ? 'text-gray-400 dark:text-gray-500 cursor-not-allowed'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-border'
                }`}
              >
                Next
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage; 