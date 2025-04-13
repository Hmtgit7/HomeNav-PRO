import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiEye, FiEyeOff, FiAlertCircle } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';

/**
 * Reusable InputGroup component with label, input, and error handling
 * @param {Object} props - Component props
 * @param {string} props.id - Input id
 * @param {string} props.label - Input label
 * @param {string} props.type - Input type (text, email, password, etc.)
 * @param {string} props.name - Input name
 * @param {string} props.value - Input value
 * @param {Function} props.onChange - Input change handler
 * @param {string} props.placeholder - Input placeholder
 * @param {string} props.error - Error message
 * @param {boolean} props.required - Is input required
 * @param {string} props.className - Additional CSS classes
 * @param {Object} props.icon - Icon component to show in the input
 * @param {boolean} props.disabled - Is input disabled
 */
const InputGroup = ({
    id,
    label,
    type = 'text',
    name,
    value,
    onChange,
    placeholder,
    error,
    required = false,
    className = '',
    icon,
    disabled = false,
    ...rest
}) => {
    const { theme } = useTheme();
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    // Determine the actual input type (for password toggle)
    const inputType = type === 'password' && showPassword ? 'text' : type;

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className={`mb-4 ${className}`}>
            {/* Label */}
            {label && (
                <label
                    htmlFor={id}
                    className={`block mb-2 text-sm font-medium ${error
                            ? 'text-red-500'
                            : theme === 'dark'
                                ? 'text-gray-200'
                                : 'text-gray-700'
                        }`}
                >
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}

            {/* Input container */}
            <div className="relative">
                {/* Icon (if provided) */}
                {icon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className={`text-gray-500 ${theme === 'dark' ? 'text-gray-400' : ''}`}>
                            {icon}
                        </span>
                    </div>
                )}

                {/* Input element */}
                <motion.input
                    id={id}
                    type={inputType}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    whileFocus={{ scale: 1.01 }}
                    className={`block w-full rounded-md shadow-sm ${icon ? 'pl-10' : 'pl-3'
                        } pr-10 py-2 ${error
                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                            : isFocused
                                ? 'border-primary focus:border-primary focus:ring-primary'
                                : 'border-gray-300 focus:border-primary focus:ring-primary'
                        } ${theme === 'dark'
                            ? 'bg-dark-card border-dark-border text-white placeholder-gray-400'
                            : 'bg-white text-gray-900 placeholder-gray-400'
                        } ${disabled
                            ? 'opacity-60 cursor-not-allowed'
                            : ''
                        }`}
                    {...rest}
                />

                {/* Password toggle button */}
                {type === 'password' && (
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 transition-colors duration-200"
                        tabIndex="-1"
                    >
                        {showPassword ? <FiEyeOff className="h-5 w-5" /> : <FiEye className="h-5 w-5" />}
                    </button>
                )}

                {/* Error icon */}
                {error && type !== 'password' && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <FiAlertCircle className="h-5 w-5 text-red-500" />
                    </div>
                )}
            </div>

            {/* Error message */}
            {error && (
                <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 text-sm text-red-500"
                >
                    {error}
                </motion.p>
            )}
        </div>
    );
};

export default InputGroup;