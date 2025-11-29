import React from 'react';
import { useParams, useSearchParams, Link as RouterLink } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import ShopLayout from '../components/ShopLayout';
import ProductCard from '../components/ProductCard';
import { Typography, Skeleton, Box, Pagination, Breadcrumbs, Link as MuiLink, Grid, Alert } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import api from '../api/axiosConfig';

const fetchCategoryData = async ({ queryKey }) => {
  const [_key, { slug, searchParamsString }] = queryKey;
  const { data: category } = await api.get(`/api/categories/slug/${slug}`);
  if (!category) throw new Error('Category not found');
  
  const params = new URLSearchParams(searchParamsString);
  params.set('category', category._id);
  
  const { data: productData } = await api.get(`/api/products?${params.toString()}`);
  return { ...productData, categoryName: category.name };
};

const CategoryPage = () => {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['categoryData', { slug, searchParamsString: searchParams.toString() }],
    queryFn: fetchCategoryData,
    keepPreviousData: true,
    retry: false,
  });
  
  const handleFilterChange = (filters) => setSearchParams(filters);
  const handlePageChange = (event, value) => {
    const currentParams = Object.fromEntries(searchParams.entries());
    setSearchParams({ ...currentParams, pageNumber: value });
  };

  const capitalize = (s) => s && s.charAt(0).toUpperCase() + s.slice(1);

  return (
    <ShopLayout onFilterChange={handleFilterChange}>
      {isError && <Alert severity="error">{(error).message || 'Could not load products.'}</Alert>}
      {isLoading ? (
        <>
          <Skeleton width="40%" height={40} />
          <Grid container spacing={3} sx={{ mt: 2 }}>
            {Array.from(new Array(8)).map((item, index) => (
              <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                <Skeleton variant="rectangular" height={250} /><Box sx={{ pt: 0.5 }}><Skeleton /><Skeleton width="60%" /></Box>
              </Grid>
            ))}
          </Grid>
        </>
      ) : data && (
        <>
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} sx={{ mb: 2 }}>
            <MuiLink component={RouterLink} underline="hover" color="inherit" to="/">Home</MuiLink>
            <Typography color="text.primary">{capitalize(data.categoryName)}</Typography>
          </Breadcrumbs>
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
   {capitalize(data.categoryName)} Collections
</Typography>
          <Grid container spacing={3} justifyContent="center">
  {data.products.length === 0 ? (
    <Grid item xs={12}>
      <Typography>No products found in this category.</Typography>
    </Grid>
  ) : (
    data.products.map((product) => (
      <Grid item key={product._id} xs={6} sm={4} md={2.4} lg={2.4} xl={2.4}>
        <ProductCard product={product} />
      </Grid>
    ))
  )}
</Grid>

          <Box sx={{ display: 'flex', justifyContent: 'center', pt: 4 }}>
            {data.pages > 1 && (
              <Pagination count={data.pages} page={data.page} onChange={handlePageChange} color="primary" />
            )}
          </Box>
        </>
      )}
    </ShopLayout>
  );
};
export default CategoryPage;

// import React, { useEffect } from 'react';
// import { useParams, useSearchParams, Link as RouterLink } from 'react-router-dom';
// import { useQuery } from '@tanstack/react-query';
// import {
//   Typography,
//   Skeleton,
//   Box,
//   Pagination,
//   Breadcrumbs,
//   Link as MuiLink,
//   Grid,
//   Alert,
//   useMediaQuery
// } from '@mui/material';
// import NavigateNextIcon from '@mui/icons-material/NavigateNext';
// import { useTheme } from '@mui/material/styles';
// import api from '../api/axiosConfig';
// import ProductCard from '../components/ProductCard';
// import ShopLayout from '../components/ShopLayout';


// // ---- API Fetch ----
// const fetchCategoryData = async ({ queryKey }) => {
//   const [_key, { slug, searchParamsString }] = queryKey;

