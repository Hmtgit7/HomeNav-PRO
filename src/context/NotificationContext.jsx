import React, { createContext, useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck, FiX, FiShoppingCart, FiHeart } from 'react-icons/fi';

const NotificationContext = createContext();

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message, type = 'success', icon = null) => {
    const id = Date.now();
    const notification = { id, message, type, icon };
    setNotifications(prev => [...prev, notification]);

    // Auto remove after 3 seconds
    setTimeout(() => {
      removeNotification(id);
    }, 3000);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const showCartNotification = (productName) => {
    addNotification(`${productName} added to cart`, 'success', <FiShoppingCart />);
  };

  const showWishlistNotification = (productName, added = true) => {
    const action = added ? 'added to' : 'removed from';
    addNotification(`${productName} ${action} wishlist`, 'success', <FiHeart />);
  };

  return (
    <NotificationContext.Provider value={{ addNotification, removeNotification, showCartNotification, showWishlistNotification }}>
      {children}
      
      {/* Notification Container */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        <AnimatePresence>
          {notifications.map((notification) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: 300, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 300, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className={`flex items-center p-4 rounded-lg shadow-lg max-w-sm ${
                notification.type === 'success' 
                  ? 'bg-green-500 text-white' 
                  : notification.type === 'error'
                  ? 'bg-red-500 text-white'
                  : 'bg-blue-500 text-white'
              }`}
            >
              <div className="flex items-center flex-1">
                {notification.icon && (
                  <div className="mr-3">
                    {notification.icon}
                  </div>
                )}
                <span className="text-sm font-medium">{notification.message}</span>
              </div>
              <button
                onClick={() => removeNotification(notification.id)}
                className="ml-3 text-white hover:text-gray-200 transition-colors"
              >
                <FiX className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </NotificationContext.Provider>
  );
}; 