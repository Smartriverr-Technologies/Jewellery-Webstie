import React from 'react';
// import { Link } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
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
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div className="cart-empty">
          Your cart is empty. <Link to="/">Go Shopping</Link>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item._id} className="cart-item">
                <img src={item.images[0]?.url} alt={item.title} className="cart-item-image" />
                <div className="cart-item-details">
                  <Link to={`/product/${item.slug}`}>{item.title}</Link>
                  <p>${item.price}</p>
                  <p>Qty: {item.qty}</p>
                </div>
                <button onClick={() => removeFromCart(item._id)} className="remove-btn">
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h2>Subtotal</h2>
            <p>${subtotal}</p>
            <p>{cartItems.reduce((acc, item) => acc + item.qty, 0)} items</p>
            {/* <button className="checkout-btn" disabled={cartItems.length === 0}>
              Proceed to Checkout
            </button> */}
            <button className="checkout-btn" disabled={cartItems.length === 0} onClick={checkoutHandler}>
    Proceed to Checkout
  </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;