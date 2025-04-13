import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiFilter, FiChevronDown, FiX, FiEye, FiPackage } from 'react-icons/fi';
import OrderItemCard from '../../shared/OrderItemCard';
import Loader from '../../shared/Loader';
import { useTheme } from '../../../context/ThemeContext';

/**
 * OrderHistory component for displaying user order history
 */
const OrderHistory = () => {
    const { theme } = useTheme();

    // Component state
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [showFilterMenu, setShowFilterMenu] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    // List of order status filters
    const statusFilters = [
        { value: 'all', label: 'All Orders' },
        { value: 'delivered', label: 'Delivered' },
        { value: 'shipped', label: 'Shipped' },
        { value: 'processing', label: 'Processing' },
        { value: 'canceled', label: 'Canceled' }
    ];

    // Fetch orders data
    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);

            try {
                // Mock API call to fetch orders
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Mock order data
                const mockOrders = [
                    {
                        id: '1',
                        orderNumber: 'ORD10092',
                        date: '2023-05-15T08:30:00Z',
                        status: 'Delivered',
                        total: 149.99,
                        deliveryEstimate: 'Delivered on May 20, 2023',
                        items: [
                            { id: '1', name: 'Premium T-Shirt', price: 29.99, quantity: 2, image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
                            { id: '2', name: 'Wireless Headphones', price: 89.99, quantity: 1, image: 'https://images.unsplash.com/photo-1605464315542-bda3e2f4e605?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }
                        ]
                    },
                    {
                        id: '2',
                        orderNumber: 'ORD10085',
                        date: '2023-04-29T14:45:00Z',
                        status: 'Delivered',
                        total: 49.99,
                        deliveryEstimate: 'Delivered on May 5, 2023',
                        items: [
                            { id: '3', name: 'Minimalist Watch', price: 49.99, quantity: 1, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }
                        ]
                    },
                    {
                        id: '3',
                        orderNumber: 'ORD10075',
                        date: '2023-04-10T11:20:00Z',
                        status: 'Canceled',
                        total: 34.99,
                        deliveryEstimate: 'Canceled on April 12, 2023',
                        items: [
                            { id: '4', name: 'Scented Candle Set', price: 34.99, quantity: 1, image: 'https://images.unsplash.com/photo-1584592740039-cddf0671f3d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }
                        ]
                    },
                    {
                        id: '4',
                        orderNumber: 'ORD10112',
                        date: '2023-06-02T09:15:00Z',
                        status: 'Shipped',
                        total: 79.98,
                        deliveryEstimate: 'Arriving on June 7, 2023',
                        items: [
                            { id: '5', name: 'Leather Wallet', price: 39.99, quantity: 1, image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
                            { id: '6', name: 'Ceramic Plant Pot', price: 19.99, quantity: 2, image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }
                        ]
                    },
                    {
                        id: '5',
                        orderNumber: 'ORD10120',
                        date: '2023-06-10T16:30:00Z',
                        status: 'Processing',
                        total: 149.99,
                        deliveryEstimate: 'Estimated delivery June 15, 2023',
                        items: [
                            { id: '7', name: 'Smart Water Bottle', price: 45.99, quantity: 1, image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
                            { id: '8', name: 'Wireless Charging Pad', price: 34.99, quantity: 1, image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f37?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
                            { id: '9', name: 'Sustainable Tote Bag', price: 19.99, quantity: 1, image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
                            { id: '10', name: 'Smart Home Speaker', price: 49.99, quantity: 1, image: 'https://images.unsplash.com/photo-1558089687-db9280019010?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }
                        ]
                    }
                ];

                setOrders(mockOrders);
                setFilteredOrders(mockOrders);
            } catch (error) {
                console.error('Error fetching orders:', error);
                setError('Failed to load orders. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    // Filter orders when search term or status filter changes
    useEffect(() => {
        let result = orders;

        // Apply status filter
        if (filterStatus !== 'all') {
            result = result.filter(order =>
                order.status.toLowerCase() === filterStatus.toLowerCase()
            );
        }

        // Apply search term filter
        if (searchTerm) {
            const searchLower = searchTerm.toLowerCase();
            result = result.filter(order =>
                order.orderNumber.toLowerCase().includes(searchLower) ||
                order.items.some(item => item.name.toLowerCase().includes(searchLower))
            );
        }

        setFilteredOrders(result);
    }, [orders, searchTerm, filterStatus]);

    // Handle order card click
    const handleOrderClick = (order) => {
        setSelectedOrder(order);
    };

    // Close order details modal
    const closeOrderDetails = () => {
        setSelectedOrder(null);
    };

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
        <div>
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <motion.h2
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`text-2xl font-bold mb-4 md:mb-0 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
                >
                    Order History
                </motion.h2>

                {/* Search and filters */}
                <div className="flex flex-col sm:flex-row gap-3">
                    {/* Search input */}
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiSearch className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                        </div>
                        <input
                            type="text"
                            placeholder="Search orders..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={`pl-10 pr-4 py-2 w-full rounded-md shadow-sm ${theme === 'dark'
                                    ? 'bg-dark-card border-dark-border text-white placeholder-gray-400 focus:border-primary focus:ring-primary'
                                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-primary focus:ring-primary'
                                }`}
                        />
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm('')}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            >
                                <FiX className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`} />
                            </button>
                        )}
                    </div>

                    {/* Status filter dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setShowFilterMenu(!showFilterMenu)}
                            className={`flex items-center justify-between px-4 py-2 w-full sm:w-auto rounded-md shadow-sm ${theme === 'dark'
                                    ? 'bg-dark-card border border-dark-border text-white hover:bg-dark-border'
                                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            <div className="flex items-center">
                                <FiFilter className="mr-2 h-5 w-5" />
                                <span>
                                    {statusFilters.find(filter => filter.value === filterStatus)?.label || 'All Orders'}
                                </span>
                            </div>
                            <FiChevronDown className={`ml-2 h-5 w-5 transition-transform ${showFilterMenu ? 'transform rotate-180' : ''}`} />
                        </button>

                        {/* Filter dropdown menu */}
                        <AnimatePresence>
                            {showFilterMenu && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg z-10 ${theme === 'dark' ? 'bg-dark-card border border-dark-border' : 'bg-white border border-gray-100'
                                        }`}
                                >
                                    <div className="py-1">
                                        {statusFilters.map((filter) => (
                                            <button
                                                key={filter.value}
                                                onClick={() => {
                                                    setFilterStatus(filter.value);
                                                    setShowFilterMenu(false);
                                                }}
                                                className={`block px-4 py-2 text-sm w-full text-left ${filterStatus === filter.value
                                                        ? 'bg-primary bg-opacity-10 text-primary'
                                                        : theme === 'dark'
                                                            ? 'text-gray-300 hover:bg-dark-border'
                                                            : 'text-gray-700 hover:bg-gray-50'
                                                    }`}
                                            >
                                                {filter.label}
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Order list */}
            {loading ? (
                <div className="flex justify-center items-center py-12">
                    <Loader size="medium" />
                </div>
            ) : error ? (
                <div className={`rounded-md p-4 ${theme === 'dark' ? 'bg-dark-card border border-dark-border text-red-400' : 'bg-red-50 border border-red-200 text-red-700'}`}>
                    <p>{error}</p>
                </div>
            ) : filteredOrders.length === 0 ? (
                <div className={`rounded-md p-6 text-center ${theme === 'dark' ? 'bg-dark-card border border-dark-border' : 'bg-gray-50 border border-gray-200'}`}>
                    <FiPackage className={`h-12 w-12 mx-auto mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                    <h3 className={`text-lg font-medium mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>No orders found</h3>
                    <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                        {searchTerm || filterStatus !== 'all'
                            ? 'Try changing your search or filter criteria'
                            : 'You haven\'t placed any orders yet.'}
                    </p>
                    {(searchTerm || filterStatus !== 'all') && (
                        <button
                            onClick={() => {
                                setSearchTerm('');
                                setFilterStatus('all');
                            }}
                            className="mt-3 text-primary hover:text-primary-dark font-medium"
                        >
                            Clear filters
                        </button>
                    )}
                </div>
            ) : (
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                    {filteredOrders.map((order) => (
                        <motion.div key={order.id} variants={itemVariants}>
                            <OrderItemCard order={order} onClick={handleOrderClick} />
                        </motion.div>
                    ))}
                </motion.div>
            )}

            {/* Order details modal */}
            <AnimatePresence>
                {selectedOrder && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
                        onClick={closeOrderDetails}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className={`relative rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto ${theme === 'dark' ? 'bg-dark-bg' : 'bg-white'
                                }`}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal header */}
                            <div className={`px-6 py-4 border-b ${theme === 'dark' ? 'border-dark-border' : 'border-gray-200'}`}>
                                <div className="flex items-center justify-between">
                                    <h3 className={`text-lg font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                        Order #{selectedOrder.orderNumber}
                                    </h3>
                                    <button
                                        onClick={closeOrderDetails}
                                        className={`rounded-full p-1 ${theme === 'dark'
                                                ? 'text-gray-400 hover:text-white hover:bg-dark-border'
                                                : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
                                            }`}
                                    >
                                        <FiX className="h-6 w-6" />
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-3 mt-2">
                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${selectedOrder.status.toLowerCase() === 'delivered'
                                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:bg-opacity-30 dark:text-green-400'
                                            : selectedOrder.status.toLowerCase() === 'shipped'
                                                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:bg-opacity-30 dark:text-blue-400'
                                                : selectedOrder.status.toLowerCase() === 'processing'
                                                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:bg-opacity-30 dark:text-yellow-400'
                                                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:bg-opacity-30 dark:text-red-400'
                                        }`}>
                                        {selectedOrder.status}
                                    </span>
                                    <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                        Ordered on {new Date(selectedOrder.date).toLocaleDateString('en-US', {
                                            year: 'numeric', month: 'long', day: 'numeric'
                                        })}
                                    </span>
                                </div>
                            </div>

                            {/* Modal body */}
                            <div className="px-6 py-4">
                                {/* Delivery estimate */}
                                <div className={`mb-4 p-3 rounded-md ${theme === 'dark' ? 'bg-dark-card' : 'bg-gray-50'
                                    }`}>
                                    <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                                        {selectedOrder.deliveryEstimate}
                                    </p>
                                </div>

                                {/* Order items */}
                                <h4 className={`font-medium mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                    Items in your order
                                </h4>
                                <ul className={`divide-y ${theme === 'dark' ? 'divide-dark-border' : 'divide-gray-200'}`}>
                                    {selectedOrder.items.map((item) => (
                                        <li key={item.id} className="py-4 flex">
                                            <div className="flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border border-gray-200 dark:border-dark-border">
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="ml-4 flex-1">
                                                <div className="flex justify-between">
                                                    <h5 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                                        {item.name}
                                                    </h5>
                                                    <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                                        ${(item.price * item.quantity).toFixed(2)}
                                                    </p>
                                                </div>
                                                <div className="flex justify-between mt-1">
                                                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                                        Qty: {item.quantity}
                                                    </p>
                                                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                                        ${item.price.toFixed(2)} each
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>

                                {/* Order summary */}
                                <div className={`mt-6 pt-6 border-t ${theme === 'dark' ? 'border-dark-border' : 'border-gray-200'}`}>
                                    <div className="flex justify-between mb-2">
                                        <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>Subtotal</p>
                                        <p className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                                            ${selectedOrder.total.toFixed(2)}
                                        </p>
                                    </div>
                                    <div className="flex justify-between mb-2">
                                        <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>Shipping</p>
                                        <p className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>$0.00</p>
                                    </div>
                                    <div className="flex justify-between mb-2">
                                        <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>Tax</p>
                                        <p className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>$0.00</p>
                                    </div>
                                    <div className="flex justify-between pt-2 border-t border-dashed mt-2 mb-2 font-medium text-lg">
                                        <p>Total</p>
                                        <p className="text-primary">
                                            ${selectedOrder.total.toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Modal footer */}
                            <div className={`px-6 py-4 border-t ${theme === 'dark' ? 'border-dark-border' : 'border-gray-200'} flex justify-end`}>
                                <button
                                    onClick={closeOrderDetails}
                                    className={`px-4 py-2 rounded-md shadow-sm ${theme === 'dark'
                                            ? 'bg-dark-card hover:bg-dark-border text-white'
                                            : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                                        }`}
                                >
                                    Close
                                </button>
                                <motion.a
                                    href="#"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="ml-3 px-4 py-2 rounded-md shadow-sm bg-primary text-white hover:bg-primary-dark flex items-center"
                                >
                                    <FiEye className="mr-2 h-4 w-4" />
                                    View Invoice
                                </motion.a>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default OrderHistory;