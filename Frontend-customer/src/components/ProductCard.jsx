import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { userInfo, wishlist, addToWishlistCtx, removeFromWishlistCtx } = useAuth();

  const isWishlisted = userInfo && wishlist.some(item => item._id === product._id);

  const toggleWishlist = (e) => {
    e.preventDefault();
    if (isWishlisted) {
      removeFromWishlistCtx(product._id);
    } else {
      addToWishlistCtx(product._id);
    }
  };

  return (
    <div className="product-card-container">
      {userInfo && (
        <button onClick={toggleWishlist} className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}>
          &#x2764;
        </button>
      )}
      <Link to={`/product/${product.slug}`} className="product-card-link">
        <div className="product-card">
          <img 
            src={product.images[0]?.url || '/placeholder.jpg'} 
            alt={product.title} 
            className="product-card-image"
          />
          <div className="product-card-info">
            <h3>{product.title}</h3>
            <p>${product.price}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;