// import React from 'react';
// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import { Box, Typography, Grid, Button, Skeleton } from '@mui/material';
// import ProductCard from './ProductCard';

// // This function fetches the first 4 products for a given category ID
// const fetchProductsForCategory = async (categoryId) => {
//   if (!categoryId) return [];
//   const { data } = await axios.get(`http://localhost:4000/api/products?category=${categoryId}&pageSize=4`);
//   return data.products;
// };

// const CategoryRow = ({ category }) => {
//   const { data: products, isLoading } = useQuery({
//     queryKey: ['productsByCategory', category._id],
//     queryFn: () => fetchProductsForCategory(category._id),
//   });

//   return (
//     <Box sx={{ mb: 6 }}>
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//         <Typography variant="h5" component="h2" fontWeight="bold">
//           {category.name}
//         </Typography>
//         <Button component={Link} to={`/category/${category.slug}`} variant="outlined">
//           View More
//         </Button>
//       </Box>
//       <Grid container spacing={3}>
//         {isLoading ? (
//           Array.from(new Array(4)).map((item, index) => (
//             <Grid item key={index} xs={12} sm={6} md={3}>
//               <Skeleton variant="rectangular" height={250} />
//             </Grid>
//           ))
//         ) : (
//           products?.map((product) => (
//             <Grid item key={product._id} xs={12} sm={6} md={3}>
//               <ProductCard product={product} />
//             </Grid>
//           ))
//         )}
//       </Grid>
//     </Box>
//   );
// };

// export default CategoryRow;


import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Link } from "react-router-dom"
import { Box, Typography, Button, Skeleton, Grid, Stack } from "@mui/material"
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded"
import ProductCard from "./ProductCard";

import api from "../api/axiosConfig"

// Fetch products
const fetchProductsForCategory = async (categoryId) => {
  if (!categoryId) return []
  const { data } = await api.get(
    `/api/products?category=${categoryId}&pageSize=8`
  )
  return data.products
}

const CategoryRow = ({ category }) => {
  const { data: products, isLoading } = useQuery({
    queryKey: ["productsByCategory", category._id],
    queryFn: () => fetchProductsForCategory(category._id),
  })

  return (
    <Box sx={{ mb: 4 }}>
      {/* Header */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems={{ xs: "flex-start", sm: "center" }}
        justifyContent="space-between"
        spacing={1.5}
        sx={{
          mb: 2,
          px: { xs: 2, md: 3 }, // same left/right padding as cards
        }}
      >
        <Box>
          <Typography
            variant="h5"
            component="h2"
            sx={{ fontWeight: 800, letterSpacing: "-0.01em"  }}
          >
            {category.name}
          </Typography>
          {category?.description ? (
            <Typography variant="body2" color="text.secondary">
              {category.description}
            </Typography>
          ) : (
            <Typography variant="body2" color="text.secondary">
              {"Top picks in "}
              {category.name}
            </Typography>
          )}
        </Box>
        <Button
          component={Link}
          to={`/category/${category.slug}`}
          variant="text"
          color="primary"
          endIcon={<ArrowForwardIosRoundedIcon fontSize="small" />}
          sx={{ fontWeight: 600 }}
        >
          View more
        </Button>
      </Stack>

      {/* Product Row */}
      <Grid container spacing={2} justifyContent="center">
        {isLoading
          ? Array.from(new Array(8)).map((_, index) => (
              <Grid item key={index} xs={6} sm={4} md={3} lg={1.5}>
                <Skeleton
                  variant="rounded"
                  height={250}
                  sx={{ borderRadius: 2, width: '100%' }}
                />
                <Skeleton width="80%" />
                <Skeleton width="40%" />
              </Grid>
            ))
          : products?.slice(0, 8).map((product) => (
              <Grid item key={product._id} xs={6} sm={4} md={3} lg={1.5}>
                <ProductCard product={product} />
              </Grid>
            ))}
      </Grid>
    </Box>
  )
}

export default CategoryRow
