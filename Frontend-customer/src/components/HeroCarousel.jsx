// import React from 'react';
// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';
// import Slider from 'react-slick';
// import { Link } from 'react-router-dom';
// import { Box, Typography, Button, Skeleton } from '@mui/material';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import './HeroCarousel.css';
// import api from '../api/axiosConfig';

// // Data fetch function
// const fetchHeroSlides = async () => {
//   const { data } = await api.get('/api/hero-carousel');
//   return data;
// };

// const HeroCarousel = () => {
//   const { data: slides, isLoading } = useQuery({ 
//     queryKey: ['heroSlides'], 
//     queryFn: fetchHeroSlides 
//   });

//   const settings = {
//      dots: true,
//   infinite: true,
//   speed: 1000,         // Transition speed (1s)
//   slidesToShow: 1,
//   slidesToScroll: 1,
//   autoplay: true,
//   autoplaySpeed: 5000, // Image kitne time tak dikhni chahiye (5 sec)
//   fade: true,
//   pauseOnHover: true,
//   };
  
//   const validSlides = slides?.filter(slide => slide && slide.image);

//   if (isLoading) {
//     return <Skeleton variant="rectangular" sx={{ height: { xs: '50vh', md: '80vh' } }} />;
//   }

//   if (!validSlides || validSlides.length === 0) return null;

//   return (
//     <Box className="hero-carousel-container">
//       <Slider {...settings}>
//         {validSlides.map(slide => {
//           const Wrapper = slide.link ? Link : 'div';
//           return (
//             <Box key={slide._id} component={Wrapper} to={slide.link || undefined} className="hero-slide-item">
//               <Box
//                 className="hero-slide-background"
//                 // sx={{ backgroundImage: `url(${import.meta.env.VITE_API_URL}${slide.image})` }}
//                 sx={{ backgroundImage: `url(${slide.image})` }}
//               />
//               <Box className="hero-slide-overlay" />
//               <Box className="hero-slide-content">
               
//                 <Typography variant="h5"
//     paragraph
//     sx={{
//       textAlign: 'center',
//       color: '#fff',
//       fontSize: { xs: '1rem', md: '1.5rem' },
//       lineHeight: 1.4,
//       maxWidth: '700px',
//       margin: '0 auto',
//       textShadow: '1px 1px 6px rgba(0,0,0,0.7)',
//       animation: 'fadeInUp 1.5s ease-out',}}
//                 >
//                   {slide.caption}
//                 </Typography>
//                 {slide.link && (
//                   <Button className="hero-slide-btn">
//                     Shop Now
//                   </Button>
//                 )}
//               </Box>
//             </Box>
//           );
//         })}
//       </Slider>
//     </Box>
//   );
// };

// export default HeroCarousel;


//claude code
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import Slider from 'react-slick';
// import { Typography, Button, Box, CircularProgress } from '@mui/material';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import './HeroCarousel.css';
// import api from '../api/axiosConfig';

// const HeroCarousel = () => {
//   const [slides, setSlides] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchSlides = async () => {
//       try {
//         const { data } = await api.get('/api/hero-carousel');
//         setSlides(data);
//         setLoading(false);
//       } catch (err) {
//         console.error('Failed to fetch hero slides:', err);
//         setError('Failed to load slides');
//         setLoading(false);
//       }
//     };

//     fetchSlides();
//   }, []);

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 1000,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 5000,
//     fade: true,
//     pauseOnHover: false,
//     arrows: false,
//   };

//   if (loading) {
//     return (
//       <Box 
//         display="flex" 
//         justifyContent="center" 
//         alignItems="center" 
//         height="80vh"
//       >
//         <CircularProgress size={60} />
//       </Box>
//     );
//   }

//   if (error || slides.length === 0) {
//     return null; // Don't show anything if no slides
//   }

//   return (
//     <div className="hero-carousel-container">
//       <Slider {...settings}>
//         {slides.map((slide) => (
//           <div key={slide._id} className="hero-slide-item">
//             {/* Background Image */}
//             <div
//               className="hero-slide-background"
//               style={{
//                 backgroundImage: `url(${slide.image})`,
//               }}
//             />
            
//             {/* Overlay */}
//             <div className="hero-slide-overlay" />
            
//             {/* Content */}
//             <div className="hero-slide-content">
//               {slide.headline && (
//                 <Typography
//                   variant="h2"
//                   component="h1"
//                   gutterBottom
//                   sx={{
//                     color: 'white',
//                     fontWeight: 700,
//                     textShadow: '2px 2px 8px rgba(0,0,0,0.7)',
//                     animation: 'fadeInUp 1s ease',
//                     mb: 2
//                   }}
//                 >
//                   {slide.headline}
//                 </Typography>
//               )}
              
