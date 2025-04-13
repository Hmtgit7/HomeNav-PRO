import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

/**
 * Reusable authentication form container
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Form content
 * @param {string} props.title - Form title
 * @param {string} props.subtitle - Form subtitle
 * @param {Function} props.onSubmit - Form submit handler
 * @param {string} props.error - Form-level error message
 * @param {boolean} props.loading - Loading state
 * @param {React.ReactNode} props.footer - Form footer content
 */
const AuthForm = ({
    children,
    title,
    subtitle,
    onSubmit,
    error,
    loading = false,
    footer
}) => {
    const { theme } = useTheme();

    // Animation variants
    const formVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.4,
                when: "beforeChildren",
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            variants={formVariants}
            initial="hidden"
            animate="visible"
            className={`max-w-md w-full mx-auto p-6 rounded-lg shadow-lg ${theme === 'dark' ? 'bg-dark-card' : 'bg-white'
                }`}
        >
            {/* Form Header */}
            <motion.div variants={itemVariants} className="text-center mb-6">
                {title && (
                    <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {title}
                    </h2>
                )}

                {subtitle && (
                    <p className={`mt-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        {subtitle}
                    </p>
                )}
            </motion.div>

            {/* Form Error */}
            {error && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 p-3 rounded-md bg-red-50 dark:bg-red-900 dark:bg-opacity-20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400"
                >
                    {error}
                </motion.div>
            )}

            {/* Form Content */}
            <motion.form
                onSubmit={onSubmit}
                variants={itemVariants}
                className="space-y-4"
                noValidate
            >
                {children}
            </motion.form>

            {/* Form Footer */}
            {footer && (
                <motion.div
                    variants={itemVariants}
                    className={`mt-6 pt-4 text-center text-sm ${theme === 'dark' ? 'text-gray-400 border-t border-dark-border' : 'text-gray-600 border-t border-gray-200'
                        }`}
                >
                    {footer}
                </motion.div>
            )}
        </motion.div>
    );
};

export default AuthForm;