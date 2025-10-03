// import React from 'react';
// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';
// import { Container, Typography, CircularProgress, Alert } from '@mui/material';
// import CategoryRow from '../components/CategoryRow';

// // Fetches the list of all categories
// const fetchCategories = async () => {
//   const { data } = await axios.get('http://localhost:4000/api/categories');
//   return data;
// };

// const ShopPage = () => {
//   const { data: categories, isLoading, isError } = useQuery({ 
//     queryKey: ['allCategoriesForShop'], 
//     queryFn: fetchCategories 
//   });

//   if (isLoading) {
//     return <Container sx={{ py: 5, textAlign: 'center' }}><CircularProgress /></Container>;
//   }

//   if (isError) {
//     return <Container sx={{ py: 5 }}><Alert severity="error">Could not load categories.</Alert></Container>;
//   }

//   return (
//     <Container maxWidth="xl" sx={{ py: 4 }}>
//       <Typography variant="h3" component="h1" align="center" gutterBottom sx={{ mb: 5, fontWeight: 'bold' }}>
//         Shop Our Collections
//       </Typography>
      
//       {/* Map over the categories and render a row for each one */}
//       {categories.map(category => (
//         <CategoryRow key={category._id} category={category} />
//       ))}
//     </Container>
//   );
// };

// export default ShopPage;

import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Container, Typography, CircularProgress, Alert, Box, Divider, Chip } from "@mui/material"
import CategoryRow from "../components/CategoryRow"
import api from "../api/axiosConfig"
// Fetches the list of all categories
const fetchCategories = async () => {
  const { data } = await api.get("/api/categories")
  return data
}

const ShopPage = () => {
  const {
    data: categories,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["allCategoriesForShop"],
    queryFn: fetchCategories,
  })

  if (isLoading) {
    return (
      <Container sx={{ py: 8, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    )
  }

  if (isError) {
    return (
      <Container sx={{ py: 8 }}>
        <Alert severity="error">Could not load categories.</Alert>
      </Container>
    )
  }

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 4, md: 6 } }}>
      <Box
        component="header"
        sx={{
          textAlign: "center",
          mb: { xs: 4, md: 6 },
        }}
      >
        {/* <Chip label="Shop" color="primary" variant="outlined" sx={{ mb: 1.5, fontWeight: 600 }} /> */}
        <Typography variant="h3" component="h1" sx={{ fontWeight: 800, letterSpacing: "-0.02em" }}>
          Shop Our Collections
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 1 }}>
          Curated categories with top picks—discover new favorites in seconds.
        </Typography>
      </Box>

      <Divider sx={{ mb: { xs: 3, md: 4 } }} />

      {/* Map over the categories and render a row for each one */}
      {categories.map((category, idx) => (
        <Box key={category._id} component="section" aria-label={category.name} sx={{ mb: { xs: 4, md: 5 } }}>
          <CategoryRow category={category} />
          {idx !== categories.length - 1 && <Divider sx={{ mt: { xs: 3, md: 4 } }} />}
        </Box>
      ))}
    </Container>
  )
}

export default ShopPage
