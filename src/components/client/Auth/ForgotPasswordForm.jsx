import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiMail, FiCheck } from 'react-icons/fi';
import { useAuth } from '../../../context/AuthContext';
import AuthForm from '../../shared/AuthForm';
import InputGroup from '../../shared/InputGroup';
import Loader from '../../shared/Loader';
import AuthPage from './AuthPage';

/**
 * ForgotPassword form component for password reset
 */
const ForgotPasswordForm = () => {
    const { resetPassword } = useAuth();

    // Form state
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [emailError, setEmailError] = useState('');

    // Handle input change
    const handleChange = (e) => {
        setEmail(e.target.value);

        // Clear errors when user types
        if (emailError) setEmailError('');
        if (error) setError('');
    };

    // Validate form
    const validateForm = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email.trim()) {
            setEmailError('Email is required');
            return false;
        } else if (!emailRegex.test(email)) {
            setEmailError('Please enter a valid email address');
            return false;
        }

        return true;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form
        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            // Attempt password reset
            const result = await resetPassword(email);

            if (result.success) {
                // Show success message
                setSuccess(true);
            } else {
                // Show error message
                setError(result.error || 'Password reset failed. Please try again.');
            }
        } catch (error) {
            setError('An unexpected error occurred. Please try again.');
            console.error('Password reset error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthPage>
            <AuthForm
                title="Reset your password"
                subtitle="Enter your email and we'll send you instructions to reset your password"
                onSubmit={handleSubmit}
                error={error}
                loading={loading}
                footer={
                    <>
                        <p>
                            Remember your password?{' '}
                            <Link to="/login" className="text-primary hover:text-primary-dark font-medium transition-colors duration-200">
                                Back to login
                            </Link>
                        </p>
                    </>
                }
            >
                {success ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="p-4 rounded-md bg-green-50 dark:bg-green-900 dark:bg-opacity-20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 flex items-start"
                    >
                        <FiCheck className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                            <p className="font-medium">Password reset email sent!</p>
                            <p className="mt-1 text-sm">
                                Check your email inbox for instructions to reset your password. If you don't see it, check your spam folder.
                            </p>
                        </div>
                    </motion.div>
                ) : (
                    <>
                        {/* Email input */}
                        <InputGroup
                            id="email"
                            label="Email address"
                            type="email"
                            name="email"
                            value={email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            error={emailError}
                            required
                            autoComplete="email"
                            icon={<FiMail className="h-5 w-5" />}
                        />

                        {/* Submit button */}
                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            disabled={loading}
                            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center mt-2"
                        >
                            {loading ? <Loader size="small" /> : 'Send reset instructions'}
                        </motion.button>
                    </>
                )}
            </AuthForm>
        </AuthPage>
    );
};

export default ForgotPasswordForm;