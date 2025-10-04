import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useSnackbar } from 'notistack'; // <-- 1. Import useSnackbar
import { Container, Paper, Typography, TextField, Button, CircularProgress, Box } from '@mui/material';
import api from '../api/axiosConfig';
const fetchSettings = async () => {
  const { data } = await api.get('/api/settings');
  return data;
};

const updateSettings = async ({ settings, token }) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const { data } = await api.put('/api/settings', settings, config);
  return data;
};

const SettingsPage = () => {
  const { userInfo } = useAuth();
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar(); // <-- 2. Initialize the hook
  const [shippingCharge, setShippingCharge] = useState('');
  const [freeShippingThreshold, setFreeShippingThreshold] = useState('');

  const { data: settings, isLoading } = useQuery({ 
    queryKey: ['settings'], 
    queryFn: fetchSettings 
  });

  useEffect(() => {
    if (settings) {
      setShippingCharge(settings.shippingCharge);
      setFreeShippingThreshold(settings.freeShippingThreshold);
    }
  }, [settings]);

  const mutation = useMutation({
    mutationFn: updateSettings,
    onSuccess: () => {
      // --- 3. Show toast on success ---
      enqueueSnackbar('Settings saved successfully!', { variant: 'success' });
      queryClient.invalidateQueries({ queryKey: ['settings'] });
    },
    onError: (error) => {
      enqueueSnackbar(error.response?.data?.message || 'Failed to save settings.', { variant: 'error' });
    }
  });

  const submitHandler = (e) => {
    e.preventDefault();
    mutation.mutate({ 
      settings: { 
        shippingCharge: Number(shippingCharge), 
        freeShippingThreshold: Number(freeShippingThreshold) 
      }, 
      token: userInfo.token 
    });
  };

  if (isLoading) return <CircularProgress />;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>Site Settings</Typography>
        <Box component="form" onSubmit={submitHandler}>
          <TextField
            label="Shipping Charge ($)"
            type="number"
            value={shippingCharge}
            onChange={(e) => setShippingCharge(e.target.value)}
            fullWidth margin="normal"
          />
          <TextField
            label="Free Shipping Threshold ($)"
            type="number"
            value={freeShippingThreshold}
            onChange={(e) => setFreeShippingThreshold(e.target.value)}
            fullWidth margin="normal"
          />
          <Button type="submit" variant="contained" disabled={mutation.isLoading}>
            {mutation.isLoading ? 'Saving...' : 'Save Settings'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};
export default SettingsPage;