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


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Slider from 'react-slick';
// import { Box, Typography, Card, CardContent, Rating, CardMedia } from '@mui/material';
// import { motion } from 'framer-motion';
// import api from '../api/axiosConfig';

// const TestimonialCarousel = () => {
//   const [testimonials, setTestimonials] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [sliderKey, setSliderKey] = useState(0);

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

//   // Force slider to re-render on window resize
//   useEffect(() => {
//     const handleResize = () => {
//       setSliderKey(prev => prev + 1);
//     };

//     window.addEventListener('resize', handleResize);
//     // Trigger initial resize after mount
//     setTimeout(handleResize, 100);

//     return () => window.removeEventListener('resize', handleResize);
//   }, [testimonials]);

//   const settings = {
//     dots: false,
//     infinite: testimonials.length > 1,
//     speed: 600,
//     slidesToShow: 5,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 5000,
//     pauseOnHover: true,
//     arrows: true,
//     responsive: [
//       { 
//         breakpoint: 1400, 
//         settings: { slidesToShow: 4 } 
//       },
//       { 
//         breakpoint: 1200, 
//         settings: { slidesToShow: 3 } 
//       },
//       { 
//         breakpoint: 900, 
//         settings: { 
//           slidesToShow: 2,
//           arrows: false,
//           dots: true
//         } 
//       },
//       { 
//         breakpoint: 600, 
//         settings: { 
//           slidesToShow: 2,
//           arrows: false,
//           dots: true,
//           centerMode: false
//         } 
//       },
//     ],
//   };

//   if (loading || testimonials.length === 0) return null;

//   return (
//     <Box
//       sx={{
//         py: { xs: 3, sm: 4, md: 6 },
//         px: { xs: 1.5, sm: 3, md: 8 },
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
//         backgroundAttachment: { xs: "scroll", md: "fixed" },
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
//         <Box sx={{ textAlign: "center", mb: { xs: 3, sm: 4, md: 6 } }}>
//           <Typography 
//             variant="h4" 
//             component="h2" 
//             gutterBottom 
//             align="center" 
//             sx={{ 
//               fontWeight: 700,
//               background: 'linear-gradient(45deg, #B8860B 30%, #21CBF3 90%)',
//               WebkitBackgroundClip: 'text',
//               WebkitTextFillColor: 'transparent',
//               fontSize: { xs: '1.5rem', sm: '2rem', md: '2.2rem' },
//             }}
//           >
//             What Our Customers Say
//           </Typography>
//         </Box>
//       </motion.div>

//       {/* Carousel */}
//       <Box sx={{ 
//         mx: { xs: -1, sm: 0 },
//         '& .slick-slide': {
//           px: { xs: 0.5, sm: 1 }
//         },
//         '& .slick-dots': {
//           bottom: -35,
//           '& li button:before': {
//             fontSize: 10,
//             color: '#B8860B'
//           },
//           '& li.slick-active button:before': {
//             color: '#B8860B'
//           }
//         }
//       }}>
//         <Slider {...settings} key={sliderKey}>
//           {testimonials.map((testimonial, i) => (
//             <Box key={testimonial._id} sx={{ px: { xs: 0.5, sm: 1 } }}>
//               <motion.div
//                 initial={{ opacity: 0, y: 40 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ delay: i * 0.1, duration: 0.5 }}
//                 whileHover={{ scale: 1.03 }}
//               >
//                 <Card
//                   sx={{
//                     minHeight: { xs: 280, sm: 300, md: 320 },
//                     display: 'flex',
//                     flexDirection: 'column',
//                     borderRadius: { xs: 2, sm: 3 },
//                     boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
//                     background: 'rgba(255, 255, 255, 0.9)',
//                     transition: 'all 0.3s ease',
//                     mx: { xs: 0.5, sm: 0 },
//                     '&:hover': { boxShadow: '0 8px 25px rgba(0,0,0,0.15)' }
//                   }}
//                 >
//                   {/* Rectangular Image with Overlay */}
//                   <Box sx={{ position: "relative" }}>
//                     <CardMedia
//                       component="img"
//                       image={testimonial.imageUrl?.startsWith('http')
//                         ? testimonial.imageUrl
//                         : `${import.meta.env.VITE_API_URL}${testimonial.imageUrl}`}
//                       alt={testimonial.name}
//                       sx={{
//                         height: { xs: 140, sm: 150, md: 160 },
//                         objectFit: "cover",
//                         borderTopLeftRadius: { xs: 8, sm: 12 },
//                         borderTopRightRadius: { xs: 8, sm: 12 }
//                       }}
//                     />
//                     <Box
//                       sx={{
//                         position: "absolute",
//                         top: 0,
//                         left: 0,
//                         width: "100%",
//                         height: "100%",
//                         background: "linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(0,0,0,0))",
//                         borderTopLeftRadius: { xs: 8, sm: 12 },
//                         borderTopRightRadius: { xs: 8, sm: 12 },
//                       }}
//                     />
//                   </Box>

