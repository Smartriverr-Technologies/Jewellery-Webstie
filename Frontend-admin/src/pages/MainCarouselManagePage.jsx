import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Box, Container, Typography, TextField, Button, Paper, Grid, List, ListItem, ListItemText, IconButton, ListItemAvatar, Avatar, Chip, CircularProgress, Alert } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import api from '../api/axiosConfig';
const MainCarouselManagePage = () => {
  const { userInfo } = useAuth();
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [image, setImage] = useState('');
  const [headline, setHeadline] = useState('');
  const [caption, setCaption] = useState('');
  const [link, setLink] = useState('');
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const fetchSlides = async () => {
    setLoading(true);
    try {
      // Fetch only slides for the 'main' location
      const { data } = await api.get('/api/carousel?location=main');
      setSlides(data);
    } catch (err) {
      setError('Failed to fetch slides.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  // const uploadFileHandler = async (e) => {
  //   const file = e.target.files[0];
  //   const formData = new FormData();
  //   formData.append('image', file);
  //   setUploading(true);
  //   try {
  //     const config = { headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${userInfo.token}` } };
  //     const { data } = await api.post('/api/upload', formData, config);
  //     setImage(data.image);
  //     alert('Image uploaded successfully.');
  //   } catch (error) {
  //     alert('Image upload failed.');
  //   } finally {
  //     setUploading(false);
  //   }
  // };


  const uploadFileHandler = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append('media', file);
  formData.append("folder", "AuraJewels/general"); // <-- 1. Change 'image' to 'file'
  setUploading(true);

  try {
    const config = { 
      headers: { 
        'Content-Type': 'multipart/form-data', 
        Authorization: `Bearer ${userInfo.token}` 
      } 
    };
    
    // The endpoint is now just '/api/upload'
    const { data } = await api.post('/api/upload', formData, config);
    
      setImage(data.files[0].url);// <-- 2. Use data.url to set the full Cloudinary URL
    alert('File uploaded successfully!');

  } catch (error) {
    alert('File upload failed.');
  } finally {
    setUploading(false);
  }
};
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!image) {
      alert('Please upload an image.');
      return;
    }
    setSubmitting(true);
    try {
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      // Hardcode the location to 'main'
      const newSlide = { image, headline, caption, link, location: 'main' };
      await api.post('/api/carousel', newSlide, config);
      
      setImage(''); setHeadline(''); setCaption(''); setLink('');
      await fetchSlides();
      alert('New slide added successfully!');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create slide.');
    } finally {
      setSubmitting(false);
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        await api.delete(`/api/carousel/${id}`, config);
        await fetchSlides();
      } catch (err) {
        alert('Failed to delete slide.');
      }
    }
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>Manage Main Page Carousel</Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={7}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Current Slides</Typography>
            {loading ? <CircularProgress /> : error ? <Typography color="error">{error}</Typography> : (
              <List>
                {slides.map(slide => (
                  <ListItem key={slide._id} divider secondaryAction={
                    <IconButton edge="end" onClick={() => deleteHandler(slide._id)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  }>
                    <ListItemAvatar>
                      {/* <Avatar variant="rounded" src={`${import.meta.env.VITE_API_URL}${slide.image}`} sx={{ width: 100, height: 56, mr: 2 }} /> */}
                      <Avatar variant="rounded" src={slide.image} sx={{ width: 100, height: 56, mr: 2 }} />

                    </ListItemAvatar>
                    <ListItemText primary={slide.headline || 'No Headline'} secondary={slide.caption || 'No Caption'} />
                  </ListItem>
                ))}
              </List>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} md={5}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6">Add New Slide</Typography>
            <Box component="form" onSubmit={submitHandler} sx={{ mt: 2 }}>
              <Button variant="contained" component="label" fullWidth disabled={uploading}>
                Upload Image
                {uploading && <CircularProgress size={20} sx={{ ml: 1, color: 'white' }}/>}
                <input type="file" hidden onChange={uploadFileHandler} />
              </Button>
              <TextField label="Image URL" value={image} required fullWidth margin="normal" size="small" InputProps={{ readOnly: true }} />
              <TextField label="Headline (optional)" value={headline} onChange={e => setHeadline(e.target.value)} fullWidth margin="normal" size="small" />
              <TextField label="Caption (optional)" value={caption} onChange={e => setCaption(e.target.value)} fullWidth margin="normal" size="small" />
              <TextField label="Link URL (optional)" value={link} onChange={e => setLink(e.target.value)} fullWidth margin="normal" size="small" />
              <Button type="submit" variant="contained" color="primary" disabled={submitting || !image} fullWidth sx={{ mt: 2 }}>
                {submitting ? 'Adding...' : 'Add Slide'}
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MainCarouselManagePage;