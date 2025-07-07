import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FiFilter, FiGrid, FiList, FiSearch, FiHeart, FiShoppingCart, FiStar, FiCheck } from 'react-icons/fi';
import { useTheme } from '../../../context/ThemeContext';
import { useNotification } from '../../../context/NotificationContext';

const API_URL = 'https://dummyjson.com/products';

const ProductList = () => {
  const { theme } = useTheme();
  const { showCartNotification, showWishlistNotification } = useNotification();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [wishlist, setWishlist] = useState(() => JSON.parse(localStorage.getItem('wishlist') || '[]'));
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart') || '[]'));
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);
  const navigate = useNavigate();

  // Fetch products from DummyJSON
  useEffect(() => {
    setLoading(true);
    fetch(API_URL + '?limit=100')
      .then(res => res.json())
      .then(data => {
        setProducts(data.products);
        setFilteredProducts(data.products);
        setLoading(false);
      });
  }, []);

  // Filter and sort products
  useEffect(() => {
    let filtered = products.filter(product =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
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
      default:
        break;
    }
    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [products, searchQuery, sortBy]);

  // Wishlist and cart persistence
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const toggleWishlist = (id) => {
    const isCurrentlyWishlisted = wishlist.includes(id);
    const product = products.find(p => p.id === id);
    
    setWishlist(prev => prev.includes(id) ? prev.filter(w => w !== id) : [...prev, id]);
    
    if (product) {
      showWishlistNotification(product.title, !isCurrentlyWishlisted);
    }
  };
  
  const addToCart = (product) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1 }];
    });
    showCartNotification(product.title);
  };

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

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen text-xl">Loading products...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      <div className={`bg-white dark:bg-dark-card shadow-sm border-b border-gray-200 dark:border-dark-border`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">All Products</h1>
            <p className="text-gray-600 dark:text-gray-300">Browse our real product catalog powered by DummyJSON API.</p>
          </motion.div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className={`bg-white dark:bg-dark-card rounded-lg shadow-sm border border-gray-200 dark:border-dark-border p-6 sticky top-24`}>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Search</label>
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="input-field pl-10 w-full"
                  />
                </div>
              </div>
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Sort By</h4>
                <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="input-field text-sm w-full">
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
          </div>
          {/* Products Grid */}
          <div className="lg:w-3/4">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Showing {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, filteredProducts.length)} of {filteredProducts.length} products
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Page {currentPage} of {totalPages}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button onClick={() => setViewMode('grid')} className={`p-2 rounded ${viewMode === 'grid' ? 'bg-primary text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-border'}`}><FiGrid className="h-4 w-4" /></button>
                <button onClick={() => setViewMode('list')} className={`p-2 rounded ${viewMode === 'list' ? 'bg-primary text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-border'}`}><FiList className="h-4 w-4" /></button>
              </div>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={viewMode}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}
              >
                {currentProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    viewMode={viewMode}
                    isWishlisted={wishlist.includes(product.id)}
                    onWishlist={() => toggleWishlist(product.id)}
                    onAddToCart={() => addToCart(product)}
                    onClick={() => navigate(`/products/${product.id}`)}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 dark:text-gray-500 mb-4"><FiSearch className="h-12 w-12 mx-auto" /></div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No products found</h3>
                <p className="text-gray-600 dark:text-gray-300">Try adjusting your filters or search terms</p>
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

const ProductCard = ({ product, viewMode, isWishlisted, onWishlist, onAddToCart, onClick }) => {
  const { theme } = useTheme();
  const [added, setAdded] = useState(false);
  const [wish, setWish] = useState(false);

  useEffect(() => { setWish(isWishlisted); }, [isWishlisted]);

  const handleAddToCart = e => {
    e.stopPropagation();
    onAddToCart();
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };
  const handleWishlist = e => {
    e.stopPropagation();
    onWishlist();
    setWish(w => !w);
  };

  if (viewMode === 'list') {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`bg-white dark:bg-dark-card rounded-lg shadow-sm border border-gray-200 dark:border-dark-border p-6 flex gap-6 cursor-pointer`} onClick={onClick}>
        <div className="flex-shrink-0"><img src={product.thumbnail} alt={product.title} className="w-32 h-32 object-cover rounded-lg" /></div>
        <div className="flex-grow">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{product.title}</h3>
            <button onClick={handleWishlist} className={`p-2 rounded-full ${wish ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}><FiHeart className="h-5 w-5" /></button>
          </div>
          <div className="flex items-center mb-2">
            <div className="flex items-center">{[...Array(5)].map((_, i) => (<FiStar key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />))}</div>
            <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">({product.rating})</span>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{product.description}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-gray-900 dark:text-white">${product.price}</span>
              {product.discountPercentage > 0 && (
                <span className="text-sm text-gray-500 line-through">${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}</span>
              )}
            </div>
            <button className="btn btn-primary" onClick={handleAddToCart}>{added ? <FiCheck className="h-4 w-4 mr-2" /> : <FiShoppingCart className="h-4 w-4 mr-2" />} {added ? 'Added' : 'Add to Cart'}</button>
          </div>
        </div>
      </motion.div>
    );
  }
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`bg-white dark:bg-dark-card rounded-lg shadow-sm border border-gray-200 dark:border-dark-border overflow-hidden group hover:shadow-md transition-shadow duration-300 cursor-pointer`} onClick={onClick}>
      <div className="relative">
        <img src={product.thumbnail} alt={product.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
        <button onClick={handleWishlist} className={`absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm ${wish ? 'text-red-500' : 'text-gray-600 hover:text-red-500'}`}><FiHeart className="h-4 w-4" /></button>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">{product.category}</span>
          <div className="flex items-center"><FiStar className="h-3 w-3 text-yellow-400 fill-current" /><span className="text-xs text-gray-600 dark:text-gray-300 ml-1">{product.rating}</span></div>
        </div>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">{product.title}</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-gray-900 dark:text-white">${product.price}</span>
            {product.discountPercentage > 0 && (
              <span className="text-sm text-gray-500 line-through">${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}</span>
            )}
          </div>
          <button className="p-2 rounded-full bg-primary text-white hover:bg-primary-dark transition-colors duration-200" onClick={handleAddToCart}>{added ? <FiCheck className="h-4 w-4" /> : <FiShoppingCart className="h-4 w-4" />}</button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductList; 