import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { FaCheckCircle, FaTimesCircle, FaTruck, FaInfoCircle } from 'react-icons/fa';
import './OrderListPage.css';
import api from '../api/axiosConfig';
const OrderListPage = () => {
  const { userInfo } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch orders from API
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      const { data } = await api.get('/api/orders', config);
      // Sort orders by newest first
      const sortedOrders = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setOrders(sortedOrders);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userInfo) fetchOrders();
  }, [userInfo]);

  // Mark order as delivered
  const deliverHandler = async (id) => {
    if (window.confirm('Mark this order as delivered?')) {
      try {
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        await api.put(`/api/orders/${id}/deliver`, {}, config);
        fetchOrders();
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to update order');
      }
    }
  };
  const markPaidHandler = async (id) => {
  if (window.confirm('Mark this order as paid?')) {
    try {
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      await api.put(`/api/orders/${id}/pay`, {}, config);
      fetchOrders(); // Refresh after marking paid
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update order');
    }
  }
};

  if (loading)
    return (
      <div className="loader-container">
        <div className="loader"></div>
        Loading orders...
      </div>
    );

  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="order-list-container">
      <div className="list-header">
        <h1>All Orders</h1>
      </div>

      <div className="table-wrapper">
        <table className="orders-table">
          <thead>
            <tr>
              <th>ORDER ID</th>
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
                <td>{new Date(order.createdAt).toLocaleDateString('en-GB')}</td>
                <td>₹{order.totalPrice.toFixed(2)}</td>
                <td>
                  {order.isPaid ? (
                    <span className="status paid">
                      <FaCheckCircle /> Paid
                    </span>
                  ) : (
                    <span className="status not-paid">
                      <FaTimesCircle /> Not Paid
                    </span>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    <span className="status delivered">
                      <FaTruck /> Delivered
                    </span>
                  ) : (
                    <span className="status not-delivered">
                      <FaTimesCircle /> Pending
                    </span>
                  )}
                </td>
                <td className="actions-cell">
                  <Link to={`/orders/${order._id}`} className="details-btn">
                    <FaInfoCircle /> Details
                  </Link>
                  {!order.isDelivered && (
                    <button
                      onClick={() => deliverHandler(order._id)}
                      className="deliver-btn"
                    >
                      <FaTruck /> Mark Delivered
                    </button>
                    
                    
                  )}
                  {!order.isPaid && (
  <button
    onClick={() => markPaidHandler(order._id)}
    className="paid-btn"
  >
    💰 Mark Paid
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
