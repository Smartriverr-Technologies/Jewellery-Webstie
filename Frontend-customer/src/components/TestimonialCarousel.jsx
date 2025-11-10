// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Slider from 'react-slick';
// import { Box, Typography, Card, CardContent, Rating, CardMedia } from '@mui/material';
// import { motion } from 'framer-motion';
// import api from '../api/axiosConfig';

// const TestimonialCarousel = () => {
//   const [testimonials, setTestimonials] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchTestimonials = async () => {
//       try {
//         const { data } = await api.get('/api/testimonials');
//         setTestimonials(data);
//       } catch (error) {
//         console.error('Failed to fetch testimonials', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchTestimonials();
//   }, []);

//   const settings = {
//     dots: false, // Removed dots as requested
//     infinite: testimonials.length > 5,
//     speed: 600,
//     slidesToShow: 5,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 5000,
//     pauseOnHover: true,
//     responsive: [
//       { breakpoint: 1400, settings: { slidesToShow: 4 } },
//       { breakpoint: 1200, settings: { slidesToShow: 3 } },
//       { breakpoint: 1024, settings: { slidesToShow: 1 } }, // Show 1 slide on tablets and mobile
//     ],
//   };

//   if (loading || testimonials.length === 0) return null;

//   return (
//     <Box
//       sx={{
//         py: { xs: 4, md: 2 },
//         px: { xs: 2, sm: 4, md: 8 },
//         position: "relative",
//         overflow: "hidden",
//         backgroundImage: `url("data:image/svg+xml;utf8,
//           <svg xmlns='http://www.w3.org/2000/svg' width='1600' height='900'>
//             <defs>
//               <radialGradient id='grad1' cx='30%' cy='30%' r='40%'>
//                 <stop offset='0%' stop-color='%231976d2' stop-opacity='0.4' />
//                 <stop offset='100%' stop-color='%231976d2' stop-opacity='0' />
//               </radialGradient>
//               <radialGradient id='grad2' cx='70%' cy='60%' r='40%'>
//                 <stop offset='0%' stop-color='%23ff4081' stop-opacity='0.3' />
//                 <stop offset='100%' stop-color='%23ff4081' stop-opacity='0' />
//               </radialGradient>
//             </defs>
//             <rect width='100%' height='100%' fill='%23ffffff' />
//             <circle cx='30%' cy='30%' r='40%' fill='url(%23grad1)' />
//             <circle cx='70%' cy='60%' r='40%' fill='url(%23grad2)' />
//           </svg>
//         ")`,
//         backgroundAttachment: "fixed",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       {/* Section Heading */}
//       <motion.div
//         initial={{ opacity: 0, y: -30 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//       >
//         <Box sx={{ textAlign: "center", mb: 6  }}>
//           {/* <Typography 
//             variant="h4" 
//             component="h2" 
//             sx={{ 
//               fontWeight: 'bold',
//               display: "inline-block",
//               position: "relative",
//               px: 2,
//               '&::after': {
//                 content: '""',
//                 position: 'absolute',
//                 width: '60%',
//                 height: '4px',
//                 bottom: -8,
//                 left: '20%',
//                 backgroundColor: '#B8860B',
//                 borderRadius: '2px'
//               }
//             }}
//           >
//             What Our Customers Say
//           </Typography> */}
//           <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ 
//                         fontWeight: 700,
//                         background: 'linear-gradient(45deg, #B8860B 30%, #21CBF3 90%)',
//                         WebkitBackgroundClip: 'text',
//                         WebkitTextFillColor: 'transparent',
//                         mb: { xs: 3, sm: 4, md: 2 },
//                         fontSize: { xs: '1.8rem', sm: '2.2rem' },
//                       }}>
//             What Our Customers Say
//                 </Typography>
//         </Box>
//       </motion.div>

//       {/* Carousel */}
//       <Slider {...settings}>
//         {testimonials.map((testimonial, i) => (
//           <Box key={testimonial._id} sx={{ px: 1 }}>
//             <motion.div // Using motion.div for animations
//               initial={{ opacity: 0, y: 40 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ delay: i * 0.1, duration: 0.5 }}
//               whileHover={{ scale: 1.03 }}
//             >
//               <Card
//                 sx={{
//                   minHeight: { xs: 320, sm: 300 }, // Adjusted height for mobile
//                   display: 'flex',
//                   flexDirection: 'column',
//                   borderRadius: 3,
//                   boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
//                   background: 'rgba(255, 255, 255, 0.9)',
//                   transition: 'all 0.3s ease',
//                   '&:hover': { boxShadow: '0 8px 25px rgba(0,0,0,0.15)' }
//                 }}
//               >
//                 {/* Rectangular Image with Overlay */}
//                 <Box sx={{ position: "relative" }}>
//                   <CardMedia
//                     component="img"
//                     image = {testimonial.imageUrl?.startsWith('http')
//   ? testimonial.imageUrl
//   : `${import.meta.env.VITE_API_URL}${testimonial.imageUrl}`}
//                     alt={testimonial.name}
//                     sx={{
//                       height: { xs: 180, sm: 150 }, // Taller image on mobile
//                       objectFit: "cover",
//                       borderTopLeftRadius: 12,
//                       borderTopRightRadius: 12
//                     }}
//                   />
//                   <Box
//                     sx={{
//                       position: "absolute",
//                       top: 0,
//                       left: 0,
//                       width: "100%",
//                       height: "100%",
//                       background: "linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(0,0,0,0))",
//                       borderTopLeftRadius: 12,
//                       borderTopRightRadius: 12,
//                     }}
//                   />
//                 </Box>

