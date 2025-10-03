import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Box, Typography, FormControl, RadioGroup, FormControlLabel, Radio, Button, Paper, Container } from '@mui/material';
import CheckoutSteps from '../components/CheckoutSteps';

const PaymentPage = () => {
  const navigate = useNavigate();
  const { shippingAddress, savePaymentMethod } = useCart();
  const { userInfo } = useAuth();

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else if (!shippingAddress.address) {
      // Redirect back to shipping if address is not filled
      navigate('/shipping');
    }
  }, [navigate, shippingAddress, userInfo]);

  // Default to COD, as it's the only available option
  const [selectedMethod, setSelectedMethod] = useState('COD');

  const submitHandler = (e) => {
    e.preventDefault();
    savePaymentMethod(selectedMethod);
    navigate('/placeorder');
  };

  return (
    <Container maxWidth="sm" sx={{ my: 4 }}>
      <CheckoutSteps step1 step2 step3 />
      <Paper elevation={3} sx={{ p: 4, mt: 3, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Payment Method
        </Typography>
        <Box component="form" onSubmit={submitHandler}>
          <FormControl component="fieldset" sx={{ width: '100%', mt: 2 }}>
            <RadioGroup
              aria-label="payment-method"
              name="payment-method"
              value={selectedMethod}
              onChange={(e) => setSelectedMethod(e.target.value)}
            >
              {/* --- Disabled Razorpay Option --- */}
              <Box sx={{ color: 'text.disabled', mb: 2 }}>
                <FormControlLabel 
                  value="Razorpay" 
                  control={<Radio disabled />} 
                  label="Pay with Card / UPI (Razorpay)"
                />
                <Typography variant="caption" display="block" sx={{ pl: 4, mt: -1 }}>
                  Temporarily this payment method is not available.
                </Typography>
              </Box>

              {/* --- Enabled COD Option --- */}
              <FormControlLabel 
                value="Cash on Delivery" 
                control={<Radio />} 
                label="Cash on Delivery" 
              />
            </RadioGroup>
          </FormControl>
          <Button 
            type="submit" 
            variant="contained" 
            fullWidth 
            sx={{ mt: 3, py: 1.5 }}
          >
            Continue
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default PaymentPage;