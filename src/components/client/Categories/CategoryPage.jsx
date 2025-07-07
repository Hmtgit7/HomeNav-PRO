import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiFilter, FiGrid, FiList, FiSearch, FiHeart, FiShoppingCart, FiStar, FiChevronRight } from 'react-icons/fi';
import { useTheme } from '../../../context/ThemeContext';

// Mock category data
const categories = {
  clothing: {
    name: "Clothing",
    description: "Discover stylish and comfortable clothing for every occasion",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop",
    products: [
      {
        id: 1,
        name: "Premium Cotton T-Shirt",
        price: 29.99,
        originalPrice: 39.99,
        rating: 4.5,
        reviews: 128,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
        isNew: true,
        isSale: true
      },
      {
        id: 2,
        name: "Denim Jacket",
        price: 89.99,
        originalPrice: 119.99,
        rating: 4.2,
        reviews: 203,
        image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400&h=400&fit=crop",
        isNew: false,
        isSale: true
      },
      {
        id: 3,
        name: "Casual Hoodie",
        price: 59.99,
        originalPrice: 79.99,
        rating: 4.7,
        reviews: 156,
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop",
        isNew: true,
        isSale: false
      },
      {
        id: 4,
        name: "Formal Dress Shirt",
        price: 49.99,
        originalPrice: 69.99,
        rating: 4.3,
        reviews: 89,
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop",
        isNew: false,
        isSale: true
      }
    ]
  },
  electronics: {
    name: "Electronics",
    description: "Cutting-edge technology and innovative gadgets",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&h=400&fit=crop",
    products: [
      {
        id: 5,
        name: "Wireless Bluetooth Headphones",
        price: 89.99,
        originalPrice: 129.99,
        rating: 4.8,
        reviews: 256,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
        isNew: false,
        isSale: true
      },
      {
        id: 6,
        name: "Smart Fitness Watch",
        price: 149.99,
        originalPrice: 199.99,
        rating: 4.7,
        reviews: 342,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
        isNew: false,
        isSale: true
      },
      {
        id: 7,
        name: "Wireless Charging Pad",
        price: 24.99,
        originalPrice: 34.99,
        rating: 4.1,
        reviews: 156,
        image: "https://images.unsplash.com/photo-1601972599720-36938d4ecd31?w=400&h=400&fit=crop",
        isNew: true,
        isSale: false
      },
      {
        id: 8,
        name: "Portable Speaker",
        price: 79.99,
        originalPrice: 99.99,
        rating: 4.4,
        reviews: 187,
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
        isNew: true,
        isSale: false
      }
    ]
  },
  "home-decor": {
    name: "Home Decor",
    description: "Transform your space with beautiful and functional decor",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=400&fit=crop",
    products: [
      {
        id: 9,
        name: "Modern Coffee Table",
        price: 199.99,
        originalPrice: 249.99,
        rating: 4.3,
        reviews: 89,
        image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=400&h=400&fit=crop",
        isNew: false,
        isSale: false
      },
      {
        id: 10,
        name: "Ceramic Plant Pot Set",
        price: 34.99,
        originalPrice: 44.99,
        rating: 4.4,
        reviews: 95,
        image: "https://images.unsplash.com/photo-1485955900006-10f4d9d7190e?w=400&h=400&fit=crop",
        isNew: false,
        isSale: false
      },
      {
        id: 11,
        name: "Wall Art Canvas",
        price: 89.99,
        originalPrice: 119.99,
        rating: 4.6,
        reviews: 134,
        image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=400&fit=crop",
        isNew: true,
        isSale: true
      },
      {
        id: 12,
        name: "Table Lamp",
        price: 59.99,
        originalPrice: 79.99,
        rating: 4.2,
        reviews: 67,
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop",
        isNew: false,
        isSale: true
      }
    ]
  },
  accessories: {
    name: "Accessories",
    description: "Complete your look with stylish accessories and essentials",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop",
    products: [
      {
        id: 13,
        name: "Leather Crossbody Bag",
        price: 79.99,
        originalPrice: 99.99,
        rating: 4.6,
        reviews: 167,
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop",
        isNew: true,
        isSale: false
      },
      {
        id: 14,
        name: "Sunglasses",
        price: 129.99,
        originalPrice: 159.99,
        rating: 4.8,
        reviews: 234,
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop",
        isNew: false,
        isSale: true
      },
      {
        id: 15,
        name: "Watch",
        price: 199.99,
        originalPrice: 249.99,
        rating: 4.9,
        reviews: 456,
        image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop",
        isNew: true,
        isSale: false
      },
      {
        id: 16,
        name: "Jewelry Set",
        price: 49.99,
        originalPrice: 69.99,
        rating: 4.3,
        reviews: 123,
        image: "https://images.unsplash.com/photo-1515562141207-7d88c1216d9d?w=400&h=400&fit=crop",
        isNew: false,
        isSale: true
      }
    ]
  }
};

const CategoryPage = () => {
  const { theme } = useTheme();
  const [category, setCategory] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);
  
  // Get categoryId from URL params
  const categoryId = window.location.pathname.split('/').pop();

  useEffect(() => {
    const categoryData = categories[categoryId];
    if (categoryData) {
      setCategory(categoryData);
      setFilteredProducts(categoryData.products);
    }
  }, [categoryId]);

  // Filter and sort products
  useEffect(() => {
    if (!category) return;

    let filtered = category.products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      
      return matchesSearch && matchesPrice;
    });

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        // Featured - keep original order
        break;
    }

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [category, searchQuery, priceRange, sortBy]);

  // Pagination functions
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

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

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark-bg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading category...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      {/* Category Header */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              {category.name}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl max-w-2xl mx-auto"
            >
              {category.description}
            </motion.p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300 mb-8"
        >
          <a href="/" className="hover:text-primary">Home</a>
          <FiChevronRight className="h-4 w-4" />
          <a href="/categories" className="hover:text-primary">Categories</a>
          <FiChevronRight className="h-4 w-4" />
          <span className="text-gray-900 dark:text-white">{category.name}</span>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className={`bg-white dark:bg-dark-card rounded-lg shadow-sm border border-gray-200 dark:border-dark-border p-6 sticky top-24`}>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                Filters
              </h3>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Search Products
                </label>
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search in this category..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input-field pl-10 w-full"
                  />
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Price Range
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="300"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
              </div>

              {/* Sort Options */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Sort By
                </h4>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="input-field text-sm w-full"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:w-3/4">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Showing {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, filteredProducts.length)} of {filteredProducts.length} products in {category.name}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Page {currentPage} of {totalPages}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' 
                    ? 'bg-primary text-white' 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-border'}`}
                >
                  <FiGrid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' 
                    ? 'bg-primary text-white' 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-border'}`}
                >
                  <FiList className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Products */}
            <AnimatePresence mode="wait">
              <motion.div
                key={viewMode}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={viewMode === 'grid' 
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                  : 'space-y-4'
                }
              >
                {currentProducts.map((product) => (
                  <ProductCard key={product.id} product={product} viewMode={viewMode} />
                ))}
              </motion.div>
            </AnimatePresence>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 dark:text-gray-500 mb-4">
                  <FiSearch className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No products found
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Try adjusting your filters or search terms
                </p>
              </div>
            )}

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
      </div>
    </div>
  );
};

const ProductCard = ({ product, viewMode }) => {
  const { theme } = useTheme();
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (viewMode === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`bg-white dark:bg-dark-card rounded-lg shadow-sm border border-gray-200 dark:border-dark-border p-6 flex gap-6`}
      >
        <div className="flex-shrink-0">
          <img
            src={product.image}
            alt={product.name}
            className="w-32 h-32 object-cover rounded-lg"
          />
        </div>
        
        <div className="flex-grow">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {product.name}
            </h3>
            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className={`p-2 rounded-full ${isWishlisted 
                ? 'text-red-500' 
                : 'text-gray-400 hover:text-red-500'}`}
            >
              <FiHeart className="h-5 w-5" />
            </button>
          </div>
          
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <FiStar
                  key={i}
                  className={`h-4 w-4 ${i < Math.floor(product.rating) 
                    ? 'text-yellow-400 fill-current' 
                    : 'text-gray-300'}`}
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
              ({product.reviews})
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                ${product.price}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-sm text-gray-500 line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>
            
            <button className="btn btn-primary">
              <FiShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white dark:bg-dark-card rounded-lg shadow-sm border border-gray-200 dark:border-dark-border overflow-hidden group hover:shadow-md transition-shadow duration-300`}
    >
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
              New
            </span>
          )}
          {product.isSale && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              Sale
            </span>
          )}
        </div>
        
        {/* Wishlist button */}
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className={`absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm ${isWishlisted 
            ? 'text-red-500' 
            : 'text-gray-600 hover:text-red-500'}`}
        >
          <FiHeart className="h-4 w-4" />
        </button>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <FiStar className="h-3 w-3 text-yellow-400 fill-current" />
            <span className="text-xs text-gray-600 dark:text-gray-300 ml-1">
              {product.rating}
            </span>
          </div>
        </div>
        
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
          {product.name}
        </h3>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-gray-900 dark:text-white">
              ${product.price}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-sm text-gray-500 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
          
          <button className="p-2 rounded-full bg-primary text-white hover:bg-primary-dark transition-colors duration-200">
            <FiShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default CategoryPage; 