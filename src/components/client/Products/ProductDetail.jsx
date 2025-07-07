import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHeart, FiShoppingCart, FiStar, FiTruck, FiShield, FiRefreshCw, FiChevronLeft, FiChevronRight, FiCheck, FiPackage, FiTag, FiBox, FiCalendar, FiUser, FiMail } from 'react-icons/fi';
import { useTheme } from '../../../context/ThemeContext';
import { useNotification } from '../../../context/NotificationContext';

const API_URL = 'https://dummyjson.com/products';

const ProductDetail = () => {
  const { theme } = useTheme();
  const { showCartNotification, showWishlistNotification } = useNotification();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState(() => JSON.parse(localStorage.getItem('wishlist') || '[]'));
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart') || '[]'));
  const [added, setAdded] = useState(false);
  const [wish, setWish] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
        setWish(wishlist.includes(Number(id)));
      });
  }, [id]);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const handleAddToCart = () => {
    setCart(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + quantity } : item);
      }
      return [...prev, { ...product, qty: quantity }];
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
    showCartNotification(product.title);
  };
  
  const handleWishlist = () => {
    const isCurrentlyWishlisted = wishlist.includes(product.id);
    setWishlist(prev => prev.includes(product.id) ? prev.filter(w => w !== product.id) : [...prev, product.id]);
    setWish(w => !w);
    showWishlistNotification(product.title, !isCurrentlyWishlisted);
  };

  if (loading || !product) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark-bg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className={`mt-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Loading product...</p>
        </div>
      </div>
    );
  }

  const renderReviews = () => (
    <div className="space-y-4">
      {product.reviews && product.reviews.length > 0 ? (
        product.reviews.map((review, index) => (
          <div key={index} className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-dark-border' : 'bg-gray-50'}`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <FiStar key={i} className={`h-4 w-4 ${i < review.rating ? 'fill-current' : ''}`} />
                  ))}
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">({review.rating}/5)</span>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {new Date(review.date).toLocaleDateString()}
              </span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-2">{review.comment}</p>
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <FiUser className="h-3 w-3" />
              <span>{review.reviewerName}</span>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500 dark:text-gray-400 text-center py-8">No reviews yet</p>
      )}
    </div>
  );

  const renderSpecifications = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-dark-border' : 'bg-gray-50'}`}>
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Product Details</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Brand:</span>
              <span className="text-gray-900 dark:text-white">{product.brand}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">SKU:</span>
              <span className="text-gray-900 dark:text-white">{product.sku}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Weight:</span>
              <span className="text-gray-900 dark:text-white">{product.weight}g</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Stock:</span>
              <span className={`font-medium ${product.stock > 10 ? 'text-green-600' : 'text-red-600'}`}>
                {product.stock} units
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Min Order:</span>
              <span className="text-gray-900 dark:text-white">{product.minimumOrderQuantity} units</span>
            </div>
          </div>
        </div>

        <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-dark-border' : 'bg-gray-50'}`}>
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Dimensions</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Width:</span>
              <span className="text-gray-900 dark:text-white">{product.dimensions?.width}cm</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Height:</span>
              <span className="text-gray-900 dark:text-white">{product.dimensions?.height}cm</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Depth:</span>
              <span className="text-gray-900 dark:text-white">{product.dimensions?.depth}cm</span>
            </div>
          </div>
        </div>
      </div>

      {product.tags && product.tags.length > 0 && (
        <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-dark-border' : 'bg-gray-50'}`}>
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Tags</h4>
          <div className="flex flex-wrap gap-2">
            {product.tags.map((tag, index) => (
              <span key={index} className="px-3 py-1 bg-primary text-white text-xs rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }} 
          className="bg-white dark:bg-dark-card rounded-lg shadow-sm border border-gray-200 dark:border-dark-border overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="relative">
                <img src={product.images[selectedImage]} alt={product.title} className="w-full h-96 object-cover rounded-lg" />
                {/* Navigation arrows */}
                <button 
                  onClick={() => setSelectedImage(prev => prev > 0 ? prev - 1 : product.images.length - 1)} 
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors duration-200"
                >
                  <FiChevronLeft className="h-5 w-5" />
                </button>
                <button 
                  onClick={() => setSelectedImage(prev => prev < product.images.length - 1 ? prev + 1 : 0)} 
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors duration-200"
                >
                  <FiChevronRight className="h-5 w-5" />
                </button>
              </div>
              {/* Thumbnail images */}
              <div className="flex space-x-2">
                {product.images.map((image, index) => (
                  <button 
                    key={index} 
                    onClick={() => setSelectedImage(index)} 
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors duration-200 ${selectedImage === index ? 'border-primary' : 'border-gray-200 dark:border-dark-border'}`}
                  >
                    <img src={image} alt={`${product.title} ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-sm text-gray-500 dark:text-gray-400">{product.category}</span>
                  <span className="text-gray-300">•</span>
                  <div className="flex items-center">
                    <FiStar className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 dark:text-gray-300 ml-1">{product.rating}</span>
                  </div>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{product.title}</h1>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">${product.price}</span>
                  {product.discountPercentage > 0 && (
                    <span className="text-lg text-gray-500 line-through">
                      ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                    </span>
                  )}
                  {product.discountPercentage > 0 && (
                    <span className="bg-red-100 text-red-800 text-sm px-2 py-1 rounded-full">
                      Save {Math.round(product.discountPercentage)}%
                    </span>
                  )}
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{product.description}</p>

              {/* Quantity and Actions */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Quantity:</label>
                  <div className="flex items-center border border-gray-300 dark:border-dark-border rounded-md">
                    <button
                      onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-dark-border transition-colors duration-200"
                    >
                      <FiChevronLeft className="h-4 w-4" />
                    </button>
                    <span className="px-4 py-2 text-gray-900 dark:text-white font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(prev => prev + 1)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-dark-border transition-colors duration-200"
                    >
                      <FiChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button 
                    onClick={handleAddToCart} 
                    className="flex-1 btn btn-primary"
                  >
                    {added ? <FiCheck className="h-5 w-5 mr-2" /> : <FiShoppingCart className="h-5 w-5 mr-2" />} 
                    {added ? 'Added' : 'Add to Cart'}
                  </button>
                  <button 
                    onClick={handleWishlist} 
                    className={`p-4 rounded-md border transition-colors duration-200 ${wish ? 'border-red-500 text-red-500' : 'border-gray-300 dark:border-dark-border text-gray-600 dark:text-gray-300 hover:border-red-500 hover:text-red-500'}`}
                  >
                    <FiHeart className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-200 dark:border-dark-border">
                <div className="flex items-center space-x-3">
                  <FiTruck className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Free Shipping</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{product.shippingInformation}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <FiShield className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Warranty</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{product.warrantyInformation}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <FiRefreshCw className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Return Policy</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{product.returnPolicy}</p>
                  </div>
                </div>
              </div>

              {/* Availability Status */}
              <div className={`p-3 rounded-lg ${product.availabilityStatus === 'In Stock' ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'}`}>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${product.availabilityStatus === 'In Stock' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className={`text-sm font-medium ${product.availabilityStatus === 'In Stock' ? 'text-green-800 dark:text-green-400' : 'text-red-800 dark:text-red-400'}`}>
                    {product.availabilityStatus}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-t border-gray-200 dark:border-dark-border">
            <div className="flex border-b border-gray-200 dark:border-dark-border">
              {[
                { id: 'description', label: 'Description', icon: <FiPackage className="h-4 w-4" /> },
                { id: 'specifications', label: 'Specifications', icon: <FiBox className="h-4 w-4" /> },
                { id: 'reviews', label: 'Reviews', icon: <FiStar className="h-4 w-4" /> }
              ].map(tab => (
                <button 
                  key={tab.id} 
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium transition-colors duration-200 border-b-2 ${activeTab === tab.id ? 'border-primary text-primary' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white border-transparent'}`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
            <div className="p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeTab === 'description' && (
                    <div className="space-y-4">
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{product.description}</p>
                      {product.brand && (
                        <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-dark-border' : 'bg-gray-50'}`}>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">About {product.brand}</h4>
                          <p className="text-gray-600 dark:text-gray-300 text-sm">
                            This product is manufactured by {product.brand}, a trusted brand known for quality and reliability.
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                  {activeTab === 'specifications' && renderSpecifications()}
                  {activeTab === 'reviews' && renderReviews()}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetail; 