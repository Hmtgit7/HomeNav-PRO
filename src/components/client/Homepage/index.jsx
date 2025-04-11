import React from 'react';
import BannerSection from './BannerSection';
import CategorySection from './CategorySection';
import FeatureSection from './FeatureSection';

/**
 * Main HomePage component that combines all homepage sections
 */
const HomePage = () => {
  return (
    <div className="min-h-screen">
      <BannerSection />
      <FeatureSection />
      <CategorySection />
    </div>
  );
};

export default HomePage;