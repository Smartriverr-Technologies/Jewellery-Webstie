import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';

const videoData = [
  { id: 1, src: '/videos/video1.mp4' },
  { id: 2, src: '/videos/video2.mp4' },
  { id: 3, src: '/videos/video3.mp4' },
  { id: 4, src: '/videos/video4.mp4' },
  { id: 5, src: '/videos/video5.mp4' }, // Added fifth video
];

const ShortVideos = () => {
  return (
    <Box
      sx={{
        py: 6,
        px: 0,
        width: '100vw',
        position: 'relative',
        left: '50%',
        right: '50%',
        marginLeft: '-50vw',
        marginRight: '-50vw',
        background: '#fff', // Optional: match your hero section background
      }}
    >
      <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ mb: 4 }}>
        A Glimpse of Brilliance
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {videoData.map((video) => (
          <Grid item key={video.id} xs={12} sm={6} md={2.4}>
            <Paper
              elevation={4}
              sx={{
                height: { xs: '220px', sm: '260px', md: '320px' },
                borderRadius: '16px',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <video
                src={video.src}
                width="100%"
                height="100%"
                autoPlay
                loop
                muted
                playsInline
                style={{ objectFit: 'cover' }}
              />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ShortVideos;