import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiPhone, FiMap, FiEdit, FiSave, FiX, FiCheck } from 'react-icons/fi';
import { useAuth } from '../../../context/AuthContext';
import InputGroup from '../../shared/InputGroup';
import { useTheme } from '../../../context/ThemeContext';
import Loader from '../../shared/Loader';

/**
 * UserProfile component for displaying and editing user profile information
 */
const UserProfile = () => {
    const { currentUser, updateProfile } = useAuth();
    const { theme } = useTheme();

    // Form state
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: currentUser?.firstName || '',
        lastName: currentUser?.lastName || '',
        email: currentUser?.email || '',
        phone: currentUser?.phone || '',
        address: {
            street: currentUser?.address?.street || '',
            city: currentUser?.address?.city || '',
            state: currentUser?.address?.state || '',
            zipCode: currentUser?.address?.zipCode || '',
            country: currentUser?.address?.country || ''
        }
    });

    // State for form submission
    const [errors, setErrors] = useState({});
    const [formError, setFormError] = useState('');
    const [formSuccess, setFormSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    // Handle form input change
    const handleChange = (e) => {
        const { name, value } = e.target;

        // Handle nested address properties
        if (name.startsWith('address.')) {
            const addressField = name.split('.')[1];
            setFormData((prev) => ({
                ...prev,
                address: {
                    ...prev.address,
                    [addressField]: value
                }
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value
            }));
        }

        // Clear field-specific error when user types
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }

        // Clear form messages when user types
        if (formError) setFormError('');
        if (formSuccess) setFormSuccess('');
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

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Toggle edit mode
    const toggleEdit = () => {
        if (isEditing) {
            // Cancel editing, reset form data
            setFormData({
                firstName: currentUser?.firstName || '',
                lastName: currentUser?.lastName || '',
                email: currentUser?.email || '',
                phone: currentUser?.phone || '',
                address: {
                    street: currentUser?.address?.street || '',
                    city: currentUser?.address?.city || '',
                    state: currentUser?.address?.state || '',
                    zipCode: currentUser?.address?.zipCode || '',
                    country: currentUser?.address?.country || ''
                }
            });
            setErrors({});
            setFormError('');
            setFormSuccess('');
        }

        setIsEditing(!isEditing);
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
            // Attempt profile update
            const result = await updateProfile(formData);

            if (result.success) {
                // Show success message and exit edit mode
                setFormSuccess('Profile updated successfully');
                setIsEditing(false);
            } else {
                // Show error message
                setFormError(result.error || 'Profile update failed. Please try again.');
            }
        } catch (error) {
            setFormError('An unexpected error occurred. Please try again.');
            console.error('Profile update error:', error);
        } finally {
            setLoading(false);
        }
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
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={`rounded-lg shadow-sm overflow-hidden ${theme === 'dark' ? 'bg-dark-card border border-dark-border' : 'bg-white border border-gray-200'
                }`}
        >
            {/* Profile header */}
            <div className={`p-4 border-b ${theme === 'dark' ? 'border-dark-border bg-dark-bg' : 'border-gray-200 bg-gray-50'}`}>
                <div className="flex items-center justify-between">
                    <h2 className={`text-lg font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        Personal Information
                    </h2>

                    {/* Edit/Save buttons */}
                    <div>
                        {isEditing ? (
                            <div className="flex space-x-2">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={toggleEdit}
                                    className={`p-2 rounded-full ${theme === 'dark' ? 'bg-dark-border text-gray-300 hover:bg-dark-border hover:text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                    title="Cancel"
                                >
                                    <FiX className="h-5 w-5" />
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleSubmit}
                                    disabled={loading}
                                    className="p-2 rounded-full bg-primary text-white hover:bg-primary-dark disabled:opacity-70 disabled:cursor-not-allowed"
                                    title="Save changes"
                                >
                                    {loading ? <Loader size="small" /> : <FiSave className="h-5 w-5" />}
                                </motion.button>
                            </div>
                        ) : (
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={toggleEdit}
                                className={`p-2 rounded-full ${theme === 'dark' ? 'bg-dark-border text-gray-300 hover:bg-dark-border hover:text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                                title="Edit profile"
                            >
                                <FiEdit className="h-5 w-5" />
                            </motion.button>
                        )}
                    </div>
                </div>
            </div>

            {/* Success message */}
            {formSuccess && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-green-50 dark:bg-green-900 dark:bg-opacity-20 p-3 border-b border-green-100 dark:border-green-800 text-green-700 dark:text-green-400 flex items-center"
                >
                    <FiCheck className="h-5 w-5 mr-2" />
                    {formSuccess}
                </motion.div>
            )}

            {/* Error message */}
            {formError && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-red-50 dark:bg-red-900 dark:bg-opacity-20 p-3 border-b border-red-100 dark:border-red-800 text-red-700 dark:text-red-400 flex items-center"
                >
                    <FiX className="h-5 w-5 mr-2" />
                    {formError}
                </motion.div>
            )}

            {/* Profile form */}
            <form onSubmit={handleSubmit} className="p-4">
                <div className="space-y-6">
                    {/* Personal details section */}
                    <motion.div variants={itemVariants} className="space-y-4">
                        <h3 className={`text-base font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                            Address Information
                        </h3>

                        {isEditing ? (
                            <div>
                                <div className="mb-4">
                                    <InputGroup
                                        id="street"
                                        label="Street address"
                                        type="text"
                                        name="address.street"
                                        value={formData.address.street}
                                        onChange={handleChange}
                                        placeholder="Enter your street address"
                                        error={errors['address.street']}
                                        icon={<FiMap className="h-5 w-5" />}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <InputGroup
                                        id="city"
                                        label="City"
                                        type="text"
                                        name="address.city"
                                        value={formData.address.city}
                                        onChange={handleChange}
                                        placeholder="Your city"
                                        error={errors['address.city']}
                                    />

                                    <InputGroup
                                        id="state"
                                        label="State / Province"
                                        type="text"
                                        name="address.state"
                                        value={formData.address.state}
                                        onChange={handleChange}
                                        placeholder="Your state or province"
                                        error={errors['address.state']}
                                    />

                                    <InputGroup
                                        id="zipCode"
                                        label="ZIP / Postal code"
                                        type="text"
                                        name="address.zipCode"
                                        value={formData.address.zipCode}
                                        onChange={handleChange}
                                        placeholder="ZIP or postal code"
                                        error={errors['address.zipCode']}
                                    />

                                    <InputGroup
                                        id="country"
                                        label="Country"
                                        type="text"
                                        name="address.country"
                                        value={formData.address.country}
                                        onChange={handleChange}
                                        placeholder="Your country"
                                        error={errors['address.country']}
                                    />
                                </div>
                            </div>
                        ) : (
                            <div>
                                <div className="flex">
                                    <FiMap className={`h-5 w-5 mr-3 mt-0.5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                                    <div className="flex-1">
                                        <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Shipping address</p>

                                        {currentUser?.address?.street ? (
                                            <div className={`mt-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                                <p>{currentUser.address.street}</p>
                                                <p>
                                                    {currentUser.address.city}{currentUser.address.city && currentUser.address.state ? ', ' : ''}
                                                    {currentUser.address.state} {currentUser.address.zipCode}
                                                </p>
                                                <p>{currentUser.address.country}</p>
                                            </div>
                                        ) : (
                                            <p className={`mt-1 italic ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                                No address provided
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>

                {/* Mobile save button (shown only in edit mode) */}
                {isEditing && (
                    <div className="mt-8">
                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            disabled={loading}
                            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
                        >
                            {loading ? <Loader size="small" /> : 'Save changes'}
                        </motion.button>

                        <motion.button
                            type="button"
                            onClick={toggleEdit}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            className={`mt-3 w-full py-2 px-4 border rounded-md shadow-sm ${theme === 'dark'
                                    ? 'border-dark-border bg-dark-bg text-gray-300 hover:bg-dark-border'
                                    : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200`}
                        >
                            Cancel
                        </motion.button>
                    </div>
                )}
            </form>
        </motion.div>
    );
};

export default UserProfile;