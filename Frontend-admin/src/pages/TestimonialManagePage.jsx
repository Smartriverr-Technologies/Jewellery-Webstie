import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Box, Container, Typography, TextField, Button, Paper, Grid, List, ListItem, ListItemText, IconButton, ListItemAvatar, Avatar, Rating } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const TestimonialManagePage = () => {
  const { userInfo } = useAuth();
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Form state for a new testimonial
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [imageUrl, setImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);

  // Function to fetch all testimonials
  const fetchTestimonials = async () => {
    try {
      const { data } = await axios.get('http://localhost:4000/api/testimonials');
      setTestimonials(data);
    } catch (err) {
      setError('Failed to fetch testimonials.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  // Handler for uploading the testimonial author's image
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post('http://localhost:4000/api/upload', formData, config);
      setImageUrl(data.image);
    } catch (error) {
      alert('Image upload failed.');
    } finally {
      setUploading(false);
    }
  };

  // Handler for submitting the new testimonial form
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!name || !comment || !imageUrl) {
        alert('Please fill all fields and upload an image.');
        return;
    }
    try {
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      await axios.post('http://localhost:4000/api/testimonials', { name, comment, imageUrl, rating }, config);
      // Reset form and refetch testimonials
      setName(''); setComment(''); setRating(5); setImageUrl('');
      fetchTestimonials();
    } catch (err) {
      alert('Failed to create testimonial.');
    }
  };

  // Handler for deleting a testimonial
  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      try {
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        await axios.delete(`http://localhost:4000/api/testimonials/${id}`, config);
        fetchTestimonials(); // Refetch after deletion
      } catch (err) {
        alert('Failed to delete testimonial.');
      }
    }
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>Manage Testimonials</Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6">Current Testimonials</Typography>
            {loading ? <p>Loading...</p> : error ? <p>{error}</p> : (
              <List>
                {testimonials.map(item => (
                  <ListItem key={item._id} secondaryAction={
                    <IconButton edge="end" aria-label="delete" onClick={() => deleteHandler(item._id)}>
                      <DeleteIcon />
                    </IconButton>
                  }>
                    <ListItemAvatar>
                      <Avatar variant="rounded" src={`http://localhost:4000${item.imageUrl}`} />
                    </ListItemAvatar>
                    <ListItemText primary={item.name} secondary={<Rating value={item.rating} readOnly size="small" />} />
                  </ListItem>
                ))}
              </List>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6">Add New Testimonial</Typography>
            <Box component="form" onSubmit={submitHandler} sx={{ mt: 2 }}>
              <Button variant="contained" component="label" fullWidth> Upload Image
                <input type="file" hidden onChange={uploadFileHandler} />
              </Button>
              {uploading && <p>Uploading...</p>}
              {imageUrl && <Typography variant="caption" display="block" gutterBottom>Image selected: {imageUrl}</Typography>}

              <TextField label="Name" value={name} onChange={e => setName(e.target.value)} fullWidth required margin="normal" size="small" />
              <TextField label="Comment" value={comment} onChange={e => setComment(e.target.value)} fullWidth required multiline rows={4} margin="normal" size="small" />
              <Typography component="legend">Rating</Typography>
              <Rating name="simple-controlled" value={rating} onChange={(event, newValue) => { setRating(newValue); }} />
              
              <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Add Testimonial</Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TestimonialManagePage;