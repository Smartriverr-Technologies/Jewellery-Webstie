import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminRoute from './components/AdminRoute';
import AdminLayout from './components/AdminLayout'; // <-- Import Layout
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
// We will create ProductListPage next
import ProductListPage from './pages/ProductListPage';
import ProductEditPage from './pages/ProductEditPage';
import OrderListPage from './pages/OrderListPage';
import OrderDetailsPage from './pages/OrderDetailsPage';
import UserListPage from './pages/UserListPage'; 
function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      {/* Wrap all protected admin pages in the AdminLayout */}
      <Route path="/" element={<AdminRoute />}>
        <Route element={<AdminLayout />}>
          <Route index={true} element={<DashboardPage />} />
          <Route path="products" element={<ProductListPage />} />
          <Route path="products/:id/edit" element={<ProductEditPage />} /> 
          <Route path="orders" element={<OrderListPage />} /> 
          <Route path="orders/:id" element={<OrderDetailsPage />} />
           <Route path="users" element={<UserListPage />} /> 
          {/* Routes for orders and users will go here */}
        </Route>
      </Route>
    </Routes>
  );
}
export default App;