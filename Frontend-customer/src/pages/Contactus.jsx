import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Calendar, Instagram, Facebook, Twitter } from 'lucide-react';

export default function ContactPage() {
  const [scrollY, setScrollY] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for contacting us! We will get back to you soon.');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="contact-container">
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .contact-container {
          font-family: 'Georgia', serif;
          color: #2c2c2c;
          overflow-x: hidden;
          background: #fff;
        }

        .hero-section {
          position: relative;
          height: 60vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .hero-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: url('https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=1600&q=80') center/cover;
          filter: brightness(0.5);
        }

        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(26, 26, 46, 0.85) 0%, rgba(22, 33, 62, 0.75) 100%);
        }

        .hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          color: white;
          padding: 0 20px;
          max-width: 800px;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 10px 28px;
          background: rgba(212, 175, 55, 0.15);
          border: 1px solid rgba(212, 175, 55, 0.3);
          border-radius: 30px;
          font-size: 0.9rem;
          letter-spacing: 2px;
          margin-bottom: 25px;
          animation: fadeIn 1s ease-out;
        }

        .hero-title {
          font-size: 4rem;
          font-weight: 300;
          letter-spacing: 6px;
          margin-bottom: 20px;
          animation: fadeInUp 1s ease-out 0.2s backwards;
        }

        .hero-subtitle {
          font-size: 1.3rem;
          font-weight: 300;
          letter-spacing: 2px;
          opacity: 0.9;
          animation: fadeInUp 1s ease-out 0.4s backwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .contact-info-section {
          padding: 100px 40px;
          background: linear-gradient(180deg, #fff 0%, #f9f9f9 100%);
        }

        .contact-info-container {
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 40px;
        }

        .info-card {
          background: white;
          padding: 45px 35px;
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.08);
          text-align: center;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .info-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #d4af37, #f4e4c1);
          transform: scaleX(0);
          transition: transform 0.4s ease;
        }

        .info-card:hover {
          transform: translateY(-15px);
          box-shadow: 0 20px 60px rgba(212, 175, 55, 0.2);
        }

        .info-card:hover::before {
          transform: scaleX(1);
        }

        .info-icon-wrapper {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 85px;
          height: 85px;
          background: linear-gradient(135deg, #d4af37 0%, #f4e4c1 100%);
          border-radius: 50%;
          margin-bottom: 25px;
          transition: transform 0.4s ease;
        }

        .info-card:hover .info-icon-wrapper {
          transform: rotateY(360deg);
        }

        .info-card h3 {
          font-size: 1.3rem;
          font-weight: 500;
          color: #1a1a2e;
          margin-bottom: 15px;
          letter-spacing: 1px;
        }

        .info-card p {
          font-size: 1rem;
          color: #666;
          line-height: 1.8;
          margin-bottom: 8px;
        }

        .info-card a {
          color: #d4af37;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .info-card a:hover {
          color: #b8941f;
        }

        .main-content-section {
          padding: 100px 40px;
          background: #fff;
        }

        .main-content-container {
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 80px;
          align-items: start;
        }

        .form-section {
          background: white;
          padding: 60px;
          border-radius: 16px;
          box-shadow: 0 20px 80px rgba(0,0,0,0.1);
        }

        .form-header {
          margin-bottom: 45px;
        }

        .form-header h2 {
          font-size: 2.8rem;
          font-weight: 300;
          color: #1a1a2e;
          margin-bottom: 15px;
        }

        .form-header p {
          font-size: 1.1rem;
          color: #666;
          line-height: 1.7;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 25px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 25px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group label {
          font-size: 0.95rem;
          color: #333;
          margin-bottom: 10px;
          font-weight: 500;
          letter-spacing: 0.5px;
        }

        .form-group input,
        .form-group textarea,
        .form-group select {
          padding: 16px 20px;
          border: 2px solid #e8e8e8;
          border-radius: 8px;
          font-size: 1rem;
          font-family: 'Georgia', serif;
          transition: all 0.3s ease;
          background: #fafafa;
        }

        .form-group input:focus,
        .form-group textarea:focus,
        .form-group select:focus {
          outline: none;
          border-color: #d4af37;
          background: white;
          box-shadow: 0 0 0 4px rgba(212, 175, 55, 0.1);
        }

        .form-group textarea {
          resize: vertical;
          min-height: 150px;
        }

        .submit-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 18px 50px;
          background: linear-gradient(135deg, #d4af37 0%, #f4e4c1 100%);
          color: #1a1a2e;
          border: none;
          border-radius: 50px;
          font-size: 1.1rem;
          font-weight: 600;
          letter-spacing: 1px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'Georgia', serif;
          margin-top: 10px;
        }

        .submit-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(212, 175, 55, 0.4);
        }

        .image-sidebar {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .sidebar-image-large {
          width: 100%;
          height: 450px;
          background: url('https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80') center/cover;
          border-radius: 12px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.15);
          position: relative;
          overflow: hidden;
        }

        .sidebar-image-large::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(180deg, transparent 0%, rgba(26, 26, 46, 0.3) 100%);
        }

        .sidebar-content {
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
          padding: 45px;
          border-radius: 12px;
          color: white;
        }

        .sidebar-content h3 {
          font-size: 1.8rem;
          font-weight: 300;
          margin-bottom: 20px;
          letter-spacing: 2px;
        }

        .sidebar-content p {
          font-size: 1.05rem;
          line-height: 1.8;
          opacity: 0.9;
          margin-bottom: 30px;
        }

        .consultation-button {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 35px;
          background: transparent;
          color: white;
          border: 2px solid rgba(212, 175, 55, 0.5);
          border-radius: 50px;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          font-family: 'Georgia', serif;
        }

        .consultation-button:hover {
          background: rgba(212, 175, 55, 0.1);
          border-color: #d4af37;
        }

        .sidebar-image-small {
          width: 100%;
          height: 280px;
          background: url('https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80') center/cover;
          border-radius: 12px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.15);
        }

        .map-section {
          padding: 100px 40px;
          background: #f9f9f9;
        }

        .map-container {
          max-width: 1400px;
          margin: 0 auto;
        }

        .map-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .map-header h2 {
          font-size: 2.8rem;
          font-weight: 300;
          color: #1a1a2e;
          margin-bottom: 15px;
        }

        .map-header p {
          font-size: 1.1rem;
          color: #666;
        }

        .map-wrapper {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }

        .map-image {
          width: 100%;
          height: 500px;
          background: url('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1000&q=80') center/cover;
          border-radius: 12px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.15);
          position: relative;
        }

        .map-overlay {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: rgba(26, 26, 46, 0.85);
          padding: 30px 40px;
          border-radius: 12px;
          color: white;
          text-align: center;
          backdrop-filter: blur(10px);
        }

        .map-overlay h4 {
          font-size: 1.3rem;
          font-weight: 400;
          margin-bottom: 10px;
          color: #d4af37;
        }

        .map-overlay p {
          font-size: 1rem;
          opacity: 0.9;
        }

        .visit-info {
          background: white;
          padding: 50px;
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.08);
        }

        .visit-info h3 {
          font-size: 2rem;
          font-weight: 300;
          color: #1a1a2e;
          margin-bottom: 30px;
        }

        .hours-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .hours-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 18px 0;
          border-bottom: 1px solid #e8e8e8;
        }

        .hours-item:last-child {
          border-bottom: none;
        }

        .day {
          font-size: 1.05rem;
          color: #333;
          font-weight: 500;
        }

        .time {
          font-size: 1.05rem;
          color: #666;
        }

        .time.closed {
          color: #d4af37;
        }

        .social-section {
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
          padding: 100px 40px;
          text-align: center;
          color: white;
        }

        .social-container {
          max-width: 900px;
          margin: 0 auto;
        }

        .social-header h2 {
          font-size: 2.8rem;
          font-weight: 300;
          margin-bottom: 20px;
          letter-spacing: 2px;
        }

        .social-header p {
          font-size: 1.2rem;
          opacity: 0.9;
          margin-bottom: 50px;
        }

        .social-icons {
          display: flex;
          justify-content: center;
          gap: 30px;
          margin-bottom: 50px;
        }

        .social-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 70px;
          height: 70px;
          background: rgba(255, 255, 255, 0.1);
          border: 2px solid rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .social-icon:hover {
          background: rgba(212, 175, 55, 0.2);
          border-color: #d4af37;
          transform: translateY(-8px);
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-top: 40px;
        }

        .gallery-item {
          height: 200px;
          border-radius: 8px;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.3s ease;
        }

        .gallery-item:hover {
          transform: scale(1.05);
        }

        .gallery-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .fade-in-section {
          opacity: 0;
          transform: translateY(50px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }

        .fade-in-section.visible {
          opacity: 1;
          transform: translateY(0);
        }

        @media (max-width: 1200px) {
          .contact-info-container {
            grid-template-columns: repeat(2, 1fr);
          }

          .main-content-container {
            grid-template-columns: 1fr;
          }

          .map-wrapper {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
            letter-spacing: 3px;
          }

          .contact-info-container {
            grid-template-columns: 1fr;
          }

          .form-section {
            padding: 40px 30px;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .gallery-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .social-icons {
            gap: 20px;
          }

          .social-icon {
            width: 60px;
            height: 60px;
          }
        }
      `}</style>

      <section className="hero-section">
        <div className="hero-background"></div>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-badge">
            <MessageCircle size={16} />
            LET'S CONNECT
          </div>
          <h1 className="hero-title">GET IN TOUCH</h1>
          <p className="hero-subtitle">We're here to help bring your vision to life</p>
        </div>
      </section>

      <section className="contact-info-section">
        <div className="contact-info-container">
          <div 
            className="info-card"
            onMouseEnter={() => setHoveredCard(0)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="info-icon-wrapper">
              <Phone size={36} color="#1a1a2e" />
            </div>
            <h3>Call Us</h3>
            <p>Mon - Sat: 10 AM - 7 PM</p>
            <p><a href="tel:+1234567890">+1 (234) 567-890</a></p>
            <p><a href="tel:+1234567891">+1 (234) 567-891</a></p>
          </div>

          <div 
            className="info-card"
            onMouseEnter={() => setHoveredCard(1)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="info-icon-wrapper">
              <Mail size={36} color="#1a1a2e" />
            </div>
            <h3>Email Us</h3>
            <p>We respond within 24 hours</p>
            <p><a href="mailto:info@jewelry.com">info@jewelry.com</a></p>
            <p><a href="mailto:support@jewelry.com">support@jewelry.com</a></p>
          </div>

          <div 
            className="info-card"
            onMouseEnter={() => setHoveredCard(2)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="info-icon-wrapper">
              <MapPin size={36} color="#1a1a2e" />
            </div>
            <h3>Visit Our Showroom</h3>
            <p>123 Luxury Avenue</p>
            <p>New York, NY 10001</p>
            <p>United States</p>
          </div>

          <div 
            className="info-card"
            onMouseEnter={() => setHoveredCard(3)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="info-icon-wrapper">
              <Calendar size={36} color="#1a1a2e" />
            </div>
            <h3>Book Appointment</h3>
            <p>Private consultation</p>
            <p>One-on-one with expert</p>
            <p><a href="#book">Schedule Now</a></p>
          </div>
        </div>
      </section>

      <section className="main-content-section">
        <div className="main-content-container">
          <div className="form-section fade-in-section" style={{
            opacity: scrollY > 300 ? 1 : 0,
            transform: scrollY > 300 ? 'translateY(0)' : 'translateY(50px)'
          }}>
            <div className="form-header">
              <h2>Send Us a Message</h2>
              <p>Have a question or ready to start your custom design journey? Fill out the form below and our team will get back to you promptly.</p>
            </div>
            <div className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                  />
                </div>
                <div className="form-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (234) 567-890"
                  />
                </div>
                <div className="form-group">
                  <label>Subject *</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                  >
                    <option value="">Select a subject</option>
                    <option value="custom">Custom Design Inquiry</option>
                    <option value="purchase">Purchase Question</option>
                    <option value="repair">Repair & Maintenance</option>
                    <option value="appointment">Book Appointment</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Your Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your vision..."
                ></textarea>
              </div>
              <button onClick={handleSubmit} className="submit-button">
                <Send size={20} />
                Send Message
              </button>
            </div>
          </div>

          <div className="image-sidebar fade-in-section" style={{
            opacity: scrollY > 300 ? 1 : 0,
            transform: scrollY > 300 ? 'translateY(0)' : 'translateY(50px)'
          }}>
            <div className="sidebar-image-large"></div>
            <div className="sidebar-content">
              <h3>Private Consultation</h3>
              <p>Experience personalized service in our exclusive showroom. Book a private consultation with our master jewelers to discuss your custom design or explore our collections.</p>
              <button className="consultation-button">
                <Calendar size={18} />
                Book Now
              </button>
            </div>
            <div className="sidebar-image-small"></div>
          </div>
        </div>
      </section>

      <section className="map-section">
        <div className="map-container">
          <div className="map-header">
            <h2>Visit Our Showroom</h2>
            <p>Experience our collections in person at our flagship location</p>
          </div>
          <div className="map-wrapper">
            <div className="map-image">
              <div className="map-overlay">
                <h4>Flagship Store</h4>
                <p>123 Luxury Avenue, New York</p>
              </div>
            </div>
            <div className="visit-info">
              <h3>Opening Hours</h3>
              <div className="hours-list">
                <div className="hours-item">
                  <span className="day">Monday</span>
                  <span className="time">10:00 AM - 7:00 PM</span>
                </div>
                <div className="hours-item">
                  <span className="day">Tuesday</span>
                  <span className="time">10:00 AM - 7:00 PM</span>
                </div>
                <div className="hours-item">
                  <span className="day">Wednesday</span>
                  <span className="time">10:00 AM - 7:00 PM</span>
                </div>
                <div className="hours-item">
                  <span className="day">Thursday</span>
                  <span className="time">10:00 AM - 8:00 PM</span>
                </div>
                <div className="hours-item">
                  <span className="day">Friday</span>
                  <span className="time">10:00 AM - 8:00 PM</span>
                </div>
                <div className="hours-item">
                  <span className="day">Saturday</span>
                  <span className="time">11:00 AM - 6:00 PM</span>
                </div>
                <div className="hours-item">
                  <span className="day">Sunday</span>
                  <span className="time closed">Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="social-section">
        <div className="social-container">
          <div className="social-header">
            <h2>Follow Our Journey</h2>
            <p>Join our community and stay inspired with the latest designs and stories</p>
          </div>
          <div className="social-icons">
            <div className="social-icon">
              <Instagram size={28} color="white" />
            </div>
            <div className="social-icon">
              <Facebook size={28} color="white" />
            </div>
            <div className="social-icon">
              <Twitter size={28} color="white" />
            </div>
          </div>
          <div className="gallery-grid">
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&q=80" alt="Jewelry" />
            </div>
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80" alt="Jewelry" />
            </div>
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&q=80" alt="Jewelry" />
            </div>
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&q=80" alt="Jewelry" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}