//                   {/* Text Content */}
//                   <CardContent sx={{ 
//                     textAlign: 'center', 
//                     flexGrow: 1, 
//                     p: { xs: 1.5, sm: 2 },
//                     display: 'flex',
//                     flexDirection: 'column',
//                     justifyContent: 'center'
//                   }}>
//                     <Typography 
//                       variant="subtitle1" 
//                       sx={{ 
//                         fontWeight: '600', 
//                         mb: 0.5, 
//                         fontSize: { xs: '0.9rem', sm: '1rem' },
//                         lineHeight: 1.3
//                       }}
//                     >
//                       {testimonial.name}
//                     </Typography>
//                     <Rating 
//                       value={testimonial.rating} 
//                       readOnly 
//                       size="small" 
//                       sx={{ 
//                         my: 0.5,
//                         '& .MuiRating-icon': {
//                           fontSize: { xs: '1rem', sm: '1.25rem' }
//                         }
//                       }} 
//                     />
//                     <Typography 
//                       variant="body2" 
//                       color="text.secondary" 
//                       sx={{ 
//                         fontStyle: 'italic', 
//                         fontSize: { xs: '0.8rem', sm: '0.875rem' },
//                         lineHeight: 1.4,
//                         display: '-webkit-box',
//                         WebkitLineClamp: 3,
//                         WebkitBoxOrient: 'vertical',
//                         overflow: 'hidden',
//                         textOverflow: 'ellipsis'
//                       }}
//                     >
//                       "{testimonial.comment}"
//                     </Typography>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             </Box>
//           ))}
//         </Slider>
//       </Box>
//     </Box>
//   );
// };

// export default TestimonialCarousel;

"use client"

import { useState, useEffect } from "react"
import Slider from "react-slick"
import { Box, Typography, Card, CardContent, Rating, CardMedia } from "@mui/material"
import { motion } from "framer-motion"
import api from "../api/axiosConfig"

