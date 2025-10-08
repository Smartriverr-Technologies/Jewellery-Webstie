// import React, { useState } from 'react';
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import axios from 'axios';
// import { useAuth } from '../context/AuthContext';
// import { Box, Container, Typography, TextField, Button, Paper, Grid, List, ListItem, ListItemText, IconButton, ListItemAvatar, Avatar, CircularProgress, Alert } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import api from '../api/axiosConfig';
// // --- Data Fetching & Mutation Functions ---

// // Fetches all hero slides
// const fetchHeroSlides = async () => {
//   const { data } = await api.get('/api/hero-carousel');
//   return data;
// };

// // Creates a new hero slide
// const createHeroSlide = async ({ slide, token }) => {
//   const config = { headers: { Authorization: `Bearer ${token}` } };
//   const { data } = await api.post('/api/hero-carousel', slide, config);
//   return data;
// };

// // Deletes a hero slide
// const deleteHeroSlide = async ({ slideId, token }) => {
//   const config = { headers: { Authorization: `Bearer ${token}` } };
//   await api.delete(`/api/hero-carousel/${slideId}`, config);
// };

// // --- The Component ---

// const HeroManagePage = () => {
//   const { userInfo } = useAuth();
//   const queryClient = useQueryClient();

//   // Form state
//   const [image, setImage] = useState('');
//   const [headline, setHeadline] = useState('');
//   const [caption, setCaption] = useState('');
//   const [link, setLink] = useState('');
//   const [uploading, setUploading] = useState(false);
  
//   // React Query for fetching data
//   const { data: slides, isLoading, isError } = useQuery({ 
//     queryKey: ['heroSlides'], 
//     queryFn: fetchHeroSlides 
//   });

//   // React Query for creating a new slide
//   const createMutation = useMutation({
//     mutationFn: createHeroSlide,
//     onSuccess: () => {
//       queryClient.invalidateQueries(['heroSlides']); // Refreshes the slide list
//       setImage(''); setHeadline(''); setCaption(''); setLink('');
//       alert('New slide added!');
//     },
//     onError: (error) => alert(error.response?.data?.message || 'Failed to create slide.'),
//   });

//   // React Query for deleting a slide
//   const deleteMutation = useMutation({
//     mutationFn: deleteHeroSlide,
//     onSuccess: () => queryClient.invalidateQueries(['heroSlides']),
//     onError: () => alert('Failed to delete slide.'),
//   });
  
//   // const uploadFileHandler = async (e) => {
//   //   const file = e.target.files[0];
//   //   const formData = new FormData();
//   //   formData.append('image', file);
//   //   setUploading(true);
//   //   try {
//   //     const config = { headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${userInfo.token}` } };
//   //     const { data } = await api.post('/api/upload', formData, config);
//   //     setImage(data.image);
//   //   } catch (error) {
//   //     alert('Image upload failed.');
//   //   } finally {
//   //     setUploading(false);
//   //   }
//   // };
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
//     alert('File uploaded successfully!');

//   } catch (error) {
//     alert('File upload failed.');
//   } finally {
//     setUploading(false);
//   }
// };

//   const submitHandler = (e) => {
//     e.preventDefault();
//     if (!image) return alert('Please upload an image first.');
//     createMutation.mutate({ slide: { image, headline, caption, link }, token: userInfo.token });
//   };

//   const deleteHandler = (slideId) => {
//     if (window.confirm('Are you sure?')) {
//       deleteMutation.mutate({ slideId, token: userInfo.token });
//     }
//   };

