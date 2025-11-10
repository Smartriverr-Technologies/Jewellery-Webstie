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

// Slick Carousel CSS (Make sure you imported these in main.jsx / index.html)
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
    dots: true,
    infinite: testimonials.length > 1,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4500,
    pauseOnHover: true,
    centerMode: true,
    centerPadding: "0px",
    responsive: [
      {
        breakpoint: 1200,
        settings: { slidesToShow: 2, centerMode: false }
      },
      {
        breakpoint: 900,
        settings: { slidesToShow: 1, centerMode: true }
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1, centerMode: false }
      }
    ],
  };

  if (loading || testimonials.length === 0) return null;

  return (
    <Box
      sx={{
        py: { xs: 4, md: 6 },
        px: { xs: 2, sm: 4, md: 10 },
        background: "linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)",
        position: "relative",
      }}
    >
      {/* Gradient background overlay circles */}
      <Box
        sx={{
          position: "absolute",
          top: -80,
          left: -50,
          width: 250,
          height: 250,
          background: "rgba(184, 134, 11, 0.15)",
          filter: "blur(90px)",
          borderRadius: "50%",
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: -80,
          right: -50,
          width: 260,
          height: 260,
          background: "rgba(33, 203, 243, 0.2)",
          filter: "blur(100px)",
          borderRadius: "50%",
          zIndex: 0,
        }}
      />

      {/* Section Heading */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ position: "relative", zIndex: 2 }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{
            fontWeight: 800,
            background: "linear-gradient(45deg, #B8860B, #21CBF3)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 5,
            fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.5rem" }
          }}
        >
          What Our Customers Say
        </Typography>
      </motion.div>

      {/* Slider */}
      <Box sx={{ position: "relative", zIndex: 2 }}>
        <Slider {...settings}>
          {testimonials.map((testimonial, i) => (
            <Box key={testimonial._id} sx={{ px: 1 }}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
              >
                <Card
                  sx={{
                    borderRadius: 4,
                    overflow: "hidden",
                    minHeight: { xs: 360, sm: 330, md: 350 },
                    background: "rgba(255, 255, 255, 0.75)",
                    backdropFilter: "blur(12px)",
                    boxShadow: "0 8px 25px rgba(0,0,0,0.12)",
                    transition: "0.35s ease",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 12px 35px rgba(0,0,0,0.18)",
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
                      height: { xs: 180, sm: 160 },
                      objectFit: "cover",
                      width: "100%",
                    }}
                  />

                  {/* Content */}
                  <CardContent sx={{ textAlign: "center", px: 2, py: 2 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        fontSize: { xs: "1rem", sm: "1.1rem" },
                        mb: 0.8,
                      }}
                    >
                      {testimonial.name}
                    </Typography>

                    <Rating
                      value={testimonial.rating}
                      readOnly
                      sx={{
                        my: 0.5,
                        "& .MuiRating-iconFilled": { color: "#B8860B" }
                      }}
                    />

                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: { xs: "0.9rem", sm: "0.95rem" },
                        color: "#555",
                        fontStyle: "italic",
                        mt: 1,
                        lineHeight: 1.5,
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
    </Box>
  );
};

export default TestimonialCarousel;