//   const { data: category } = await api.get(`/api/categories/slug/${slug}`);
//   if (!category) throw new Error('Category not found');

//   const params = new URLSearchParams(searchParamsString);
//   params.set('category', category._id);

//   const { data: products } = await api.get(`/api/products?${params}`);

//   return { ...products, categoryName: category.name };
// };


// const CategoryPage = () => {
//   const { slug } = useParams();
//   const [searchParams, setSearchParams] = useSearchParams();

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));

//   const { data, isLoading, isError, error } = useQuery({
//     queryKey: ['categoryData', { slug, searchParamsString: searchParams.toString() }],
//     queryFn: fetchCategoryData,
//     keepPreviousData: true,
//     retry: false,
//   });

//   const handleFilterChange = (filters) => setSearchParams(filters);

//   const handlePageChange = (event, value) => {
//     const currentFilters = Object.fromEntries(searchParams.entries());
//     setSearchParams({ ...currentFilters, pageNumber: value });
//   };

//   // Auto scroll to top when filters or pagination changes
//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   }, [searchParams]);

//   const capitalize = (str) => str && str.charAt(0).toUpperCase() + str.slice(1);


//   return (
//     <ShopLayout onFilterChange={handleFilterChange}>
      
//       {/* ---- ERROR STATE ---- */}
//       {isError && <Alert severity="error">{error?.message || 'Failed to load products.'}</Alert>}

//       {/* ---- LOADING ---- */}
//       {isLoading ? (
//         <>
//           <Skeleton width="40%" height={40} />
//           <Grid container spacing={3} sx={{ mt: 2 }}>
//             {Array.from(new Array(10)).map((_, i) => (
//               <Grid key={i} item xs={6} sm={4} md={3} lg={2.4}>
//                 <Skeleton variant="rectangular" height={240} />
//                 <Box sx={{ pt: 1 }}>
//                   <Skeleton />
//                   <Skeleton width="60%" />
//                 </Box>
//               </Grid>
//             ))}
//           </Grid>
//         </>
//       ) : (
//         data && (
//           <>
//             {/* ---- Breadcrumb ---- */}
//             <Breadcrumbs
//               separator={<NavigateNextIcon fontSize="small" />}
//               sx={{ mb: 2, mt: isMobile ? 0 : 1 }}
//             >
//               <MuiLink component={RouterLink} underline="hover" color="inherit" to="/">
//                 Home
//               </MuiLink>
//               <Typography color="text.primary">{capitalize(data.categoryName)}</Typography>
//             </Breadcrumbs>


//             {/* ---- Title ---- */}
//             <Typography
//               variant="h4"
//               align="center"
//               sx={{
//                 mb: 3,
//                 fontWeight: 600,
//                 position: 'relative',
//                 '&::after': {
//                   content: '""',
//                   width: '90px',
//                   height: '3px',
//                   backgroundColor: '#B8860B',
//                   position: 'absolute',
//                   bottom: -8,
//                   left: '50%',
//                   transform: 'translateX(-50%)',
//                 },
//               }}
//             >
//               {capitalize(data.categoryName)} Collections
//             </Typography>

//             {/* ---- Products ---- */}
//             <Grid container spacing={2} justifyContent="center">
//               {data.products.length === 0 ? (
//                 <Typography sx={{ py: 5 }} align="center" width="100%">
//                   No products found for this filter.
//                 </Typography>
//               ) : (
//                 data.products.map((product) => (
//                   <Grid item key={product._id} xs={6} sm={4} md={3} lg={2.4}>
//                     <ProductCard product={product} />
//                   </Grid>
//                 ))
//               )}
//             </Grid>

//             {/* ---- Pagination ---- */}
//             {data.pages > 1 && (
//               <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
//                 <Pagination
//                   count={data.pages}
//                   page={data.page}
//                   onChange={handlePageChange}
//                   color="primary"
//                 />
//               </Box>
//             )}
//           </>
//         )
//       )}
//     </ShopLayout>
//   );
// };

// export default CategoryPage;