const TestimonialCarousel = () => {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [sliderKey, setSliderKey] = useState(0)

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const { data } = await api.get("/api/testimonials")
        setTestimonials(data)
      } catch (error) {
        console.error("Failed to fetch testimonials", error)
      } finally {
        setLoading(false)
      }
    }
    fetchTestimonials()
  }, [])

  // Force slider to re-render on window resize
  useEffect(() => {
    const handleResize = () => {
      setSliderKey((prev) => prev + 1)
    }

    window.addEventListener("resize", handleResize)
    // Trigger initial resize after mount
    setTimeout(handleResize, 100)

    return () => window.removeEventListener("resize", handleResize)
  }, [testimonials])

  const settings = {
    dots: true,
    infinite: testimonials.length > 1,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          arrows: false,
          dots: true,
          dotSize: 8,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          arrows: false,
          dots: true,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          arrows: false,
          dots: true,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          arrows: true,
        },
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 4,
          arrows: true,
        },
      },
    ],
  }

  if (loading || testimonials.length === 0) return null

  return (
    <Box
      sx={{
        py: { xs: 4, sm: 6, md: 8 },
        px: { xs: 3, sm: 4, md: 6, lg: 8 },
        position: "relative",
        overflow: "hidden",
        backgroundImage: `url("data:image/svg+xml;utf8,
          <svg xmlns='http://www.w3.org/2000/svg' width='1600' height='900'>
            <defs>
              <radialGradient id='grad1' cx='30%' cy='30%' r='40%'>
                <stop offset='0%' stopColor='%231976d2' stopOpacity='0.4' />
                <stop offset='100%' stopColor='%231976d2' stopOpacity='0' />
              </radialGradient>
              <radialGradient id='grad2' cx='70%' cy='60%' r='40%'>
                <stop offset='0%' stopColor='%23ff4081' stopOpacity='0.3' />
                <stop offset='100%' stopColor='%23ff4081' stopOpacity='0' />
              </radialGradient>
            </defs>
            <rect width='100%' height='100%' fill='%23ffffff' />
            <circle cx='30%' cy='30%' r='40%' fill='url(%23grad1)' />
            <circle cx='70%' cy='60%' r='40%' fill='url(%23grad2)' />
          </svg>
        ")`,
        backgroundAttachment: { xs: "scroll", md: "fixed" },
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Section Heading */}
      <motion.div initial={{ opacity: 0, y: -30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <Box sx={{ textAlign: "center", mb: { xs: 4, sm: 5, md: 6 } }}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            align="center"
            sx={{
              fontWeight: 700,
              background: "linear-gradient(45deg, #B8860B 30%, #21CBF3 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: { xs: "1.75rem", sm: "2rem", md: "2.5rem" },
              letterSpacing: { xs: -0.5, sm: -0.8 },
            }}
          >
            What Our Customers Say
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "0.875rem", sm: "1rem" },
              color: "text.secondary",
              mt: 1,
            }}
          >
            Real stories from satisfied clients
          </Typography>
        </Box>
      </motion.div>

      {/* Carousel Container */}
      <Box
        sx={{
          position: "relative",
          "& .slick-slide": {
            px: { xs: 0.75, sm: 1, md: 1.5 },
            outline: "none",
          },
          "& .slick-dots": {
            bottom: { xs: -35, sm: -40, md: -45 },
            display: "flex !important",
            justifyContent: "center",
            gap: "8px",
            "& li": {
              width: "auto",
              height: "auto",
              margin: 0,
            },
            "& li button:before": {
              fontSize: { xs: 8, sm: 10 },
              color: "#B8860B",
              opacity: 0.6,
              content: '"●"',
            },
            "& li.slick-active button:before": {
              color: "#B8860B",
              opacity: 1,
              fontSize: { xs: 10, sm: 12 },
            },
          },
          "& .slick-next, & .slick-prev": {
            display: { xs: "none !important", md: "block !important" },
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 2,
            width: 40,
            height: 40,
            "&:before": {
              fontSize: 24,
              color: "#B8860B",
              opacity: 0.8,
            },
            "&:hover:before": {
              opacity: 1,
            },
          },
          "& .slick-prev": {
            left: -50,
          },
          "& .slick-next": {
            right: -50,
          },
        }}
      >
        <Slider {...settings} key={sliderKey}>
          {testimonials.map((testimonial, i) => (
            <Box key={testimonial._id} sx={{ px: { xs: 0.5, sm: 0.75 } }}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card
                  sx={{
                    minHeight: { xs: 320, sm: 360, md: 380 },
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: { xs: 2, sm: 2.5, md: 3 },
                    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                    background: "rgba(255, 255, 255, 0.92)",
                    backdropFilter: "blur(10px)",
                    transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                    border: "1px solid rgba(255, 255, 255, 0.5)",
                    "&:hover": {
                      boxShadow: "0 12px 32px rgba(0,0,0,0.15)",
                      transform: "translateY(-4px)",
                    },
                  }}
                >
                  {/* Image Section */}
                  <Box sx={{ position: "relative", overflow: "hidden" }}>
                    <CardMedia
                      component="img"
                      image={
                        testimonial.imageUrl?.startsWith("http")
                          ? testimonial.imageUrl
                          : `${import.meta.env.VITE_API_URL}${testimonial.imageUrl}`
                      }
                      alt={testimonial.name}
                      sx={{
                        height: { xs: 160, sm: 180, md: 200 },
                        objectFit: "cover",
                        borderTopLeftRadius: { xs: 8, sm: 10, md: 12 },
                        borderTopRightRadius: { xs: 8, sm: 10, md: 12 },
                        transition: "transform 0.4s ease",
                      }}
                    />
                    {/* Overlay Gradient */}
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background: "linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0))",
                        borderTopLeftRadius: { xs: 8, sm: 10, md: 12 },
                        borderTopRightRadius: { xs: 8, sm: 10, md: 12 },
                      }}
                    />
                  </Box>

                  {/* Content Section */}
                  <CardContent
                    sx={{
                      textAlign: "center",
                      flexGrow: 1,
                      p: { xs: 2, sm: 2.5, md: 3 },
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    {/* Name */}
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: "700",
                        mb: 0.75,
                        fontSize: { xs: "1rem", sm: "1.1rem", md: "1.15rem" },
                        lineHeight: 1.3,
                        color: "#1a1a1a",
                      }}
                    >
                      {testimonial.name}
                    </Typography>

                    {/* Rating */}
                    <Box sx={{ display: "flex", justifyContent: "center", my: 1 }}>
                      <Rating
                        value={testimonial.rating}
                        readOnly
                        size="small"
                        sx={{
                          "& .MuiRating-icon": {
                            fontSize: { xs: "1.1rem", sm: "1.3rem" },
                            color: "#B8860B",
                          },
                        }}
                      />
                    </Box>

                    {/* Comment */}
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        fontStyle: "italic",
                        fontSize: { xs: "0.875rem", sm: "0.9rem", md: "0.95rem" },
                        lineHeight: 1.5,
                        display: "-webkit-box",
                        WebkitLineClamp: { xs: 3, sm: 4 },
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        mt: 1.5,
                      }}
                    >
                      "{testimonial.comment}"
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Box>
          ))}
        </Slider>
      </Box>
    </Box>
  )
}

export default TestimonialCarousel
