import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Box, Container, Typography, TextField, Button, Paper, Grid, List, ListItem, ListItemText, IconButton, ListItemAvatar, Avatar, Rating, CircularProgress, Alert, Chip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import api from '../api/axiosConfig';
const TestimonialManagePage = () => {
  const { userInfo } = useAuth();
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [imageUrl, setImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/api/testimonials');
      // Sort newest first
      const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setTestimonials(sortedData);
    } catch (err) {
      setError('Failed to fetch testimonials.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  // const uploadFileHandler = async (e) => {
  //   const file = e.target.files[0];
  //   if (!file) return;
  //   const formData = new FormData();
  //   formData.append('image', file);
  //   setUploading(true);
  //   try {
  //     const config = { headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${userInfo.token}` } };
  //     const { data } = await api.post('/api/upload', formData, config);
  //     setImageUrl(data.image);
  //   } catch {
  //     alert('Image upload failed.');
  //   } finally {
  //     setUploading(false);
  //   }
  // };

   const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    const formData = new FormData();
    formData.append('media', file); // <-- 1. Change 'image' to 'file'
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
      
      // setImage(data.url);
      // setImageUrl(data.url)
       // <-- 2. Use data.url to set the full Cloudinary URL
         setImageUrl(data.files[0].url);
      alert('File uploaded successfully!');
  
    } catch (error) {
      alert('File upload failed.');
    } finally {
      setUploading(false);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!name || !comment || !imageUrl) return alert('Please fill all fields and upload an image.');
    try {
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      await api.post('/api/testimonials', { name, comment, imageUrl, rating }, config);
      setName(''); setComment(''); setRating(5); setImageUrl('');
      fetchTestimonials();
    } catch {
      alert('Failed to create testimonial.');
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      try {
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        await api.delete(`/api/testimonials/${id}`, config);
        fetchTestimonials();
      } catch {
        alert('Failed to delete testimonial.');
      }
    }
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>Manage Testimonials</Typography>
      <Grid container spacing={4}>
        {/* Testimonials List */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Current Testimonials</Typography>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}><CircularProgress /></Box>
            ) : error ? (
              <Alert severity="error">{error}</Alert>
            ) : (
              <List>
                {testimonials.map(item => (
                  <ListItem key={item._id} divider sx={{ '&:hover': { backgroundColor: '#f1f5f9', borderRadius: 1 } }}
                    secondaryAction={
                      <IconButton edge="end" aria-label="delete" onClick={() => deleteHandler(item._id)}>
                        <DeleteIcon color="error" />
                      </IconButton>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar variant="rounded" src={item.imageUrl} sx={{ width: 80, height: 80, mr: 2 }} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {item.name || <Chip label="No Name" size="small" color="warning" />}
                        </Box>
                      }
                      secondary={
                        <>
                          <Typography variant="body2" sx={{ mb: 0.5 }}>{item.comment}</Typography>
                          <Rating value={item.rating} readOnly size="small" />
                        </>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </Paper>
        </Grid>

        {/* Add Testimonial Form */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Add New Testimonial</Typography>
            <Box component="form" onSubmit={submitHandler} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button variant="contained" component="label" startIcon={<UploadFileIcon />} fullWidth disabled={uploading}>
                Upload Image
                <input type="file" hidden onChange={uploadFileHandler} />
              </Button>
              {uploading && <CircularProgress size={24} sx={{ mt: -3, ml: 2, color: 'primary.main' }} />}
              {imageUrl && <Box component="img" src={imageUrl} alt="preview" sx={{ width: '100%', maxHeight: 150, objectFit: 'cover', borderRadius: 1 }} />}

              <TextField label="Name" value={name} onChange={e => setName(e.target.value)} fullWidth required size="small" />
              <TextField label="Comment" value={comment} onChange={e => setComment(e.target.value)} fullWidth required multiline rows={4} size="small" />
              <Typography variant="caption" color="text.secondary">Recommended: 3 lines of comment for optimal UI</Typography>
              <Typography component="legend">Rating</Typography>
              <Rating value={rating} onChange={(e, newValue) => setRating(newValue)} />
              <Button type="submit" variant="contained" color="primary" fullWidth disabled={!imageUrl}>Add Testimonial</Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TestimonialManagePage;
