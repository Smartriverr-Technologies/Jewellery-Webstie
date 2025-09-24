import React from 'react';
import { useAuth } from '../context/AuthContext';
import ProductCard from '../components/ProductCard';
import { Box, Typography, Grid, Fade } from '@mui/material';
import '../pages/HomePage.css';

const WishlistPage = () => {
  const { wishlist } = useAuth();

  return (
    <Box sx={{ maxWidth: '1200px', mx: 'auto', my: 5, px: 3 }}>
      <Typography variant="h4" fontWeight={700} sx={{ mb: 4, color: '#B8860B' }}>
        My Wishlist
      </Typography>

      {wishlist.length === 0 ? (
        <Typography variant="body1" sx={{ textAlign: 'center', mt: 10, color: 'text.secondary' }}>
          Your wishlist is empty.
        </Typography>
      ) : (
        <Grid container spacing={4}>
          {wishlist.map((product, index) => (
            <Fade in={true} style={{ transitionDelay: `${index * 100}ms` }} key={product._id}>
              <Grid item xs={12} sm={6} md={4}>
                <ProductCard product={product} premiumHover />
              </Grid>
            </Fade>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default WishlistPage;
