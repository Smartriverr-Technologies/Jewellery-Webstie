import React, { useState } from 'react';
import axios from 'axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Box, Button, CircularProgress, Typography, ImageList, ImageListItem, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const API_URL = import.meta.env.VITE_API_URL || 'https://jewellery-webstie-3.onrender.com';

const AdminGallery = () => {
  const [image, setImage] = useState(null);
  const queryClient = useQueryClient();

  const { data: images, isLoading } = useQuery({
    queryKey: ['galleryImages'],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}/api/gallery`);
      return data;
    },
  });

  const handleUpload = async () => {
    if (!image) return alert('Please select an image');

    const formData = new FormData();
    formData.append('image', image);
    formData.append('folder', 'AuraJewels/general');

    await axios.post(`${API_URL}/api/gallery/upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    setImage(null);
    queryClient.invalidateQueries(['galleryImages']);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/api/gallery/${id}`);
    queryClient.invalidateQueries(['galleryImages']);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" mb={3}>Gallery Manager</Typography>

      <Box display="flex" alignItems="center" gap={2} mb={3}>
        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
        <Button variant="contained" onClick={handleUpload}>Upload</Button>
      </Box>

      {isLoading ? (
        <CircularProgress />
      ) : (
        <ImageList cols={3} gap={16}>
          {images?.map((img) => (
            <ImageListItem key={img._id}>
              <img src={img.imageUrl} alt={img.title} style={{ width: '100%', borderRadius: '10px' }} />
              <IconButton onClick={() => handleDelete(img._id)} color="error">
                <DeleteIcon />
              </IconButton>
            </ImageListItem>
          ))}
        </ImageList>
      )}
    </Box>
  );
};

export default AdminGallery;
