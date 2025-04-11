import React from 'react';
import BannerSection from './BannerSection';
import CategorySection from './CategorySection';
import FeatureSection from './FeatureSection';
import ProductShowcase from './ProductShowcase';
import TestimonialSection from './TestimonialSection';
import NewsletterSection from './NewsletterSection';

/**
 * Main HomePage component that combines all homepage sections
 */
const HomePage = () => {
  return (
    <div className="min-h-screen">
      <BannerSection />
      <FeatureSection />
      <CategorySection />
      <ProductShowcase />
      <TestimonialSection />
      <NewsletterSection />
    </div>
  );
};

export default HomePage;