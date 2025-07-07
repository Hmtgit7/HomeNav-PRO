import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';

/**
 * Reusable Carousel component with animation
 * @param {Array} slides - Array of slide objects { id, image, title, subtitle, ctaText, ctaLink }
 * @param {Boolean} autoPlay - Whether to auto-play the carousel
 * @param {Number} interval - Time between slides in ms if autoPlay is true
 */
const Carousel = ({ slides, autoPlay = true, interval = 5000 }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { theme } = useTheme();

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay) return;

    const autoPlayInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
    }, interval);

    return () => clearInterval(autoPlayInterval);
  }, [autoPlay, interval, slides.length]);

  // Go to previous slide
  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? slides.length - 1 : prevSlide - 1));
  };

  // Go to next slide
  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
  };

  // Go to a specific slide
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Animation variants for slides
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <div className="relative w-full overflow-hidden h-[500px] md:h-[600px]">
      <AnimatePresence initial={false} custom={currentSlide}>
        <motion.div
          key={currentSlide}
          custom={currentSlide}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="absolute inset-0 w-full h-full"
        >
          <div
            className="w-full h-full bg-cover bg-center flex items-center"
            style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            <div className="container mx-auto px-4 md:px-10 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="max-w-2xl mx-auto md:mx-0"
              >
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{slides[currentSlide].title}</h2>
                <p className="text-xl text-gray-200 mb-6">{slides[currentSlide].subtitle}</p>
                {slides[currentSlide].ctaText && (
                  <Link to={slides[currentSlide].ctaLink || '#'}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-block bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-md transition-colors duration-300"
                    >
                      {slides[currentSlide].ctaText}
                    </motion.div>
                  </Link>
                )}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation buttons */}
      <div className="absolute inset-y-0 left-0 flex items-center">
        <button
          onClick={prevSlide}
          className="bg-black bg-opacity-30 hover:bg-opacity-50 text-white p-2 rounded-r-md transition-all duration-200 transform -translate-x-2 hover:translate-x-0"
          aria-label="Previous slide"
        >
          <FiChevronLeft className="h-6 w-6" />
        </button>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center">
        <button
          onClick={nextSlide}
          className="bg-black bg-opacity-30 hover:bg-opacity-50 text-white p-2 rounded-l-md transition-all duration-200 transform translate-x-2 hover:translate-x-0"
          aria-label="Next slide"
        >
          <FiChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* Indicator dots */}
      <div className="absolute bottom-5 left-0 right-0 flex justify-center space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-white scale-125' : 'bg-white bg-opacity-50'
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;