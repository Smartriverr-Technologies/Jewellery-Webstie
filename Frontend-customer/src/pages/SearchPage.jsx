import React, { useState, useEffect } from 'react';
import {Link, useParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import {
  Container,
  Typography,
  Grid,
  CircularProgress,
  Alert,
  Box,
  Skeleton,
} from '@mui/material';
import api from '../api/axiosConfig';

const SearchPage = () => {
  const { keyword } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(
          `/api/products/search?keyword=${keyword}`
        );
        setProducts(data);
        setError('');
      } catch (err) {
        setError('Could not fetch products. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [keyword]);

  return (
    <Container sx={{ py: 4 }}>
      {/* Header */}
      <Box
        sx={{
          mb: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          Search Results for "<span style={{ color: '#B8860B' }}>{keyword}</span>"
        </Typography>
        {!loading && !error && (
          <Typography variant="subtitle1" color="text.secondary">
            {products.length} {products.length === 1 ? 'product' : 'products'} found
          </Typography>
        )}
      </Box>

      {/* Loading State */}
      {loading ? (
        <Grid container spacing={3}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Skeleton variant="rectangular" height={250} sx={{ borderRadius: 2 }} />
              <Skeleton width="60%" sx={{ mt: 1 }} />
              <Skeleton width="40%" />
            </Grid>
          ))}
        </Grid>
      ) : error ? (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      ) : products.length === 0 ? (
        <Box textAlign="center" mt={5}>
          <Typography variant="h6" color="text.secondary">
            No products found for "<strong>{keyword}</strong>"
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={1}>
            Try searching with different keywords or check out our <Link to='/shop' style={{ color: '#B8860B', fontWeight:'bold' , textDecoration:'none'}} >Collections</Link>.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default SearchPage;
