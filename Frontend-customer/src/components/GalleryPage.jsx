

import React, { useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Container, Typography, ImageList, ImageListItem, Box, CircularProgress, Dialog, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const API_URL = import.meta.env.VITE_API_URL || 'https://jewellery-webstie-3.onrender.com';

const GalleryPage = () => {
  const [selected, setSelected] = useState(null);

  // ✅ Fetch images from backend
  const { data: images, isLoading } = useQuery({
    queryKey: ['galleryImages'],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}/api/gallery`);
      return data;
    },
  });

  // ✅ Function to fix any malformed URLs
  const getValidImageUrl = (url) => {
    if (!url) return '';

    // If already a valid Cloudinary URL, return it directly
    if (url.startsWith('http')) return url;

    // If backend accidentally prefixed it, remove that part
    if (url.includes('res.cloudinary.com')) {
      return 'https://' + url.split(/https?:\/\//)[1];
    }

    // Otherwise, fallback to backend-based URL (for local images, optional)
    return `${API_URL.replace(/\/$/, '')}/${url.replace(/^\//, '')}`;
  };

  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h3" align="center" mb={4}>
        Our Gallery
      </Typography>

      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      ) : (
        <ImageList variant="masonry" cols={3} gap={16}>
          {images?.map((img) => (
            <ImageListItem key={img._id} onClick={() => setSelected(img)}>
              <img
                src={getValidImageUrl(img.imageUrl)}
                alt={img.title || 'Gallery Image'}
                loading="lazy"
                style={{ borderRadius: '10px', cursor: 'pointer', width: '100%' }}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
                }}
              />
            </ImageListItem>
          ))}
        </ImageList>
      )}

      {/* Fullscreen Dialog */}
      <Dialog open={!!selected} onClose={() => setSelected(null)} maxWidth="lg">
        <IconButton
          onClick={() => setSelected(null)}
          sx={{ position: 'absolute', top: 10, right: 10, color: 'white' }}
        >
          <CloseIcon />
        </IconButton>
        {selected && (
          <Box sx={{ p: 4, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img
              src={getValidImageUrl(selected.imageUrl)}
              alt={selected.title}
              style={{ maxWidth: '90vw', maxHeight: '80vh' }}
            />
          </Box>
        )}
      </Dialog>
    </Container>
  );
};

export default GalleryPage;
