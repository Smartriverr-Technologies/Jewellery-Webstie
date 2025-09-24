import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>Admin Panel</h2>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li><NavLink to="/" end>Dashboard</NavLink></li>
          <li><NavLink to="/products">Products</NavLink></li>
          <li><NavLink to="/orders">Orders</NavLink></li>
          <li><NavLink to="/users">Users</NavLink></li>
          <li><NavLink to="/hero-management">Hero Carousel</NavLink></li>
          <li><NavLink to="/main-carousel">Main Carousel</NavLink></li> {/* <-- Change this */}
          <li><NavLink to="/testimonials">Testimonials</NavLink></li>
          <li><NavLink to="/categories">Categories</NavLink></li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;