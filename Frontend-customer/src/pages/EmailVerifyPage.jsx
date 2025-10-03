import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Container, Paper, Typography, Button, CircularProgress, Alert } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

// API function to verify the email token
const verifyEmailToken = async (token) => {
  const { data } = await axios.get(`http://localhost:4000/api/users/verifyemail/${token}`);
  return data;
};

const EmailVerifyPage = () => {
  const { token } = useParams();

  // useQuery will automatically call the API when the page loads
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['emailVerification', token],
    queryFn: () => verifyEmailToken(token),
    retry: false, // Don't retry on failure
  });

  return (
    <Container maxWidth="sm" sx={{ py: 5, textAlign: 'center' }}>
      <Paper sx={{ p: 4 }}>
        {isLoading && (
          <>
            <CircularProgress />
            <Typography variant="h6" sx={{ mt: 2 }}>Verifying your email...</Typography>
          </>
        )}
        {isError && (
          <>
            <ErrorIcon color="error" sx={{ fontSize: 60 }} />
            <Typography variant="h5" sx={{ mt: 2 }} color="error">Verification Failed</Typography>
            <Typography sx={{ mt: 1 }}>
              {error.response?.data?.message || 'The link may be invalid or expired.'}
            </Typography>
            <Button component={Link} to="/register" variant="contained" sx={{ mt: 3 }}>
              Try Registering Again
            </Button>
          </>
        )}
        {data && (
          <>
            <CheckCircleIcon color="success" sx={{ fontSize: 60 }} />
            <Typography variant="h5" sx={{ mt: 2 }} color="success.main">
              Email Verified Successfully!
            </Typography>
            <Typography sx={{ mt: 1 }}>
              Your account is now active. You can now log in to enjoy our services.
            </Typography>
            <Button component={Link} to="/login" variant="contained" sx={{ mt: 3 }}>
              Go to Login
            </Button>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default EmailVerifyPage;