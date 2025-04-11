import React from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiFacebook, FiTwitter, FiInstagram, FiYoutube } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';

const Footer = () => {
  const { theme } = useTheme();
  
  // Footer columns
  const footerSections = [
    {
      title: 'Shop',
      links: [
        { name: 'New Arrivals', url: '/shop/new' },
        { name: 'Best Sellers', url: '/shop/best-sellers' },
        { name: 'Sale Items', url: '/shop/sale' },
        { name: 'Gift Cards', url: '/shop/gift-cards' },
      ]
    },
    {
      title: 'Customer Service',
      links: [
        { name: 'Contact Us', url: '/contact' },
        { name: 'Shipping & Returns', url: '/shipping' },
        { name: 'FAQ', url: '/faq' },
        { name: 'Track Order', url: '/track-order' },
      ]
    },
    {
      title: 'About Us',
      links: [
        { name: 'Our Story', url: '/about' },
        { name: 'Locations', url: '/locations' },
        { name: 'Careers', url: '/careers' },
        { name: 'Blog', url: '/blog' },
      ]
    }
  ];
  
  // Social media links
  const socialLinks = [
    { name: 'Facebook', icon: <FiFacebook />, url: '#' },
    { name: 'Twitter', icon: <FiTwitter />, url: '#' },
    { name: 'Instagram', icon: <FiInstagram />, url: '#' },
    { name: 'YouTube', icon: <FiYoutube />, url: '#' },
  ];

  // Contact information
  const contactInfo = [
    { icon: <FiMail />, text: 'support@shopify-store.com' },
    { icon: <FiPhone />, text: '+1 (555) 123-4567' },
    { icon: <FiMapPin />, text: '123 Commerce St, New York, NY' },
  ];

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
    <footer className={`mt-20 pt-16 ${theme === 'dark' ? 'bg-dark-bg text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
      <div className="container mx-auto px-4">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12"
        >
          {/* Company Info */}
          <motion.div variants={itemVariants}>
            <h2 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>ShopifyStore</h2>
            <p className="mb-6">Your premium destination for quality products and exceptional shopping experience.</p>
            
            <div className="space-y-3">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-center">
                  <span className="mr-3 text-primary">{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
          
          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <motion.div key={index} variants={itemVariants}>
              <h3 className={`text-lg font-semibold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a 
                      href={link.url}
                      className={`hover:text-primary transition-colors duration-200 ${
                        theme === 'dark' ? 'hover:text-primary-light' : 'hover:text-primary'
                      }`}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Newsletter and Social Media */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className={`py-8 border-t ${theme === 'dark' ? 'border-dark-border' : 'border-gray-200'}`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Newsletter */}
            <motion.div variants={itemVariants}>
              <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Subscribe to our newsletter</h3>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className={`px-4 py-2 w-full rounded-l-md focus:outline-none ${
                    theme === 'dark' ? 'bg-dark-card border border-dark-border text-white' : 'bg-white border border-gray-300'
                  }`} 
                />
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-2 rounded-r-md transition-colors duration-300"
                >
                  Subscribe
                </motion.button>
              </div>
            </motion.div>
            
            {/* Social Media */}
            <motion.div variants={itemVariants} className="flex justify-start md:justify-end">
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center justify-center w-10 h-10 rounded-full ${
                      theme === 'dark' 
                        ? 'bg-dark-border text-white hover:bg-primary' 
                        : 'bg-gray-200 text-gray-700 hover:bg-primary hover:text-white'
                    } transition-colors duration-300`}
                    aria-label={social.name}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Copyright */}
        <motion.div 
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className={`py-6 text-center text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}
        >
          <p>&copy; {new Date().getFullYear()} ShopifyStore. All rights reserved.</p>
          <div className="mt-2 flex justify-center space-x-4">
            <a href="/privacy-policy" className="hover:text-primary transition-colors duration-200">Privacy Policy</a>
            <a href="/terms-of-service" className="hover:text-primary transition-colors duration-200">Terms of Service</a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;