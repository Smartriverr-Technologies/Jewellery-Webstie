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

import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { Box, Typography, Card, CardContent, Rating, CardMedia } from '@mui/material';
import { motion } from 'framer-motion';
import api from '../api/axiosConfig';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
    dots: false,
    infinite: testimonials.length > 5,
    speed: 500,
    slidesToShow: 5,        // ✅ Show 5 in desktop
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1400,
        settings: { slidesToShow: 4 }
      },
      {
        breakpoint: 1100,
        settings: { slidesToShow: 3 }
      },
      {
        breakpoint: 900,
        settings: { slidesToShow: 2 }   // ✅ Show 2 in mobile
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 }   // ✅ Small phones → 1 card
      }
    ],
  };

  if (loading || testimonials.length === 0) return null;

  return (
    <Box
      sx={{
        py: { xs: 4, md: 6 },
        px: { xs: 2, sm: 4, md: 10 },
        position: "relative",
        background: "linear-gradient(135deg, #ffffff 0%, #f9f9f9 100%)",
      }}
    >
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: -25 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{
            fontWeight: 800,
            background: "linear-gradient(45deg, #B8860B, #21CBF3)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 4,
            fontSize: { xs: "1.6rem", sm: "2rem", md: "2.2rem" }
          }}
        >
          What Our Customers Say
        </Typography>
      </motion.div>

      <Slider {...settings}>
        {testimonials.map((testimonial, i) => (
          <Box key={testimonial._id} sx={{ px: 1 }}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              <Card
                sx={{
                  borderRadius: 3,
                  overflow: "hidden",
                  minHeight: 260,                      // ✅ Smaller height
                  background: "rgba(255, 255, 255, 0.85)",
                  backdropFilter: "blur(10px)",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
                  transition: "0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 12px 25px rgba(0,0,0,0.15)",
                  },
                }}
              >
                {/* Image */}
                <CardMedia
                  component="img"
                  image={
                    testimonial.imageUrl?.startsWith("http")
                      ? testimonial.imageUrl
                      : `${import.meta.env.VITE_API_URL}${testimonial.imageUrl}`
                  }
                  alt={testimonial.name}
                  sx={{
                    height: 120,                     // ✅ Reduced image height
                    objectFit: "cover",
                    width: "100%",
                  }}
                />

                {/* Text */}
                <CardContent
                  sx={{
                    textAlign: "center",
                    p: 2,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      fontSize: "1rem",
                      mb: 0.5
                    }}
                  >
                    {testimonial.name}
                  </Typography>

                  <Rating
                    value={testimonial.rating}
                    readOnly
                    size="small"
                    sx={{
                      "& .MuiRating-iconFilled": { color: "#B8860B" }
                    }}
                  />

                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: "0.85rem",
                      color: "#444",
                      mt: 1,
                      fontStyle: "italic",
                      lineHeight: 1.4,
                      display: "-webkit-box",
                      WebkitLineClamp: 3,              // ✅ Limit text to 3 lines
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    “{testimonial.comment}”
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
