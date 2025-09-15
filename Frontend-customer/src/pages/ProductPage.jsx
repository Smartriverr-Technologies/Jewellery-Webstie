import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import './ProductPage.css';

const ProductPage = () => {
  const { slug } = useParams(); // Get the slug from the URL
  const { addToCart } = useCart(); // Get the addToCart function from our context

  // State for this page
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // --- Data Fetching ---
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        // This is the corrected URL, using '/slug/' to avoid conflicts
        const { data } = await axios.get(`http://localhost:4000/api/products/slug/${slug}`);
        setProduct(data);
      } catch (err) {
        setError('Failed to fetch product details');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug]); // Re-run the effect if the slug in the URL changes

  // --- Event Handler ---
  const addToCartHandler = () => {
    addToCart(product, qty);
    alert('Product added to cart!');
  };

  // --- Conditional Rendering ---
  if (loading) return <div>Loading product details...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!product) return <div>Product not found.</div>;

  // --- Derived State (for cleaner JSX) ---
  const stockCount = product.variants[0]?.stock || 0;
  const stockStatus = stockCount > 0 ? 'In Stock' : 'Out of Stock';

  return (
    <div className="product-page-container">
      <div className="product-image-section">
        <img src={product.images[0]?.url} alt={product.title} />
      </div>
      <div className="product-details-section">
        <h1>{product.title}</h1>
        <p className="product-price">${product.price}</p>
        <p className="product-stock-status" style={{ color: stockCount > 0 ? 'green' : 'red' }}>
          {stockStatus}
        </p>
        <p className="product-description">{product.description}</p>
        
        {/* Quantity Selector */}
        {stockCount > 0 && (
          <div className="quantity-selector">
            <label htmlFor="qty">Qty:</label>
            <select 
              id="qty" 
              value={qty} 
              onChange={(e) => setQty(Number(e.target.value))}
            >
              {[...Array(stockCount).keys()].map(x => (
                <option key={x + 1} value={x + 1}>{x + 1}</option>
              ))}
            </select>
          </div>
        )}
        
        <button 
          className="add-to-cart-btn"
          onClick={addToCartHandler}
          disabled={stockCount === 0}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductPage;