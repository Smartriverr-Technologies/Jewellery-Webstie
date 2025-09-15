import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
// We reuse the CSS from the Product List page for a consistent look
import './ProductListPage.css';

const OrderListPage = () => {
  const { userInfo } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // We extract the fetch logic into its own function so we can call it again after an update
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const config = {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      };
      const { data } = await axios.get('http://localhost:4000/api/orders', config);
      setOrders(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  // Fetch orders when the component mounts
  useEffect(() => {
    if (userInfo) {
      fetchOrders();
    }
  }, [userInfo]);

  // Handler to mark an order as delivered
  const deliverHandler = async (id) => {
    if (window.confirm('Mark this order as delivered?')) {
      try {
        const config = {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        };
        await axios.put(`http://localhost:4000/api/orders/${id}/deliver`, {}, config);
        // Refresh the orders list to show the updated status
        fetchOrders();
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to update order');
      }
    }
  };

  if (loading) return <div>Loading orders...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="product-list-container">
      <div className="list-header">
        <h1>All Orders</h1>
      </div>
      <div className="table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user ? order.user.name : 'DELETED USER'}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>${order.totalPrice.toFixed(2)}</td>
                <td>{order.isPaid ? '✅' : '❌'}</td>
                <td>{order.isDelivered ? '✅' : '❌'}</td>
                <td className="actions-cell">
                  <Link to={`/orders/${order._id}`} className="details-btn">
                    Details
                  </Link>
                  {!order.isDelivered && (
                    <button onClick={() => deliverHandler(order._id)} className="edit-btn">
                      Mark Delivered
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderListPage;