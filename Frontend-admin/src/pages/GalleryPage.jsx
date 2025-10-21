// // import React from 'react';
// // import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// // import axios from 'axios';
// // import { useAuth } from '../context/AuthContext';
// // import { Box, Typography, Button, Paper, CircularProgress, Alert, Grid, IconButton } from '@mui/material';
// // import DeleteIcon from '@mui/icons-material/Delete';
// // import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
// // import api from '../api/axiosConfig';
// // const GalleryPage = () => {
// //   const { userInfo } = useAuth();
// //   const queryClient = useQueryClient();

// //   // --- Fetch Gallery Images ---
// //   const { data: images, isLoading, isError } = useQuery({
// //     queryKey: ['galleryImages'],
// //     queryFn: async () => {
// //       const { data } = await api.get('api/gallery');
// //       return data;
// //     },
// //   });

// //   // --- Upload Mutation ---
// //   const uploadMutation = useMutation({
// //     mutationFn: async (formData) => {
// //       const config = {
// //         headers: {
// //           'Content-Type': 'multipart/form-data',
// //           Authorization: `Bearer ${userInfo.token}`,
// //         },
// //       };
// //       return await api.post('/api/gallery', formData, config);
// //     },
// //     onSuccess: () => queryClient.invalidateQueries(['galleryImages']),
// //   });

// //   // --- Delete Mutation ---
// //   const deleteMutation = useMutation({
// //     mutationFn: async (imageId) => {
// //       const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
// //       return await api.delete(`/api/gallery/${imageId}`, config);
// //     },
// //     onSuccess: () => queryClient.invalidateQueries(['galleryImages']),
// //   });

// //   const handleFileChange = (e) => {
// //     const file = e.target.files[0];
// //     if (file) {
// //       const formData = new FormData();
// //       formData.append('image', file);
// //       uploadMutation.mutate(formData);
// //     }
// //   };

// //   const deleteHandler = (imageId) => {
// //     if (window.confirm('Are you sure you want to delete this image?')) {
// //       deleteMutation.mutate(imageId);
// //     }
// //   };

// //   return (
// //     <Box sx={{ p: 3 }}>
// //       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
// //         <Typography variant="h4" fontWeight="bold">Gallery Management</Typography>
// //         <Button
// //           component="label"
// //           variant="contained"
// //           startIcon={<AddPhotoAlternateIcon />}
// //           disabled={uploadMutation.isLoading}
// //         >
// //           {uploadMutation.isLoading ? 'Uploading...' : 'Upload Image'}
// //           <input type="file" hidden onChange={handleFileChange} accept="image/*" />
// //         </Button>
// //       </Box>

// //       {isLoading && <CircularProgress />}
// //       {isError && <Alert severity="error">Failed to load gallery images.</Alert>}
      
// //       <Grid container spacing={2}>
// //         {images?.map((image) => (
// //           <Grid item xs={12} sm={6} md={4} lg={3} key={image._id}>
// //             <Paper sx={{ position: 'relative' }}>
// //               <Box
// //                 component="img"
// //                 src={`${import.meta.env.VITE_API_URL}${image.imageUrl}`}
// //                 alt={image.altText}
// //                 sx={{ width: '100%', height: 200, objectFit: 'cover' }}
// //               />
// //               <IconButton
// //                 onClick={() => deleteHandler(image._id)}
// //                 sx={{ position: 'absolute', top: 8, right: 8, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
// //                 size="small"
// //                 color="error"
// //                 disabled={deleteMutation.isLoading}
// //               >
// //                 <DeleteIcon fontSize="small" />
// //               </IconButton>
// //             </Paper>
// //           </Grid>
// //         ))}
// //       </Grid>
// //     </Box>
// //   );
// // };

// // export default GalleryPage;

// import React from 'react';
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import { useAuth } from '../context/AuthContext';
// import {
//   Box,
//   Typography,
//   Button,
//   Paper,
//   CircularProgress,
//   Alert,
//   Grid,
//   IconButton,
// } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
// import api from '../api/axiosConfig';

// const GalleryPage = () => {
//   const { userInfo } = useAuth();
//   const queryClient = useQueryClient();

//   // Fetch images
//   const { data: images, isLoading, isError } = useQuery({
//     queryKey: ['galleryImages'],
//     queryFn: async () => {
//       const { data } = await api.get('api/gallery');
//       return data;
//     },
//   });

//   // Upload image (to Cloudinary)
//   const uploadMutation = useMutation({
//     mutationFn: async (formData) => {
//       const config = {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           Authorization: `Bearer ${userInfo.token}`,
//         },
//       };
//       return await api.post('/api/gallery', formData, config);
//     },
//     onSuccess: () => queryClient.invalidateQueries(['galleryImages']),
//   });

//   // Delete image
//   const deleteMutation = useMutation({
//     mutationFn: async (imageId) => {
//       const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
//       return await api.delete(`/api/gallery/${imageId}`, config);
//     },
//     onSuccess: () => queryClient.invalidateQueries(['galleryImages']),
//   });

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const formData = new FormData();
//       formData.append('media', file); // ✅ must match upload.single('media')
//       uploadMutation.mutate(formData);
//     }
//   };

//   const deleteHandler = (imageId) => {
//     if (window.confirm('Are you sure you want to delete this image?')) {
//       deleteMutation.mutate(imageId);
//     }
//   };

//   return (
//     <Box sx={{ p: 3 }}>
//       <Box
//         sx={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           mb: 2,
//         }}
//       >
//         <Typography variant="h4" fontWeight="bold">
//           Gallery Management
//         </Typography>
//         <Button
//           component="label"
//           variant="contained"
//           startIcon={<AddPhotoAlternateIcon />}
//           disabled={uploadMutation.isLoading}
//         >
//           {uploadMutation.isLoading ? 'Uploading...' : 'Upload Image'}
//           <input type="file" hidden onChange={handleFileChange} accept="image/*" />
//         </Button>
//       </Box>

//       {isLoading && <CircularProgress />}
//       {isError && <Alert severity="error">Failed to load gallery images.</Alert>}

//       <Grid container spacing={2}>
//         {images?.map((image) => (
//           <Grid item xs={12} sm={6} md={4} lg={3} key={image._id}>
//             <Paper sx={{ position: 'relative' }}>
//               <Box
//                 component="img"
//                 src={image.imageUrl} // ✅ directly use Cloudinary URL
//                 alt={image.altText}
//                 sx={{ width: '100%', height: 200, objectFit: 'cover' }}
//               />
//               <IconButton
//                 onClick={() => deleteHandler(image._id)}
//                 sx={{
//                   position: 'absolute',
//                   top: 8,
//                   right: 8,
//                   backgroundColor: 'rgba(0, 0, 0, 0.5)',
//                 }}
//                 size="small"
//                 color="error"
//                 disabled={deleteMutation.isLoading}
//               >
//                 <DeleteIcon fontSize="small" />
//               </IconButton>
//             </Paper>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// };

// export default GalleryPage;
