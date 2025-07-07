import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingCart, FiEye, FiStar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useTheme } from '../../../context/ThemeContext';
import { useNotification } from '../../../context/NotificationContext';

/**
 * ProductShowcase component for homepage
 * Showcases featured and new products with tabs
 */
const ProductShowcase = () => {
    const { theme } = useTheme();
    const { showCartNotification, showWishlistNotification } = useNotification();
    const [activeTab, setActiveTab] = useState('featured');
    const [currentPage, setCurrentPage] = useState(0);
    const productsPerPage = 4;
    const [products, setProducts] = useState({ featured: [], new: [] });
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart') || '[]'));
    const [wishlist, setWishlist] = useState(() => JSON.parse(localStorage.getItem('wishlist') || '[]'));

    // Persist cart and wishlist to localStorage
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    // Fetch products from DummyJSON
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Fetch featured products (first 8 products)
                const featuredResponse = await fetch('https://dummyjson.com/products?limit=8');
                const featuredData = await featuredResponse.json();
                
                // Fetch new products (next 8 products)
                const newResponse = await fetch('https://dummyjson.com/products?limit=8&skip=8');
                const newData = await newResponse.json();
                
                setProducts({
                    featured: featuredData.products,
                    new: newData.products
                });
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

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

    const toggleWishlist = (productId) => {
        const isCurrentlyWishlisted = wishlist.includes(productId);
        const product = products[activeTab]?.find(p => p.id === productId);
        
        setWishlist(prev => prev.includes(productId) ? prev.filter(w => w !== productId) : [...prev, productId]);
        
        if (product) {
            showWishlistNotification(product.title, !isCurrentlyWishlisted);
        }
    };

    const isInCart = (productId) => {
        return cart.some(item => item.id === productId);
    };

    const isWishlisted = (productId) => {
        return wishlist.includes(productId);
    };

    // Calculate total pages
    const totalPages = Math.ceil(products[activeTab]?.length / productsPerPage) || 0;

    // Get current page products
    const getCurrentPageProducts = () => {
        if (!products[activeTab]) return [];
        const start = currentPage * productsPerPage;
        const end = start + productsPerPage;
        return products[activeTab].slice(start, end);
    };



    // Change page
    const nextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Change tab
    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setCurrentPage(0);
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    if (loading) {
        return (
            <section className={`py-16 ${theme === 'dark' ? 'bg-dark-bg' : 'bg-white'}`}>
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                        <p className={`mt-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Loading products...</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className={`py-16 ${theme === 'dark' ? 'bg-dark-bg' : 'bg-white'}`}>
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        Our Products
                    </h2>
                    <p className={`max-w-2xl mx-auto ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        Discover our curated selection of high-quality products.
                    </p>
                </motion.div>

                {/* Tabs */}
                <div className="flex justify-center mb-10">
                    <div className={`inline-flex rounded-md p-1 ${theme === 'dark' ? 'bg-dark-card' : 'bg-gray-100'}`}>
                        <button
                            onClick={() => handleTabChange('featured')}
                            className={`px-6 py-2 rounded-md font-medium transition-all duration-300 ${activeTab === 'featured'
                                    ? `bg-primary text-white`
                                    : `${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`
                                }`}
                        >
                            Featured
                        </button>
                        <button
                            onClick={() => handleTabChange('new')}
                            className={`px-6 py-2 rounded-md font-medium transition-all duration-300 ${activeTab === 'new'
                                    ? `bg-primary text-white`
                                    : `${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`
                                }`}
                        >
                            New Arrivals
                        </button>
                    </div>
                </div>

                {/* Products Grid */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit={{ opacity: 0, y: -20 }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {getCurrentPageProducts().map((product) => (
                            <motion.div
                                key={product.id}
                                variants={itemVariants}
                                whileHover={{ y: -10, transition: { type: 'spring', stiffness: 300 } }}
                                className={`group relative rounded-lg overflow-hidden ${theme === 'dark' ? 'bg-dark-card border border-dark-border' : 'bg-white border border-gray-100 shadow-md'}`}
                            >
                                {/* Sale Badge */}
                                {product.discountPercentage > 0 && (
                                    <div className="absolute top-3 left-3 z-10 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                                        {Math.round(product.discountPercentage)}% OFF
                                    </div>
                                )}

                                {/* Product Image */}
                                <div className="relative overflow-hidden h-64">
                                    <img
                                        src={product.images[0]}
                                        alt={product.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />

                                    {/* Quick action buttons */}
                                    <div 
                                        className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="p-2 bg-white rounded-full text-gray-800 hover:text-primary"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                addToCart(product);
                                            }}
                                            disabled={isInCart(product.id)}
                                        >
                                            <FiShoppingCart className={`w-5 h-5 ${isInCart(product.id) ? 'text-gray-400' : ''}`} />
                                        </motion.button>
                                        <Link to={`/products/${product.id}`}>
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="p-2 bg-white rounded-full text-gray-800 hover:text-primary"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                }}
                                        >
                                            <FiEye className="w-5 h-5" />
                                        </motion.button>
                                        </Link>
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            className={`p-2 bg-white rounded-full ${isWishlisted(product.id) ? 'text-red-500' : 'text-gray-800 hover:text-red-500'}`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                toggleWishlist(product.id);
                                            }}
                                        >
                                            <FiHeart className="w-5 h-5" />
                                        </motion.button>
                                    </div>
                                </div>

                                {/* Product Info */}
                                <div className="p-4">
                                    <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                                        {product.category}
                                    </div>
                                    <Link to={`/products/${product.id}`}>
                                        <h3 className={`font-semibold mb-2 line-clamp-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                            {product.title}
                                    </h3>
                                    </Link>

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
                    </motion.div>
                </AnimatePresence>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-between items-center mt-10">
                        <button
                            onClick={prevPage}
                            disabled={currentPage === 0}
                            className={`flex items-center px-4 py-2 rounded-md transition-colors duration-300 ${currentPage === 0
                                    ? 'opacity-50 cursor-not-allowed'
                                    : theme === 'dark'
                                        ? 'bg-dark-card hover:bg-dark-border text-white'
                                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                                }`}
                        >
                            <FiChevronLeft className="mr-2" />
                            Previous
                        </button>
                        <div className={theme === 'dark' ? 'text-white' : 'text-gray-700'}>
                            Page {currentPage + 1} of {totalPages}
                        </div>
                        <button
                            onClick={nextPage}
                            disabled={currentPage === totalPages - 1}
                            className={`flex items-center px-4 py-2 rounded-md transition-colors duration-300 ${currentPage === totalPages - 1
                                    ? 'opacity-50 cursor-not-allowed'
                                    : theme === 'dark'
                                        ? 'bg-dark-card hover:bg-dark-border text-white'
                                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                                }`}
                        >
                            Next
                            <FiChevronRight className="ml-2" />
                        </button>
                    </div>
                )}

                {/* View All Button */}
                <div className="text-center mt-10">
                    <Link to="/products">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-3 rounded-md transition-colors duration-300"
                    >
                        View All Products
                    </motion.button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ProductShowcase;