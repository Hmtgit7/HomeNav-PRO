import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHeart, FiShoppingCart, FiStar, FiTruck, FiShield, FiRefreshCw, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useTheme } from '../../../context/ThemeContext';

// Mock product data
const mockProduct = {
  id: 1,
  name: "Premium Wireless Bluetooth Headphones",
  price: 89.99,
  originalPrice: 129.99,
  rating: 4.8,
  reviews: 256,
  description: "Experience crystal-clear sound with our premium wireless headphones. Featuring advanced noise cancellation technology, these headphones deliver immersive audio quality for music, calls, and gaming. With up to 30 hours of battery life and quick charging capability, you can enjoy your favorite content all day long.",
  features: [
    "Active Noise Cancellation",
    "30-hour battery life",
    "Quick charging (10 min = 5 hours)",
    "Bluetooth 5.0",
    "Built-in microphone",
    "Foldable design",
    "Compatible with all devices"
  ],
  images: [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=600&h=600&fit=crop"
  ],
  colors: [
    { name: "Black", hex: "#000000", available: true },
    { name: "White", hex: "#FFFFFF", available: true },
    { name: "Blue", hex: "#3B82F6", available: true },
    { name: "Red", hex: "#EF4444", available: false }
  ],
  sizes: [
    { name: "One Size", available: true }
  ],
  stock: 15,
  category: "Electronics",
  tags: ["Wireless", "Bluetooth", "Noise Cancelling", "Premium"]
};

const ProductDetail = () => {
  const { theme } = useTheme();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(mockProduct.colors[0]);
  const [selectedSize, setSelectedSize] = useState(mockProduct.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  
  // Get productId from URL params
  const productId = window.location.pathname.split('/').pop();

  const handleAddToCart = () => {
    // Add to cart logic here
    console.log('Added to cart:', {
      product: mockProduct,
      color: selectedColor,
      size: selectedSize,
      quantity
    });
  };

  const reviews = [
    {
      id: 1,
      user: "Sarah M.",
      rating: 5,
      date: "2024-01-15",
      comment: "Amazing sound quality! The noise cancellation is incredible and the battery life is exactly as advertised. Highly recommend!"
    },
    {
      id: 2,
      user: "Mike R.",
      rating: 4,
      date: "2024-01-10",
      comment: "Great headphones overall. The sound is crisp and clear. Only giving 4 stars because the ear cushions could be a bit softer."
    },
    {
      id: 3,
      user: "Jennifer L.",
      rating: 5,
      date: "2024-01-08",
      comment: "Perfect for my daily commute. The wireless connection is stable and the build quality is excellent. Worth every penny!"
    }
  ];

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
                <img
                  src={mockProduct.images[selectedImage]}
                  alt={mockProduct.name}
                  className="w-full h-96 object-cover rounded-lg"
                />
                
                {/* Navigation arrows */}
                <button
                  onClick={() => setSelectedImage(prev => prev > 0 ? prev - 1 : mockProduct.images.length - 1)}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors duration-200"
                >
                  <FiChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setSelectedImage(prev => prev < mockProduct.images.length - 1 ? prev + 1 : 0)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors duration-200"
                >
                  <FiChevronRight className="h-5 w-5" />
                </button>
              </div>
              
              {/* Thumbnail images */}
              <div className="flex space-x-2">
                {mockProduct.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors duration-200 ${
                      selectedImage === index 
                        ? 'border-primary' 
                        : 'border-gray-200 dark:border-dark-border'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${mockProduct.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Header */}
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {mockProduct.category}
                  </span>
                  <span className="text-gray-300">•</span>
                  <div className="flex items-center">
                    <FiStar className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 dark:text-gray-300 ml-1">
                      {mockProduct.rating} ({mockProduct.reviews} reviews)
                    </span>
                  </div>
                </div>
                
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {mockProduct.name}
                </h1>
                
                <div className="flex items-center space-x-3">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    ${mockProduct.price}
                  </span>
                  <span className="text-lg text-gray-500 line-through">
                    ${mockProduct.originalPrice}
                  </span>
                  <span className="bg-red-100 text-red-800 text-sm px-2 py-1 rounded-full">
                    Save ${(mockProduct.originalPrice - mockProduct.price).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {mockProduct.description}
              </p>

              {/* Color Selection */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Color: {selectedColor.name}
                </h3>
                <div className="flex space-x-2">
                  {mockProduct.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      disabled={!color.available}
                      className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                        selectedColor.name === color.name
                          ? 'border-gray-900 dark:border-white scale-110'
                          : 'border-gray-300 dark:border-gray-600'
                      } ${!color.available ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Size: {selectedSize.name}
                </h3>
                <div className="flex space-x-2">
                  {mockProduct.sizes.map((size) => (
                    <button
                      key={size.name}
                      onClick={() => setSelectedSize(size)}
                      disabled={!size.available}
                      className={`px-4 py-2 rounded-md border transition-colors duration-200 ${
                        selectedSize.name === size.name
                          ? 'border-primary bg-primary text-white'
                          : 'border-gray-300 dark:border-dark-border text-gray-700 dark:text-gray-300 hover:border-primary'
                      } ${!size.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {size.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Quantity
                </h3>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    className="p-2 rounded-md border border-gray-300 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-border"
                  >
                    -
                  </button>
                  <span className="w-16 text-center font-medium text-gray-900 dark:text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(prev => prev + 1)}
                    className="p-2 rounded-md border border-gray-300 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-border"
                  >
                    +
                  </button>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {mockProduct.stock} in stock
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 btn btn-primary"
                >
                  <FiShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </button>
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`p-4 rounded-md border transition-colors duration-200 ${
                    isWishlisted
                      ? 'border-red-500 text-red-500'
                      : 'border-gray-300 dark:border-dark-border text-gray-600 dark:text-gray-300 hover:border-red-500 hover:text-red-500'
                  }`}
                >
                  <FiHeart className="h-5 w-5" />
                </button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-200 dark:border-dark-border">
                <div className="flex items-center space-x-3">
                  <FiTruck className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Free Shipping</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">On orders over $50</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <FiShield className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">2 Year Warranty</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Full coverage</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <FiRefreshCw className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">30 Day Returns</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">No questions asked</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-t border-gray-200 dark:border-dark-border">
            <div className="flex border-b border-gray-200 dark:border-dark-border">
              {[
                { id: 'description', label: 'Description' },
                { id: 'features', label: 'Features' },
                { id: 'reviews', label: 'Reviews' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-4 text-sm font-medium transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-b-2 border-primary text-primary'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-8">
              <AnimatePresence mode="wait">
                {activeTab === 'description' && (
                  <motion.div
                    key="description"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {mockProduct.description}
                    </p>
                  </motion.div>
                )}

                {activeTab === 'features' && (
                  <motion.div
                    key="features"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ul className="space-y-2">
                      {mockProduct.features.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                {activeTab === 'reviews' && (
                  <motion.div
                    key="reviews"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="space-y-6">
                      {reviews.map((review) => (
                        <div key={review.id} className="border-b border-gray-200 dark:border-dark-border pb-6 last:border-b-0">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-gray-900 dark:text-white">
                              {review.user}
                            </h4>
                            <div className="flex items-center space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <FiStar
                                  key={i}
                                  className={`h-4 w-4 ${i < review.rating 
                                    ? 'text-yellow-400 fill-current' 
                                    : 'text-gray-300'}`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                            {new Date(review.date).toLocaleDateString()}
                          </p>
                          <p className="text-gray-600 dark:text-gray-300">
                            {review.comment}
                          </p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetail; 