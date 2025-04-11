import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiStar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useTheme } from '../../../context/ThemeContext';

/**
 * TestimonialSection component to display customer testimonials
 */
const TestimonialSection = () => {
    const { theme } = useTheme();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [autoplay, setAutoplay] = useState(true);

    // Mock testimonial data
    const testimonials = [
        {
            id: 1,
            content: "I've been shopping here for over a year now, and the quality of their products never disappoints. The customer service is also top-notch!",
            author: "Emily Johnson",
            position: "Loyal Customer",
            rating: 5,
            image: "https://randomuser.me/api/portraits/women/44.jpg"
        },
        {
            id: 2,
            content: "What sets this store apart is their attention to detail. Everything from the product quality to the packaging shows they really care about their customers.",
            author: "Michael Chen",
            position: "Fashion Enthusiast",
            rating: 5,
            image: "https://randomuser.me/api/portraits/men/32.jpg"
        },
        {
            id: 3,
            content: "The delivery was lightning fast and the product exceeded my expectations. Will definitely be shopping here again!",
            author: "Sarah Williams",
            position: "First-time Buyer",
            rating: 4,
            image: "https://randomuser.me/api/portraits/women/68.jpg"
        },
        {
            id: 4,
            content: "Their products have a great price-to-quality ratio. I especially love their electronics section which offers premium features at reasonable prices.",
            author: "David Rodriguez",
            position: "Tech Blogger",
            rating: 5,
            image: "https://randomuser.me/api/portraits/men/75.jpg"
        }
    ];

    // Handle testimonial autoplay
    useEffect(() => {
        if (!autoplay) return;

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
        }, 5000);

        return () => clearInterval(interval);
    }, [autoplay, testimonials.length]);

    // Navigation functions
    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
        setAutoplay(false);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
        setAutoplay(false);
    };

    // Animation variants for slides
    const slideVariants = {
        enter: (direction) => ({
            x: direction > 0 ? 500 : -500,
            opacity: 0
        }),
        center: {
            x: 0,
            opacity: 1
        },
        exit: (direction) => ({
            x: direction < 0 ? 500 : -500,
            opacity: 0
        })
    };

    return (
        <section className={`py-16 ${theme === 'dark' ? 'bg-dark-card' : 'bg-gray-50'}`}>
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        Customer Testimonials
                    </h2>
                    <p className={`max-w-2xl mx-auto ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        See what our customers have to say about their shopping experience.
                    </p>
                </motion.div>

                <div className="relative max-w-4xl mx-auto">
                    <AnimatePresence initial={false} custom={currentSlide}>
                        <motion.div
                            key={currentSlide}
                            custom={currentSlide}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className={`p-6 md:p-8 rounded-xl shadow-lg ${theme === 'dark' ? 'bg-dark-bg border border-dark-border' : 'bg-white'
                                }`}
                        >
                            <div className="flex flex-col md:flex-row items-center">
                                <div className="mb-6 md:mb-0 md:mr-8">
                                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary mx-auto">
                                        <img
                                            src={testimonials[currentSlide].image}
                                            alt={testimonials[currentSlide].author}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                                <div className="flex-1 text-center md:text-left">
                                    <div className="flex justify-center md:justify-start mb-4">
                                        {[...Array(5)].map((_, i) => (
                                            <FiStar
                                                key={i}
                                                className={`w-5 h-5 ${i < testimonials[currentSlide].rating
                                                        ? 'text-yellow-400 fill-current'
                                                        : 'text-gray-300'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <blockquote>
                                        <p className={`text-lg italic mb-4 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                                            "{testimonials[currentSlide].content}"
                                        </p>
                                        <footer className="font-medium">
                                            <cite className={`not-italic text-lg ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                                {testimonials[currentSlide].author}
                                            </cite>
                                            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                                {testimonials[currentSlide].position}
                                            </p>
                                        </footer>
                                    </blockquote>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation buttons */}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-8 md:-translate-x-16">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={prevSlide}
                            className={`p-3 rounded-full ${theme === 'dark'
                                    ? 'bg-dark-border hover:bg-gray-700 text-white'
                                    : 'bg-white shadow-md hover:bg-gray-100 text-gray-700'
                                }`}
                            aria-label="Previous testimonial"
                        >
                            <FiChevronLeft className="w-5 h-5" />
                        </motion.button>
                    </div>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-8 md:translate-x-16">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={nextSlide}
                            className={`p-3 rounded-full ${theme === 'dark'
                                    ? 'bg-dark-border hover:bg-gray-700 text-white'
                                    : 'bg-white shadow-md hover:bg-gray-100 text-gray-700'
                                }`}
                            aria-label="Next testimonial"
                        >
                            <FiChevronRight className="w-5 h-5" />
                        </motion.button>
                    </div>
                </div>

                {/* Indicator dots */}
                <div className="flex justify-center space-x-2 mt-8">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                setCurrentSlide(index);
                                setAutoplay(false);
                            }}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index
                                    ? 'bg-primary scale-125'
                                    : `${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'}`
                                }`}
                            aria-label={`Go to testimonial ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialSection;