// // import React from 'react';
// // import { useQuery } from '@tanstack/react-query';
// // import axios from 'axios';
// // import { Container, Typography, ImageList, ImageListItem, CircularProgress, Alert, Box } from '@mui/material';

// // const GalleryPage = () => {
// //   const { data: images, isLoading, isError } = useQuery({
// //     queryKey: ['galleryImages'],
// //     queryFn: async () => {
// //       const { data } = await axios.get('http://localhost:4000/api/gallery');
// //       return data;
// //     },
// //   });

// //   return (
// //     <Container sx={{ py: 4 , width: '98%' ,  maxWidth: '98% !important'}}>
// //       <Typography variant="h3" component="h1" align="center" gutterBottom>
// //         Our Gallery
// //       </Typography>
// //       <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 4 }}>
// //         Explore our exquisite collection and moments captured.
// //       </Typography>
      
// //       {isLoading && <Box sx={{ display: 'flex', justifyContent: 'center' }}><CircularProgress /></Box>}
// //       {isError && <Alert severity="error">Could not load the gallery at this time.</Alert>}
      
// //       {images && (
// //         <ImageList variant="masonry" cols={3} gap={8}>
// //           {images.map((item) => (
// //             <ImageListItem key={item._id}>
// //               <img
// //                 srcSet={`http://localhost:4000${item.imageUrl}?w=248&fit=crop&auto=format&dpr=2 2x`}
// //                 src={`http://localhost:4000${item.imageUrl}?w=248&fit=crop&auto=format`}
// //                 alt={item.altText}
// //                 loading="lazy"
// //                 style={{ borderRadius: '8px' }}
// //               />
// //             </ImageListItem>
// //           ))}
// //         </ImageList>
// //       )}
// //     </Container>
// //   );
// // };

// // export default GalleryPage;

// import React, { useState } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';
// import { Container, Typography, ImageList, ImageListItem, CircularProgress, Alert, Box, Fade, Dialog, IconButton } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import { styled } from '@mui/material/styles';

// const StyledContainer = styled(Container)(({ theme }) => ({
//   width: '99%',
//   maxWidth: '98% !important',
//   margin: '0 1%',
//   paddingTop: theme.spacing(6),
//   paddingBottom: theme.spacing(6),
// }));

// const ImageWrapper = styled(Box)({
//   position: 'relative',
//   overflow: 'hidden',
//   borderRadius: '12px',
//   cursor: 'pointer',
//   transition: 'transform 0.3s ease, box-shadow 0.3s ease',
//   '&:hover': {
//     transform: 'translateY(-8px)',
//     boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)',
//     '& img': {
//       transform: 'scale(1.05)',
//     },
//   },
// });

// const StyledImage = styled('img')({
//   width: '100%',
//   height: 'auto',
//   display: 'block',
//   transition: 'transform 0.3s ease',
//   borderRadius: '12px',
// });

// const FullScreenDialog = styled(Dialog)({
//   '& .MuiDialog-paper': {
//     backgroundColor: 'rgba(0, 0, 0, 0.95)',
//     boxShadow: 'none',
//     maxWidth: '90vw',
//     maxHeight: '90vh',
//   },
// });

// const GalleryPage = () => {
//   const [selectedImage, setSelectedImage] = useState(null);

//   const { data: images, isLoading, isError } = useQuery({
//     queryKey: ['galleryImages'],
//     queryFn: async () => {
//       const { data } = await axios.get('http://localhost:4000/api/gallery');
//       return data;
//     },
//   });

//   const handleImageClick = (image) => {
//     setSelectedImage(image);
//   };

//   const handleClose = () => {
//     setSelectedImage(null);
//   };

//   return (
//     <StyledContainer>
//       <Fade in timeout={800}>
//         <Box>
//           <Typography 
//             variant="h3" 
//             component="h1" 
//             align="center" 
//             gutterBottom
//             sx={{ 
//               fontWeight: 700,
//               background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
//               WebkitBackgroundClip: 'text',
//               WebkitTextFillColor: 'transparent',
//               mb: 2,
//             }}
//           >
//             Our Gallery
//           </Typography>
//           <Typography 
//             variant="h6" 
//             align="center" 
//             color="text.secondary" 
//             sx={{ mb: 6, maxWidth: 700, mx: 'auto' }}
//           >
//             Explore our exquisite collection and moments captured in stunning detail
//           </Typography>
//         </Box>
//       </Fade>
      
//       {isLoading && (
//         <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
//           <CircularProgress size={60} />
//         </Box>
//       )}
      
//       {isError && (
//         <Alert severity="error" sx={{ borderRadius: 2 }}>
//           Could not load the gallery at this time. Please try again later.
//         </Alert>
//       )}
      
//       {images && (
//         <Fade in timeout={1000}>
//           <ImageList 
//             variant="masonry" 
//             cols={3} 
//             gap={16}
//             sx={{
//               '@media (max-width: 900px)': {
//                 columnCount: 2,
//               },
//               '@media (max-width: 600px)': {
//                 columnCount: 1,
//               },
//             }}
//           >
//             {images.map((item, index) => (
//               <ImageListItem 
//                 key={item._id}
//                 sx={{
//                   animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
//                   '@keyframes fadeInUp': {
//                     from: {
//                       opacity: 0,
//                       transform: 'translateY(30px)',
//                     },
//                     to: {
//                       opacity: 1,
//                       transform: 'translateY(0)',
//                     },
//                   },
//                 }}
//               >
//                 <ImageWrapper onClick={() => handleImageClick(item)}>
//                   <StyledImage
//                     srcSet={`http://localhost:4000${item.imageUrl}?w=400&fit=crop&auto=format&dpr=2 2x`}
//                     src={`http://localhost:4000${item.imageUrl}?w=400&fit=crop&auto=format`}
//                     alt={item.altText}
//                     loading="lazy"
//                   />
//                 </ImageWrapper>
//               </ImageListItem>
//             ))}
//           </ImageList>
//         </Fade>
//       )}

//       {/* Fullscreen Image Modal */}
//       <FullScreenDialog
//         open={!!selectedImage}
//         onClose={handleClose}
//         maxWidth="xl"
//         fullWidth
//       >
//         <IconButton
//           onClick={handleClose}
//           sx={{
//             position: 'absolute',
//             top: 20,
//             right: 20,
//             color: 'white',
//             backgroundColor: 'rgba(255, 255, 255, 0.1)',
//             '&:hover': {
//               backgroundColor: 'rgba(255, 255, 255, 0.2)',
//             },
//             zIndex: 1,
//           }}
//         >
//           <CloseIcon />
//         </IconButton>
//         {selectedImage && (
//           <Box
//             sx={{
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               height: '100%',
//               p: 4,
//             }}
//           >
//             <img
//               src={`http://localhost:4000${selectedImage.imageUrl}`}
//               alt={selectedImage.altText}
//               style={{
//                 maxWidth: '100%',
//                 maxHeight: '100%',
//                 objectFit: 'contain',
//                 borderRadius: '8px',
//               }}
//             />
//           </Box>
//         )}
//       </FullScreenDialog>
//     </StyledContainer>
//   );
// };

// export default GalleryPage;

// import React, { useState } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';
// import { 
//   Container, Typography, ImageList, ImageListItem, 
//   CircularProgress, Alert, Box, Fade, Dialog, IconButton 
// } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import { styled } from '@mui/material/styles';
// import api from '../api/axiosConfig';
// const StyledContainer = styled(Container)(({ theme }) => ({
//   width: '99%',
//   maxWidth: '98% !important',
//   margin: '0 1%',
//   paddingTop: theme.spacing(6),
//   paddingBottom: theme.spacing(6),
// }));

