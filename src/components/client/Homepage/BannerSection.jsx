import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiPlay, FiStar, FiTruck, FiShield, FiRefreshCw } from 'react-icons/fi';
import { useTheme } from '../../../context/ThemeContext';

/**
 * Modern Hero Section component for homepage
 * Features animated content, gradient backgrounds, and interactive elements
 */
const BannerSection = () => {
  const { theme } = useTheme();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Hero content data
  const heroContent = [
    {
      id: 1,
      title: "Discover Your Style",
      subtitle: "Explore our curated collection of premium products designed for modern living",
      description: "From fashion essentials to home decor, find everything you need to elevate your lifestyle with our handpicked selection.",
      ctaText: "Shop Now",
      ctaLink: "/products",
      secondaryCtaText: "Learn More",
      secondaryCtaLink: "/about",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=800&fit=crop",
      gradient: "from-purple-600 via-pink-600 to-red-500",
      stats: [
        { number: "10K+", label: "Happy Customers" },
        { number: "500+", label: "Products" },
        { number: "50+", label: "Countries" }
      ]
    },
    {
      id: 2,
      title: "Summer Collection",
      subtitle: "New arrivals for the season ahead",
      description: "Stay ahead of the trends with our latest summer collection featuring vibrant colors and comfortable styles.",
      ctaText: "View Collection",
      ctaLink: "/categories/clothing",
      secondaryCtaText: "Watch Video",
      secondaryCtaLink: "#",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&h=800&fit=crop",
      gradient: "from-blue-600 via-cyan-500 to-teal-400",
      stats: [
        { number: "50%", label: "Off Sale" },
        { number: "New", label: "Arrivals" },
        { number: "24/7", label: "Support" }
      ]
    },
    {
      id: 3,
      title: "Premium Quality",
      subtitle: "Crafted with excellence for discerning customers",
      description: "Experience the difference that quality makes. Every product is carefully selected and tested for your satisfaction.",
      ctaText: "Explore Premium",
      ctaLink: "/products",
      secondaryCtaText: "Our Story",
      secondaryCtaLink: "/about",
      image: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=1200&h=800&fit=crop",
      gradient: "from-orange-500 via-red-500 to-pink-500",
      stats: [
        { number: "99%", label: "Satisfaction" },
        { number: "Free", label: "Shipping" },
        { number: "30 Day", label: "Returns" }
      ]
    }
  ];

  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroContent.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroContent.length]);

  const currentContent = heroContent[currentSlide];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${currentContent.image})` }}
        />
        <div className={`absolute inset-0 bg-gradient-to-r ${currentContent.gradient} opacity-90`} />
        <div className="absolute inset-0 bg-black bg-opacity-20" />
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-20 left-20 w-32 h-32 bg-white bg-opacity-10 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-20 right-20 w-40 h-40 bg-white bg-opacity-10 rounded-full blur-xl"
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="inline-flex items-center px-4 py-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full border border-white border-opacity-30"
            >
              <FiStar className="w-4 h-4 mr-2 text-yellow-300" />
              <span className="text-sm font-medium">Premium Collection</span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
            >
              {currentContent.title}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-xl md:text-2xl text-gray-200 font-medium"
            >
              {currentContent.subtitle}
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="text-gray-300 text-lg leading-relaxed max-w-lg"
            >
              {currentContent.description}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link to={currentContent.ctaLink}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-gray-900 font-semibold px-8 py-4 rounded-lg flex items-center space-x-2 hover:bg-gray-100 transition-colors duration-300 shadow-lg"
                >
                  <span>{currentContent.ctaText}</span>
                  <FiArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              
              <Link to={currentContent.secondaryCtaLink}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-white text-white font-semibold px-8 py-4 rounded-lg flex items-center space-x-2 hover:bg-white hover:text-gray-900 transition-colors duration-300"
                >
                  {currentContent.secondaryCtaText === "Watch Video" ? (
                    <FiPlay className="w-5 h-5" />
                  ) : null}
                  <span>{currentContent.secondaryCtaText}</span>
                </motion.button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="flex flex-wrap gap-8 pt-8"
            >
              {currentContent.stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-white">{stat.number}</div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right content - Floating product showcase */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              {/* Main product image */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10"
              >
                <div className="bg-white rounded-2xl shadow-2xl p-6 transform rotate-3">
                  <img
                    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop"
                    alt="Featured Product"
                    className="w-full h-80 object-cover rounded-xl"
                  />
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold text-gray-900">Premium Headphones</h3>
                    <p className="text-gray-600">Wireless • Noise Cancelling</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-2xl font-bold text-primary">$89.99</span>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <FiStar key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating elements */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-4 transform -rotate-12"
              >
                <div className="flex items-center space-x-2">
                  <FiTruck className="w-5 h-5 text-green-500" />
                  <span className="text-sm font-medium text-gray-700">Free Shipping</span>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-4 transform rotate-12"
              >
                <div className="flex items-center space-x-2">
                  <FiShield className="w-5 h-5 text-blue-500" />
                  <span className="text-sm font-medium text-gray-700">Secure Payment</span>
                </div>
              </motion.div>

              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute top-1/2 -left-8 bg-white rounded-full shadow-lg p-3"
              >
                <FiRefreshCw className="w-6 h-6 text-orange-500" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-3">
          {heroContent.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index 
                  ? 'bg-white scale-125' 
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 right-8 z-20"
      >
        <div className="w-6 h-10 border-2 border-white border-opacity-50 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-3 bg-white rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default BannerSection;