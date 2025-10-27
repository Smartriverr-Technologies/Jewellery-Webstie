// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Box, Card, CardActionArea, CardContent, CardMedia, Typography, IconButton } from '@mui/material';
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import { useAuth } from '../context/AuthContext';
// import { motion } from 'framer-motion';
// import './ProductCard.css';
// import { useSnackbar } from 'notistack';
// import { red } from '@mui/material/colors';


// const ProductCard = ({ product }) => {
//   const { userInfo, wishlist, addToWishlistCtx, removeFromWishlistCtx } = useAuth();
//    const { enqueueSnackbar } = useSnackbar();
//   const isWishlisted = userInfo && wishlist.some(item => item._id === product._id);

//   const toggleWishlist = async (e) => {
//     e.preventDefault();
//     try {
//       if (isWishlisted) {
//         await removeFromWishlistCtx(product._id);
//         enqueueSnackbar(`${product.title} removed from wishlist`, { variant: 'info' });
//       } else {
//         await addToWishlistCtx(product._id);
//         // --- 3. Show toast on success ---
//         enqueueSnackbar(`${product.title} added to wishlist`, { variant: 'success' });
//       }
//     } catch (error) {
//       enqueueSnackbar('Could not update wishlist', { variant: 'error' });
//     }
//   };

//   return (
//     <motion.div
//       whileHover={{ scale: 1.05 }}
//       transition={{ type: "spring", stiffness: 200, damping: 12 }}
//     >
//       <Card 
//         sx={{ 
//           position: 'relative', 
//           borderRadius: 3, 
//           boxShadow: '0 4px 20px rgba(0,0,0,0.08)', 
//           overflow: 'hidden',
//           '&:hover': { boxShadow: '0 8px 30px rgba(0,0,0,0.15)' }
//         }}
//       >
//         {/* Wishlist Button */}
//         {userInfo && (
//           <IconButton
//             onClick={toggleWishlist}
//             sx={{
//               position: 'absolute',
//               top: 10,
//               right: 10,
//               zIndex: 10,
//               backgroundColor: 'rgba(255,255,255,0.8)',
//               boxShadow: 1,
//               '&:hover': { backgroundColor: '#fff' }
//             }}
//           >
//             {isWishlisted ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
//           </IconButton>
//         )}

//         {/* Image with zoom effect */}
//         <CardActionArea 
//           component={Link} 
//           to={`/product/slug/${product.slug}`} 
//           sx={{ overflow: 'hidden' }}
//         >
//           <CardMedia
//   component="img"
//   height="200"   // smaller height
//   // image={`${import.meta.env.VITE_API_URL}${product.images[0]?.url}`}
//    image={product.images[0]?.url || "/placeholder.png"}
//   alt={product.title}
//   sx={{ 
//     objectFit: 'cover',
//     transition: 'transform 0.4s ease',
//     '&:hover': { transform: 'scale(1.06)' }
//   }}
// />
//           <CardContent sx={{ textAlign: 'center', py: 1 }}>
//   <Typography 
//     gutterBottom 
//     variant="subtitle1" 
//     noWrap 
//     sx={{ fontWeight: '600', fontSize: "0.95rem" }}
//   >
//     {product.title}
//   </Typography>
//   <Typography 
//     variant="body2" 
//     color="primary" 
//     sx={{ fontSize: '1rem', fontWeight: '600' }}
//   >
//     ₹{product.price}
//   </Typography>
// </CardContent>
//         </CardActionArea>
//       </Card>
//     </motion.div>
//   );
// };

// export default ProductCard;

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
    e.stopPropagation();
    try {
      if (isWishlisted) {
        await removeFromWishlistCtx(product._id);
        enqueueSnackbar(`${product.title} removed from wishlist`, { variant: 'info' });
      } else {
        await addToWishlistCtx(product._id);
        enqueueSnackbar(`${product.title} added to wishlist`, { variant: 'success' });
      }
    } catch (error) {
      enqueueSnackbar('Could not update wishlist', { variant: 'error' });
    }
  };

  return (
    <motion.div
      className="product-card-container"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card 
        sx={{ 
          position: 'relative', 
          borderRadius: { xs: 2, sm: 2.5, md: 3 }, 
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)', 
          overflow: 'hidden',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          '&:hover': { 
            boxShadow: { 
              xs: '0 4px 20px rgba(0,0,0,0.12)', 
              md: '0 8px 30px rgba(0,0,0,0.15)' 
            }
          }
        }}
      >
        {/* Wishlist Button */}
        {userInfo && (
          <IconButton
            onClick={toggleWishlist}
            sx={{
              position: 'absolute',
              top: { xs: 8, sm: 10 },
              right: { xs: 8, sm: 10 },
              zIndex: 10,
              backgroundColor: 'rgba(255,255,255,0.9)',
              boxShadow: 1,
              width: { xs: 32, sm: 36, md: 40 },
              height: { xs: 32, sm: 36, md: 40 },
              '&:hover': { 
                backgroundColor: '#fff',
                transform: 'scale(1.1)'
              },
              '&:active': {
                transform: 'scale(0.95)'
              },
              transition: 'all 0.2s ease'
            }}
          >
            {isWishlisted ? (
              <FavoriteIcon 
                sx={{ 
                  fontSize: { xs: 18, sm: 20, md: 24 },
                  color: '#d4af37'
                }} 
              />
            ) : (
              <FavoriteBorderIcon 
                sx={{ 
                  fontSize: { xs: 18, sm: 20, md: 24 }
                }} 
              />
            )}
          </IconButton>
        )}

        {/* Image with zoom effect */}
        <CardActionArea 
          component={Link} 
          to={`/product/slug/${product.slug}`} 
          sx={{ 
            overflow: 'hidden',
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch'
          }}
        >
          <CardMedia
            component="img"
            height="200"
            image={product.images[0]?.url || "/placeholder.png"}
            alt={product.title}
            sx={{ 
              height: { xs: 160, sm: 180, md: 200 },
              objectFit: 'cover',
              transition: 'transform 0.4s ease',
              '&:hover': { 
                transform: { xs: 'none', md: 'scale(1.06)' }
              }
            }}
          />
          <CardContent 
            sx={{ 
              textAlign: 'center', 
              py: { xs: 1, sm: 1.5, md: 2 },
              px: { xs: 1, sm: 1.5, md: 2 },
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
            <Typography 
              gutterBottom 
              variant="subtitle1" 
              noWrap 
              sx={{ 
                fontWeight: '600', 
                fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.95rem' },
                mb: { xs: 0.5, md: 1 },
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}
            >
              {product.title}
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem' }, 
                fontWeight: '700',
                background: 'linear-gradient(135deg, #d4af37 0%, #f4e4c1 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              ₹{product.price?.toLocaleString('en-IN')}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
