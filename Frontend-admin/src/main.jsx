import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // <-- Import

import { AuthProvider } from './context/AuthContext';
// import theme from './theme';
import App from './App.jsx';

// Create a client instance
const queryClient = new QueryClient(); // <-- Create an instance

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}> {/* <-- Wrap with the provider */}
      
        <CssBaseline />
        <BrowserRouter>
          <AuthProvider>
            <App />
          </AuthProvider>
        </BrowserRouter>
      
    </QueryClientProvider>
  </React.StrictMode>
);