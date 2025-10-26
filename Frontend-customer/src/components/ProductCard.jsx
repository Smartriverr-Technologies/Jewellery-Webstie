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
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 200, damping: 12 }}
      className="product-card-container"
    >
      <Card
        sx={{
          position: 'relative',
          borderRadius: 3,
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          overflow: 'hidden',
          '&:hover': { boxShadow: '0 8px 30px rgba(0,0,0,0.15)' },
          // 🧠 Make card smaller and tighter on mobile
          width: { xs: '100%', sm: '100%', md: '250px' },
          margin: { xs: 'auto', md: 0 },
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
              '&:hover': { backgroundColor: '#fff' },
              width: { xs: 30, md: 40 },
              height: { xs: 30, md: 40 },
            }}
          >
            {isWishlisted ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
          </IconButton>
        )}

        {/* Product Image */}
        <CardActionArea
          component={Link}
          to={`/product/slug/${product.slug}`}
          sx={{
            overflow: 'hidden',
            height: { xs: 160, sm: 180, md: 200 }, // smaller height on mobile
          }}
        >
          <CardMedia
            component="img"
            height="200"
            image={product.images[0]?.url || "/placeholder.png"}
            alt={product.title}
            sx={{
              objectFit: 'cover',
              transition: 'transform 0.4s ease',
              '&:hover': { transform: 'scale(1.06)' },
              height: { xs: 160, sm: 180, md: 200 }, // responsive height
            }}
          />
          <CardContent
            sx={{
              textAlign: 'center',
              py: { xs: 0.5, sm: 1 },
              px: { xs: 0.5, sm: 1 },
            }}
          >
            <Typography
              gutterBottom
              variant="subtitle1"
              noWrap
              sx={{
                fontWeight: '600',
                fontSize: { xs: '0.85rem', sm: '0.9rem', md: '0.95rem' },
              }}
            >
              {product.title}
            </Typography>
            <Typography
              variant="body2"
              color="primary"
              sx={{
                fontSize: { xs: '0.9rem', sm: '1rem' },
                fontWeight: '600',
              }}
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
