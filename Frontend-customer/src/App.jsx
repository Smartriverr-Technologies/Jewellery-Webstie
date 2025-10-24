// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import { Box } from '@mui/material';

// // Layout Components
// import Header from './components/Header';
// import Footer from './components/Footer';
// import ProtectedRoute from './components/ProtectedRoute';
// import CategoryPage from './pages/CategoryPage';

// // Page Imports
// import HomePage from './pages/HomePage';
// import ProductPage from './pages/ProductPage';
// import CartPage from './pages/CartPage';
// import LoginPage from './pages/LoginPage';
// import RegisterPage from './pages/RegisterPage';
// import ShippingPage from './pages/ShippingPage';
// import PaymentPage from './pages/PaymentPage';
// import PlaceOrderPage from './pages/PlaceOrderPage';
// import OrderDetailsPage from './pages/OrderDetailsPage';
// import OrderHistoryPage from './pages/OrderHistoryPage';
// import WishlistPage from './pages/WishlistPage';
// import SearchPage from './pages/SearchPage';
// import PageWrapper from './components/PageWrapper';
// import ShopPage from './pages/ShopPage'; 

// function App() {
//   return (
//     <Box sx={{ display: 'flex', flexDirection: 'column'  }}>
//       <Header />
//       {/* The main content area will grow to fill available space */}
//       <Box component="main" sx={{ flexGrow: 1 }}>
//         <Routes>
//           {/* Public Routes */}
//           <Route path="/" element={<PageWrapper> <HomePage /></PageWrapper>} />
//           <Route path="/search/:keyword" element={<PageWrapper><SearchPage /></PageWrapper>} />
//           <Route path="/category/:slug" element={<PageWrapper><CategoryPage /></PageWrapper>} />
//           <Route path="/product/slug/:slug" element={<PageWrapper><ProductPage /></PageWrapper>} />
//           <Route path="/cart" element={<PageWrapper><CartPage /></PageWrapper>} />
//           <Route path="/login" element={<PageWrapper><LoginPage /></PageWrapper>} />
//           <Route path="/register" element={<PageWrapper><RegisterPage /></PageWrapper>} />
//           {/* <Route path="/shop" element={<ShopPage />} />  */}
//           <Route path="/shop" element={<PageWrapper><ShopPage /></PageWrapper>} />

//           {/* Protected Routes */}
//           <Route path="" element={<PageWrapper><ProtectedRoute /></PageWrapper>}>
//             <Route path="/shipping" element={<PageWrapper><ShippingPage /></PageWrapper>} />
//             <Route path="/payment" element={<PageWrapper><PaymentPage /></PageWrapper>} />
//             <Route path="/placeorder" element={<PageWrapper><PlaceOrderPage /></PageWrapper>} />
//             <Route path="/order/:id" element={<PageWrapper><OrderDetailsPage /></PageWrapper>} />
//             <Route path="/profile" element={<PageWrapper><OrderHistoryPage /></PageWrapper>} />
//             <Route path="/wishlist" element={<PageWrapper><WishlistPage /></PageWrapper>} />
//             <Route path="/payment" element={<PaymentPage />} />
//             {/* <Route path="/category/:slug" element={<CategoryPage />} /> */}
//           </Route>
//         </Routes>
//       </Box>
//       <Footer />
//     </Box>
//   );
// }

// export default App;


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmailVerifyPage from './pages/EmailVerifyPage';
// Layout Components
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Page Imports
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ShippingPage from './pages/ShippingPage';
import PaymentPage from './pages/PaymentPage';
import PlaceOrderPage from './pages/PlaceOrderPage';
import OrderDetailsPage from './pages/OrderDetailsPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import WishlistPage from './pages/WishlistPage';
import SearchPage from './pages/SearchPage';
import CategoryPage from './pages/CategoryPage';
import GalleryPage from './pages/GalleryPage';
import ShopPage from './pages/ShopPage';
import Aboutus from './pages/Aboutus';
import Contactus from './pages/Contactus';
import FloatingContact from './components/FloatingContact';
import ShippingAndDelivery from './pages/ShippingAndDelivery';
// import EmailVerifyPage from './pages/EmailVerifyPage';

function App() {
  return (
    <>
      <Header />
      <main className="main-container">
       
        <Routes>
          {/* --- Public Routes --- */}
          <Route path="/" element={<HomePage />} />
          <Route path="/search/:keyword" element={<SearchPage />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
          {/* This is the corrected line */}
          <Route path="/product/slug/:slug" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/verify-email/:token" element={<EmailVerifyPage />} />
           <Route path="/shop" element={<ShopPage />} />
           <Route path="/about-us" element={<Aboutus/>}/>
            <Route path="/contact-us" element={<Contactus/>}/>
            <Route path="/shipping-delivery" element={<ShippingAndDelivery/>}/>


          {/* --- Protected Routes --- */}
          <Route path="" element={<ProtectedRoute />}>
            <Route path="/shipping" element={<ShippingPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/placeorder" element={<PlaceOrderPage />} />
            <Route path="/order/:id" element={<OrderDetailsPage />} />
            <Route path="/profile" element={<OrderHistoryPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
          </Route>
        </Routes>
        <FloatingContact />
      </main>
      <Footer />
    </>
  );
}

export default App;