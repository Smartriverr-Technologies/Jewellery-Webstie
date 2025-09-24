import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSnackbar } from 'notistack';
import { Box, TextField, Button, Typography, Paper, Alert, CircularProgress } from '@mui/material';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // State to hold validation errors for each field
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(''); // For errors from the backend
  
  const [loading, setLoading] = useState(false);
  
  // State for the read-only autofill trick
  const [nameReadOnly, setNameReadOnly] = useState(true);
  const [emailReadOnly, setEmailReadOnly] = useState(true);
  const [passwordReadOnly, setPasswordReadOnly] = useState(true);
  const [confirmPasswordReadOnly, setConfirmPasswordReadOnly] = useState(true);

  const navigate = useNavigate();
  const { register, userInfo } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [userInfo, navigate]);

  // --- Validation Logic ---
  const validateForm = () => {
    const newErrors = {};
    if (!name || name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters long.';
    }
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    // Strong password check (at least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!password || !passwordRegex.test(password)) {
      newErrors.password = 'Password must be 8+ chars, with uppercase, lowercase, number, and special character.';
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }
    return newErrors;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setApiError(''); // Clear previous API errors
    
    // Run validation before submitting
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    setLoading(true);
    setErrors({}); // Clear validation errors
    
    try {
      await register(name, email, password);
      enqueueSnackbar('Registration successful! Welcome!', { variant: 'success' });
      navigate('/');
    } catch (err) {
      setApiError(err.response?.data?.message || 'Failed to register');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', p: 2 }}>
      <Paper elevation={6} sx={{ p: 4, width: '100%', maxWidth: '400px', borderRadius: 2 }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>Sign Up</Typography>
        {apiError && <Alert severity="error" sx={{ mb: 2 }}>{apiError}</Alert>}
        
        <Box component="form" onSubmit={submitHandler} noValidate>
          <TextField
            label="Name"
            fullWidth margin="normal"
            value={name} onChange={(e) => setName(e.target.value)} required
            onFocus={() => setNameReadOnly(false)} inputProps={{ readOnly: nameReadOnly, autoComplete: 'name' }}
            error={!!errors.name} helperText={errors.name}
          />
          <TextField
            label="Email Address" type="email"
            fullWidth margin="normal"
            value={email} onChange={(e) => setEmail(e.target.value)} required
            onFocus={() => setEmailReadOnly(false)} inputProps={{ readOnly: emailReadOnly, autoComplete: 'email' }}
            error={!!errors.email} helperText={errors.email}
          />
          <TextField
            label="Password" type="password"
            fullWidth margin="normal"
            value={password} onChange={(e) => setPassword(e.target.value)} required
            onFocus={() => setPasswordReadOnly(false)} inputProps={{ readOnly: passwordReadOnly, autoComplete: 'new-password' }}
            error={!!errors.password} helperText={errors.password}
          />
          <TextField
            label="Confirm Password" type="password"
            fullWidth margin="normal"
            value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required
            onFocus={() => setConfirmPasswordReadOnly(false)} inputProps={{ readOnly: confirmPasswordReadOnly, autoComplete: 'new-password' }}
            error={!!errors.confirmPassword} helperText={errors.confirmPassword}
          />
          <Button type="submit" fullWidth variant="contained" color="primary" disabled={loading} sx={{ mt: 3, mb: 2, py: 1.5 }}>
            {loading ? <CircularProgress size={24} /> : 'Register'}
          </Button>
          <Typography align="center">
            Have an Account? <Link to="/login" style={{ textDecoration: 'none' }}>
              <Typography component="span" color="primary" sx={{ fontWeight: 'bold' }}>Login</Typography>
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default RegisterPage;