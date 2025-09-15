// import { React } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import { BrowserRouter } from 'react-router-dom';
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <BrowserRouter> {/* <-- Wrap App */}
//       <App />
//     </BrowserRouter>
//   </React.StrictMode>,
// )

import React from 'react'; // <-- The missing line
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import { CartProvider } from './context/CartContext.jsx';
import { AuthProvider } from './context/AuthContext';  

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthProvider>
    <CartProvider>
      <App />
      </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);