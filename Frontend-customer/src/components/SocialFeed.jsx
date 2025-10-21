import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Box, Typography, Grid, Paper, Skeleton } from '@mui/material';
import { motion } from 'framer-motion';
import api from '../api/axiosConfig';
const fetchSocialVideos = async () => {
  const { data } = await api.get('/api/social-videos');
  return data;
};

const SocialFeed = () => {
  const { data: videos, isLoading } = useQuery({ 
    queryKey: ['socialVideos'], 
    queryFn: fetchSocialVideos 
  });

  return (
    <Box sx={{ py: 6, bgcolor: 'background.default' }}>
      <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ 
              fontWeight: 700,
              background: 'linear-gradient(45deg, #B8860B 30%, #21CBF3 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2,
            }}>
        #AuraInTheWild
      </Typography>
      <Grid container>
        {isLoading ? (
          Array.from(new Array(6)).map((item, index) => (
            <Grid item key={index} xs={4} sm={2}>
              <Skeleton variant="rectangular" height={350} />
            </Grid>
          ))
        ) : (
          videos?.map((video, index) => (
            <Grid item key={video._id} xs={4} sm={2}>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Paper
                  elevation={0}
                  square
                  sx={{
                    position: 'relative',
                    height: { xs: '250px', sm: '350px' },
                    overflow: 'hidden',
                    '&:hover .video-overlay': { opacity: 1 },
                    '&:hover video': { transform: 'scale(1.1)' },
                  }}
                >
                  <Typography
                    sx={{
                      position: 'absolute',
                      top: '15px',
                      left: '15px',
                      zIndex: 2,
                      color: 'white',
                      fontWeight: 'bold',
                      textShadow: '1px 1px 3px rgba(0,0,0,0.8)',
                    }}
                  >
                    {video.hashtag}
                  </Typography>
                  <Box className="video-overlay" sx={{
                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 50%)',
                    opacity: 0, transition: 'opacity 0.3s ease'
                  }}/>
                  {/* <video
                    src={`${import.meta.env.VITE_API_URL}${video.videoUrl}`}
                    width="100%"
                    height="100%"
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{ objectFit: 'cover', transition: 'transform 0.3s ease' }}
                  /> */}
                  <video
  src={video.videoUrl.startsWith('http') ? video.videoUrl : `${import.meta.env.VITE_API_URL}${video.videoUrl}`}
  width="100%"
  height="100%"
  autoPlay
  loop
  muted
  playsInline
  style={{ objectFit: 'cover', transition: 'transform 0.3s ease' }}
/>
                </Paper>
              </motion.div>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default SocialFeed;