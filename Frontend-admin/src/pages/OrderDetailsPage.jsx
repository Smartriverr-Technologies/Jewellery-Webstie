import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './OrderDetailsPage.css'; // We'll create this CSS file next

const OrderDetailsPage = () => {
  const { id: orderId } = useParams();
  const { userInfo } = useAuth();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        const { data } = await axios.get(`http://localhost:4000/api/orders/${orderId}`, config);
        setOrder(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch order');
      } finally {
        setLoading(false);
      }
    };

    if (userInfo) {
      fetchOrder();
    }
  }, [orderId, userInfo]);

  if (loading) return <div>Loading order details...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!order) return <div>Order not found.</div>;

  const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2);

  return (
    <div className="order-details-container">
      <h1>Order #{order._id}</h1>
      <div className="order-details-grid">
        <div className="order-main-details">
          <div className="detail-section">
            <h2>Shipping</h2>
            <p><strong>Name: </strong> {order.user.name}</p>
            <p><strong>Email: </strong> <a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
            <p>
              <strong>Address: </strong>
              {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
              {order.shippingAddress.postalCode}, {order.shippingAddress.country}
            </p>
            {order.isDelivered ? (
              <div className="status-box success">Delivered on {new Date(order.deliveredAt).toLocaleDateString()}</div>
            ) : (
              <div className="status-box error">Not Delivered</div>
            )}
          </div>

          <div className="detail-section">
            <h2>Payment Method</h2>
            <p><strong>Method: </strong> {order.paymentMethod}</p>
            {order.isPaid ? (
              <div className="status-box success">Paid on {new Date(order.paidAt).toLocaleDateString()}</div>
            ) : (
              <div className="status-box error">Not Paid</div>
            )}
          </div>

          <div className="detail-section">
            <h2>Order Items</h2>
            {order.orderItems.map((item) => (
              <div key={item._id} className="order-item">
                <img src={item.image} alt={item.name} className="order-item-image" />
                <Link to={`/product/${item.product}`} className="order-item-name">{item.name}</Link>
                <div className="order-item-price">
                  {item.qty} x ${item.price} = ${addDecimals(item.qty * item.price)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="order-summary-card">
          <h2>Order Summary</h2>
          <div className="summary-row"><span>Items:</span><span>${order.itemsPrice}</span></div>
          <div className="summary-row"><span>Shipping:</span><span>${order.shippingPrice}</span></div>
          <div className="summary-row"><span>Tax:</span><span>${order.taxPrice}</span></div>
          <div className="summary-row total"><span>Total:</span><span>${order.totalPrice}</span></div>
          {/* Payment button (e.g., PayPal) would go here if not paid */}
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;