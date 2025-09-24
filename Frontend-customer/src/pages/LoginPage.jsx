import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSnackbar } from 'notistack';
import { Box, TextField, Button, Typography, Paper, Alert, CircularProgress } from '@mui/material';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);

  const [emailReadOnly, setEmailReadOnly] = useState(true);
  const [passwordReadOnly, setPasswordReadOnly] = useState(true);

  const navigate = useNavigate();
  const { login, userInfo } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [userInfo, navigate]);

  const validateForm = () => {
    const newErrors = {};
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!password) {
      newErrors.password = 'Password is required.';
    }
    return newErrors;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setApiError('');
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    setLoading(true);
    setErrors({});
    
    try {
      await login(email, password);
      enqueueSnackbar('Login successful!', { variant: 'success' });
      navigate('/');
    } catch (err) {
      setApiError(err.response?.data?.message || 'Failed to log in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', p: 2 }}>
      <Paper elevation={6} sx={{ p: 4, width: '100%', maxWidth: '400px', borderRadius: 2 }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>Sign In</Typography>
        {apiError && <Alert severity="error" sx={{ mb: 2 }}>{apiError}</Alert>}
        
        <Box component="form" onSubmit={submitHandler} noValidate>
          <TextField
            label="Email Address" type="email"
            fullWidth margin="normal"
            value={email} onChange={(e) => setEmail(e.target.value)} required
            onFocus={() => setEmailReadOnly(false)} inputProps={{ readOnly: emailReadOnly, autoComplete: 'off' }}
            error={!!errors.email} helperText={errors.email}
          />
          <TextField
            label="Password" type="password"
            fullWidth margin="normal"
            value={password} onChange={(e) => setPassword(e.target.value)} required
            onFocus={() => setPasswordReadOnly(false)} inputProps={{ readOnly: passwordReadOnly, autoComplete: 'current-password' }}
            error={!!errors.password} helperText={errors.password}
          />
          <Button type="submit" fullWidth variant="contained" color="primary" disabled={loading} sx={{ mt: 3, mb: 2, py: 1.5 }}>
            {loading ? <CircularProgress size={24} /> : 'Sign In'}
          </Button>
          <Typography align="center">
            New Customer? <Link to="/register" style={{ textDecoration: 'none' }}>
              <Typography component="span" color="primary" sx={{ fontWeight: 'bold' }}>Register</Typography>
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default LoginPage;