import React from 'react';
import { motion } from 'framer-motion';
import { FiPackage, FiCalendar, FiDollarSign, FiClock } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';

/**
 * OrderItemCard component for displaying order information
 * @param {Object} props - Component props
 * @param {Object} props.order - Order data
 * @param {Function} props.onClick - Click handler
 */
const OrderItemCard = ({ order, onClick }) => {
    const { theme } = useTheme();

    // Get appropriate status badge class
    const getStatusClass = (status) => {
        switch (status.toLowerCase()) {
            case 'delivered':
                return 'bg-green-100 text-green-800 dark:bg-green-900 dark:bg-opacity-30 dark:text-green-400';
            case 'shipped':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:bg-opacity-30 dark:text-blue-400';
            case 'processing':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:bg-opacity-30 dark:text-yellow-400';
            case 'canceled':
                return 'bg-red-100 text-red-800 dark:bg-red-900 dark:bg-opacity-30 dark:text-red-400';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
        }
    };

    // Format date
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    return (
        <motion.div
            whileHover={{ y: -4 }}
            className={`border rounded-lg overflow-hidden shadow-sm ${theme === 'dark' ? 'bg-dark-card border-dark-border' : 'bg-white border-gray-200'
                } transition-all duration-200 cursor-pointer`}
            onClick={() => onClick && onClick(order)}
        >
            <div className={`p-4 ${theme === 'dark' ? 'border-dark-border' : 'border-gray-100'}`}>
                <div className="flex flex-wrap justify-between items-start gap-2">
                    {/* Order ID and Status */}
                    <div>
                        <h3 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            Order #{order.orderNumber}
                        </h3>
                        <div className="flex items-center mt-1 text-sm text-gray-500 dark:text-gray-400">
                            <FiPackage className="mr-1 h-4 w-4" />
                            <span>{order.items.length} item{order.items.length !== 1 ? 's' : ''}</span>
                        </div>
                    </div>

                    {/* Status Badge */}
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusClass(order.status)}`}>
                        {order.status}
                    </span>
                </div>

                {/* Order Date and Total */}
                <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="flex items-center">
                        <FiCalendar className={`mr-2 h-4 w-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                        <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                            {formatDate(order.date)}
                        </span>
                    </div>
                    <div className="flex items-center">
                        <FiDollarSign className={`mr-2 h-4 w-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                        <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                            ${order.total.toFixed(2)}
                        </span>
                    </div>
                </div>
            </div>

            {/* Order Items Preview */}
            <div className={`px-4 py-3 ${theme === 'dark' ? 'bg-dark-bg' : 'bg-gray-50'} border-t ${theme === 'dark' ? 'border-dark-border' : 'border-gray-100'}`}>
                <div className="flex items-center">
                    <div className="flex overflow-hidden">
                        {order.items.slice(0, 3).map((item, index) => (
                            <div
                                key={index}
                                className="w-10 h-10 rounded-md overflow-hidden border-2 border-white dark:border-dark-bg -ml-2 first:ml-0"
                                style={{ zIndex: 3 - index }}
                            >
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                        {order.items.length > 3 && (
                            <div
                                className={`w-10 h-10 rounded-md -ml-2 flex items-center justify-center text-xs font-medium ${theme === 'dark' ? 'bg-dark-border text-white' : 'bg-gray-200 text-gray-700'
                                    } border-2 border-white dark:border-dark-bg`}
                                style={{ zIndex: 0 }}
                            >
                                +{order.items.length - 3}
                            </div>
                        )}
                    </div>

                    <div className="ml-auto flex items-center">
                        <FiClock className={`mr-1 h-4 w-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                        <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                            {order.deliveryEstimate}
                        </span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default OrderItemCard;