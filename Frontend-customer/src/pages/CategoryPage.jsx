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
  gutterBottom
  sx={{
    textAlign: 'center',        // Text horizontally center
    position: 'relative',       // Underline ke liye relative position
    '&::after': {
      content: '""',            // Empty content for underline
      display: 'block',
      width: '15%',             // 75% width of the text container
      height: '3px',            // underline height
      backgroundColor: '#B8860B', // underline color
      margin: '10px auto 0', 
        // center underline and thoda space upar se
    },
  }}
>
   {capitalize(data.categoryName)} Collections
</Typography>
          <Grid container spacing={3}>
  {data.products.length === 0 ? (
    <Grid item xs={12}>
      <Typography>No products found in this category.</Typography>
    </Grid>
  ) : (
    data.products.map((product) => (
      <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
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