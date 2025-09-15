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
          <li>
            {/* The 'end' prop is crucial here to prevent this link from always being active */}
            <NavLink to="/" end>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/products">
              Products
            </NavLink>
          </li>
          <li>
            <NavLink to="/orders">
              Orders
            </NavLink>
          </li>
          <li>
            <NavLink to="/users">
              Users
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;