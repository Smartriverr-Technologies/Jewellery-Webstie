import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './OrderHistoryPage.css';

const OrderHistoryPage = () => {
  const { userInfo } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMyOrders = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        const { data } = await axios.get('http://localhost:4000/api/orders/myorders', config);
        setOrders(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    if (userInfo) {
      fetchMyOrders();
    }
  }, [userInfo]);

  if (loading) return <div>Loading your orders...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="order-history-container">
      <h1>My Orders</h1>
      {orders.length === 0 ? (
        <div className="no-orders-message">
          You have not placed any orders yet. <Link to="/">Go Shopping</Link>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="orders-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td>${order.totalPrice}</td>
                  <td>{order.isPaid ? '✅' : '❌'}</td>
                  <td>{order.isDelivered ? '✅' : '❌'}</td>
                  <td>
                    <Link to={`/order/${order._id}`} className="details-btn">
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderHistoryPage;