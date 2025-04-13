import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiAlertTriangle } from 'react-icons/fi';
import { useAuth } from '../../../context/AuthContext';
import AuthForm from '../../shared/AuthForm';
import InputGroup from '../../shared/InputGroup';
import Loader from '../../shared/Loader';
import AuthPage from './AuthPage';

/**
 * Login form component for user authentication
 */
const LoginForm = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    // Form state
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    // Error and loading states
    const [errors, setErrors] = useState({});
    const [formError, setFormError] = useState('');
    const [loading, setLoading] = useState(false);

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        // Clear field-specific error when user types
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }

        // Clear form-level error when user types
        if (formError) {
            setFormError('');
        }
    };

    // Validate form
    const validateForm = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Validate email
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        // Validate password
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
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
            // Attempt login
            const result = await login(formData);

            if (result.success) {
                // Redirect to account page on success
                navigate('/account');
            } else {
                // Show error message
                setFormError(result.error || 'Login failed. Please try again.');
            }
        } catch (error) {
            setFormError('An unexpected error occurred. Please try again.');
            console.error('Login error:', error);
        } finally {
            setLoading(false);
        }
    };

    // Demo login for testing (pre-fills with test credentials)
    const handleDemoLogin = () => {
        setFormData({
            email: 'user@example.com',
            password: 'password123'
        });
    };

    return (
        <AuthPage>
            <AuthForm
                title="Welcome back"
                subtitle="Sign in to your account to continue"
                onSubmit={handleSubmit}
                error={formError}
                loading={loading}
                footer={
                    <>
                        <p>
                            Don't have an account?{' '}
                            <Link to="/register" className="text-primary hover:text-primary-dark font-medium transition-colors duration-200">
                                Sign up
                            </Link>
                        </p>
                    </>
                }
            >
                {/* Email input */}
                <InputGroup
                    id="email"
                    label="Email address"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    error={errors.email}
                    required
                    autoComplete="email"
                    icon={<FiMail className="h-5 w-5" />}
                />

                {/* Password input */}
                <InputGroup
                    id="password"
                    label="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    error={errors.password}
                    required
                    autoComplete="current-password"
                    icon={<FiLock className="h-5 w-5" />}
                />

                {/* Remember me and forgot password */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <input
                            id="remember-me"
                            name="remember-me"
                            type="checkbox"
                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                        />
                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600 dark:text-gray-300">
                            Remember me
                        </label>
                    </div>

                    <Link
                        to="/forgot-password"
                        className="text-sm font-medium text-primary hover:text-primary-dark dark:text-primary-light dark:hover:text-primary"
                    >
                        Forgot your password?
                    </Link>
                </div>

                {/* Submit button */}
                <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={loading}
                    className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
                >
                    {loading ? <Loader size="small" /> : 'Sign in'}
                </motion.button>

                {/* Demo login button (for testing purposes) */}
                <motion.button
                    type="button"
                    onClick={handleDemoLogin}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-dark-bg hover:bg-gray-50 dark:hover:bg-dark-border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200 mt-3 flex justify-center items-center"
                >
                    <FiAlertTriangle className="mr-2 h-5 w-5 text-yellow-500" />
                    Use demo account
                </motion.button>
            </AuthForm>
        </AuthPage>
    );
};

export default LoginForm;