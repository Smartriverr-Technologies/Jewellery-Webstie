import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './ProductEditPage.css';

const ProductEditPage = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const { userInfo } = useAuth();

  // State for all form fields, matching your product model
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState(''); // Simplified to a single image URL
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState(0); // Simplified to a single variant's stock
  const [description, setDescription] = useState('');
  const [active, setActive] = useState(false);

  // State to manage loading and errors for both fetching and updating
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [loadingUpdate, setLoadingUpdate] = useState(false);

  // --- Data Fetching ---
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // This endpoint is public, so no auth token is needed for the GET request
        const { data } = await axios.get(`http://localhost:4000/api/products/${productId}`);
        
        // Populate the form fields with the fetched data
        setTitle(data.title);
        setPrice(data.price);
        setImage(data.images[0]?.url || ''); // Safely access the first image URL
        setCategory(data.category);
        setStock(data.variants[0]?.stock || 0); // Safely access the first variant's stock
        setDescription(data.description);
        setActive(data.active);

      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch product data');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  // --- Form Submission Handler ---
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoadingUpdate(true);
    setError(''); // Clear previous errors
    
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`, // Auth token is required for updating
        },
      };

      const updatedProduct = {
        title,
        price,
        description,
        images: [{ url: image, alt: title }], // Reconstruct the images array
        category,
        variants: [{ price, stock }], // Reconstruct the variants array (simplified)
        active,
      };

      await axios.put(`http://localhost:4000/api/products/${productId}`, updatedProduct, config);
      
      alert('Product updated successfully!');
      navigate('/products'); // Redirect back to the product list

    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update product');
    } finally {
      setLoadingUpdate(false);
    }
  };

  return (
    <div className="edit-product-container">
      <Link to="/products" className="go-back-link">
        &larr; Go Back to Product List
      </Link>
      
      <h1>Edit Product</h1>

      {loading ? (
        <div>Loading product data...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <form onSubmit={submitHandler} className="edit-product-form">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>

          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} required />
          </div>

          <div className="form-group">
            <label htmlFor="image">Image URL</label>
            <input type="text" id="image" value={image} onChange={(e) => setImage(e.target.value)} required />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <input type="text" id="category" value={category} onChange={(e) => setCategory(e.target.value)} required />
          </div>

          <div className="form-group">
            <label htmlFor="stock">Stock Count</label>
            <input type="number" id="stock" value={stock} onChange={(e) => setStock(e.target.value)} required />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea id="description" rows="4" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
          </div>

          <div className="form-group form-group-checkbox">
            <input type="checkbox" id="active" checked={active} onChange={(e) => setActive(e.target.checked)} />
            <label htmlFor="active">Is Active</label>
          </div>
          
          <button type="submit" disabled={loadingUpdate}>
            {loadingUpdate ? 'Updating...' : 'Update Product'}
          </button>
        </form>
      )}
    </div>
  );
};

export default ProductEditPage;