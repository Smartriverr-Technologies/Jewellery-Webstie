import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
// We will share the AuthContext, so we need to set up the path correctly
// This assumes your folder structure is:
// jewelry-ecommerce/
// ├── frontend-admin/
// └── frontend-customer/
// We will create a shared context folder later. For now, we can use a relative path,
// but a better solution is a monorepo setup. Let's use a simplified approach for now.
// We will need to copy the AuthContext into the admin frontend.

// NOTE: For simplicity, copy your `AuthContext.jsx` file from 
// `frontend-customer/src/context` to `frontend-admin/src/context`.
import { useAuth } from '../context/AuthContext'; 

const AdminRoute = () => {
  const { userInfo, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return userInfo && userInfo.role === 'admin' ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default AdminRoute;