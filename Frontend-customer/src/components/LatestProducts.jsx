import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, Grid, Skeleton, Button } from '@mui/material';
import ProductCard from './ProductCard';
import { motion } from 'framer-motion';

const LatestProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        const { data } = await axios.get('http://localhost:4000/api/products/latest');
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch latest products', error);
      } finally {
        setLoading(false);
      }
    };
    fetchLatestProducts();
  }, []);

  return (
    <Box sx={{ py: 8, background: 'linear-gradient(to bottom, #f9f9f9, #ffffff)' }}>
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Box sx={{ textAlign: "center", mb: 6 }}>
    <Typography 
      variant="h4" 
      component="h2" 
      sx={{ 
        fontWeight: 'bold', 
        display: "inline-block",
        position: "relative",
        px: 2,
        '&::after': {
          content: '""',
          position: 'absolute',
          width: '50%',
          height: '4px',
          bottom: -8,
          left: '25%',
          backgroundColor: '#1976d2',
          borderRadius: '2px'
        }
      }}
    >
      Our Latest Products
    </Typography>
  </Box>
      </motion.div>

      {/* Product Grid */}
      <Grid 
  container 
  spacing={3} 
  justifyContent="center"
>
  {loading ? (
    Array.from(new Array(8)).map((_, index) => (
      <Grid item key={index} xs={12} sm={6} md={2.4}>
        <Skeleton variant="rectangular" height={220} sx={{ borderRadius: 3 }}/>
        <Box sx={{ pt: 1 }}>
          <Skeleton /><Skeleton width="60%" />
        </Box>
      </Grid>
    ))
  ) : (
    products.map((product, i) => (
      <Grid 
        item 
        key={product._id} 
        xs={12} sm={6} md={2.4}   // ≈ 5 per row
        sx={{ display: "flex" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
          style={{ flexGrow: 1, display: "flex" }}
        >
          <ProductCard product={product} />
        </motion.div>
      </Grid>
    ))
  )}
</Grid>


      {/* CTA Button */}
      <Box sx={{ textAlign: 'center', mt: 6 }}>
        <Button 
          component={Link} 
          to="/" 
          variant="contained" 
          size="large"
          sx={{
            borderRadius: '30px',
            px: 4,
            py: 1.5,
            fontWeight: 'bold',
            boxShadow: 4,
            textTransform: 'none',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-3px)',
              boxShadow: 6
            }
          }}
        >
          View All Products
        </Button>
      </Box>
    </Box>
  );
};

export default LatestProducts;
