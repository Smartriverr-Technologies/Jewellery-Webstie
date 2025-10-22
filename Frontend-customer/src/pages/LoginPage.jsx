// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import { useSnackbar } from 'notistack';
// import { Box, TextField, Button, Typography, Paper, Alert, CircularProgress } from '@mui/material';

// const LoginPage = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [errors, setErrors] = useState({});
//   const [apiError, setApiError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const [emailReadOnly, setEmailReadOnly] = useState(true);
//   const [passwordReadOnly, setPasswordReadOnly] = useState(true);

//   const navigate = useNavigate();
//   const { login, userInfo } = useAuth();
//   const { enqueueSnackbar } = useSnackbar();

//   useEffect(() => {
//     if (userInfo) {
//       navigate('/');
//     }
//   }, [userInfo, navigate]);

//   const validateForm = () => {
//     const newErrors = {};
//     if (!email || !/\S+@\S+\.\S+/.test(email)) {
//       newErrors.email = 'Please enter a valid email address.';
//     }
//     if (!password) {
//       newErrors.password = 'Password is required.';
//     }
//     return newErrors;
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     setApiError('');
    
//     const formErrors = validateForm();
//     if (Object.keys(formErrors).length > 0) {
//       setErrors(formErrors);
//       return;
//     }
    
//     setLoading(true);
//     setErrors({});
    
//     try {
//       await login(email, password);
//       enqueueSnackbar('Login successful!', { variant: 'success' });
//       navigate('/');
//     } catch (err) {
//       setApiError(err.response?.data?.message || 'Failed to log in');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', p: 2 }}>
//       <Paper elevation={6} sx={{ p: 4, width: '100%', maxWidth: '400px', borderRadius: 2 }}>
//         <Typography variant="h4" component="h1" align="center" gutterBottom>Sign In</Typography>
//         {apiError && <Alert severity="error" sx={{ mb: 2 }}>{apiError}</Alert>}
        
//         <Box component="form" onSubmit={submitHandler} noValidate>
//           <TextField
//             label="Email Address" type="email"
//             fullWidth margin="normal"
//             value={email} onChange={(e) => setEmail(e.target.value)} required
//             onFocus={() => setEmailReadOnly(false)} inputProps={{ readOnly: emailReadOnly, autoComplete: 'off' }}
//             error={!!errors.email} helperText={errors.email}
//           />
//           <TextField
//             label="Password" type="password"
//             fullWidth margin="normal"
//             value={password} onChange={(e) => setPassword(e.target.value)} required
//             onFocus={() => setPasswordReadOnly(false)} inputProps={{ readOnly: passwordReadOnly, autoComplete: 'current-password' }}
//             error={!!errors.password} helperText={errors.password}
//           />
//           <Button type="submit" fullWidth variant="contained" color="primary" disabled={loading} sx={{ mt: 3, mb: 2, py: 1.5 }}>
//             {loading ? <CircularProgress size={24} /> : 'Sign In'}
//           </Button>
//           <Typography align="center">
//             New Customer? <Link to="/register" style={{ textDecoration: 'none' }}>
//               <Typography component="span" color="primary" sx={{ fontWeight: 'bold' }}>Register</Typography>
//             </Link>
//           </Typography>
//         </Box>
//       </Paper>
//     </Box>
//   );
// };

// export default LoginPage;

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSnackbar } from 'notistack';
import { Box, TextField, Button, Typography, Paper, Alert, CircularProgress, InputAdornment, IconButton, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import signupImage from '../assets/login.webp';
// Styled Components
const PageContainer = styled(Box)({
  display: 'flex',
  minHeight: '84vh',
  background: '#ffffff',
});

// const LeftPanel = styled(Box)({
//   flex: 1,
//   background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
//   display: 'flex',
//   flexDirection: 'column',
//   justifyContent: 'center',
//   alignItems: 'center',
//   padding: '60px',
//   position: 'relative',
//   overflow: 'hidden',
//   '@media (max-width: 900px)': {
//     display: 'none',
//   },
//   '&::before': {
//     content: '""',
//     position: 'absolute',
//     width: '500px',
//     height: '500px',
//     background: 'radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 70%)',
//     borderRadius: '50%',
//     top: '-100px',
//     right: '-100px',
//   },
// });
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
  position: 'relative',
  overflow: 'hidden',
  '@media (max-width: 900px)': {
    display: 'none',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    width: '500px',
    height: '500px',
    // background: 'radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 70%)',
    borderRadius: '50%',
    top: '-100px',
    right: '-100px',
  },
});
const RightPanel = styled(Box)({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '10px',
  '@media (max-width: 900px)': {
    flex: 'none',
    width: '100%',
  },
});

const LogoText = styled(Typography)({
  fontSize: '3rem',
  fontWeight: 700,
  color: '#d4af37',
  marginBottom: '24px',
  letterSpacing: '2px',
});

