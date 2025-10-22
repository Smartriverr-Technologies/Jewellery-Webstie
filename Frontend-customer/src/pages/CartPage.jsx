import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import './CartPage.css';

const CartPage = () => {
  const { cartItems, removeFromCart } = useCart();
  const subtotal = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2);
  const navigate = useNavigate();

  const checkoutHandler = () => {
    navigate('/shipping');
  };

  return (
    <div className="cart-container">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Shopping Cart
      </motion.h1>

      {cartItems.length === 0 ? (
        <motion.div
          className="cart-empty"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          Your cart is empty. <Link to="/">Go Shopping</Link>
        </motion.div>
      ) : (
        <div className="cart-content">
          {/* Cart Items */}
          <div className="cart-items">
            <AnimatePresence>
              {cartItems.map((item) => (
                <motion.div
                  key={item._id}
                  className="cart-item"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* <img
                    src={`${import.meta.env.VITE_API_URL}${item.images[0]?.url}`}
                    alt={item.title}
                    className="cart-item-image"
                  /> */}
                  <img
  src={item.images[0]?.url}
  alt={item.title}
  className="cart-item-image"
/>

                  <div className="cart-item-details">
                    <Link to={`/product/${item.slug}`} className="cart-item-title">
                      {item.title}
                    </Link>
                    <p className="cart-item-price">₹{item.price}</p>
                    <p className="cart-item-qty">Qty: {item.qty}</p>
                  </div>
                  <motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  onClick={() => removeFromCart(item._id)}
  className="remove-btn"
>
  Remove
</motion.button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Summary Section */}
          <motion.div
            className="cart-summary"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2>Order Summary</h2>
            <p className="subtotal">Subtotal: <strong>₹{subtotal}</strong></p>
            <p className="total-items">{cartItems.reduce((acc, item) => acc + item.qty, 0)} items</p>

            <motion.button
              className="checkout-btn"
              disabled={cartItems.length === 0}
              onClick={checkoutHandler}
              whileHover={{ scale: 1.05, boxShadow: "0 8px 20px rgba(0,0,0,0.2)" }}
              whileTap={{ scale: 0.95 }}
            >
              Proceed to Checkout
            </motion.button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