// const ImageWrapper = styled(Box)({
//   position: 'relative',
//   overflow: 'hidden',
//   borderRadius: '12px',
//   cursor: 'pointer',
//   transition: 'transform 0.3s ease, box-shadow 0.3s ease',
//   '&:hover': {
//     transform: 'translateY(-8px)',
//     boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)',
//     '& img': {
//       transform: 'scale(1.05)',
//     },
//   },
// });

// const StyledImage = styled('img')({
//   width: '100%',
//   height: 'auto',
//   display: 'block',
//   transition: 'transform 0.3s ease',
//   borderRadius: '12px',
// });

// const FullScreenDialog = styled(Dialog)({
//   '& .MuiDialog-paper': {
//     backgroundColor: 'rgba(0, 0, 0, 0.95)',
//     boxShadow: 'none',
//     maxWidth: '90vw',
//     maxHeight: '90vh',
//   },
// });

// const GalleryPage = () => {
//   const [selectedImage, setSelectedImage] = useState(null);

//   // ✅ Use your live backend base URL from environment variable
//   // const API_URL =  'https://jewellery-webstie-3.onrender.com';

//   const { data: images, isLoading, isError } = useQuery({
//     queryKey: ['galleryImages'],
//     queryFn: async () => {
//       const { data } = await api.get(`/api/gallery`);
//       return data;
//     },
//   });

//   const handleImageClick = (image) => setSelectedImage(image);
//   const handleClose = () => setSelectedImage(null);

//   return (
//     <StyledContainer>
//       <Fade in timeout={800}>
//         <Box>
//           <Typography 
//             variant="h3" 
//             component="h1" 
//             align="center" 
//             gutterBottom
//             sx={{ 
//               fontWeight: 700,
//               background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
//               WebkitBackgroundClip: 'text',
//               WebkitTextFillColor: 'transparent',
//               mb: 2,
//             }}
//           >
//             Our Gallery
//           </Typography>
//           <Typography 
//             variant="h6" 
//             align="center" 
//             color="text.secondary" 
//             sx={{ mb: 6, maxWidth: 700, mx: 'auto' }}
//           >
//             Explore our exquisite collection and moments captured in stunning detail
//           </Typography>
//         </Box>
//       </Fade>
      
//       {isLoading && (
//         <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
//           <CircularProgress size={60} />
//         </Box>
//       )}
      
//       {isError && (
//         <Alert severity="error" sx={{ borderRadius: 2 }}>
//           Could not load the gallery at this time. Please try again later.
//         </Alert>
//       )}
      
//       {images && (
//         <Fade in timeout={1000}>
//           <ImageList 
//             variant="masonry" 
//             cols={3} 
//             gap={16}
//             sx={{
//               '@media (max-width: 900px)': {
//                 columnCount: 2,
//               },
//               '@media (max-width: 600px)': {
//                 columnCount: 1,
//               },
//             }}
//           >
//             {images.map((item, index) => (
//               <ImageListItem 
//                 key={item._id}
//                 sx={{
//                   animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
//                   '@keyframes fadeInUp': {
//                     from: {
//                       opacity: 0,
//                       transform: 'translateY(30px)',
//                     },
//                     to: {
//                       opacity: 1,
//                       transform: 'translateY(0)',
//                     },
//                   },
//                 }}
//               >
//                 <ImageWrapper onClick={() => handleImageClick(item)}>
//                   <StyledImage
//                     // ✅ Use Cloudinary URL directly if already stored
//                     src={`${API_URL}${item.imageUrl}`}
//                     srcSet={`${API_URL}${item.imageUrl}?w=400&fit=crop&auto=format&dpr=2 2x`}
//                     alt={item.altText}
//                     loading="lazy"
//                   />
//                 </ImageWrapper>
//               </ImageListItem>
//             ))}
//           </ImageList>
//         </Fade>
//       )}

//       {/* Fullscreen Image Modal */}
//       <FullScreenDialog
//         open={!!selectedImage}
//         onClose={handleClose}
//         maxWidth="xl"
//         fullWidth
//       >
//         <IconButton
//           onClick={handleClose}
//           sx={{
//             position: 'absolute',
//             top: 20,
//             right: 20,
//             color: 'white',
//             backgroundColor: 'rgba(255, 255, 255, 0.1)',
//             '&:hover': {
//               backgroundColor: 'rgba(255, 255, 255, 0.2)',
//             },
//             zIndex: 1,
//           }}
//         >
//           <CloseIcon />
//         </IconButton>
//         {selectedImage && (
//           <Box
//             sx={{
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               height: '100%',
//               p: 4,
//             }}
//           >
//             <img
//               src={`${API_URL}${selectedImage.imageUrl}`}
//               alt={selectedImage.altText}
//               style={{
//                 maxWidth: '100%',
//                 maxHeight: '100%',
//                 objectFit: 'contain',
//                 borderRadius: '8px',
//               }}
//             />
//           </Box>
//         )}
//       </FullScreenDialog>
//     </StyledContainer>
//   );
// };

// export default GalleryPage;


// import React, { useState } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';
// import { 
//   Container, Typography, ImageList, ImageListItem, 
//   CircularProgress, Alert, Box, Fade, Dialog, IconButton 
// } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import { styled } from '@mui/material/styles';

// const StyledContainer = styled(Container)(({ theme }) => ({
//   width: '99%',
//   maxWidth: '98% !important',
//   margin: '0 1%',
//   paddingTop: theme.spacing(6),
//   paddingBottom: theme.spacing(6),
// }));

// const ImageWrapper = styled(Box)({
//   position: 'relative',
//   overflow: 'hidden',
//   borderRadius: '12px',
//   cursor: 'pointer',
//   transition: 'transform 0.3s ease, box-shadow 0.3s ease',
//   '&:hover': {
//     transform: 'translateY(-8px)',
//     boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)',
//     '& img': {
//       transform: 'scale(1.05)',
//     },
//   },
// });

// const StyledImage = styled('img')({
//   width: '100%',
//   height: 'auto',
//   display: 'block',
//   transition: 'transform 0.3s ease',
//   borderRadius: '12px',
// });

// const FullScreenDialog = styled(Dialog)({
//   '& .MuiDialog-paper': {
//     backgroundColor: 'rgba(0, 0, 0, 0.95)',
//     boxShadow: 'none',
//     maxWidth: '90vw',
//     maxHeight: '90vh',
//   },
// });

// const GalleryPage = () => {
//   const [selectedImage, setSelectedImage] = useState(null);

//   // ✅ Use your live backend base URL from environment variable
//   const API_URL = import.meta.env.VITE_API_URL || 'https://jewellery-webstie-3.onrender.com';

//   const { data: images, isLoading, isError } = useQuery({
//     queryKey: ['galleryImages'],
//     queryFn: async () => {
//       const { data } = await axios.get(`${API_URL}/api/gallery`);
//       return data;
//     },
//   });

//   const handleImageClick = (image) => setSelectedImage(image);
//   const handleClose = () => setSelectedImage(null);

//   return (
//     <StyledContainer>
//       <Fade in timeout={800}>
//         <Box>
//           <Typography 
//             variant="h3" 
//             component="h1" 
//             align="center" 
//             gutterBottom
//             sx={{ 
//               fontWeight: 700,
//               background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
//               WebkitBackgroundClip: 'text',
//               WebkitTextFillColor: 'transparent',
//               mb: 2,
//             }}
//           >
//             Our Gallery
//           </Typography>
//           <Typography 
//             variant="h6" 
//             align="center" 
//             color="text.secondary" 
//             sx={{ mb: 6, maxWidth: 700, mx: 'auto' }}
//           >
//             Explore our exquisite collection and moments captured in stunning detail
//           </Typography>
//         </Box>
//       </Fade>
      
//       {isLoading && (
//         <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
//           <CircularProgress size={60} />
//         </Box>
//       )}
      
//       {isError && (
//         <Alert severity="error" sx={{ borderRadius: 2 }}>
//           Could not load the gallery at this time. Please try again later.
//         </Alert>
//       )}
      
//       {images && (
//         <Fade in timeout={1000}>
//           <ImageList 
//             variant="masonry" 
//             cols={3} 
//             gap={16}
//             sx={{
//               '@media (max-width: 900px)': {
//                 columnCount: 2,
//               },
//               '@media (max-width: 600px)': {
//                 columnCount: 1,
//               },
//             }}
//           >
//             {images.map((item, index) => (
//               <ImageListItem 
//                 key={item._id}
//                 sx={{
//                   animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
//                   '@keyframes fadeInUp': {
//                     from: {
//                       opacity: 0,
//                       transform: 'translateY(30px)',
//                     },
//                     to: {
//                       opacity: 1,
//                       transform: 'translateY(0)',
//                     },
//                   },
//                 }}
//               >
//                 <ImageWrapper onClick={() => handleImageClick(item)}>
//                   {/* <StyledImage
//                     // ✅ Use Cloudinary URL directly if already stored
//                     src={item.imageUrl}
//                     srcSet={`${item.imageUrl}?w=400&fit=crop&auto=format&dpr=2 2x`}
//                     alt={item.altText}
//                     loading="lazy"
//                   /> */}
//                   <StyledImage
//   src={
//     item.imageUrl?.startsWith('http')
//       ? item.imageUrl
//       : `${API_URL.replace(/\/$/, '')}/${item.imageUrl.replace(/^\//, '')}`
//   }
// //   srcSet={
// //   item.imageUrl?.startsWith('http')
// //     ? `${item.imageUrl}?w=400&fit=crop&auto=format&dpr=2 2x`
// //     : `${API_URL}/${item.imageUrl}?w=400&fit=crop&auto=format&dpr=2 2x`
// // }

//   alt={item.altText || 'Gallery Image'}
//   loading="lazy"
//   onError={(e) => {
//     e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
//   }}
// />
//                   {/* <StyledImage
//   src={
//     item.imageUrl.startsWith('http')
//       ? item.imageUrl
//       : `${API_URL}/${item.imageUrl}`
//   }
//   alt={item.altText || 'Gallery Image'}
//   loading="lazy"
//   style={{
//     objectFit: 'cover',
//     width: '100%',
//     height: '100%',
//     borderRadius: '12px',
//   }}
//   onError={(e) => {
//     e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
//   }}
// /> */}

//                 </ImageWrapper>
//               </ImageListItem>
//             ))}
//           </ImageList>
//         </Fade>
//       )}

//       {/* Fullscreen Image Modal */}
//       <FullScreenDialog
//         open={!!selectedImage}
//         onClose={handleClose}
//         maxWidth="xl"
//         fullWidth
//       >
//         <IconButton
//           onClick={handleClose}
//           sx={{
//             position: 'absolute',
//             top: 20,
//             right: 20,
//             color: 'white',
//             backgroundColor: 'rgba(255, 255, 255, 0.1)',
//             '&:hover': {
//               backgroundColor: 'rgba(255, 255, 255, 0.2)',
//             },
//             zIndex: 1,
//           }}
//         >
//           <CloseIcon />
//         </IconButton>
//         {selectedImage && (
//           <Box
//             sx={{
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               height: '100%',
//               p: 4,
//             }}
//           >
//             <img
//               src={selectedImage.imageUrl}
//               alt={selectedImage.altText}
//               style={{
//                 maxWidth: '100%',
//                 maxHeight: '100%',
//                 objectFit: 'contain',
//                 borderRadius: '8px',
//               }}
//             />
//           </Box>
//         )}
//       </FullScreenDialog>
//     </StyledContainer>
//   );
// };

