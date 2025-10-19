import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Box, Container, Typography, TextField, Button, Paper, Grid, List, ListItem, ListItemText, IconButton, ListItemAvatar, Avatar, CircularProgress, Alert } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import api from '../api/axiosConfig';
// API Functions
const fetchCategories = async () => {
  const { data } = await api.get('/api/categories');
  return data;
};

const createCategory = async ({ category, token }) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  return await api.post('/api/categories', category, config);
};

const deleteCategory = async ({ categoryId, token }) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  return await api.delete(`/api/categories/${categoryId}`, config);
};

const CategoryManagePage = () => {
  const { userInfo } = useAuth();
  const queryClient = useQueryClient();

  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [uploading, setUploading] = useState(false);
  
  const { data: categories, isLoading, isError } = useQuery({ queryKey: ['categories'], queryFn: fetchCategories });

  const createMutation = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      setName(''); setImage('');
    },
    onError: (error) => alert(error.response?.data?.message || 'Failed to create category'),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['categories'] }),
    onError: (error) => alert(error.response?.data?.message || 'Failed to delete category'),
  });
  
  // --- YEH FUNCTION ADD KARNA ZAROORI HAI ---
  // const uploadFileHandler = async (e) => {
  //   const file = e.target.files[0];
  //   const formData = new FormData();
  //   formData.append('file', file);
  //   setUploading(true);
  //   try {
  //     const config = { 
  //       headers: { 
  //         'Content-Type': 'multipart/form-data', 
  //         Authorization: `Bearer ${userInfo.token}` 
  //       } 
  //     };
  //     const { data } = await api.post('/api/upload', formData, config);
  //     setImage(data.url); // Set the image state with the returned path
  //   } catch (error) {
  //     alert('Image upload failed.');
  //   } finally {
  //     setUploading(false);
  //   }
  // };

//   const uploadFileHandler = async (e) => {
//   const file = e.target.files[0];
//   if (!file) return;

//   const formData = new FormData();
//   formData.append('file', file); // <-- 1. Change 'image' to 'file'
//   setUploading(true);

//   try {
//     const config = { 
//       headers: { 
//         'Content-Type': 'multipart/form-data', 
//         Authorization: `Bearer ${userInfo.token}` 
//       } 
//     };
    
//     // The endpoint is now just '/api/upload'
//     const { data } = await api.post('/api/upload', formData, config);
    
//     setImage(data.url); // <-- 2. Use data.url to set the full Cloudinary URL
//     alert('Image uploaded successfully!');

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
  formData.append('media', file); // ✅ backend expects 'media', not 'file'
  setUploading(true);

  try {
    const config = { 
      headers: { 
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    // ✅ Send to your image upload endpoint
    const { data } = await api.post('/api/upload', formData, config);

    // ✅ backend returns an array "files", we’ll use first one
    setImage(data.files[0].url);
    alert('Image uploaded successfully!');
  } catch (error) {
    console.error('Upload error:', error.response?.data || error.message);
    alert('Image upload failed.');
  } finally {
    setUploading(false);
  }
};

  
  const submitHandler = (e) => {
    e.preventDefault();
    if (!name || !image) return alert('Please enter name and upload image.');
    createMutation.mutate({ category: { name, image }, token: userInfo.token });
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>Manage Categories</Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={7}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Existing Categories</Typography>
            {isLoading ? <CircularProgress /> : isError ? <Alert severity="error">Error loading categories.</Alert> : (
              <List>
                {categories.map(cat => (
                  <ListItem key={cat._id} divider secondaryAction={
                    <IconButton edge="end" onClick={() => deleteMutation.mutate({ categoryId: cat._id, token: userInfo.token })}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  }>
                    <ListItemAvatar><Avatar src={cat.image} /></ListItemAvatar>
                    <ListItemText primary={cat.name} />
                  </ListItem>
                ))}
              </List>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} md={5}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6">Add New Category</Typography>
            <Box component="form" onSubmit={submitHandler} sx={{ mt: 2 }}>
              <Button variant="contained" component="label" fullWidth disabled={uploading}>
                Upload Image
                {uploading && <CircularProgress size={20} sx={{ ml: 1, color: 'white' }}/>}
                <input type="file" hidden onChange={uploadFileHandler} />
              </Button>
              <TextField label="Image URL" value={image} required fullWidth margin="normal" size="small" InputProps={{ readOnly: true }} />
              <TextField label="Category Name" value={name} onChange={e => setName(e.target.value)} required fullWidth margin="normal" size="small" />
              <Button type="submit" variant="contained" color="primary" disabled={createMutation.isLoading} fullWidth sx={{ mt: 2 }}>
                {createMutation.isLoading ? 'Adding...' : 'Add Category'}
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};
export default CategoryManagePage;