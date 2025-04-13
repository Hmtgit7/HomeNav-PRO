import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../../context/ThemeContext';

/**
 * AuthPage component serves as a container for authentication forms
 * Provides consistent styling and layout for login, register, and forgot password pages
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - The authentication form to render
 */
const AuthPage = ({ children }) => {
    const { theme } = useTheme();

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-6"
                >
                    <h1 className={`text-3xl font-extrabold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        ShopifyStore
                    </h1>
                    <p className={`mt-2 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        Your one-stop destination for quality products
                    </p>
                </motion.div>

                {children}
            </div>
        </div>
    );
};

export default AuthPage;