import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiCheck, FiAlertCircle } from 'react-icons/fi';
import { useTheme } from '../../../context/ThemeContext';

/**
 * NewsletterSection component for email signup with promotional content
 */
const NewsletterSection = () => {
    const { theme } = useTheme();
    const [email, setEmail] = useState('');
    const [submitStatus, setSubmitStatus] = useState(null); // null, 'success', 'error'

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setSubmitStatus('error');
            return;
        }

        // Simulate successful submission
        setSubmitStatus('success');
        setEmail('');

        // Reset status after 3 seconds
        setTimeout(() => {
            setSubmitStatus(null);
        }, 3000);
    };

    return (
        <section className={`py-16 ${theme === 'dark' ? 'bg-dark-bg' : 'bg-white'}`}>
            <div className="container mx-auto px-4">
                <div className={`rounded-xl overflow-hidden ${theme === 'dark' ? 'bg-gradient-to-r from-gray-800 to-dark-card' : 'bg-gradient-to-r from-indigo-600 to-primary'
                    }`}>
                    <div className="grid md:grid-cols-2 gap-0">
                        {/* Left side: Image */}
                        <div className="relative h-64 md:h-auto overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
                                alt="Newsletter Signup"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-60"></div>
                            <div className="absolute inset-0 flex items-center justify-center p-8">
                                <div className="text-white max-w-md">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <h3 className="text-3xl font-bold mb-3">Get 15% Off</h3>
                                        <p className="text-lg mb-4">Sign up for our newsletter and receive a discount on your first order!</p>
                                    </motion.div>
                                </div>
                            </div>
                        </div>

                        {/* Right side: Form */}
                        <div className="p-8 md:p-12 flex items-center">
                            <div className="w-full max-w-md mx-auto">
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                >
                                    <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white">
                                        Subscribe to Our Newsletter
                                    </h3>
                                    <p className="text-white opacity-90 mb-6">
                                        Stay updated with our latest products, exclusive offers, and style tips.
                                    </p>

                                    <form onSubmit={handleSubmit}>
                                        <div className="flex flex-col space-y-4">
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <FiMail className="h-5 w-5 text-gray-400" />
                                                </div>
                                                <input
                                                    type="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    placeholder="Your email address"
                                                    className="pl-10 pr-4 py-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm text-white placeholder-gray-300 border border-white border-opacity-20"
                                                    required
                                                />
                                            </div>

                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                type="submit"
                                                className="py-3 px-6 rounded-md bg-white text-primary font-semibold hover:bg-opacity-90 transition duration-300"
                                            >
                                                Subscribe Now
                                            </motion.button>
                                        </div>

                                        {/* Status messages */}
                                        {submitStatus === 'success' && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="mt-4 flex items-center text-green-400"
                                            >
                                                <FiCheck className="mr-2" />
                                                <span>Thank you for subscribing!</span>
                                            </motion.div>
                                        )}

                                        {submitStatus === 'error' && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="mt-4 flex items-center text-red-400"
                                            >
                                                <FiAlertCircle className="mr-2" />
                                                <span>Please enter a valid email address.</span>
                                            </motion.div>
                                        )}

                                        <p className="mt-4 text-xs text-white opacity-80">
                                            By subscribing, you agree to our Privacy Policy and consent to receive marketing emails.
                                        </p>
                                    </form>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NewsletterSection;