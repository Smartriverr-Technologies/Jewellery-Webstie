import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSnackbar } from 'notistack';
import {
  Box, TextField, Button, Typography, Alert, CircularProgress, InputAdornment, IconButton, Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import signupImage from '../assets/login.webp';

// ===== STYLED COMPONENTS =====

const PageContainer = styled(Box)({
  display: 'flex',
  minHeight: '84vh',
  background: '#ffffff',
  '@media (max-width: 900px)': {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const LeftPanel = styled(Box)({
  flex: 1,
  background: 'linear-gradient(135deg, rgba(26, 26, 26, 0.85) 0%, rgba(45, 45, 45, 0.85) 100%)',
  backgroundImage: `url(${signupImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundBlendMode: 'overlay',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '60px',
  '@media (max-width: 900px)': {
    display: 'none',
  },
});

const RightPanel = styled(Box)({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '50px',
  '@media (max-width: 900px)': {
    width: '100%',
    padding: '20px',
  },
});

const FormContainer = styled(Box)({
  width: '100%',
  maxWidth: '420px',
  '@media (max-width: 450px)': {
    maxWidth: '90%',
  },
});

const Title = styled(Typography)({
  fontSize: '2rem',
  fontWeight: 700,
  color: '#1a1a1a',
  marginBottom: '8px',
  '@media (max-width: 500px)': {
    fontSize: '1.6rem',
  },
});

const Subtitle = styled(Typography)({
  fontSize: '0.95rem',
  color: '#666',
  marginBottom: '32px',
  '@media (max-width: 500px)': {
    fontSize: '0.85rem',
    marginBottom: '20px',
  },
});

const StyledTextField = styled(TextField)({
  marginBottom: '20px',
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    backgroundColor: '#fff',
    '& input': {
      padding: '14px 16px',
    }
  },
});

const LoginButton = styled(Button)({
  marginTop: '8px',
  padding: '14px',
  borderRadius: '8px',
  fontSize: '0.95rem',
  fontWeight: 600,
  backgroundColor: '#1a1a1a',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#2d2d2d',
  },
});

const StyledDivider = styled(Divider)({
  margin: '32px 0',
  '@media (max-width: 500px)': {
    margin: '20px 0',
  }
});

const RegisterLink = styled(Link)({
  color: '#1a1a1a',
  fontWeight: 600,
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  }
});

const ForgotPasswordLink = styled(Typography)({
  fontSize: '0.9rem',
  color: '#666',
  cursor: 'pointer',
  marginTop: '4px',
  textAlign: 'right',
});

// ===== COMPONENT =====

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [emailReadOnly, setEmailReadOnly] = useState(true);
  const [passwordReadOnly, setPasswordReadOnly] = useState(true);

  const navigate = useNavigate();
  const { login, userInfo } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (userInfo) navigate('/');
  }, [userInfo, navigate]);

  const validateForm = () => {
    const temp = {};
    if (!email || !/\S+@\S+\.\S+/.test(email)) temp.email = 'Please enter a valid email address.';
    if (!password) temp.password = 'Password is required.';
    return temp;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setApiError('');

    const formErrors = validateForm();
    if (Object.keys(formErrors).length) {
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
      setApiError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <LeftPanel />

      <RightPanel>
        <FormContainer>
          <Title>Sign in</Title>
          <Subtitle>Enter your credentials to access your account</Subtitle>

          {apiError && <Alert severity="error" sx={{ mb: 3 }}>{apiError}</Alert>}

          <Box component="form" onSubmit={submitHandler}>
            <StyledTextField
              label="Email"
              fullWidth
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setEmailReadOnly(false)}
              inputProps={{ readOnly: emailReadOnly }}
              error={!!errors.email}
              helperText={errors.email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlinedIcon />
                  </InputAdornment>
                )
              }}
            />

            <StyledTextField
              label="Password"
              fullWidth
              type={showPassword ? 'text' : 'password'}
              value={password}
              onFocus={() => setPasswordReadOnly(false)}
              onChange={(e) => setPassword(e.target.value)}
              inputProps={{ readOnly: passwordReadOnly }}
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            <ForgotPasswordLink>Forgot password?</ForgotPasswordLink>

            <LoginButton fullWidth type="submit" disabled={loading}>
              {loading ? <CircularProgress size={22} sx={{ color: '#fff' }} /> : 'Sign in'}
            </LoginButton>

            <StyledDivider>or</StyledDivider>

            <Typography align="center">
              Don't have an account? <RegisterLink to="/register">Create account</RegisterLink>
            </Typography>
          </Box>
        </FormContainer>
      </RightPanel>
    </PageContainer>
  );
};

export default LoginPage;
