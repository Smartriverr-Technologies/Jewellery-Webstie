import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './ProductListPage.css';

const ProductListPage = () => {
    const navigate = useNavigate();
  const { userInfo } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        // Fetch from the admin-specific endpoint
        const { data } = await axios.get('http://localhost:4000/api/products/admin', config);
        setProducts(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    if (userInfo) {
      fetchProducts();
    }
  }, [userInfo]);

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        await axios.delete(`http://localhost:4000/api/products/${id}`, config);
        // Remove the deleted product from the state to update the UI instantly
        setProducts(products.filter((p) => p._id !== id));
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to delete product');
      }
    }
  };

  const createProductHandler = async () => {
    if (window.confirm('Are you sure you want to create a new product?')) {
      try {
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        const { data } = await axios.post('http://localhost:4000/api/products', {}, config);
        navigate(`/products/${data._id}/edit`);
      } catch (err) {
        alert('Could not create product');
      }
    }
  };

  if (loading) return <div>Loading products...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="product-list-container">
      <div className="list-header">
        <h1>Products</h1>
        {/* <Link to="/products/create" className="create-btn">
          Create Product
        </Link> */}
         <button onClick={createProductHandler} className="create-btn">
          Create Product
        </button>
      </div>
      <div className="table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.title}</td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <td className="actions-cell">
                  {/* The edit link will be used in the next step */}
                  <Link to={`/products/${product._id}/edit`} className="edit-btn">
                    Edit
                  </Link>
                  <button onClick={() => deleteHandler(product._id)} className="delete-btn">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductListPage;