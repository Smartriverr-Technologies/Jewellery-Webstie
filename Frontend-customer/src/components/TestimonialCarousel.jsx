import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import { Box, Typography, Card, CardContent, Rating, CardMedia } from '@mui/material';
import { motion } from 'framer-motion';
import './TestimonialCarousel.css';
import api from '../api/axiosConfig';

const TestimonialCarousel = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const { data } = await api.get('/api/testimonials');
        setTestimonials(data);
      } catch (error) {
        console.error('Failed to fetch testimonials', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  const settings = {
    dots: true,
    infinite: testimonials.length > 5,
    speed: 600,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1400, settings: { slidesToShow: 4 } },
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  if (loading || testimonials.length === 0) return null;

  return (
    <Box
      sx={{
        py: 2,
        px: { xs: 2, sm: 4, md: 8 },
        position: "relative",
        overflow: "hidden",
        backgroundImage: `url("data:image/svg+xml;utf8,
          <svg xmlns='http://www.w3.org/2000/svg' width='1600' height='900'>
            <defs>
              <radialGradient id='grad1' cx='30%' cy='30%' r='40%'>
                <stop offset='0%' stop-color='%231976d2' stop-opacity='0.4' />
                <stop offset='100%' stop-color='%231976d2' stop-opacity='0' />
              </radialGradient>
              <radialGradient id='grad2' cx='70%' cy='60%' r='40%'>
                <stop offset='0%' stop-color='%23ff4081' stop-opacity='0.3' />
                <stop offset='100%' stop-color='%23ff4081' stop-opacity='0' />
              </radialGradient>
            </defs>
            <rect width='100%' height='100%' fill='%23ffffff' />
            <circle cx='30%' cy='30%' r='40%' fill='url(%23grad1)' />
            <circle cx='70%' cy='60%' r='40%' fill='url(%23grad2)' />
          </svg>
        ")`,
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Section Heading */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Box sx={{ textAlign: "center", mb: 6  }}>
          {/* <Typography 
            variant="h4" 
            component="h2" 
            sx={{ 
              fontWeight: 'bold',
              display: "inline-block",
              position: "relative",
              px: 2,
              '&::after': {
                content: '""',
                position: 'absolute',
                width: '60%',
                height: '4px',
                bottom: -8,
                left: '20%',
                backgroundColor: '#B8860B',
                borderRadius: '2px'
              }
            }}
          >
            What Our Customers Say
          </Typography> */}
          <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ 
                        fontWeight: 700,
                        background: 'linear-gradient(45deg, #B8860B 30%, #21CBF3 90%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        mb: 2,
                      }}>
            What Our Customers Say
                </Typography>
        </Box>
      </motion.div>

      {/* Carousel */}
      <Slider {...settings}>
        {testimonials.map((testimonial, i) => (
          <Box key={testimonial._id} sx={{ px: 1 }}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.03 }}
            >
              <Card
                sx={{
                  minHeight: 100,
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 3,
                  boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
                  background: 'rgba(255, 255, 255, 0.9)',
                  transition: 'all 0.3s ease',
                  '&:hover': { boxShadow: '0 8px 25px rgba(0,0,0,0.15)' }
                }}
              >
                {/* Rectangular Image with Overlay */}
                <Box sx={{ position: "relative" }}>
                  <CardMedia
                    component="img"
                    height="150"
                    // image={`${import.meta.env.VITE_API_URL}${testimonial.imageUrl}`}
                    image = {testimonial.imageUrl?.startsWith('http')
  ? testimonial.imageUrl
  : `${import.meta.env.VITE_API_URL}${testimonial.imageUrl}`}
                    alt={testimonial.name}
                    sx={{
                      objectFit: "cover",
                      borderTopLeftRadius: 12,
                      borderTopRightRadius: 12
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      background: "linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(0,0,0,0))",
                      borderTopLeftRadius: 12,
                      borderTopRightRadius: 12,
                    }}
                  />
                </Box>

                {/* Text Content */}
                <CardContent sx={{ textAlign: 'center', flexGrow: 1, p: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: '600', mb: 0.5 }}>
                    {testimonial.name}
                  </Typography>
                  <Rating value={testimonial.rating} readOnly size="small" sx={{ my: 0.5 }} />
                  <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                    "{testimonial.comment}"
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default TestimonialCarousel;
