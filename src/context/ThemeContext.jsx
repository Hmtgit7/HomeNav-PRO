import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a context for theme management
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Check for user preference or stored theme
  const getInitialTheme = () => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedTheme = window.localStorage.getItem('color-theme');
      if (storedTheme) {
        return storedTheme;
      }

      // Check for user's system preference
      const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (userPrefersDark) {
        return 'dark';
      }
    }

    // Default to light theme
    return 'light';
  };

  const [theme, setTheme] = useState(getInitialTheme);

  // Update theme in localStorage and HTML document
  const rawSetTheme = (rawTheme) => {
    const root = window.document.documentElement;

    // Remove previous theme class
    root.classList.remove('light', 'dark');

    // Add new theme class
    root.classList.add(rawTheme);

    // Store theme in localStorage
    localStorage.setItem('color-theme', rawTheme);
  };

  // Toggle between light and dark themes
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  // Apply theme when it changes
  useEffect(() => {
    rawSetTheme(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook for accessing the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};