import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import Navbar from './components/shared/Navbar';
import Footer from './components/shared/Footer';
import HomePage from './components/client/Homepage';
import LoginForm from './components/client/Auth/LoginForm';
import RegisterForm from './components/client/Auth/RegisterForm';
import ForgotPasswordForm from './components/client/Auth/ForgotPasswordForm';
import AccountPage from './components/client/Profile/AccountPage';
import ProductList from './components/client/Products/ProductList';
import ProductDetail from './components/client/Products/ProductDetail';
import CategoryPage from './components/client/Categories/CategoryPage';
import AboutPage from './components/client/About/AboutPage';
import ContactPage from './components/client/Contact/ContactPage';
import CartPage from './components/client/Cart/CartPage';
import WishlistPage from './components/client/Wishlist/WishlistPage';
import NotFoundPage from './components/client/NotFound/NotFoundPage';
import ScrollToTop from './components/shared/ScrollToTop';
import Loader from './components/shared/Loader';

/**
 * ProtectedRoute component to guard authenticated routes
 */
const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader size="large" />
      </div>
    );
  }

  // Redirect to login if not authenticated
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

/**
 * PublicRoute component to prevent authenticated users from accessing auth pages
 */
const PublicRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader size="large" />
      </div>
    );
  }

  // Redirect to account page if already authenticated
  return isAuthenticated ? <Navigate to="/account" /> : <Outlet />;
};

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <NotificationProvider>
            <div className="min-h-screen flex flex-col transition-colors duration-300 dark:bg-dark-bg">
              <Navbar />
              <main className="flex-grow mt-16">
                <Routes>
                  {/* Public routes */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/products" element={<ProductList />} />
                  <Route path="/products/:id" element={<ProductDetail />} />
                  <Route path="/categories/:categoryId" element={<CategoryPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/wishlist" element={<WishlistPage />} />

                  {/* Auth routes (accessible only when not logged in) */}
                  <Route element={<PublicRoute />}>
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/register" element={<RegisterForm />} />
                    <Route path="/forgot-password" element={<ForgotPasswordForm />} />
                  </Route>

                  {/* Protected routes (require authentication) */}
                  <Route element={<ProtectedRoute />}>
                    <Route path="/account/*" element={<AccountPage />} />
                  </Route>

                  {/* Fallback route */}
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </main>
              <Footer />
              <ScrollToTop />
            </div>
          </NotificationProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;