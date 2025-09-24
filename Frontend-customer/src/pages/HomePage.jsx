import React from 'react';
import { Container } from '@mui/material';
import HeroCarousel from '../components/HeroCarousel';
import MainCarousel from '../components/MainCarousel';
import Categories from '../components/Categories';
import LatestProducts from '../components/LatestProducts';
import TestimonialCarousel from '../components/TestimonialCarousel';
import ShortVideos from '../components/ShortVideos';
import SocialFeed from '../components/SocialFeed';

const HomePage = () => {
  return (
    <>
      {/* --- Full-Width Sections --- */}
      <HeroCarousel />
       <Categories />
       <LatestProducts />
       <MainCarousel />
     

      {/* --- Contained-Width Sections --- */}
      {/* Remove the sx prop from this Container */}
      <Container>
      
        
        {/* <ShortVideos /> */}
        {/* <SocialFeed /> */}
      </Container>
      <TestimonialCarousel />
    </>
  );
};

export default HomePage;