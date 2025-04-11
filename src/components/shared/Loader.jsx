import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

/**
 * Animated Loader component
 * Used for indicating loading states throughout the application
 */
const Loader = ({ size = 'medium', fullScreen = false }) => {
    const { theme } = useTheme();

    // Define sizes
    const sizes = {
        small: 'w-6 h-6',
        medium: 'w-10 h-10',
        large: 'w-16 h-16'
    };

    // Animation variants
    const containerVariants = {
        animate: {
            rotate: 360,
            transition: {
                duration: 1.5,
                ease: "linear",
                repeat: Infinity
            }
        }
    };

    const dotVariants = {
        initial: { scale: 1 },
        animate: {
            scale: [1, 1.5, 1],
            transition: {
                duration: 1,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
            }
        }
    };

    // Dot colors based on theme
    const dotColors = theme === 'dark'
        ? ['bg-blue-400', 'bg-indigo-400', 'bg-purple-400', 'bg-pink-400']
        : ['bg-blue-500', 'bg-indigo-500', 'bg-purple-500', 'bg-pink-500'];

    const loader = (
        <div className="inline-flex items-center justify-center">
            <motion.div
                variants={containerVariants}
                animate="animate"
                className={`relative ${sizes[size]}`}
            >
                {[0, 1, 2, 3].map((i) => (
                    <motion.div
                        key={i}
                        variants={dotVariants}
                        initial="initial"
                        animate="animate"
                        custom={i}
                        className={`absolute w-3 h-3 rounded-full ${dotColors[i]}`}
                        style={{
                            top: i === 0 || i === 1 ? 0 : '100%',
                            left: i === 0 || i === 3 ? 0 : '100%',
                            transform: 'translate(-50%, -50%)',
                            animationDelay: `${i * 0.1}s`
                        }}
                    />
                ))}
            </motion.div>
        </div>
    );

    if (fullScreen) {
        return (
            <div className={`fixed inset-0 flex items-center justify-center z-50 ${theme === 'dark' ? 'bg-dark-bg bg-opacity-80' : 'bg-white bg-opacity-80'
                }`}>
                {loader}
            </div>
        );
    }

    return loader;
};

export default Loader;