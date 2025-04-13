import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiPackage, FiSettings, FiLogOut, FiCreditCard, FiHeart, FiAlertTriangle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import UserProfile from './UserProfile';
import OrderHistory from './OrderHistory';
import { useTheme } from '../../../context/ThemeContext';

/**
 * AccountPage component that serves as a container for user account features
 */
const AccountPage = () => {
    const { theme } = useTheme();
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    // Tab state
    const [activeTab, setActiveTab] = useState('profile');

    // Handle logout
    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    // Tabs configuration
    const tabs = [
        { id: 'profile', label: 'Profile', icon: <FiUser />, component: <UserProfile /> },
        { id: 'orders', label: 'Order History', icon: <FiPackage />, component: <OrderHistory /> },
        { id: 'wishlist', label: 'Wishlist', icon: <FiHeart />, component: <ComingSoon title="Wishlist" /> },
        { id: 'payment', label: 'Payment Methods', icon: <FiCreditCard />, component: <ComingSoon title="Payment Methods" /> },
        { id: 'settings', label: 'Account Settings', icon: <FiSettings />, component: <ComingSoon title="Account Settings" /> }
    ];

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
        <div className="container mx-auto px-4 py-8">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 lg:grid-cols-4 gap-8"
            >
                {/* Sidebar */}
                <motion.div variants={itemVariants} className="lg:col-span-1">
                    {/* User welcome */}
                    <div className={`p-4 rounded-lg mb-6 ${theme === 'dark' ? 'bg-dark-card border border-dark-border' : 'bg-white shadow-sm'
                        }`}>
                        <div className="flex items-center mb-4">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${theme === 'dark' ? 'bg-primary-dark text-white' : 'bg-primary text-white'
                                }`}>
                                {currentUser?.firstName?.charAt(0) || 'U'}
                            </div>
                            <div className="ml-3">
                                <h2 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                    {currentUser?.firstName} {currentUser?.lastName}
                                </h2>
                                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                    {currentUser?.email}
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={handleLogout}
                            className={`w-full py-2 px-4 rounded-md flex items-center justify-center ${theme === 'dark'
                                    ? 'bg-dark-bg text-gray-300 hover:bg-dark-border'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                } transition-colors duration-200`}
                        >
                            <FiLogOut className="mr-2 h-4 w-4" />
                            Sign Out
                        </button>
                    </div>

                    {/* Navigation menu */}
                    <nav className={`rounded-lg overflow-hidden ${theme === 'dark' ? 'bg-dark-card border border-dark-border' : 'bg-white shadow-sm'
                        }`}>
                        <ul>
                            {tabs.map((tab) => (
                                <li key={tab.id}>
                                    <button
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full p-4 flex items-center transition-colors duration-200 ${activeTab === tab.id
                                                ? theme === 'dark'
                                                    ? 'bg-dark-bg text-primary border-l-4 border-primary'
                                                    : 'bg-gray-50 text-primary border-l-4 border-primary'
                                                : theme === 'dark'
                                                    ? 'text-gray-300 hover:bg-dark-bg'
                                                    : 'text-gray-700 hover:bg-gray-50'
                                            }`}
                                    >
                                        <span className="text-lg mr-3">{tab.icon}</span>
                                        {tab.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </motion.div>

                {/* Main content */}
                <motion.div
                    variants={itemVariants}
                    className="lg:col-span-3"
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Render active tab component */}
                    {tabs.find(tab => tab.id === activeTab)?.component}
                </motion.div>
            </motion.div>
        </div>
    );
};

/**
 * ComingSoon placeholder component for features not yet implemented
 */
const ComingSoon = ({ title }) => {
    const { theme } = useTheme();

    return (
        <div className={`rounded-lg overflow-hidden shadow-sm ${theme === 'dark' ? 'bg-dark-card border border-dark-border' : 'bg-white border border-gray-200'
            }`}>
            <div className="px-6 py-16 text-center">
                <FiAlertTriangle className={`h-16 w-16 mx-auto mb-4 ${theme === 'dark' ? 'text-yellow-500' : 'text-yellow-500'
                    }`} />
                <h3 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {title} Feature Coming Soon
                </h3>
                <p className={`max-w-md mx-auto ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    We're working hard to bring you this feature. Please check back later for updates!
                </p>
            </div>
        </div>
    );
};

export default AccountPage;