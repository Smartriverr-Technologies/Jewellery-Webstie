import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaShoppingCart,
  FaUsers,
  FaImage,
  FaTags,
  FaCommentDots,
  FaCog,
  FaImages,
  FaVideo
} from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import LogoutIcon from '@mui/icons-material/Logout';
import './Sidebar.css';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const logoutHandler = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      {/* Header */}
      <div className="sidebar-header">
        <h2 className="logo">{!isCollapsed ? 'Admin Panel' : 'AP'}</h2>
        <button className="collapse-btn" onClick={toggleSidebar}>
          {isCollapsed ? '→' : '←'}
        </button>
      </div>

      {/* Scrollable nav */}
      <div className="sidebar-nav-wrapper">
        <nav className="sidebar-nav">
          <ul>
            <li>
              <NavLink to="/" end>
                <FaTachometerAlt className="icon" />
                {!isCollapsed && <span>Dashboard</span>}
              </NavLink>
            </li>
            <li>
              <NavLink to="/products">
                <FaBoxOpen className="icon" />
                {!isCollapsed && <span>Products</span>}
              </NavLink>
            </li>
            <li>
              <NavLink to="/orders">
                <FaShoppingCart className="icon" />
                {!isCollapsed && <span>Orders</span>}
              </NavLink>
            </li>
            <li>
              <NavLink to="/users">
                <FaUsers className="icon" />
                {!isCollapsed && <span>Users</span>}
              </NavLink>
            </li>
            <li>
              <NavLink to="/hero-management">
                <FaImage className="icon" />
                {!isCollapsed && <span>Hero Carousel</span>}
              </NavLink>
            </li>
            <li>
              <NavLink to="/main-carousel">
                <FaImage className="icon" />
                {!isCollapsed && <span>Main Carousel</span>}
              </NavLink>
            </li>
            <li>
              <NavLink to="/testimonials">
                <FaCommentDots className="icon" />
                {!isCollapsed && <span>Testimonials</span>}
              </NavLink>
            </li>
            <li>
              <NavLink to="/categories">
                <FaTags className="icon" />
                {!isCollapsed && <span>Categories</span>}
              </NavLink>
            </li>
            {/* <li>
              <NavLink to="/gallery">
                <FaImages className="icon" />
                {!isCollapsed && <span>Gallery</span>}
              </NavLink>
            </li> */}
            <li>
              <NavLink to="/social-videos">
                <FaVideo className="icon" />
                {!isCollapsed && <span>Social Videos</span>}
              </NavLink>
            </li>
            <li>
              <NavLink to="/settings">
                <FaCog className="icon" />
                {!isCollapsed && <span>Settings</span>}
              </NavLink>
            </li>
            {/* <li>
              <NavLink to="/gallery-images">
                <FaCog className="icon" />
                {!isCollapsed && <span>admin Gallery</span>}
              </NavLink>
            </li> */}
          </ul>
        </nav>
      </div>

      {/* Footer */}
      <div className="sidebar-footer">
        <button onClick={logoutHandler} className="logout-btn">
          <LogoutIcon sx={{ mr: isCollapsed ? 0 : 1 }} />
          {!isCollapsed && 'Logout'}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
