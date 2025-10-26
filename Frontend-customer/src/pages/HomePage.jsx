import React from 'react';
import { Container , useMediaQuery } from '@mui/material';
import HeroCarousel from '../components/HeroCarousel';
import MainCarousel from '../components/MainCarousel';
import Categories from '../components/Categories';
import LatestProducts from '../components/LatestProducts';
import TestimonialCarousel from '../components/TestimonialCarousel';
// import ShortVideos from '../components/ShortVideos';
import SocialFeed from '../components/SocialFeed';
// import GalleryPage from './GalleryPage';
import MobileHeroCarousel from '../components/MobileHeroCarousel';

const HomePage = () => {
  const isMobile = useMediaQuery('(max-width:768px)');
  return (
    <>
      {/* --- Full-Width Sections --- */}
      {isMobile ? <MobileHeroCarousel /> : <HeroCarousel />}
       <Categories />
       <LatestProducts />
       <MainCarousel />
      {/* <GalleryPage /> */}

      {/* --- Contained-Width Sections --- */}
      {/* Remove the sx prop from this Container */}
      <Container>
      
        
        {/* <ShortVideos /> */}
        
      </Container>
      
      <SocialFeed />
      <TestimonialCarousel />
    </>
  );
};

export default HomePage;