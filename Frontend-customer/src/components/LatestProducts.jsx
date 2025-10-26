// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { Box, Typography, Grid, Skeleton, Button } from '@mui/material';
// import ProductCard from './ProductCard';
// import { motion } from 'framer-motion';
// import api from '../api/axiosConfig';

// const LatestProducts = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchLatestProducts = async () => {
//       try {
//         const { data } = await api.get('/api/products/latest');
//         setProducts(data);
//       } catch (error) {
//         console.error('Failed to fetch latest products', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchLatestProducts();
//   }, []);

//   return (
//     <Box sx={{ py: 4, background: 'linear-gradient(to bottom, #f9f9f9, #ffffff)' }}>
//       {/* Section Title */}
//       <motion.div
//         initial={{ opacity: 0, y: -30 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//       >
//         <Box sx={{ textAlign: "center", mb: 6 }}>
//     {/* <Typography 
//       variant="h4" 
//       component="h2" 
//       sx={{ 
//         // fontWeight: 'bold', 
//         display: "inline-block",
//         position: "relative",
//         // px: 2,
//         fontWeight: 700,
//               background: 'linear-gradient(45deg, #B8860B 30%, #21CBF3 90%)',
//               WebkitBackgroundClip: 'text',
//               WebkitTextFillColor: 'transparent',
//               mb: 2,
//         // '&::after': {
//         //   content: '""',
//         //   position: 'absolute',
//         //   width: '50%',
//         //   height: '4px',
//         //   bottom: -8,
//         //   left: '25%',
//         //   backgroundColor: '#B8860B',
//         //   // background: 'linear-gradient(45deg, #B8860B 30%, #21CBF3 90%)',
//         //   borderRadius: '2px'
//         // }
//         // sx={{ 
//         //       fontWeight: 700,
//         //       background: 'linear-gradient(45deg, #B8860B 30%, #21CBF3 90%)',
//         //       WebkitBackgroundClip: 'text',
//         //       WebkitTextFillColor: 'transparent',
//         //       mb: 2,
//         //     }}
//       }}
//     >
//       Our Latest Products
//     </Typography> */}
//     <Typography 
//                 variant="h4" 
//                 component="h2" 
//                 align="center" 
//                 gutterBottom
//                 sx={{ 
//                   fontWeight: 700,
//                   background: 'linear-gradient(45deg, #B8860B 30%, #21CBF3 90%)',
//                   WebkitBackgroundClip: 'text',
//                   WebkitTextFillColor: 'transparent',
//                   mb: 5,
//                 }}
//               >
//                Latest Products
//               </Typography>
//   </Box>
//       </motion.div>

//       {/* Product Grid */}
//       <Grid 
//   container 
//   spacing={3} 
//   justifyContent="center"
// >
//   {loading ? (
//     Array.from(new Array(8)).map((_, index) => (
//       <Grid item key={index} xs={12} sm={6} md={2.4}>
//         <Skeleton variant="rectangular" height={220} sx={{ borderRadius: 3 }}/>
//         <Box sx={{ pt: 1 }}>
//           <Skeleton /><Skeleton width="60%" />
//         </Box>
//       </Grid>
//     ))
//   ) : (
//     products.map((product, i) => (
//       <Grid 
//         item 
//         key={product._id} 
//         xs={12} sm={6} md={2.4}   // ≈ 5 per row
//         sx={{ display: "flex" }}
//       >
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ delay: i * 0.1, duration: 0.5 }}
//           style={{ flexGrow: 1, display: "flex" }}
//         >
//           <ProductCard product={product} />
//         </motion.div>
//       </Grid>
//     ))
//   )}
// </Grid>


//       {/* CTA Button */}
//       <Box sx={{ textAlign: 'center', mt: 6 }}>
//         <Button 
//           component={Link} 
//           // to="" 
//           to="/shop"
//           variant="contained" 
//           size="large"
//           sx={{
//             borderRadius: '30px',
//             px: 4,
//             py: 1.5,
//             fontWeight: 'bold',
//             boxShadow: 4,
//             textTransform: 'none',
//             transition: 'all 0.3s ease',
//             '&:hover': {
//               transform: 'translateY(-3px)',
//               boxShadow: 6
//             }
//           }}
//         >
//           View All Products
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default LatestProducts;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Grid, Skeleton, Button } from "@mui/material";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import api from "../api/axiosConfig";

const LatestProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        const { data } = await api.get("/api/products/latest");
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch latest products", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLatestProducts();
  }, []);

  return (
    <Box
      sx={{
        py: { xs: 3, sm: 4, md: 6 },
        px: { xs: 2, sm: 3, md: 6 },
        background: "linear-gradient(to bottom, #f9f9f9, #ffffff)",
      }}
    >
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Box sx={{ textAlign: "center", mb: { xs: 3, sm: 5 } }}>
          <Typography
            variant="h4"
            component="h2"
            align="center"
            gutterBottom
            sx={{
              fontWeight: 700,
              background: "linear-gradient(45deg, #B8860B 30%, #21CBF3 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: { xs: 3, sm: 5 },
              fontSize: { xs: "1.6rem", sm: "2rem", md: "2.4rem" },
            }}
          >
            Latest Products
          </Typography>
        </Box>
      </motion.div>

      {/* Product Grid */}
      <Grid
        container
        spacing={{ xs: 2, sm: 3, md: 4 }}
        justifyContent="center"
      >
        {loading
          ? Array.from(new Array(8)).map((_, index) => (
              <Grid item key={index} xs={6} sm={4} md={2.4}>
                <Skeleton
                  variant="rectangular"
                  height={200}
                  sx={{
                    borderRadius: 3,
                    width: "100%",
                  }}
                />
                <Box sx={{ pt: 1 }}>
                  <Skeleton />
                  <Skeleton width="60%" />
                </Box>
              </Grid>
            ))
          : products.map((product, i) => (
              <Grid
                item
                key={product._id}
                xs={6}
                sm={4}
                md={2.4}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "stretch",
                }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  style={{
                    flexGrow: 1,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <ProductCard product={product} />
                </motion.div>
              </Grid>
            ))}
      </Grid>

      {/* CTA Button */}
      <Box sx={{ textAlign: "center", mt: { xs: 4, sm: 6 } }}>
        <Button
          component={Link}
          to="/shop"
          variant="contained"
          size="large"
          sx={{
            borderRadius: "30px",
            px: { xs: 3, sm: 4 },
            py: { xs: 1, sm: 1.5 },
            fontWeight: "bold",
            textTransform: "none",
            fontSize: { xs: "0.9rem", sm: "1rem" },
            boxShadow: 4,
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "translateY(-3px)",
              boxShadow: 6,
            },
          }}
        >
          View All Products
        </Button>
      </Box>
    </Box>
  );
};

export default LatestProducts;
