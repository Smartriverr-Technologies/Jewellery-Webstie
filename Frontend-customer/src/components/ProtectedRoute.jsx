import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
  const { userInfo, loading } = useAuth();

  // We also check for the initial loading state to avoid a flicker effect
  if (loading) {
    return <div>Loading...</div>; // Or a spinner component
  }

  // If user is logged in, render the child route (e.g., ShippingPage).
  // Otherwise, redirect to the login page.
  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;