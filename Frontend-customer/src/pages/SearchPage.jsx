import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import './HomePage.css'; // Reuse homepage styles

const SearchPage = () => {
  const { keyword } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`http://localhost:4000/api/products/search?keyword=${keyword}`);
        setProducts(data);
      } catch (err) {
        setError('Could not find products.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [keyword]); // Refetch when the keyword changes

  return (
    <div className="homepage">
      <h1>Search Results for "{keyword}"</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : products.length === 0 ? (
        <p>No products found matching your search.</p>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;