//               {slide.caption && (
//                 <Typography
//                   variant="h5"
//                   component="h2"
//                   gutterBottom
//                   sx={{
//                     color: 'white',
//                     fontWeight: 300,
//                     textShadow: '1px 1px 6px rgba(0,0,0,0.6)',
//                     animation: 'fadeInUp 1.2s ease',
//                     mb: 4
//                   }}
//                 >
//                   {slide.caption}
//                 </Typography>
//               )}
              
//               {slide.link && (
//                 <Button
//                   component={slide.link.startsWith('http') ? 'a' : Link}
//                   href={slide.link.startsWith('http') ? slide.link : undefined}
//                   to={slide.link.startsWith('http') ? undefined : slide.link}
//                   target={slide.link.startsWith('http') ? '_blank' : undefined}
//                   rel={slide.link.startsWith('http') ? 'noopener noreferrer' : undefined}
//                   variant="contained"
//                   className="hero-slide-btn"
//                   sx={{
//                     animation: 'fadeInUp 1.4s ease'
//                   }}
//                 >
//                   Shop Now
//                 </Button>
//               )}
//             </div>
//           </div>
//         ))}
//       </Slider>
//     </div>
//   );
// };

// export default HeroCarousel;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { Typography, Button, Box, CircularProgress } from '@mui/material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './HeroCarousel.css';
import api from '../api/axiosConfig';

const HeroCarousel = () => {
  const [slides, setSlides] = useState([]);
  const [mobileSlides, setMobileSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const { data } = await api.get('/api/hero-carousel');
        const desktopData = data.filter((s) => s.device !== 'mobile');
        const mobileData = data.filter((s) => s.device === 'mobile');
        setSlides(desktopData);
        setMobileSlides(mobileData.length > 0 ? mobileData : desktopData); // fallback
      } catch (err) {
        console.error('Failed to fetch hero slides:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSlides();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    pauseOnHover: false,
    arrows: false,
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <>
      {/* Desktop Carousel */}
      <div className="hero-carousel-container desktop-carousel">
        <Slider {...settings}>
          {slides.map((slide) => (
            <div key={slide._id} className="hero-slide-item">
              <div
                className="hero-slide-background"
                style={{ backgroundImage: `url(${slide.image})` }}
              />
              <div className="hero-slide-overlay" />
              <div className="hero-slide-content">
                {slide.headline && (
                  <Typography variant="h2" component="h1" sx={{ color: 'white', mb: 2 }}>
                    {slide.headline}
                  </Typography>
                )}
                {slide.caption && (
                  <Typography variant="h5" component="h2" sx={{ color: 'white', mb: 3 }}>
                    {slide.caption}
                  </Typography>
                )}
                {slide.link && (
                  <Button
                    component={slide.link.startsWith('http') ? 'a' : Link}
                    href={slide.link.startsWith('http') ? slide.link : undefined}
                    to={!slide.link.startsWith('http') ? slide.link : undefined}
                    variant="contained"
                    className="hero-slide-btn"
                  >
                    Shop Now
                  </Button>
                )}
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Mobile Carousel */}
      <div className="hero-carousel-container mobile-carousel">
        <Slider {...settings}>
          {mobileSlides.map((slide) => (
            <div key={slide._id} className="hero-slide-item mobile">
              <div
                className="hero-slide-background"
                style={{ backgroundImage: `url(${slide.mobileImage || slide.image})` }}
              />
              <div className="hero-slide-overlay" />
              <div className="hero-slide-content">
                {slide.headline && (
                  <Typography
                    variant="h5"
                    component="h1"
                    sx={{ color: 'white', fontWeight: 600, mb: 1 }}
                  >
                    {slide.headline}
                  </Typography>
                )}
                {slide.caption && (
                  <Typography
                    variant="body1"
                    component="h2"
                    sx={{ color: '#f5f5f5', mb: 2 }}
                  >
                    {slide.caption}
                  </Typography>
                )}
                {slide.link && (
                  <Button
                    component={slide.link.startsWith('http') ? 'a' : Link}
                    href={slide.link.startsWith('http') ? slide.link : undefined}
                    to={!slide.link.startsWith('http') ? slide.link : undefined}
                    variant="contained"
                    className="hero-slide-btn"
                  >
                    Explore
                  </Button>
                )}
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default HeroCarousel;
