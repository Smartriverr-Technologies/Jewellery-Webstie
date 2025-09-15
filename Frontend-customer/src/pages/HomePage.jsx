// frontend-customer/src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard'; // <-- Import
import './HomePage.css';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('http://localhost:4000/api/products');
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products');
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="homepage">
      <h1>Latest Products</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} /> // <-- Use Component
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;