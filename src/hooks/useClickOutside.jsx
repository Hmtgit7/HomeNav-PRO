import { useEffect, useRef } from 'react';

/**
 * Custom hook to detect clicks outside of a referenced element
 * @param {Function} handler - Function to call when a click outside is detected
 * @returns {Object} - Ref to attach to the element
 */
const useClickOutside = (handler) => {
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click was outside the referenced element
      if (ref.current && !ref.current.contains(event.target)) {
        handler();
      }
    };

    // Add event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Clean up event listener on unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handler]);

  return ref;
};

export default useClickOutside;