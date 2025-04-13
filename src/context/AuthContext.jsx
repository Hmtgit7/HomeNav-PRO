import React, { createContext, useContext, useState, useEffect } from 'react';

// Create authentication context
const AuthContext = createContext();

/**
 * AuthProvider component for managing authentication state
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 */
export const AuthProvider = ({ children }) => {
    // User authentication state
    const [currentUser, setCurrentUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    // Initialize auth state from localStorage on component mount
    useEffect(() => {
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setCurrentUser(parsedUser);
                setIsAuthenticated(true);
            } catch (error) {
                console.error('Error parsing stored user:', error);
                localStorage.removeItem('currentUser');
            }
        }
        setLoading(false);
    }, []);

    /**
     * Login user
     * @param {Object} userData - User credentials
     * @param {string} userData.email - User email
     * @param {string} userData.password - User password
     * @returns {Promise<Object>} - Login result
     */
    const login = async (userData) => {
        setLoading(true);

        try {
            // Mock API call for login
            // In a real app, this would be an API call to your backend
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Mock validation
            if (!userData.email || !userData.password) {
                throw new Error('Email and password are required');
            }

            if (userData.email !== 'user@example.com' && userData.password !== 'password123') {
                // For demo purposes, hardcoded credentials
                // In production, this would be validated by your backend
                throw new Error('Invalid email or password');
            }

            // Mock user data
            const user = {
                id: '1',
                firstName: 'John',
                lastName: 'Doe',
                email: userData.email,
                phone: '+1 (555) 123-4567',
                address: {
                    street: '123 Main St',
                    city: 'New York',
                    state: 'NY',
                    zipCode: '10001',
                    country: 'USA'
                }
            };

            // Update auth state
            setCurrentUser(user);
            setIsAuthenticated(true);

            // Store user data in localStorage
            localStorage.setItem('currentUser', JSON.stringify(user));

            setLoading(false);
            return { success: true, user };
        } catch (error) {
            setLoading(false);
            return { success: false, error: error.message };
        }
    };

    /**
     * Register new user
     * @param {Object} userData - User registration data
     * @returns {Promise<Object>} - Registration result
     */
    const register = async (userData) => {
        setLoading(true);

        try {
            // Mock API call for registration
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Mock validation
            if (!userData.email || !userData.password || !userData.firstName || !userData.lastName) {
                throw new Error('All fields are required');
            }

            // Mock user creation
            const user = {
                id: Math.random().toString(36).substr(2, 9),
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                phone: userData.phone || '',
                address: {
                    street: '',
                    city: '',
                    state: '',
                    zipCode: '',
                    country: ''
                }
            };

            // Update auth state
            setCurrentUser(user);
            setIsAuthenticated(true);

            // Store user data in localStorage
            localStorage.setItem('currentUser', JSON.stringify(user));

            setLoading(false);
            return { success: true, user };
        } catch (error) {
            setLoading(false);
            return { success: false, error: error.message };
        }
    };

    /**
     * Reset user password
     * @param {string} email - User email
     * @returns {Promise<Object>} - Password reset result
     */
    const resetPassword = async (email) => {
        setLoading(true);

        try {
            // Mock API call for password reset
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Mock validation
            if (!email) {
                throw new Error('Email is required');
            }

            // Mock success message
            setLoading(false);
            return { success: true, message: 'Password reset link sent to your email' };
        } catch (error) {
            setLoading(false);
            return { success: false, error: error.message };
        }
    };

    /**
     * Update user profile
     * @param {Object} userData - Updated user data
     * @returns {Promise<Object>} - Update result
     */
    const updateProfile = async (userData) => {
        setLoading(true);

        try {
            // Mock API call for profile update
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Mock validation
            if (!userData.firstName || !userData.lastName || !userData.email) {
                throw new Error('Name and email are required');
            }

            // Update user data
            const updatedUser = {
                ...currentUser,
                ...userData
            };

            // Update auth state
            setCurrentUser(updatedUser);

            // Update user data in localStorage
            localStorage.setItem('currentUser', JSON.stringify(updatedUser));

            setLoading(false);
            return { success: true, user: updatedUser };
        } catch (error) {
            setLoading(false);
            return { success: false, error: error.message };
        }
    };

    /**
     * Logout user
     */
    const logout = () => {
        setCurrentUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('currentUser');
    };

    // Context value
    const value = {
        currentUser,
        isAuthenticated,
        loading,
        login,
        register,
        resetPassword,
        updateProfile,
        logout
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Custom hook for using authentication context
 * @returns {Object} Auth context value
 */
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};