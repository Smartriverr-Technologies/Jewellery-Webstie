import React from 'react';
import { Link , useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext'; 
import { useAuth } from '../context/AuthContext';
import './Header.css';

const Header = () => {
  const { cartItems } = useCart(); // <-- Use cart context
  const { userInfo, logout } = useAuth(); // <-- Use auth context
  const navigate = useNavigate();

  const cartItemCount = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const logoutHandler = () => {
    logout();
    navigate('/login'); // Redirect to login after logout
  };


  return (
    // <header className="header">
    //   <div className="header-container">
    //     <Link to="/" className="header-logo">Aura Jewels</Link>
    //     <nav className="header-nav">
    //       <Link to="/cart">
    //         Cart {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
    //       </Link>
    //       <Link to="/login">Sign In</Link>
    //     </nav>
    //   </div>
    // </header>
    <header className="header">
      <div className="header-container">
        <Link to="/" className="header-logo">Aura Jewels</Link>
        <nav className="header-nav">
          <Link to="/cart">
            Cart {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
          </Link>
          {userInfo ? (
            <div className="dropdown">
              <span className="nav-username">{userInfo.name}</span>
              <div className="dropdown-content">
                <Link to="/profile">Profile</Link>
                <Link to="/wishlist">My Wishlist</Link>
                <button onClick={logoutHandler} className="logout-btn">Logout</button>
              </div>
            </div>
          ) : (
            <Link to="/login">Sign In</Link>
          )}
        </nav>
      </div>
    </header>
  );
};
export default Header;