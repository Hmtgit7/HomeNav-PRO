import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/shared/Navbar';
import Footer from './components/shared/Footer';
import HomePage from './components/client/Homepage';
import ScrollToTop from './components/shared/ScrollToTop';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col transition-colors duration-300 dark:bg-dark-bg">
        <Navbar />
        <main className="flex-grow mt-16">
          <HomePage />
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </ThemeProvider>
  );
}

export default App;