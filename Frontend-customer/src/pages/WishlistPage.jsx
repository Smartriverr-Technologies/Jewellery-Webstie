import React from 'react';
import { useAuth } from '../context/AuthContext';
import ProductCard from '../components/ProductCard';
import '../pages/HomePage.css'; // Reuse homepage styles for the grid

const WishlistPage = () => {
  const { wishlist } = useAuth();

  return (
    <div className="homepage">
      <h1>My Wishlist</h1>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="product-grid">
          {wishlist.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;