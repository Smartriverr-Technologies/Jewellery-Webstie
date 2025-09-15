import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import './AdminLayout.css';

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      {/* The sidebar is always visible */}
      <Sidebar />

      {/* The main content area where child routes will be rendered */}
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;