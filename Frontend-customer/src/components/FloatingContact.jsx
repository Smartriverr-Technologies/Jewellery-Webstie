import React, { useState } from "react";
import "./FloatingContact.css";

const FloatingContact = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="floating-container">
      {/* Main Floating Button */}
      <button className="floating-button" onClick={() => setOpen(!open)}>
        ☰
      </button>

      {/* Contact Buttons */}
      {open && (
        <div className="contact-buttons">
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-btn whatsapp"
            title="Chat on WhatsApp"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/733/733585.png"
              alt="WhatsApp"
            />
          </a>

          <a href="tel:+919876543210" className="contact-btn call" title="Call Us">
            <img
              src="https://cdn-icons-png.flaticon.com/512/724/724664.png"
              alt="Phone"
            />
          </a>

          <a
            href="https://www.instagram.com/yourprofile/"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-btn instagram"
            title="Instagram"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
              alt="Instagram"
            />
          </a>
        </div>
      )}
    </div>
  );
};

export default FloatingContact;
