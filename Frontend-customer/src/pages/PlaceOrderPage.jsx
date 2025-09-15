import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import './PlaceOrderPage.css';

const PlaceOrderPage = () => {
  const navigate = useNavigate();
  const { cartItems, shippingAddress, clearCart } = useCart();
  const { userInfo } = useAuth();

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Redirect if shipping address is missing or cart is empty
  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [shippingAddress, cartItems, navigate]);

  // --- Calculation Logic ---
  const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2);

  const itemsPrice = addDecimals(
    cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  const shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 10);
  const taxPrice = addDecimals(Number((0.15 * itemsPrice).toFixed(2)));
  const totalPrice = (
    Number(itemsPrice) +
    Number(shippingPrice) +
    Number(taxPrice)
  ).toFixed(2);

  // --- Handler for Placing Order ---
  const placeOrderHandler = async () => {
    setLoading(true);
    setError('');
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data: createdOrder } = await axios.post(
        'http://localhost:4000/api/orders',
        {
          orderItems: cartItems,
          shippingAddress,
          paymentMethod: 'PayPal', // Hardcoded for now
          itemsPrice,
          taxPrice,
          shippingPrice,
          totalPrice,
        },
        config
      );

      clearCart();
      // We will create the order details page in the next step
      navigate(`/order/${createdOrder._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while placing the order.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="place-order-container">
      <h1>Review Your Order</h1>
      <div className="place-order-grid">
        <div className="place-order-details">
          <div className="detail-section">
            <h2>Shipping</h2>
            <p>
              <strong>Address: </strong>
              {shippingAddress.address}, {shippingAddress.city}{' '}
              {shippingAddress.postalCode}, {shippingAddress.country}
            </p>
          </div>

          <div className="detail-section">
            <h2>Payment Method</h2>
            <p>
              <strong>Method: </strong>
              PayPal or Credit Card
            </p>
          </div>

          <div className="detail-section">
            <h2>Order Items</h2>
            {cartItems.map((item) => (
              <div key={item._id} className="order-item">
                <img src={item.images[0]?.url} alt={item.title} className="order-item-image" />
                <Link to={`/product/${item.slug}`} className="order-item-name">{item.title}</Link>
                <div className="order-item-price">
                  {item.qty} x ${item.price} = ${addDecimals(item.qty * item.price)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="order-summary-card">
          <h2>Order Summary</h2>
          <div className="summary-row"><span>Items:</span><span>${itemsPrice}</span></div>
          <div className="summary-row"><span>Shipping:</span><span>${shippingPrice}</span></div>
          <div className="summary-row"><span>Tax:</span><span>${taxPrice}</span></div>
          <div className="summary-row total"><span>Total:</span><span>${totalPrice}</span></div>
          
          {error && <div className="error-message">{error}</div>}

          <button
            type="button"
            className="place-order-btn"
            disabled={cartItems.length === 0 || loading}
            onClick={placeOrderHandler}
          >
            {loading ? 'Placing Order...' : 'Place Order'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderPage;