import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShoppingCart, FiSearch, FiMenu, FiX, FiChevronDown } from 'react-icons/fi';
import useClickOutside from '../../hooks/useClickOutside';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../../context/ThemeContext';

// Mock navigation data
const navigationItems = [
  {
    title: 'Products',
    submenu: [
      { name: 'New Arrivals', path: '/products/new' },
      { name: 'Best Sellers', path: '/products/best-sellers' },
      { name: 'Sale Items', path: '/products/sale' },
      { name: 'Collections', path: '/products/collections' },
    ],
  },
  {
    title: 'Categories',
    submenu: [
      { name: 'Clothing', path: '/categories/clothing' },
      { name: 'Accessories', path: '/categories/accessories' },
      { name: 'Home Decor', path: '/categories/home-decor' },
      { name: 'Electronics', path: '/categories/electronics' },
    ],
  },
  { title: 'About Us', path: '/about' },
  { title: 'Contact', path: '/contact' },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartItems, setCartItems] = useState(0); // Mock cart data
  const { theme } = useTheme();

  // Close dropdown when clicking outside
  const dropdownRef = useClickOutside(() => {
    setOpenDropdown(null);
  });

  // Close search when clicking outside
  const searchRef = useClickOutside(() => {
    setSearchOpen(false);
  });

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle dropdown menu
  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  // Navbar animation variants
  const navbarVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  // Individual menu item variants
  const menuItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={navbarVariants}
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled
          ? `${theme === 'dark' ? 'bg-dark-card shadow-lg' : 'bg-white shadow-md'}`
          : `${theme === 'dark' ? 'bg-transparent' : 'bg-transparent'}`
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
          {/* Logo */}
          <motion.div
            className="flex justify-start lg:w-0 lg:flex-1"
            variants={menuItemVariants}
          >
            <a href="/" className="flex items-center">
              <span className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                ShopifyStore
              </span>
            </a>
          </motion.div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <AnimatePresence>
              {!searchOpen && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSearchOpen(true)}
                  className={`p-2 rounded-full ${theme === 'dark' ? 'text-gray-200 hover:bg-dark-border' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <FiSearch className="h-5 w-5" />
                </motion.button>
              )}
            </AnimatePresence>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-full ${theme === 'dark' ? 'text-gray-200 hover:bg-dark-border' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              {mobileMenuOpen ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
            </motion.button>

            <ThemeToggle />

            <motion.button
              whileTap={{ scale: 0.9 }}
              className={`p-2 rounded-full flex items-center ${theme === 'dark' ? 'text-gray-200 hover:bg-dark-border' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <FiShoppingCart className="h-5 w-5" />
              {cartItems > 0 && (
                <span className="ml-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItems}
                </span>
              )}
            </motion.button>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex space-x-10">
            {navigationItems.map((item, index) => (
              <div key={index} className="relative" ref={item.submenu ? dropdownRef : null}>
                {item.submenu ? (
                  <div>
                    <button
                      onClick={() => toggleDropdown(index)}
                      className={`group inline-flex items-center text-base font-medium hover:text-primary transition-colors duration-200 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                        }`}
                    >
                      <span>{item.title}</span>
                      <FiChevronDown
                        className={`ml-1 h-4 w-4 transition-transform duration-200 ${openDropdown === index ? 'transform rotate-180' : ''
                          }`}
                      />
                    </button>
                    <AnimatePresence>
                      {openDropdown === index && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className={`absolute z-10 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2 ${theme === 'dark' ? 'bg-dark-card border border-dark-border shadow-lg' : 'bg-white shadow-lg rounded-lg border border-gray-100'
                            }`}
                        >
                          <div className="rounded-lg overflow-hidden">
                            <div className="relative grid gap-6 px-5 py-6 sm:gap-8 sm:p-8">
                              {item.submenu.map((subItem, subIndex) => (
                                <motion.a
                                  key={subIndex}
                                  href={subItem.path}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: subIndex * 0.1 }}
                                  className={`-m-3 p-3 flex items-start rounded-lg hover:bg-opacity-50 transition ease-in-out duration-150 ${theme === 'dark' ? 'hover:bg-dark-border text-gray-200' : 'hover:bg-gray-50 text-gray-800'
                                    }`}
                                >
                                  <div className="ml-4">
                                    <p className="text-base font-medium">{subItem.name}</p>
                                  </div>
                                </motion.a>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <motion.a
                    href={item.path}
                    variants={menuItemVariants}
                    className={`text-base font-medium hover:text-primary transition-colors duration-200 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                      }`}
                  >
                    {item.title}
                  </motion.a>
                )}
              </div>
            ))}
          </div>

          {/* Desktop right section: Search, Theme Toggle, Cart */}
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0 space-x-4">
            <div className="relative" ref={searchRef}>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setSearchOpen(!searchOpen)}
                className={`p-2 rounded-full ${theme === 'dark' ? 'text-gray-200 hover:bg-dark-border' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <FiSearch className="h-5 w-5" />
              </motion.button>
              <AnimatePresence>
                {searchOpen && (
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: '250px' }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute right-0 mt-2"
                  >
                    <input
                      type="text"
                      placeholder="Search products..."
                      autoFocus
                      className={`w-full p-2 rounded-md ${theme === 'dark'
                          ? 'bg-dark-card border border-dark-border text-white placeholder-gray-400'
                          : 'bg-white border border-gray-300 text-gray-900'
                        }`}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <ThemeToggle />

            <motion.button
              whileTap={{ scale: 0.95 }}
              className={`p-2 rounded-full flex items-center ${theme === 'dark' ? 'text-gray-200 hover:bg-dark-border' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <FiShoppingCart className="h-5 w-5" />
              {cartItems > 0 && (
                <span className="ml-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItems}
                </span>
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={`md:hidden ${theme === 'dark' ? 'bg-dark-card' : 'bg-white'}`}
          >
            <div className="px-4 pt-2 pb-6 space-y-1 divide-y divide-gray-200">
              {navigationItems.map((item, index) => (
                <div key={index} className="py-2">
                  {item.submenu ? (
                    <div>
                      <button
                        onClick={() => toggleDropdown(index)}
                        className={`w-full flex justify-between items-center py-2 text-base font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'
                          }`}
                      >
                        {item.title}
                        <FiChevronDown
                          className={`ml-1 h-4 w-4 transition-transform duration-200 ${openDropdown === index ? 'transform rotate-180' : ''
                            }`}
                        />
                      </button>
                      <AnimatePresence>
                        {openDropdown === index && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="pl-4 space-y-2 mt-2"
                          >
                            {item.submenu.map((subItem, subIndex) => (
                              <motion.a
                                key={subIndex}
                                href={subItem.path}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: subIndex * 0.1 }}
                                className={`block py-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                                  }`}
                              >
                                {subItem.name}
                              </motion.a>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <a
                      href={item.path}
                      className={`block py-2 text-base font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'
                        }`}
                    >
                      {item.title}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile search overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden px-4 py-2"
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                autoFocus
                className={`w-full p-2 rounded-md ${theme === 'dark'
                    ? 'bg-dark-card border border-dark-border text-white placeholder-gray-400'
                    : 'bg-white border border-gray-300 text-gray-900'
                  }`}
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="absolute right-2 top-2"
              >
                <FiX className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;