//   return (
//     <Container sx={{ py: 4 }}>
//       <Typography variant="h4" gutterBottom>Manage Hero Carousel</Typography>
//       <Grid container spacing={4}>
//         <Grid item xs={12} md={7}>
//           <Paper elevation={3} sx={{ p: 2 }}>
//             <Typography variant="h6" gutterBottom>Current Hero Slides</Typography>
//             {isLoading ? <CircularProgress /> : isError ? <Alert severity="error">Could not load slides.</Alert> : (
//               <List>
//                 {slides.map(slide => (
//                   <ListItem key={slide._id} divider secondaryAction={
//                     <IconButton edge="end" aria-label="delete" onClick={() => deleteHandler(slide._id)}>
//                       <DeleteIcon color="error" />
//                     </IconButton>
//                   }>
//                     <ListItemAvatar>
//                       <Avatar variant="rounded"  src={slide.image} sx={{ width: 100, height: 56, mr: 2 }} />
//                     </ListItemAvatar>
//                     <ListItemText primary={slide.headline || 'No Headline'} secondary={slide.caption || 'No Caption'} />
//                   </ListItem>
//                 ))}
//               </List>
//             )}
//           </Paper>
//         </Grid>
//         <Grid item xs={12} md={5}>
//           <Paper elevation={3} sx={{ p: 2 }}>
//             <Typography variant="h6">Add New Hero Slide</Typography>
//             <Box component="form" onSubmit={submitHandler} sx={{ mt: 2 }}>
//               <Button variant="contained" component="label" fullWidth disabled={uploading}>
//                 Upload Image
//                 {uploading && <CircularProgress size={20} sx={{ ml: 1, color: 'white' }}/>}
//                 <input type="file" hidden onChange={uploadFileHandler} />
//               </Button>
//               <TextField label="Image URL" value={image} required fullWidth margin="normal" size="small" InputProps={{ readOnly: true }} />
//               <TextField label="Headline (optional)" value={headline} onChange={e => setHeadline(e.target.value)} fullWidth margin="normal" size="small" />
//               <TextField label="Caption (optional)" value={caption} onChange={e => setCaption(e.target.value)} fullWidth margin="normal" size="small" />
//               <TextField label="Link URL (optional)" value={link} onChange={e => setLink(e.target.value)} fullWidth margin="normal" size="small" />
//               <Button type="submit" variant="contained" color="primary" disabled={createMutation.isLoading || !image} fullWidth sx={{ mt: 2 }}>
//                 {createMutation.isLoading ? 'Adding...' : 'Add Slide'}
//               </Button>
//             </Box>
//           </Paper>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

// export default HeroManagePage;

