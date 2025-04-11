import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHeart, FiShoppingCart, FiEye, FiStar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useTheme } from '../../../context/ThemeContext';

/**
 * ProductShowcase component for homepage
 * Showcases featured and new products with tabs
 */
const ProductShowcase = () => {
    const { theme } = useTheme();
    const [activeTab, setActiveTab] = useState('featured');
    const [currentPage, setCurrentPage] = useState(0);
    const productsPerPage = 4;

    // Mock product data
    const products = {
        featured: [
            {
                id: 1,
                name: 'Premium Cotton T-Shirt',
                category: 'Clothing',
                price: 29.99,
                salePrice: null,
                rating: 4.8,
                image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            },
            {
                id: 2,
                name: 'Wireless Bluetooth Headphones',
                category: 'Electronics',
                price: 149.99,
                salePrice: 129.99,
                rating: 4.6,
                image: 'https://images.unsplash.com/photo-1605464315542-bda3e2f4e605?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            },
            {
                id: 3,
                name: 'Minimalist Watch',
                category: 'Accessories',
                price: 89.99,
                salePrice: null,
                rating: 4.9,
                image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            },
            {
                id: 4,
                name: 'Scented Candle Set',
                category: 'Home Decor',
                price: 34.99,
                salePrice: 28.99,
                rating: 4.7,
                image: 'https://images.unsplash.com/photo-1584592740039-cddf0671f3d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            },
            {
                id: 5,
                name: 'Leather Wallet',
                category: 'Accessories',
                price: 59.99,
                salePrice: null,
                rating: 4.5,
                image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            },
            {
                id: 6,
                name: 'Ceramic Plant Pot',
                category: 'Home Decor',
                price: 24.99,
                salePrice: 19.99,
                rating: 4.3,
                image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            },
            {
                id: 7,
                name: 'Smart Water Bottle',
                category: 'Accessories',
                price: 45.99,
                salePrice: null,
                rating: 4.4,
                image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            },
            {
                id: 8,
                name: 'Wireless Charging Pad',
                category: 'Electronics',
                price: 39.99,
                salePrice: 34.99,
                rating: 4.6,
                image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f37?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            }
        ],
        new: [
            {
                id: 9,
                name: 'Sustainable Tote Bag',
                category: 'Accessories',
                price: 19.99,
                salePrice: null,
                rating: 4.5,
                image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            },
            {
                id: 10,
                name: 'Smart Home Speaker',
                category: 'Electronics',
                price: 199.99,
                salePrice: 179.99,
                rating: 4.7,
                image: 'https://images.unsplash.com/photo-1558089687-db9280019010?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            },
            {
                id: 11,
                name: 'Premium Coffee Maker',
                category: 'Home',
                price: 129.99,
                salePrice: null,
                rating: 4.8,
                image: 'https://images.unsplash.com/photo-1570286424717-e9914627b2d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            },
            {
                id: 12,
                name: 'Fitness Tracker',
                category: 'Electronics',
                price: 99.99,
                salePrice: 89.99,
                rating: 4.6,
                image: 'https://images.unsplash.com/photo-1576243345690-4e4b79b63288?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            },
            {
                id: 13,
                name: 'Bamboo Cutting Board',
                category: 'Kitchen',
                price: 29.99,
                salePrice: null,
                rating: 4.4,
                image: 'https://images.unsplash.com/photo-1568415290062-8e0457d32314?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            },
            {
                id: 14,
                name: 'Stainless Steel Water Bottle',
                category: 'Accessories',
                price: 24.99,
                salePrice: 21.99,
                rating: 4.5,
                image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            },
            {
                id: 15,
                name: 'Modern Desk Lamp',
                category: 'Home Decor',
                price: 49.99,
                salePrice: 39.99,
                rating: 4.3,
                image: 'https://images.unsplash.com/photo-1534105615256-c2c957d79389?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            },
            {
                id: 16,
                name: 'Yoga Mat',
                category: 'Fitness',
                price: 35.99,
                salePrice: null,
                rating: 4.7,
                image: 'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            }
        ]
    };

    // Calculate total pages
    const totalPages = Math.ceil(products[activeTab].length / productsPerPage);

    // Get current page products
    const getCurrentPageProducts = () => {
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
                                className={`group relative rounded-lg overflow-hidden ${theme === 'dark' ? 'bg-dark-card border border-dark-border' : 'bg-white border border-gray-100 shadow-md'
                                    }`}
                            >
                                {/* Sale Badge */}
                                {product.salePrice && (
                                    <div className="absolute top-3 left-3 z-10 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                                        Sale
                                    </div>
                                )}

                                {/* Product Image */}
                                <div className="relative overflow-hidden h-64">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />

                                    {/* Quick action buttons */}
                                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="p-2 bg-white rounded-full text-gray-800 hover:text-primary"
                                        >
                                            <FiShoppingCart className="w-5 h-5" />
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="p-2 bg-white rounded-full text-gray-800 hover:text-primary"
                                        >
                                            <FiEye className="w-5 h-5" />
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="p-2 bg-white rounded-full text-gray-800 hover:text-red-500"
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
                                    <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                        {product.name}
                                    </h3>

                                    {/* Rating */}
                                    <div className="flex items-center mb-2">
                                        <div className="flex text-yellow-400">
                                            {[...Array(5)].map((_, i) => (
                                                <FiStar
                                                    key={i}
                                                    className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`}
                                                />
                                            ))}
                                        </div>
                                        <span className={`ml-1 text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                            ({product.rating})
                                        </span>
                                    </div>

                                    {/* Price */}
                                    <div className="flex items-center">
                                        {product.salePrice ? (
                                            <>
                                                <span className="text-lg font-bold text-primary">${product.salePrice.toFixed(2)}</span>
                                                <span className="ml-2 text-sm line-through text-gray-500">${product.price.toFixed(2)}</span>
                                            </>
                                        ) : (
                                            <span className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                                ${product.price.toFixed(2)}
                                            </span>
                                        )}
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
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-3 rounded-md transition-colors duration-300"
                    >
                        View All Products
                    </motion.button>
                </div>
            </div>
        </section>
    );
};

export default ProductShowcase;