//                 {/* Text Content */}
//                 <CardContent sx={{ textAlign: 'center', flexGrow: 1, p: { xs: 2, sm: 2 } }}>
//                   <Typography variant="subtitle1" sx={{ fontWeight: '600', mb: 0.5, fontSize: { xs: '1rem', sm: '1rem' } }}>
//                     {testimonial.name}
//                   </Typography>
//                   <Rating value={testimonial.rating} readOnly size="small" sx={{ my: 0.5 }} />
//                   <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', fontSize: { xs: '0.9rem', sm: '0.875rem' } }}>
//                     "{testimonial.comment}"
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           </Box>
//         ))}
//       </Slider>
//     </Box>
//   );
// };

// export default TestimonialCarousel;



import React, { useState, useEffect, useMemo } from 'react';
import Slider from 'react-slick';
import { Box, Typography, Card, CardContent, Rating, CardMedia } from '@mui/material';
import { motion } from 'framer-motion';
import api from '../api/axiosConfig';

const TestimonialCarousel = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const { data } = await api.get('/api/testimonials');
        setTestimonials(data || []);
      } catch (error) {
        console.error('Failed to fetch testimonials', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  // Track viewport width (fixes “mobile shows 5 after refresh”)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Decide slides to show by width
  const visibleSlides = useMemo(() => {
    if (width <= 600) return 2;       // phones
    if (width <= 1024) return 3;      // tablets
    if (width <= 1400) return 4;      // small desktops
    return 5;                         // large desktops
  }, [width]);

  const settings = {
    key: `slides-${visibleSlides}`,   // forces slick to re-init on width change
    dots: false,
    infinite: testimonials.length > visibleSlides,
    speed: 500,
    slidesToShow: visibleSlides,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4500,
    pauseOnHover: true,
    swipeToSlide: true,
    // Responsive is kept as a fallback (not strictly required because we compute above)
    responsive: [
      { breakpoint: 1400, settings: { slidesToShow: 4 } },
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 600,  settings: { slidesToShow: 2 } },
    ],
  };

  if (loading || testimonials.length === 0) return null;

  return (
    <Box
      sx={{
        py: { xs: 3, md: 4 },
        px: { xs: 2, sm: 4, md: 8 },
        position: 'relative',
        overflow: 'hidden',
        backgroundImage: `url("data:image/svg+xml;utf8,
          <svg xmlns='http://www.w3.org/2000/svg' width='1600' height='900'>
            <defs>
              <radialGradient id='grad1' cx='30%' cy='30%' r='40%'>
                <stop offset='0%' stop-color='%231976d2' stop-opacity='0.35' />
                <stop offset='100%' stop-color='%231976d2' stop-opacity='0' />
              </radialGradient>
              <radialGradient id='grad2' cx='70%' cy='60%' r='40%'>
                <stop offset='0%' stop-color='%23ff4081' stop-opacity='0.25' />
                <stop offset='100%' stop-color='%23ff4081' stop-opacity='0' />
              </radialGradient>
            </defs>
            <rect width='100%' height='100%' fill='%23ffffff' />
            <circle cx='30%' cy='30%' r='40%' fill='url(%23grad1)' />
            <circle cx='70%' cy='60%' r='40%' fill='url(%23grad2)' />
          </svg>
        ")`,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Heading */}
      <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Box sx={{ textAlign: 'center', mb: { xs: 3, md: 4 } }}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            align="center"
            sx={{
              fontWeight: 700,
              background: 'linear-gradient(45deg, #B8860B 30%, #21CBF3 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: { xs: 2, sm: 3 },
              fontSize: { xs: '1.4rem', sm: '1.8rem', md: '2rem' },
            }}
          >
            What Our Customers Say
          </Typography>
        </Box>
      </motion.div>

      {/* Carousel */}
      <Slider {...settings}>
        {testimonials.map((t, i) => (
          <Box key={t._id || i} sx={{ px: 6 / 8 /* ~0.75 spacing */ }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card
                sx={{
                  minHeight: { xs: 210, sm: 220, md: 230 },      // smaller card
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 2,
                  boxShadow: '0 3px 12px rgba(0,0,0,0.08)',
                  background: 'rgba(255,255,255,0.95)',
                  transition: 'box-shadow 0.25s ease, transform 0.25s ease',
                  '&:hover': { boxShadow: '0 8px 22px rgba(0,0,0,0.14)' },
                }}
              >
                {/* Image */}
                <Box sx={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    image={
                      t.imageUrl?.startsWith('http')
                        ? t.imageUrl
                        : `${import.meta.env.VITE_API_URL}${t.imageUrl}`
                    }
                    alt={t.name}
                    sx={{
                      height: { xs: 96, sm: 110, md: 120 },        // tighter image
                      objectFit: 'cover',
                      borderTopLeftRadius: 8,
                      borderTopRightRadius: 8,
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      background:
                        'linear-gradient(to bottom, rgba(0,0,0,0.18), rgba(0,0,0,0))',
                      borderTopLeftRadius: 8,
                      borderTopRightRadius: 8,
                    }}
                  />
                </Box>

                {/* Content */}
                <CardContent
                  sx={{
                    textAlign: 'center',
                    flexGrow: 1,
                    p: { xs: 1.25, sm: 1.5 },
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 700,
                      mb: 0.25,
                      fontSize: { xs: '0.9rem', sm: '0.95rem' },
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                    title={t.name}
                  >
                    {t.name}
                  </Typography>

                  <Rating
                    value={t.rating}
                    readOnly
                    size="small"
                    sx={{ my: 0.25 }}
                  />

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      fontStyle: 'italic',
                      fontSize: { xs: '0.8rem', sm: '0.85rem' },
                      lineHeight: 1.35,
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                    title={t.comment}
                  >
                    "{t.comment}"
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
