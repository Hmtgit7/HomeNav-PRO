import React from 'react';
import { motion } from 'framer-motion';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';

/**
 * ThemeToggle component for switching between light and dark themes
 */
const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  // Animation variants for the toggle
  const toggleVariants = {
    light: { rotate: 0 },
    dark: { rotate: 180 }
  };

  return (
    <motion.button
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      onClick={toggleTheme}
      whileTap={{ scale: 0.9 }}
      animate={theme}
      variants={toggleVariants}
      transition={{ duration: 0.5, type: 'spring' }}
      className={`p-2 rounded-full ${theme === 'dark'
          ? 'text-gray-200 hover:bg-dark-border'
          : 'text-gray-600 hover:bg-gray-100'
        }`}
    >
      {theme === 'light' ? (
        <motion.div
          initial={{ opacity: 0, rotate: -90 }}
          animate={{ opacity: 1, rotate: 0 }}
          exit={{ opacity: 0, rotate: 90 }}
          transition={{ duration: 0.3 }}
        >
          <FiMoon className="h-5 w-5" />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, rotate: 90 }}
          animate={{ opacity: 1, rotate: 0 }}
          exit={{ opacity: 0, rotate: -90 }}
          transition={{ duration: 0.3 }}
        >
          <FiSun className="h-5 w-5" />
        </motion.div>
      )}
    </motion.button>
  );
};

export default ThemeToggle;