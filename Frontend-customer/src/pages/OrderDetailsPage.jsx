import React, { useEffect, useState  } from 'react';
import { Link , useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import './OrderDetailsPage.css';

const OrderDetailsPage = () => {
  const { id: orderId } = useParams();
  const { userInfo } = useAuth();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        const { data } = await axios.get(`http://localhost:4000/api/orders/${orderId}`, config);
        setOrder(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch order');
      } finally {
        setLoading(false);
      }
    };

    if (userInfo) fetchOrder();
  }, [orderId, userInfo]);

  if (loading) return <div className="loading">Loading order details...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!order) return <div className="error-message">Order not found.</div>;

  const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2);

  return (
    <div className="order-details-container">
      <h1 className="page-title">Order Details</h1>

      <div className="order-grid">

        {/* Left Section: Order Details */}
        <div className="order-details-left">
          {/* Shipping */}
          <div className="card animate-fade">
            <h2>Shipping</h2>
            <p><strong>Name: </strong>{order.user.name}</p>
            <p><strong>Email: </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
            <p><strong>Phone: </strong>{order.shippingAddress.phone}</p>
            <p><strong>Address: </strong>{order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}</p>
            <div className={`status-box ${order.isDelivered ? 'success' : 'pending'} animate-status`}>
              {order.isDelivered ? `Delivered on ${new Date(order.deliveredAt).toLocaleDateString()}` : 'Not Delivered'}
            </div>
          </div>

          {/* Payment */}
          <div className="card animate-fade">
            <h2>Payment Method</h2>
            <p><strong>Method: </strong>{order.paymentMethod}</p>
            <div className={`status-box ${order.isPaid ? 'success' : 'pending'} animate-status`}>
              {order.isPaid ? `Paid on ${new Date(order.paidAt).toLocaleDateString()}` : 'Not Paid'}
            </div>
          </div>

          {/* Order Items */}
          <div className="card animate-fade">
            <h2>Order Items</h2>
            {order.orderItems.map((item) => (
              <div key={item._id} className="order-item animate-hover">
                <img src={`http://localhost:4000${item.image}`} alt={item.name} />
                <Link to={`/product/${item.product}`} className="item-name">{item.name}</Link>
                <div className="item-price">{item.qty} x ${item.price} = ${addDecimals(item.qty * item.price)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section: Order Summary */}
        <div className="order-summary card animate-fade">
          <h2>Order Summary</h2>
          <div className="summary-row"><span>Items:</span><span>${order.itemsPrice}</span></div>
          <div className="summary-row"><span>Shipping:</span><span>${order.shippingPrice}</span></div>
          <div className="summary-row"><span>Tax:</span><span>${order.taxPrice}</span></div>
          <div className="summary-row total"><span>Total:</span><span>${order.totalPrice}</span></div>
        </div>

      </div>
    </div>
  );
};

export default OrderDetailsPage;