// export default GalleryPage;

// import React, { useState } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';
// import { 
//   Container, Typography, ImageList, ImageListItem, 
//   CircularProgress, Alert, Box, Fade, Dialog, IconButton 
// } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import { styled } from '@mui/material/styles';

// const StyledContainer = styled(Container)(({ theme }) => ({
//   width: '99%',
//   maxWidth: '98% !important',
//   margin: '0 1%',
//   paddingTop: theme.spacing(6),
//   paddingBottom: theme.spacing(6),
// }));

// const ImageWrapper = styled(Box)({
//   position: 'relative',
//   overflow: 'hidden',
//   borderRadius: '12px',
//   cursor: 'pointer',
//   transition: 'transform 0.3s ease, box-shadow 0.3s ease',
//   '&:hover': {
//     transform: 'translateY(-8px)',
//     boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)',
//     '& img': {
//       transform: 'scale(1.05)',
//     },
//   },
// });

// const StyledImage = styled('img')({
//   width: '100%',
//   height: 'auto',
//   display: 'block',
//   transition: 'transform 0.3s ease',
//   borderRadius: '12px',
// });

// const FullScreenDialog = styled(Dialog)({
//   '& .MuiDialog-paper': {
//     backgroundColor: 'rgba(0, 0, 0, 0.95)',
//     boxShadow: 'none',
//     maxWidth: '90vw',
//     maxHeight: '90vh',
//   },
// });

// const GalleryPage = () => {
//   const [selectedImage, setSelectedImage] = useState(null);

//   const API_URL = import.meta.env.VITE_API_URL || 'https://jewellery-webstie-3.onrender.com';

//   const { data: images, isLoading, isError } = useQuery({
//     queryKey: ['galleryImages'],
//     queryFn: async () => {
//       const { data } = await axios.get(`${API_URL}/api/gallery`);
//       return data;
//     },
//   });

//   const handleImageClick = (image) => setSelectedImage(image);
//   const handleClose = () => setSelectedImage(null);

//   // ✅ Function to handle both Cloudinary and local images
//   const getImageUrl = (url) => {
//     if (!url) return 'https://via.placeholder.com/400x300?text=Image+Not+Found';
//     return url.startsWith('http')
//       ? url
//       : `${API_URL.replace(/\/$/, '')}/${url.replace(/^\//, '')}`;
//   };

//   return (
//     <StyledContainer>
//       <Fade in timeout={800}>
//         <Box>
//           <Typography 
//             variant="h3" 
//             component="h1" 
//             align="center" 
//             gutterBottom
//             sx={{ 
//               fontWeight: 700,
//               background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
//               WebkitBackgroundClip: 'text',
//               WebkitTextFillColor: 'transparent',
//               mb: 2,
//             }}
//           >
//             Our Gallery
//           </Typography>
//           <Typography 
//             variant="h6" 
//             align="center" 
//             color="text.secondary" 
//             sx={{ mb: 6, maxWidth: 700, mx: 'auto' }}
//           >
//             Explore our exquisite collection and moments captured in stunning detail
//           </Typography>
//         </Box>
//       </Fade>
      
//       {isLoading && (
//         <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
//           <CircularProgress size={60} />
//         </Box>
//       )}
      
//       {isError && (
//         <Alert severity="error" sx={{ borderRadius: 2 }}>
//           Could not load the gallery at this time. Please try again later.
//         </Alert>
//       )}
      