const BrandDescription = styled(Typography)({
  fontSize: '1.1rem',
  color: 'rgba(255, 255, 255, 0.7)',
  textAlign: 'center',
  maxWidth: '400px',
  lineHeight: 1.6,
});

const FormContainer = styled(Box)({
  width: '100%',
  maxWidth: '420px',
});

const Title = styled(Typography)({
  fontSize: '2rem',
  fontWeight: 700,
  color: '#1a1a1a',
  marginBottom: '8px',
});

const Subtitle = styled(Typography)({
  fontSize: '0.95rem',
  color: '#666',
  marginBottom: '32px',
});

const StyledTextField = styled(TextField)({
  marginBottom: '20px',
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    backgroundColor: '#fff',
    transition: 'all 0.2s ease',
    '& fieldset': {
      borderColor: '#e0e0e0',
      borderWidth: '1.5px',
    },
    '&:hover fieldset': {
      borderColor: '#bdbdbd',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#1a1a1a',
      borderWidth: '2px',
    },
    '& input': {
      padding: '14px 16px',
      fontSize: '0.95rem',
    },
  },
  '& .MuiInputLabel-root': {
    fontSize: '0.95rem',
    '&.Mui-focused': {
      color: '#1a1a1a',
    },
  },
  '& .MuiFormHelperText-root': {
    marginLeft: '4px',
    fontSize: '0.8rem',
  },
});

const LoginButton = styled(Button)({
  marginTop: '8px',
  padding: '14px',
  borderRadius: '8px',
  fontSize: '0.95rem',
  fontWeight: 600,
  textTransform: 'none',
  backgroundColor: '#1a1a1a',
  color: '#fff',
  boxShadow: 'none',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: '#2d2d2d',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    transform: 'translateY(-1px)',
  },
  '&:disabled': {
    backgroundColor: '#e0e0e0',
    color: '#999',
  },
});

const StyledDivider = styled(Divider)({
  margin: '32px 0',
  fontSize: '0.85rem',
  color: '#999',
  '&::before, &::after': {
    borderColor: '#e0e0e0',
  },
});

const RegisterLink = styled(Link)({
  color: '#1a1a1a',
  textDecoration: 'none',
  fontWeight: 600,
  transition: 'all 0.2s ease',
  borderBottom: '1px solid transparent',
  '&:hover': {
    borderBottomColor: '#1a1a1a',
  },
});

const ForgotPasswordLink = styled(Typography)({
  fontSize: '0.9rem',
  color: '#666',
  cursor: 'pointer',
  textAlign: 'right',
  marginTop: '4px',
  transition: 'color 0.2s ease',
  '&:hover': {
    color: '#1a1a1a',
    textDecoration: 'underline',
  },
});

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
      setApiError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <LeftPanel>
        {/* <LogoText>Aura Jewels</LogoText>
        <BrandDescription>
          Discover timeless elegance with our curated collection of fine jewellery. 
          Where craftsmanship meets luxury.
        </BrandDescription> */}
      </LeftPanel>

      <RightPanel>
        <FormContainer>
          <Title>Sign in</Title>
          <Subtitle>Enter your credentials to access your account</Subtitle>

          {apiError && (
            <Alert 
              severity="error" 
              sx={{ 
                mb: 3, 
                borderRadius: '8px',
                '& .MuiAlert-message': { fontSize: '0.9rem' }
              }}
            >
              {apiError}
            </Alert>
          )}
          
          <Box component="form" onSubmit={submitHandler} noValidate>
            <StyledTextField
              label="Email"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              onFocus={() => setEmailReadOnly(false)}
              inputProps={{ readOnly: emailReadOnly, autoComplete: 'off' }}
              error={!!errors.email}
              helperText={errors.email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlinedIcon sx={{ color: '#999', fontSize: '1.3rem' }} />
                  </InputAdornment>
                ),
              }}
            />

            <StyledTextField
              label="Password"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              onFocus={() => setPasswordReadOnly(false)}
              inputProps={{ readOnly: passwordReadOnly, autoComplete: 'current-password' }}
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon sx={{ color: '#999', fontSize: '1.3rem' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      sx={{ color: '#999' }}
                    >
                      {showPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <ForgotPasswordLink>Forgot password?</ForgotPasswordLink>

            <LoginButton
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : 'Sign in'}
            </LoginButton>

            <StyledDivider>or</StyledDivider>

            <Typography align="center" sx={{ fontSize: '0.95rem', color: '#666' }}>
              Don't have an account?{' '}
              <RegisterLink to="/register">Create account</RegisterLink>
            </Typography>
          </Box>
        </FormContainer>
      </RightPanel>
    </PageContainer>
  );
};

export default LoginPage;