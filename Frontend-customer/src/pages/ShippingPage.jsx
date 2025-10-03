import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Box, Typography, TextField, Button, Paper, Container } from '@mui/material';
import CheckoutSteps from '../components/CheckoutSteps';

const ShippingPage = () => {
  const { shippingAddress, saveShippingAddress } = useCart();
  const { userInfo } = useAuth();
  const navigate = useNavigate();

  // Redirect if user is not logged in
  useEffect(() => {
    if (!userInfo) {
      navigate('/login?redirect=/shipping');
    }
  }, [navigate, userInfo]);

  // Pre-fill state with saved address from context or empty strings
  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
  const [country, setCountry] = useState(shippingAddress.country || '');
  const [phone, setPhone] = useState(shippingAddress.phone || '');

  const submitHandler = (e) => {
    e.preventDefault();
    saveShippingAddress({ address, city, postalCode, country, phone });
    navigate('/payment'); // Navigate to the next step
  };

  return (
    <Container maxWidth="sm" sx={{ my: 4 }}>
      <CheckoutSteps step1 step2 />
      <Paper elevation={3} sx={{ p: 4, mt: 3, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Shipping Address
        </Typography>
        <Box component="form" onSubmit={submitHandler}>
          <TextField
            label="Address"
            fullWidth
            margin="normal"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <TextField
            label="City"
            fullWidth
            margin="normal"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
          <TextField
            label="Postal Code"
            fullWidth
            margin="normal"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
          />
          <TextField
            label="Country"
            fullWidth
            margin="normal"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
          <TextField
            label="Contact Number"
            type="tel"
            fullWidth
            margin="normal"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <Button 
            type="submit" 
            variant="contained" 
            fullWidth 
            sx={{ mt: 3, py: 1.5 }}
          >
            Continue to Payment
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ShippingPage;