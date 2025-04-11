import React from 'react';
import Carousel from '../../shared/Carousel';

/**
 * Banner Section component for homepage
 * Features a carousel of promotional banners
 */
const BannerSection = () => {
  // Mock data for banner slides
  const bannerSlides = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1607082350899-7e105aa886ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      title: 'Spring Collection',
      subtitle: 'Discover new arrivals for the season',
      ctaText: 'Shop Now',
      ctaLink: '/collections/spring'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      title: 'Summer Sale',
      subtitle: 'Up to 50% off on selected items',
      ctaText: 'View Sale',
      ctaLink: '/collections/sale'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      title: 'New Arrivals',
      subtitle: 'Be the first to get our latest products',
      ctaText: 'Explore',
      ctaLink: '/collections/new'
    }
  ];

  return (
    <section className="w-full h-auto mt-16">
      <Carousel slides={bannerSlides} autoPlay={true} interval={6000} />
    </section>
  );
};

export default BannerSection;