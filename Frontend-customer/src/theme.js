// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#B8860B', // A sophisticated dark gold
    },
    secondary: {
      main: '#4A4A4A', // A dark grey for text and secondary elements
    },
    background: {
      default: '#fdfdfd', // A very light off-white
    },
  },
  typography: {
    fontFamily: 'Lato, Arial, sans-serif',
    h1: {
      fontFamily: 'Montserrat, Arial, sans-serif',
      fontWeight: 700,
    },
    h2: {
      fontFamily: 'Montserrat, Arial, sans-serif',
      fontWeight: 700,
    },
    // ... you can define styles for h3, h4, etc.
  },
  components: {
    // Example of overriding a component's default style
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none', // Buttons will not be all uppercase
          padding: '10px 20px',
        },
      },
    },
  },
});

export default theme;