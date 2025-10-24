import React from "react";
import "./ShippingAndDelivery.css";

const ShippingAndDelivery = () => {
  return (
    <div className="shipping-container">
      {/* Header Section */}
      <div className="shipping-header">
        <img
          src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1920&q=80"
          alt="Jewellery Shipping"
          className="shipping-banner"
        />
        <div className="shipping-overlay">
          <h1>Shipping & Delivery</h1>
          <p>Elegant. Secure. On Time.</p>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="shipping-content">
        <section className="shipping-info">
          <h2>Shipping Time</h2>
          <p>
            All jewellery orders are processed within <strong>5 to 10 business days</strong> after your payment
            confirmation. We work diligently to ensure your order reaches you safely and in perfect condition.
          </p>
          <img
            src="https://images.unsplash.com/photo-1611078489935-0cb964de46d6?auto=format&fit=crop&w=1200&q=80"
            alt="Shipping Process"
          />
        </section>

        <section className="delivery-info">
          <h2>Delivery Assurance</h2>
          <p>
            Our trusted logistics partners ensure smooth and reliable delivery. Once shipped, you’ll receive an
            email with a <strong>tracking link</strong> so you can monitor your order in real time.
          </p>
          <img
            src="https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=1200&q=80"
            alt="Delivery Service"
          />
        </section>

        <section className="policy-info">
          <h2>Exchange Policy</h2>
          <p>
            We offer <strong>exchange only</strong> on all orders. Refunds are not available. If you receive a
            damaged or incorrect item, please contact our support team within <strong>48 hours</strong> of
            delivery for an exchange assistance.
          </p>
          <img
            src="https://images.unsplash.com/photo-1611605698335-8b1569810432?auto=format&fit=crop&w=1200&q=80"
            alt="Exchange Policy"
          />
        </section>
      </div>

      {/* Footer CTA */}
      <div className="shipping-footer">
        <h3>Need Help?</h3>
        <p>
          Our support team is available to assist you with your shipping and delivery queries.
        </p>
        <a href="/contact" className="contact-btn">
          Contact Support
        </a>
      </div>
    </div>
  );
};

export default ShippingAndDelivery;
