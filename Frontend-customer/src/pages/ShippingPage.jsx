import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './AuthForm.css'; // We can reuse the auth form styles

const ShippingPage = () => {
  const { shippingAddress, saveShippingAddress } = useCart();
  const navigate = useNavigate();

  // Pre-fill state with saved address or empty strings
  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
  const [country, setCountry] = useState(shippingAddress.country || '');

  const submitHandler = (e) => {
    e.preventDefault();
    saveShippingAddress({ address, city, postalCode, country });
    // Navigate to the next step (payment)
    // For now, we can just log it or navigate to a placeholder
    navigate('/payment'); // We will create this page next
  };

  return (
    <div className="auth-container">
      <form onSubmit={submitHandler} className="auth-form">
        <h1>Shipping Address</h1>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="city">City</label>
          <input type="text" id="city" value={city} onChange={(e) => setCity(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="postalCode">Postal Code</label>
          <input type="text" id="postalCode" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="country">Country</label>
          <input type="text" id="country" value={country} onChange={(e) => setCountry(e.target.value)} required />
        </div>
        <button type="submit">Continue</button>
      </form>
    </div>
  );
};

export default ShippingPage;