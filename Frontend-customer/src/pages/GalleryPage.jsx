// import React from 'react';
// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';
// import { Container, Typography, ImageList, ImageListItem, CircularProgress, Alert, Box } from '@mui/material';

// const GalleryPage = () => {
//   const { data: images, isLoading, isError } = useQuery({
//     queryKey: ['galleryImages'],
//     queryFn: async () => {
//       const { data } = await axios.get('http://localhost:4000/api/gallery');
//       return data;
//     },
//   });

//   return (
//     <Container sx={{ py: 4 }}>
//       <Typography variant="h3" component="h1" align="center" gutterBottom>
//        Visual Stories
//       </Typography>
//       <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 4 }}>
//         Explore our exquisite collection and moments captured.
//       </Typography>
      
//       {isLoading && <Box sx={{ display: 'flex', justifyContent: 'center' }}><CircularProgress /></Box>}
//       {isError && <Alert severity="error">Could not load the gallery at this time.</Alert>}
      
//       {images && (
//         <ImageList variant="masonry" cols={3} gap={8}>
//           {images.map((item) => (
//             <ImageListItem key={item._id}>
//               <img
//                 srcSet={`http://localhost:4000${item.imageUrl}?w=248&fit=crop&auto=format&dpr=2 2x`}
//                 src={`http://localhost:4000${item.imageUrl}?w=248&fit=crop&auto=format`}
//                 alt={item.altText}
//                 loading="lazy"
//                 style={{ borderRadius: '8px' }}
//               />
//             </ImageListItem>
//           ))}
//         </ImageList>
//       )}
//     </Container>
//   );
// };

// export default GalleryPage;

// import React from 'react';
// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';
// import { Container, Typography, ImageList, ImageListItem, CircularProgress, Alert, Box } from '@mui/material';

// const GalleryPage = () => {
//   const { data: images, isLoading, isError } = useQuery({
//     queryKey: ['galleryImages'],
//     queryFn: async () => {
//       const { data } = await axios.get('http://localhost:4000/api/gallery');
//       return data;
//     },
//   });

//   return (
//     <Container sx={{ py: 4 , width: '98%' ,  maxWidth: '98% !important'}}>
//       <Typography variant="h3" component="h1" align="center" gutterBottom>
//         Our Gallery
//       </Typography>
//       <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 4 }}>
//         Explore our exquisite collection and moments captured.
//       </Typography>
      
//       {isLoading && <Box sx={{ display: 'flex', justifyContent: 'center' }}><CircularProgress /></Box>}
//       {isError && <Alert severity="error">Could not load the gallery at this time.</Alert>}
      
//       {images && (
//         <ImageList variant="masonry" cols={3} gap={8}>
//           {images.map((item) => (
//             <ImageListItem key={item._id}>
//               <img
//                 srcSet={`http://localhost:4000${item.imageUrl}?w=248&fit=crop&auto=format&dpr=2 2x`}
//                 src={`http://localhost:4000${item.imageUrl}?w=248&fit=crop&auto=format`}
//                 alt={item.altText}
//                 loading="lazy"
//                 style={{ borderRadius: '8px' }}
//               />
//             </ImageListItem>
//           ))}
//         </ImageList>
//       )}
//     </Container>
//   );
// };

// export default GalleryPage;

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Container, Typography, ImageList, ImageListItem, CircularProgress, Alert, Box, Fade, Dialog, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import api from '../api/axiosConfig';

const StyledContainer = styled(Container)(({ theme }) => ({
  width: '99%',
  maxWidth: '98% !important',
  margin: '0 1%',
  paddingTop: theme.spacing(6),
  paddingBottom: theme.spacing(6),
}));

const ImageWrapper = styled(Box)({
  position: 'relative',
  overflow: 'hidden',
  borderRadius: '12px',
  cursor: 'pointer',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)',
    '& img': {
      transform: 'scale(1.05)',
    },
  },
});

const StyledImage = styled('img')({
  width: '100%',
  height: 'auto',
  display: 'block',
  transition: 'transform 0.3s ease',
  borderRadius: '12px',
});

const FullScreenDialog = styled(Dialog)({
  '& .MuiDialog-paper': {
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    boxShadow: 'none',
    maxWidth: '90vw',
    maxHeight: '90vh',
  },
});

const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const { data: images, isLoading, isError } = useQuery({
    queryKey: ['galleryImages'],
    queryFn: async () => {
      const { data } = await api.get('/api/gallery');
      return data;
    },
  });

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

  return (
    <StyledContainer>
      <Fade in timeout={800}>
        <Box>
          <Typography 
            variant="h4" 
            component="h2" 
            align="center" 
            gutterBottom
            sx={{ 
              fontWeight: 700,
              background: 'linear-gradient(45deg, #B8860B 30%, #21CBF3 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2,
            }}
          >
           Visual Stories
          </Typography>
          <Typography 
            variant="h6" 
            align="center" 
            color="text.secondary" 
            sx={{ mb: 4, maxWidth: 700, mx: 'auto' }}
          >
            Explore our exquisite collection and moments captured in stunning detail
          </Typography>
        </Box>
      </Fade>
      
      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress size={60} />
        </Box>
      )}
      
      {isError && (
        <Alert severity="error" sx={{ borderRadius: 2 }}>
          Could not load the gallery at this time. Please try again later.
        </Alert>
      )}
      
      {images && (
        <Fade in timeout={1000}>
          <ImageList 
            variant="masonry" 
            cols={3} 
            gap={16}
            sx={{
              '@media (max-width: 900px)': {
                columnCount: 2,
              },
              '@media (max-width: 600px)': {
                columnCount: 1,
              },
            }}
          >
            {images.map((item, index) => (
              <ImageListItem 
                key={item._id}
                sx={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                  '@keyframes fadeInUp': {
                    from: {
                      opacity: 0,
                      transform: 'translateY(30px)',
                    },
                    to: {
                      opacity: 1,
                      transform: 'translateY(0)',
                    },
                  },
                }}
              >
                <ImageWrapper onClick={() => handleImageClick(item)}>
                  <StyledImage
                    src={item.imageUrl.startsWith('http')
                      ? `${item.imageUrl}?w=400&fit=crop&auto=format`
                      : `${import.meta.env.VITE_API_URL}${item.imageUrl}?w=400&fit=crop&auto=format`}
                    srcSet={item.imageUrl.startsWith('http')
                      ? `${item.imageUrl}?w=400&fit=crop&auto=format&dpr=2 2x`
                      : `${import.meta.env.VITE_API_URL}${item.imageUrl}?w=400&fit=crop&auto=format&dpr=2 2x`}
                    alt={item.altText}
                    loading="lazy"
                  />
                </ImageWrapper>
              </ImageListItem>
            ))}
          </ImageList>
        </Fade>
      )}

      {/* Fullscreen Image Modal */}
      <FullScreenDialog
        open={!!selectedImage}
        onClose={handleClose}
        maxWidth="xl"
        fullWidth
      >
        <IconButton
          onClick={handleClose}
          sx={{
            position: 'absolute',
            top: 20,
            right: 20,
            color: 'white',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
            },
            zIndex: 1,
          }}
        >
          <CloseIcon />
        </IconButton>
        {selectedImage && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              p: 4,
            }}
          >
            <img
              src={selectedImage.imageUrl.startsWith('http')
                ? selectedImage.imageUrl
                : `${import.meta.env.VITE_API_URL}${selectedImage.imageUrl}`}
              alt={selectedImage.altText}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
                borderRadius: '8px',
              }}
            />
          </Box>
        )}
      </FullScreenDialog>
    </StyledContainer>
  );
};

export default GalleryPage;