//       {images && (
//         <Fade in timeout={1000}>
//           <ImageList 
//             variant="masonry" 
//             cols={3} 
//             gap={16}
//             sx={{
//               '@media (max-width: 900px)': {
//                 columnCount: 2,
//               },
//               '@media (max-width: 600px)': {
//                 columnCount: 1,
//               },
//             }}
//           >
//             {images.map((item, index) => (
//               <ImageListItem 
//                 key={item._id}
//                 sx={{
//                   animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
//                   '@keyframes fadeInUp': {
//                     from: {
//                       opacity: 0,
//                       transform: 'translateY(30px)',
//                     },
//                     to: {
//                       opacity: 1,
//                       transform: 'translateY(0)',
//                     },
//                   },
//                 }}
//               >
//                 <ImageWrapper onClick={() => handleImageClick(item)}>
//                   {/* <StyledImage
//                     src={getImageUrl(item.imageUrl)}
//                     alt={item.altText || 'Gallery Image'}
//                     loading="lazy"
//                     onError={(e) => {
//                       e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
//                     }}
//                   /> */}
//                    <StyledImage
//                     // ✅ Use Cloudinary URL directly if already stored
//                      src={gallery.imageUrl}
//                      srcSet={`${item.imageUrl}?w=400&fit=crop&auto=format&dpr=2 2x`}
//                      alt={item.altText}
//                      loading="lazy"
//                    /> 
//                 </ImageWrapper>
//               </ImageListItem>
//             ))}
//           </ImageList>
//         </Fade>
//       )}

//       {/* Fullscreen Image Modal */}
//       <FullScreenDialog
//         open={!!selectedImage}
//         onClose={handleClose}
//         maxWidth="xl"
//         fullWidth
//       >
//         <IconButton
//           onClick={handleClose}
//           sx={{
//             position: 'absolute',
//             top: 20,
//             right: 20,
//             color: 'white',
//             backgroundColor: 'rgba(255, 255, 255, 0.1)',
//             '&:hover': {
//               backgroundColor: 'rgba(255, 255, 255, 0.2)',
//             },
//             zIndex: 1,
//           }}
//         >
//           <CloseIcon />
//         </IconButton>
//         {selectedImage && (
//           <Box
//             sx={{
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               height: '100%',
//               p: 4,
//             }}
//           >
//             <img
//               src={getImageUrl(selectedImage.imageUrl)}
//               alt={selectedImage.altText || 'Gallery Image'}
//               style={{
//                 maxWidth: '100%',
//                 maxHeight: '100%',
//                 objectFit: 'contain',
//                 borderRadius: '8px',
//               }}
//             />
//           </Box>
//         )}
//       </FullScreenDialog>
//     </StyledContainer>
//   );
// };

// export default GalleryPage;

import React, { useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Container, Typography, ImageList, ImageListItem, Box, CircularProgress, Dialog, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const API_URL = import.meta.env.VITE_API_URL || 'https://jewellery-webstie-3.onrender.com';

const GalleryPage = () => {
  const [selected, setSelected] = useState(null);

  const { data: images, isLoading } = useQuery({
    queryKey: ['galleryImages'],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}/api/gallery`);
      return data;
    },
  });

  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h3" align="center" mb={4}>Our Gallery</Typography>

      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      ) : (
        <ImageList variant="masonry" cols={3} gap={16}>
          {images?.map((img) => (
            <ImageListItem key={img._id} onClick={() => setSelected(img)}>
              <img
                src={img.imageUrl}
                alt={img.title}
                loading="lazy"
                style={{ borderRadius: '10px', cursor: 'pointer' }}
              />
            </ImageListItem>
          ))}
        </ImageList>
      )}

      <Dialog open={!!selected} onClose={() => setSelected(null)} maxWidth="lg">
        <IconButton
          onClick={() => setSelected(null)}
          sx={{ position: 'absolute', top: 10, right: 10, color: 'white' }}
        >
          <CloseIcon />
        </IconButton>
        {selected && (
          <Box sx={{ p: 4, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src={selected.imageUrl} alt={selected.title} style={{ maxWidth: '90vw', maxHeight: '80vh' }} />
          </Box>
        )}
      </Dialog>
    </Container>
  );
};

export default GalleryPage;
