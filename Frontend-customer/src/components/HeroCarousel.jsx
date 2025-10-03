import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import { Box, Typography, Button, Skeleton } from '@mui/material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './HeroCarousel.css';
import api from '../api/axiosConfig';

// Data fetch function
const fetchHeroSlides = async () => {
  const { data } = await api.get('/api/hero-carousel');
  return data;
};

const HeroCarousel = () => {
  const { data: slides, isLoading } = useQuery({ 
    queryKey: ['heroSlides'], 
    queryFn: fetchHeroSlides 
  });

  const settings = {
     dots: true,
  infinite: true,
  speed: 1000,         // Transition speed (1s)
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000, // Image kitne time tak dikhni chahiye (5 sec)
  fade: true,
  pauseOnHover: true,
  };
  
  const validSlides = slides?.filter(slide => slide && slide.image);

  if (isLoading) {
    return <Skeleton variant="rectangular" sx={{ height: { xs: '50vh', md: '80vh' } }} />;
  }

  if (!validSlides || validSlides.length === 0) return null;

  return (
    <Box className="hero-carousel-container">
      <Slider {...settings}>
        {validSlides.map(slide => {
          const Wrapper = slide.link ? Link : 'div';
          return (
            <Box key={slide._id} component={Wrapper} to={slide.link || undefined} className="hero-slide-item">
              <Box
                className="hero-slide-background"
                sx={{ backgroundImage: `url(${import.meta.env.VITE_API_URL}${slide.image})` }}
              />
              <Box className="hero-slide-overlay" />
              <Box className="hero-slide-content">
               
                <Typography variant="h5"
    paragraph
    sx={{
      textAlign: 'center',
      color: '#fff',
      fontSize: { xs: '1rem', md: '1.5rem' },
      lineHeight: 1.4,
      maxWidth: '700px',
      margin: '0 auto',
      textShadow: '1px 1px 6px rgba(0,0,0,0.7)',
      animation: 'fadeInUp 1.5s ease-out',}}
                >
                  {slide.caption}
                </Typography>
                {slide.link && (
                  <Button className="hero-slide-btn">
                    Shop Now
                  </Button>
                )}
              </Box>
            </Box>
          );
        })}
      </Slider>
    </Box>
  );
};

export default HeroCarousel;
