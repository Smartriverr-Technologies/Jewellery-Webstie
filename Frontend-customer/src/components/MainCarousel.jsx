import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import { Box, Typography, Button, Skeleton } from '@mui/material';
import './MainCarousel.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import api from '../api/axiosConfig'; 
 
const MainCarousel = () => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const { data } = await api.get('/api/carousel');
        setSlides(data);
      } catch (error) {
        console.error('Failed to fetch carousel slides', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSlides();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    pauseOnHover: true,
  };

  if (loading) {
    return <Skeleton variant="rectangular" height="60vh" sx={{ mb: 4, borderRadius: 2 }} />;
  }
  if (slides.length === 0) {
    return null;
  }

  return (
    <Box className="carousel-container" sx={{ my: 0 }}>
      <Slider {...settings}>
        {slides.map((slide) => (
          <Box key={slide._id} component={slide.link ? Link : 'div'} to={slide.link || undefined} className="slide-item">
            <Box
              className="slide-background"
              // 
              sx={{ backgroundImage: `url(${slide.image})` }}
            />
            <Box className="slide-content">
              <Typography variant="h2" component="h2" color="white" gutterBottom sx={{ fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>
                {slide.headline}
              </Typography>
              <Typography variant="h5" color="white" paragraph sx={{ textShadow: '1px 1px 2px rgba(0,0,0,0.7)' }}>
                {slide.caption}
              </Typography>
              {slide.link && (
                <Button component={Link} to={slide.link} variant="contained" color="primary" size="large">
                  Shop Now
                </Button>
              )}
            </Box>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default MainCarousel;