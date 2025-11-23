import React, { useState, useEffect, useRef } from 'react'; // <-- 1. Import useRef
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useSnackbar } from 'notistack';
import ImageGallery from 'react-image-gallery';
import { Box, Typography, Button, FormControl, InputLabel, Select, MenuItem, CircularProgress, Alert, Container, Grid } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import 'react-image-gallery/styles/css/image-gallery.css';
import api from '../api/axiosConfig';

const ProductPage = () => {
  const { slug } = useParams();
  const { addToCart } = useCart();
  const { enqueueSnackbar } = useSnackbar();

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const toastShownRef = useRef(false); // <-- 2. Create the ref flag

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/api/products/slug/${slug}`);
        setProduct(data);
      } catch (err) {
        setError('Failed to fetch product details');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  const addToCartHandler = () => {
    // --- 3. The Fix Logic ---
    if (toastShownRef.current) return; // If toast was just shown, exit early

    addToCart(product, qty);
    enqueueSnackbar(`${product.title} added to cart!`, { variant: 'success' });
    toastShownRef.current = true; // Set the flag

    // Reset the flag after a short delay
    setTimeout(() => {
      toastShownRef.current = false;
    }, 1000); 
    // -------------------------
  };

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', my: 10 }}><CircularProgress size={60} /></Box>;
  if (error) return <Alert severity="error" sx={{ m: 3 }}>{error}</Alert>;
  if (!product) return null;

  const stockCount = product.variants[0]?.stock || 0;

  const imagesForGallery = product.images.map(img => ({
    original: img.url.startsWith('http')
      ? img.url
      : `${import.meta.env.VITE_API_URL}${img.url}`,
    thumbnail: img.url.startsWith('http')
      ? img.url
      : `${import.meta.env.VITE_API_URL}${img.url}`,
    originalAlt: product.title,
    thumbnailAlt: product.title,
  }));

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, md: 3 } }}>
      <Grid container spacing={{ xs: 3, md: 6 }}>
        {/* --- Left: Image Gallery --- */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              width: '100%',
              position: 'sticky',
              top: { xs: 80, md: 100 }, // Adjust for header height
              '& .image-gallery-slide img': {
                borderRadius: 2,
                maxHeight: { xs: '60vh', md: '70vh' },
                objectFit: 'contain',
              },
              '& .image-gallery-thumbnails-wrapper': {
                '& .image-gallery-thumbnail': {
                  border: '2px solid transparent',
                  borderRadius: 1,
                  transition: 'border-color 0.3s',
                  width: { xs: 60, sm: 80 },
                  height: { xs: 60, sm: 80 },
                  '&.active': {
                    borderColor: 'primary.main',
                  },
                  '& img': {
                    borderRadius: 1,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }
                }
              }
            }}
          >
            <ImageGallery
              items={imagesForGallery}
              showNav={false}
              showPlayButton={false}
              showFullscreenButton={true}
              slideDuration={450}
              lazyLoad={true}
              thumbnailPosition="bottom"
            />
          </Box>
        </Grid>

        {/* --- Right: Product Details --- */}
        <Grid item xs={12} md={6}>
          <Typography
            variant="h4"
            component="h1"
            fontWeight="600"
            gutterBottom
            sx={{ fontSize: { xs: '1.8rem', sm: '2.2rem' } }}
          >
            {product.title}
          </Typography>

          <Typography variant="h5" sx={{ mb: 2, color: '#B8860B', fontWeight: 600, fontSize: { xs: '1.5rem', sm: '1.8rem' } }}>
            ₹{product.price.toFixed(2)}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              display: 'inline-block',
              px: 2,
              py: 0.5,
              borderRadius: '20px',
              fontWeight: 600,
              color: stockCount > 0 ? '#28a745' : '#dc3545',
              backgroundColor: stockCount > 0 ? 'rgba(40,167,69,0.1)' : 'rgba(220,53,69,0.1)',
              mb: 3
            }}
          >
            {stockCount > 0 ? 'In Stock' : 'Out of Stock'}
          </Typography>

          <Typography variant="body1" color="text.secondary" paragraph sx={{ lineHeight: 1.7, mb: 4 }}>
            {product.description}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3 }}>
            <FormControl size="small" sx={{ minWidth: 80 }}>
              <InputLabel>Qty</InputLabel>
              <Select
                value={qty}
                label="Qty"
                onChange={(e) => setQty(Number(e.target.value))}
                disabled={stockCount === 0}
              >
                {[...Array(stockCount).keys()].slice(0, 10).map(x => (
                  <MenuItem key={x + 1} value={x + 1}>{x + 1}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              onClick={addToCartHandler}
              disabled={stockCount === 0}
              variant="contained"
              sx={{
                background: 'linear-gradient(135deg, #B8860B, #FFD700)',
                color: '#fff',
                fontWeight: 600,
                height: 48,
                fontSize: '1rem',
                borderRadius: 2,
                flexGrow: 1,
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                },
              }}
              startIcon={<AddShoppingCartIcon />}
            >
              Add to Cart
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductPage;