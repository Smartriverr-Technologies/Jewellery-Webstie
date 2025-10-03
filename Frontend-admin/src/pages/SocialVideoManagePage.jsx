import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Box, Container, Typography, TextField, Button, Paper, Grid, IconButton, CircularProgress, Alert } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

// --- API Functions for React Query ---
const fetchSocialVideos = async () => {
  const { data } = await axios.get('http://localhost:4000/api/social-videos');
  return data;
};

const createSocialVideo = async ({ newVideo, token }) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const { data } = await axios.post('http://localhost:4000/api/social-videos', newVideo, config);
  return data;
};

const deleteSocialVideo = async ({ videoId, token }) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  await axios.delete(`http://localhost:4000/api/social-videos/${videoId}`, config);
};

// --- The Component ---
const SocialVideoManagePage = () => {
  const { userInfo } = useAuth();
  const queryClient = useQueryClient();
  const [videoUrl, setVideoUrl] = useState('');
  const [hashtag, setHashtag] = useState('');
  const [uploading, setUploading] = useState(false);

  const { data: videos, isLoading, isError } = useQuery({
    queryKey: ['socialVideos'],
    queryFn: fetchSocialVideos,
  });

  const createMutation = useMutation({
    mutationFn: createSocialVideo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['socialVideos'] });
      setVideoUrl('');
      setHashtag('');
      alert('New video added successfully!');
    },
    onError: (error) => {
      alert(error.response?.data?.message || 'Failed to add video.');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteSocialVideo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['socialVideos'] });
    },
    onError: (error) => {
      alert(error.response?.data?.message || 'Failed to delete video.');
    },
  });

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('video', file);
    setUploading(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post('http://localhost:4000/api/upload/video', formData, config);
      setVideoUrl(data.video);
      alert('Video uploaded. Path has been set.');
    } catch (error) {
      alert('Video upload failed.');
    } finally {
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!videoUrl || !hashtag) {
      return alert('Please upload a video and provide a hashtag.');
    }
    createMutation.mutate({ newVideo: { videoUrl, hashtag }, token: userInfo.token });
  };

  const deleteHandler = (videoId) => {
    if (window.confirm('Are you sure you want to delete this video?')) {
      deleteMutation.mutate({ videoId, token: userInfo.token });
    }
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>Manage Social Feed Videos</Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>Add New Video</Typography>
            <Box component="form" onSubmit={submitHandler} sx={{ mt: 2 }}>
              <Button variant="contained" component="label" fullWidth disabled={uploading}>
                Upload Video
                {uploading && <CircularProgress size={20} sx={{ ml: 2, color: 'white' }} />}
                <input type="file" hidden onChange={uploadFileHandler} accept="video/mp4" />
              </Button>
              <TextField
                label="Video URL"
                value={videoUrl}
                required
                fullWidth
                margin="normal"
                size="small"
                InputProps={{ readOnly: true }}
              />
              <TextField
                label="#Hashtag"
                value={hashtag}
                onChange={(e) => setHashtag(e.target.value)}
                required
                fullWidth
                margin="normal"
                size="small"
              />
              <Button type="submit" variant="contained" color="primary" disabled={createMutation.isLoading}>
                {createMutation.isLoading ? 'Adding...' : 'Add Video'}
              </Button>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={7}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>Current Videos</Typography>
            {isLoading ? <CircularProgress /> : isError ? <Alert severity="error">Could not load videos.</Alert> : (
              <Grid container spacing={2}>
                {videos?.map(video => (
                  <Grid item xs={6} sm={4} key={video._id}>
                    <Paper sx={{ position: 'relative', borderRadius: 1, overflow: 'hidden' }}>
                      <video src={`http://localhost:4000${video.videoUrl}`} width="100%" height="150" style={{ objectFit: 'cover', display: 'block' }} autoPlay loop muted />
                      <Typography sx={{ position: 'absolute', top: 5, left: 5, color: 'white', textShadow: '1px 1px 2px black', fontSize: '0.8rem' }}>{video.hashtag}</Typography>
                      <IconButton
                        sx={{ position: 'absolute', top: 5, right: 5, backgroundColor: 'rgba(255,255,255,0.7)' }}
                        size="small"
                        onClick={() => deleteHandler(video._id)}
                        disabled={deleteMutation.isLoading}
                      >
                        <DeleteIcon fontSize="small" color="error" />
                      </IconButton>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SocialVideoManagePage;