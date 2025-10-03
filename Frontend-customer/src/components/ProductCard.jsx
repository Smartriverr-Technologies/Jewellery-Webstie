import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Card, CardActionArea, CardContent, CardMedia, Typography, IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import './ProductCard.css';
import { useSnackbar } from 'notistack';

const ProductCard = ({ product }) => {
  const { userInfo, wishlist, addToWishlistCtx, removeFromWishlistCtx } = useAuth();
   const { enqueueSnackbar } = useSnackbar();
  const isWishlisted = userInfo && wishlist.some(item => item._id === product._id);

  const toggleWishlist = async (e) => {
    e.preventDefault();
    try {
      if (isWishlisted) {
        await removeFromWishlistCtx(product._id);
        enqueueSnackbar(`${product.title} removed from wishlist`, { variant: 'info' });
      } else {
        await addToWishlistCtx(product._id);
        // --- 3. Show toast on success ---
        enqueueSnackbar(`${product.title} added to wishlist`, { variant: 'success' });
      }
    } catch (error) {
      enqueueSnackbar('Could not update wishlist', { variant: 'error' });
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 200, damping: 12 }}
    >
      <Card 
        sx={{ 
          position: 'relative', 
          borderRadius: 3, 
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)', 
          overflow: 'hidden',
          '&:hover': { boxShadow: '0 8px 30px rgba(0,0,0,0.15)' }
        }}
      >
        {/* Wishlist Button */}
        {userInfo && (
          <IconButton
            onClick={toggleWishlist}
            sx={{
              position: 'absolute',
              top: 10,
              right: 10,
              zIndex: 10,
              backgroundColor: 'rgba(255,255,255,0.8)',
              boxShadow: 1,
              '&:hover': { backgroundColor: '#fff' }
            }}
          >
            {isWishlisted ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
          </IconButton>
        )}

        {/* Image with zoom effect */}
        <CardActionArea 
          component={Link} 
          to={`/product/slug/${product.slug}`} 
          sx={{ overflow: 'hidden' }}
        >
          <CardMedia
  component="img"
  height="200"   // smaller height
  image={`http://localhost:4000${product.images[0]?.url}`}
  alt={product.title}
  sx={{ 
    objectFit: 'cover',
    transition: 'transform 0.4s ease',
    '&:hover': { transform: 'scale(1.06)' }
  }}
/>
          <CardContent sx={{ textAlign: 'center', py: 1 }}>
  <Typography 
    gutterBottom 
    variant="subtitle1" 
    noWrap 
    sx={{ fontWeight: '600', fontSize: "0.95rem" }}
  >
    {product.title}
  </Typography>
  <Typography 
    variant="body2" 
    color="primary" 
    sx={{ fontSize: '1rem', fontWeight: '600' }}
  >
    ₹{product.price}
  </Typography>
</CardContent>
        </CardActionArea>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
