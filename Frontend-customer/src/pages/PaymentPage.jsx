import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// We can reuse the AuthForm.css for styling
import './AuthForm.css';

const PaymentPage = () => {
  const navigate = useNavigate();
  // In a real app, you might get saved methods from a context
  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const submitHandler = (e) => {
    e.preventDefault();
    // Here, we would save the payment method to our cart context/state
    // For now, we'll just navigate to the final step
    navigate('/placeorder');
  };

  return (
    <div className="auth-container">
      <form onSubmit={submitHandler} className="auth-form">
        <h1>Payment Method</h1>
        <div className="form-group">
          <label>Select Method</label>
          <div className="radio-group">
            <input
              type="radio"
              id="PayPal"
              name="paymentMethod"
              value="PayPal"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor="PayPal">COD or Credit Card</label>
          </div>
        </div>
        <button type="submit">Continue</button>
      </form>
    </div>
  );
};

export default PaymentPage;