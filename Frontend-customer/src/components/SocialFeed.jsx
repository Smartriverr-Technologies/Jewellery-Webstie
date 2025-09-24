import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';

const feedItems = [
  { id: 1, src: '/videos/social1.mp4', hashtag: '#OOTD' },
  { id: 2, src: '/videos/social2.mp4', hashtag: '#StyleInspo' },
  { id: 3, src: '/videos/social3.mp4', hashtag: '#StackItUp' },
  { id: 4, src: '/videos/social4.mp4', hashtag: '#MakeBoldMoves' },
  { id: 5, src: '/videos/social5.mp4', hashtag: '#AmICandy' },
  { id: 6, src: '/videos/social6.mp4', hashtag: '#WhatIWore' },
];

const SocialFeed = () => {
  return (
    <Box sx={{ py: 6, px: 0, width: '100%', overflowX: 'hidden' }}>
      <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ mb: 4 }}>
        Shop The Style
      </Typography>
      <Grid container spacing={0}>
        {feedItems.map((item) => (
          <Grid item key={item.id} xs={2}>
            <Paper
              elevation={4}
              sx={{
                position: 'relative',
                height: { xs: '180px', sm: '220px', md: '300px' },
                borderRadius: '8px',
                overflow: 'hidden',
              }}
            >
              <Typography
                sx={{
                  position: 'absolute',
                  top: '10px',
                  left: '10px',
                  zIndex: 1,
                  color: 'white',
                  fontWeight: 'bold',
                  textShadow: '1px 1px 3px rgba(0,0,0,0.7)',
                }}
              >
                {item.hashtag}
              </Typography>
              <video
                src={item.src}
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

export default SocialFeed;