//claude code
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../context/AuthContext';
import { 
  Box, Container, Typography, TextField, Button, Paper, Grid, 
  List, ListItem, ListItemText, IconButton, ListItemAvatar, 
  Avatar, CircularProgress, Alert 
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import api from '../api/axiosConfig';

// Fetch all hero slides
const fetchHeroSlides = async () => {
  const { data } = await api.get('/api/hero-carousel');
  return data;
};

// Create a new hero slide with file upload
const createHeroSlide = async ({ formData, token }) => {
  const config = { 
    headers: { 
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}` 
    } 
  };
  const { data } = await api.post('/api/hero-carousel', formData, config);
  return data;
};

// Delete a hero slide
const deleteHeroSlide = async ({ slideId, token }) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  await api.delete(`/api/hero-carousel/${slideId}`, config);
};

const HeroManagePage = () => {
  const { userInfo } = useAuth();
  const queryClient = useQueryClient();

  // Form state
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [headline, setHeadline] = useState('');
  const [caption, setCaption] = useState('');
  const [link, setLink] = useState('');
  
  // Fetch hero slides
  const { data: slides, isLoading, isError } = useQuery({ 
    queryKey: ['heroSlides'], 
    queryFn: fetchHeroSlides 
  });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: createHeroSlide,
    onSuccess: () => {
      queryClient.invalidateQueries(['heroSlides']);
      // Reset form
      setSelectedFile(null);
      setPreviewUrl('');
      setHeadline('');
      setCaption('');
      setLink('');
      alert('New slide added successfully!');
    },
    onError: (error) => {
      alert(error.response?.data?.message || 'Failed to create slide.');
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: deleteHeroSlide,
    onSuccess: () => {
      queryClient.invalidateQueries(['heroSlides']);
      alert('Slide deleted successfully!');
    },
    onError: () => alert('Failed to delete slide.'),
  });

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size should be less than 5MB');
      return;
    }

    setSelectedFile(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Submit form
  const submitHandler = (e) => {
    e.preventDefault();
    
    if (!selectedFile) {
      alert('Please select an image first.');
      return;
    }

    // Create FormData
    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('headline', headline);
    formData.append('caption', caption);
    formData.append('link', link);

    createMutation.mutate({ formData, token: userInfo.token });
  };

  // Delete handler
  const deleteHandler = (slideId) => {
    if (window.confirm('Are you sure you want to delete this slide?')) {
      deleteMutation.mutate({ slideId, token: userInfo.token });
    }
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Manage Hero Carousel
      </Typography>
      
      <Grid container spacing={4}>
        {/* Left side - Current Slides */}
        <Grid item xs={12} md={7}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Current Hero Slides
            </Typography>
            
            {isLoading ? (
              <Box display="flex" justifyContent="center" p={4}>
                <CircularProgress />
              </Box>
            ) : isError ? (
              <Alert severity="error">Could not load slides.</Alert>
            ) : slides?.length === 0 ? (
              <Alert severity="info">No slides yet. Add your first slide!</Alert>
            ) : (
              <List>
                {slides?.map(slide => (
                  <ListItem 
                    key={slide._id} 
                    divider 
                    sx={{ 
                      '&:hover': { bgcolor: 'action.hover' },
                      transition: 'background-color 0.2s'
                    }}
                    secondaryAction={
                      <IconButton 
                        edge="end" 
                        aria-label="delete" 
                        onClick={() => deleteHandler(slide._id)}
                        disabled={deleteMutation.isLoading}
                      >
                        <DeleteIcon color="error" />
                      </IconButton>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar 
                        variant="rounded" 
                        src={slide.image} 
                        sx={{ width: 120, height: 70, mr: 2 }}
                        alt={slide.headline || 'Hero slide'}
                      />
                    </ListItemAvatar>
                    <ListItemText 
                      primary={slide.headline || 'No Headline'} 
                      secondary={slide.caption || 'No Caption'} 
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </Paper>
        </Grid>

        {/* Right side - Add New Slide Form */}
        <Grid item xs={12} md={5}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Add New Hero Slide
            </Typography>
            
            <Box component="form" onSubmit={submitHandler} sx={{ mt: 2 }}>
              {/* File Upload Button */}
              <Button 
                variant="contained" 
                component="label" 
                fullWidth
                startIcon={<CloudUploadIcon />}
                disabled={createMutation.isLoading}
                sx={{ mb: 2 }}
              >
                {selectedFile ? 'Change Image' : 'Upload Image'}
                <input 
                  type="file" 
                  hidden 
                  accept="image/*"
                  onChange={handleFileChange} 
                />
              </Button>

              {/* Image Preview */}
              {previewUrl && (
                <Box sx={{ mb: 2, textAlign: 'center' }}>
                  <img 
                    src={previewUrl} 
                    alt="Preview" 
                    style={{ 
                      maxWidth: '100%', 
                      maxHeight: '200px',
                      borderRadius: '8px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }} 
                  />
                </Box>
              )}

              {/* Form Fields */}
              <TextField 
                label="Headline (optional)" 
                value={headline} 
                onChange={e => setHeadline(e.target.value)} 
                fullWidth 
                margin="normal" 
                size="small"
                placeholder="Enter headline text"
              />
              
              <TextField 
                label="Caption (optional)" 
                value={caption} 
                onChange={e => setCaption(e.target.value)} 
                fullWidth 
                margin="normal" 
                size="small"
                multiline
                rows={2}
                placeholder="Enter caption text"
              />
              
              <TextField 
                label="Link URL (optional)" 
                value={link} 
                onChange={e => setLink(e.target.value)} 
                fullWidth 
                margin="normal" 
                size="small"
                placeholder="https://example.com"
              />

              {/* Submit Button */}
              <Button 
                type="submit" 
                variant="contained" 
                color="primary" 
                disabled={createMutation.isLoading || !selectedFile} 
                fullWidth 
                sx={{ mt: 3 }}
              >
                {createMutation.isLoading ? (
                  <>
                    <CircularProgress size={20} sx={{ mr: 1, color: 'white' }} />
                    Uploading...
                  </>
                ) : (
                  'Add Slide'
                )}
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HeroManagePage;



  