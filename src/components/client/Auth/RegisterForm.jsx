import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiUser, FiPhone } from 'react-icons/fi';
import { useAuth } from '../../../context/AuthContext';
import AuthForm from '../../shared/AuthForm';
import InputGroup from '../../shared/InputGroup';
import Loader from '../../shared/Loader';
import AuthPage from './AuthPage';

/**
 * Registration form component for new user signup
 */
const RegisterForm = () => {
    const navigate = useNavigate();
    const { register } = useAuth();

    // Form state
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
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
        const phoneRegex = /^\+?[0-9\s\-()]{7,20}$/;

        // Validate first name
        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First name is required';
        }

        // Validate last name
        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Last name is required';
        }

        // Validate email
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        // Validate phone (optional)
        if (formData.phone && !phoneRegex.test(formData.phone)) {
            newErrors.phone = 'Please enter a valid phone number';
        }

        // Validate password
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }

        // Validate password confirmation
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
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
            // Attempt registration
            const result = await register(formData);

            if (result.success) {
                // Redirect to account page on success
                navigate('/account');
            } else {
                // Show error message
                setFormError(result.error || 'Registration failed. Please try again.');
            }
        } catch (error) {
            setFormError('An unexpected error occurred. Please try again.');
            console.error('Registration error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthPage>
            <AuthForm
                title="Create an account"
                subtitle="Sign up to get started with your account"
                onSubmit={handleSubmit}
                error={formError}
                loading={loading}
                footer={
                    <>
                        <p>
                            Already have an account?{' '}
                            <Link to="/login" className="text-primary hover:text-primary-dark font-medium transition-colors duration-200">
                                Sign in
                            </Link>
                        </p>
                    </>
                }
            >
                {/* Name fields (2-column layout on larger screens) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* First name input */}
                    <InputGroup
                        id="firstName"
                        label="First name"
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="John"
                        error={errors.firstName}
                        required
                        icon={<FiUser className="h-5 w-5" />}
                    />

                    {/* Last name input */}
                    <InputGroup
                        id="lastName"
                        label="Last name"
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Doe"
                        error={errors.lastName}
                        required
                        icon={<FiUser className="h-5 w-5" />}
                    />
                </div>

                {/* Email input */}
                <InputGroup
                    id="email"
                    label="Email address"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    error={errors.email}
                    required
                    autoComplete="email"
                    icon={<FiMail className="h-5 w-5" />}
                />

                {/* Phone input */}
                <InputGroup
                    id="phone"
                    label="Phone number (optional)"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 123-4567"
                    error={errors.phone}
                    icon={<FiPhone className="h-5 w-5" />}
                />

                {/* Password input */}
                <InputGroup
                    id="password"
                    label="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a strong password"
                    error={errors.password}
                    required
                    autoComplete="new-password"
                    icon={<FiLock className="h-5 w-5" />}
                />

                {/* Confirm password input */}
                <InputGroup
                    id="confirmPassword"
                    label="Confirm password"
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    error={errors.confirmPassword}
                    required
                    autoComplete="new-password"
                    icon={<FiLock className="h-5 w-5" />}
                />

                {/* Terms and conditions */}
                <div className="flex items-start">
                    <div className="flex items-center h-5">
                        <input
                            id="terms"
                            name="terms"
                            type="checkbox"
                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="ml-3 text-sm">
                        <label htmlFor="terms" className="text-gray-600 dark:text-gray-300">
                            I agree to the{' '}
                            <Link to="/terms" className="text-primary hover:text-primary-dark font-medium transition-colors duration-200">
                                Terms and Conditions
                            </Link>{' '}
                            and{' '}
                            <Link to="/privacy" className="text-primary hover:text-primary-dark font-medium transition-colors duration-200">
                                Privacy Policy
                            </Link>
                        </label>
                    </div>
                </div>

                {/* Submit button */}
                <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={loading}
                    className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
                >
                    {loading ? <Loader size="small" /> : 'Create account'}
                </motion.button>
            </AuthForm>
        </AuthPage>
    );
};

export default RegisterForm;