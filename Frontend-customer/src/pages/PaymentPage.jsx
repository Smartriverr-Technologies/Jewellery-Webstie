import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './PaymentPage.css';

const PaymentPage = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    if (!paymentMethod) return;
    navigate('/placeorder');
  };

  return (
    <div className="payment-container">
      <motion.form
        onSubmit={submitHandler}
        className="payment-form"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <h1 className="form-title">Choose Payment Method</h1>

        <div className="payment-options">
          {/* Option 1 */}
          <label className={`option-card ${paymentMethod === 'COD' ? 'selected' : ''}`}>
            <input
              type="radio"
              name="paymentMethod"
              value="COD"
              checked={paymentMethod === 'COD'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <div className="option-content">
              <h3>Cash on Delivery</h3>
              <p>Pay with cash or card when your order arrives.</p>
            </div>
          </label>

          {/* Option 2 */}
          <label className={`option-card ${paymentMethod === 'Card' ? 'selected' : ''}`}>
            <input
              type="radio"
              name="paymentMethod"
              value="Card"
              checked={paymentMethod === 'Card'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <div className="option-content">
              <h3>Credit / Debit Card</h3>
              <p>Secure online payment with Visa, MasterCard, etc.</p>
            </div>
          </label>

          {/* Option 3 */}
          <label className={`option-card ${paymentMethod === 'UPI' ? 'selected' : ''}`}>
            <input
              type="radio"
              name="paymentMethod"
              value="UPI"
              checked={paymentMethod === 'UPI'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <div className="option-content">
              <h3>UPI</h3>
              <p>Use UPI apps like GPay, PhonePe, Paytm for quick checkout.</p>
            </div>
          </label>
        </div>

        <motion.button
          type="submit"
          className="continue-btn"
          whileHover={{ scale: 1.05, boxShadow: '0px 8px 20px rgba(184,134,11,0.4)' }}
          whileTap={{ scale: 0.95 }}
          disabled={!paymentMethod}
        >
          Continue →
        </motion.button>
      </motion.form>
    </div>
  );
};

export default PaymentPage;
