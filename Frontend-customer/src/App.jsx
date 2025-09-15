// frontend-customer/src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage'; // <-- Import
import RegisterPage from './pages/RegisterPage'; // <-- Import
import ProtectedRoute from './components/ProtectedRoute';
import ShippingPage from './pages/ShippingPage';
import PaymentPage from './pages/PaymentPage';
// import PlaceOrderPage from './pages/PlaceOrderPage';
import PlaceOrderPage from './pages/PlaceOrderPage';
import OrderDetailsPage from './pages/OrderDetailsPage'; // <-- Import
import OrderHistoryPage from './pages/OrderHistoryPage';
import WishlistPage from './pages/WishlistPage';


function App() {
  return (
    <>
      <Header />
      <main className="main-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
           <Route path="/product/:slug" element={<ProductPage />} /> 
           <Route path="/cart" element={<CartPage />} /> 
           <Route path="/login" element={<LoginPage />} /> 
          <Route path="/register" element={<RegisterPage />} /> 
          <Route path="" element={<ProtectedRoute />}>
            <Route path="/shipping" element={<ShippingPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/placeorder" element={<PlaceOrderPage />} />
            <Route path="/order/:id" element={<OrderDetailsPage />} /> 
            <Route path="/profile" element={<OrderHistoryPage />} />
            <Route path="/wishlist" element={<WishlistPage />} /> 
          </Route>
        </Routes>
      </main>
      <Footer />
    </>
  );
}

// Add this basic style to your global index.css
// .main-container {
//   min-height: 80vh;
//   padding: 1rem 2rem;
//   max-width: 1200px;
//   margin: 0 auto;
// }

export default App;