import React, { useState, useEffect } from 'react';
import { Sparkles, Award, Heart, Shield, Gem, Star, Users, TrendingUp } from 'lucide-react';

export default function AboutUs() {
  const [scrollY, setScrollY] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    { name: "Sarah Johnson", text: "The craftsmanship is absolutely breathtaking. My engagement ring is a masterpiece.", role: "Bride" },
    { name: "Michael Chen", text: "Outstanding quality and exceptional service. Worth every penny.", role: "Collector" },
    { name: "Emma Williams", text: "Family heirloom quality. These pieces will be treasured for generations.", role: "Customer" }
  ];

  return (
    <div className="about-container">
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .about-container {
          font-family: 'Georgia', serif;
          color: #2c2c2c;
          overflow-x: hidden;
          background: #fff;
        }

        .hero-section {
          position: relative;
          height: 100vh;
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
          background: url('https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1600&q=80') center/cover;
          filter: brightness(0.4);
        }

        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(26, 26, 46, 0.8) 0%, rgba(22, 33, 62, 0.6) 100%);
        }

        .hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          color: white;
          padding: 0 20px;
          max-width: 900px;
        }

        .hero-badge {
          display: inline-block;
          padding: 8px 24px;
          background: rgba(212, 175, 55, 0.2);
          border: 1px solid rgba(212, 175, 55, 0.4);
          border-radius: 30px;
          font-size: 0.9rem;
          letter-spacing: 2px;
          margin-bottom: 30px;
          animation: fadeIn 1s ease-out;
        }

        .hero-title {
          font-size: 5rem;
          font-weight: 300;
          letter-spacing: 8px;
          margin-bottom: 25px;
          animation: fadeInUp 1s ease-out 0.2s backwards;
          line-height: 1.2;
        }

        .hero-subtitle {
          font-size: 1.4rem;
          font-weight: 300;
          letter-spacing: 3px;
          opacity: 0.95;
          margin-bottom: 40px;
          animation: fadeInUp 1s ease-out 0.4s backwards;
        }

        .hero-divider {
          width: 100px;
          height: 1px;
          background: linear-gradient(90deg, transparent, #d4af37, transparent);
          margin: 0 auto 40px;
          animation: fadeIn 1s ease-out 0.6s backwards;
        }

        .scroll-indicator {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 3;
          animation: bounce 2s infinite;
        }

        .scroll-indicator::before {
          content: '';
          display: block;
          width: 24px;
          height: 40px;
          border: 2px solid rgba(255, 255, 255, 0.5);
          border-radius: 20px;
          position: relative;
        }

        .scroll-indicator::after {
          content: '';
          position: absolute;
          top: 8px;
          left: 50%;
          transform: translateX(-50%);
          width: 4px;
          height: 8px;
          background: rgba(255, 255, 255, 0.8);
          border-radius: 2px;
          animation: scrollDot 2s infinite;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(-10px); }
        }

        @keyframes scrollDot {
          0%, 100% { opacity: 1; top: 8px; }
          50% { opacity: 0.3; top: 20px; }
        }

        .intro-section {
          position: relative;
          padding: 150px 40px;
          background: linear-gradient(180deg, #fff 0%, #f9f9f9 100%);
        }

        .intro-container {
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 100px;
          align-items: center;
        }

        .intro-images {
          position: relative;
          height: 600px;
        }

        .intro-image-main {
          position: absolute;
          width: 70%;
          height: 75%;
          top: 0;
          right: 0;
          background: url('https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=800&q=80') center/cover;
          border-radius: 8px;
          box-shadow: 0 30px 80px rgba(0,0,0,0.2);
          transition: transform 0.5s ease;
        }

        .intro-image-secondary {
          position: absolute;
          width: 50%;
          height: 50%;
          bottom: 0;
          left: 0;
          background: url('https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80') center/cover;
          border-radius: 8px;
          box-shadow: 0 30px 80px rgba(0,0,0,0.15);
          border: 8px solid white;
          transition: transform 0.5s ease;
        }

        .intro-content h2 {
          font-size: 3.2rem;
          font-weight: 300;
          margin-bottom: 30px;
          color: #1a1a2e;
          line-height: 1.3;
        }

        .intro-content .highlight {
          color: #d4af37;
          font-style: italic;
        }

        .intro-content p {
          font-size: 1.15rem;
          line-height: 2;
          color: #555;
          margin-bottom: 25px;
        }

        .stats-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
          margin-top: 50px;
        }

        .stat-item {
          text-align: center;
          padding: 20px;
        }

        .stat-number {
          font-size: 3rem;
          font-weight: 300;
          color: #d4af37;
          display: block;
          margin-bottom: 10px;
        }

        .stat-label {
          font-size: 0.95rem;
          color: #666;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .values-section {
          background: #1a1a2e;
          padding: 150px 40px;
          position: relative;
          overflow: hidden;
        }

        .values-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=1600&q=80') center/cover;
          opacity: 0.05;
        }

        .values-container {
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .values-header {
          text-align: center;
          margin-bottom: 100px;
          color: white;
        }

        .values-header h2 {
          font-size: 3.2rem;
          font-weight: 300;
          margin-bottom: 20px;
          letter-spacing: 3px;
        }

        .values-header p {
          font-size: 1.2rem;
          opacity: 0.8;
        }

        .values-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 40px;
        }

        .value-card {
          text-align: center;
          padding: 50px 30px;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          transition: all 0.4s ease;
          position: relative;
          overflow: hidden;
        }

        .value-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #d4af37, #f4e4c1);
          transform: scaleX(0);
          transition: transform 0.4s ease;
        }

        .value-card:hover {
          transform: translateY(-15px);
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(212, 175, 55, 0.3);
        }

        .value-card:hover::before {
          transform: scaleX(1);
        }

        .value-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 90px;
          height: 90px;
          background: linear-gradient(135deg, #d4af37 0%, #f4e4c1 100%);
          border-radius: 50%;
          margin-bottom: 30px;
          transition: transform 0.4s ease;
        }

        .value-card:hover .value-icon {
          transform: rotateY(360deg);
        }

        .value-card h3 {
          font-size: 1.4rem;
          font-weight: 400;
          margin-bottom: 20px;
          color: white;
        }

        .value-card p {
          font-size: 1rem;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.7);
        }

        .craftsmanship-section {
          padding: 150px 40px;
          background: #fff;
        }

        .craftsmanship-container {
          max-width: 1400px;
          margin: 0 auto;
        }

        .craftsmanship-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 100px;
          align-items: center;
          margin-bottom: 100px;
        }

        .craftsmanship-content h2 {
          font-size: 3.2rem;
          font-weight: 300;
          margin-bottom: 30px;
          color: #1a1a2e;
        }

        .craftsmanship-content p {
          font-size: 1.15rem;
          line-height: 2;
          color: #555;
          margin-bottom: 25px;
        }

        .feature-list {
          margin-top: 40px;
        }

        .feature-item {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
          padding: 15px;
          background: #f9f9f9;
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .feature-item:hover {
          background: #f4e4c1;
          transform: translateX(10px);
        }

        .feature-icon {
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #d4af37 0%, #f4e4c1 100%);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 20px;
          flex-shrink: 0;
        }

        .feature-text {
          font-size: 1.05rem;
          color: #333;
        }

        .craftsmanship-images {
          position: relative;
          height: 600px;
        }

        .craft-image-1 {
          position: absolute;
          width: 60%;
          height: 70%;
          top: 0;
          left: 0;
          background: url('https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80') center/cover;
          border-radius: 8px;
          box-shadow: 0 30px 80px rgba(0,0,0,0.2);
        }

        .craft-image-2 {
          position: absolute;
          width: 55%;
          height: 55%;
          bottom: 0;
          right: 0;
          background: url('https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80') center/cover;
          border-radius: 8px;
          box-shadow: 0 30px 80px rgba(0,0,0,0.15);
          border: 8px solid white;
        }

        .testimonials-section {
          background: linear-gradient(135deg, #f9f9f9 0%, #fff 100%);
          padding: 150px 40px;
        }

        .testimonials-container {
          max-width: 1000px;
          margin: 0 auto;
          text-align: center;
        }

        .testimonials-header h2 {
          font-size: 3.2rem;
          font-weight: 300;
          margin-bottom: 20px;
          color: #1a1a2e;
        }

        .testimonials-header p {
          font-size: 1.2rem;
          color: #666;
          margin-bottom: 80px;
        }

        .testimonial-slider {
          position: relative;
          height: 300px;
          overflow: hidden;
        }

        .testimonial-card {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          padding: 60px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.1);
          opacity: 0;
          transition: opacity 0.5s ease;
        }

        .testimonial-card.active {
          opacity: 1;
        }

        .testimonial-text {
          font-size: 1.4rem;
          font-style: italic;
          line-height: 1.8;
          color: #333;
          margin-bottom: 30px;
        }

        .testimonial-author {
          font-size: 1.1rem;
          font-weight: 600;
          color: #1a1a2e;
          margin-bottom: 5px;
        }

        .testimonial-role {
          font-size: 0.95rem;
          color: #d4af37;
          letter-spacing: 1px;
        }

        .testimonial-dots {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-top: 40px;
        }

        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #ddd;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .dot.active {
          background: #d4af37;
          width: 30px;
          border-radius: 6px;
        }

        .gallery-section {
          padding: 150px 40px;
          background: #1a1a2e;
        }

        .gallery-container {
          max-width: 1400px;
          margin: 0 auto;
        }

        .gallery-header {
          text-align: center;
          margin-bottom: 80px;
          color: white;
        }

        .gallery-header h2 {
          font-size: 3.2rem;
          font-weight: 300;
          margin-bottom: 20px;
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        .gallery-item {
          position: relative;
          height: 300px;
          border-radius: 8px;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.4s ease;
        }

        .gallery-item:hover {
          transform: scale(1.05);
          z-index: 10;
        }

        .gallery-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .gallery-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(180deg, transparent 0%, rgba(26, 26, 46, 0.8) 100%);
          opacity: 0;
          transition: opacity 0.4s ease;
          display: flex;
          align-items: flex-end;
          padding: 20px;
        }

        .gallery-item:hover .gallery-overlay {
          opacity: 1;
        }

        .gallery-text {
          color: white;
          font-size: 1.1rem;
          letter-spacing: 1px;
        }

        .cta-section {
          background: url('https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1600&q=80') center/cover;
          padding: 200px 40px;
          position: relative;
          text-align: center;
        }

        .cta-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(26, 26, 46, 0.95) 0%, rgba(22, 33, 62, 0.9) 100%);
        }

        .cta-content {
          position: relative;
          z-index: 2;
          color: white;
          max-width: 800px;
          margin: 0 auto;
        }

        .cta-content h2 {
          font-size: 3.5rem;
          font-weight: 300;
          margin-bottom: 30px;
          letter-spacing: 3px;
        }

        .cta-content p {
          font-size: 1.3rem;
          margin-bottom: 50px;
          opacity: 0.9;
          line-height: 1.8;
        }

        .cta-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
        }

        .cta-button {
          display: inline-block;
          padding: 20px 50px;
          background: linear-gradient(135deg, #d4af37 0%, #f4e4c1 100%);
          color: #1a1a2e;
          text-decoration: none;
          border-radius: 50px;
          font-size: 1.1rem;
          font-weight: 600;
          letter-spacing: 1px;
          transition: all 0.3s ease;
          cursor: pointer;
          border: none;
        }

        .cta-button:hover {
          transform: scale(1.05);
          box-shadow: 0 15px 40px rgba(212, 175, 55, 0.5);
        }

        .cta-button-outline {
          background: transparent;
          color: white;
          border: 2px solid rgba(255, 255, 255, 0.3);
        }

        .cta-button-outline:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.5);
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
          .values-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .gallery-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
            letter-spacing: 4px;
          }

          .hero-subtitle {
            font-size: 1rem;
          }

          .intro-container,
          .craftsmanship-grid {
            grid-template-columns: 1fr;
            gap: 60px;
          }

          .values-grid {
            grid-template-columns: 1fr;
          }

          .stats-row {
            grid-template-columns: 1fr;
          }

          .gallery-grid {
            grid-template-columns: 1fr;
          }

          .cta-buttons {
            flex-direction: column;
            align-items: center;
          }

          .intro-content h2,
          .craftsmanship-content h2,
          .values-header h2,
          .testimonials-header h2,
          .gallery-header h2,
          .cta-content h2 {
            font-size: 2rem;
          }
        }
      `}</style>

      <section className="hero-section">
        <div className="hero-background"></div>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-badge">SINCE 1995</div>
          <h1 className="hero-title">WHERE ARTISTRY<br/>MEETS ELEGANCE</h1>
          <div className="hero-divider"></div>
          <p className="hero-subtitle">Crafting Timeless Treasures for Life's Most Precious Moments</p>
        </div>
        <div className="scroll-indicator"></div>
      </section>

      <section className="intro-section">
        <div className="intro-container">
          <div className="intro-images fade-in-section" style={{
            opacity: scrollY > 200 ? 1 : 0,
            transform: scrollY > 200 ? 'translateY(0)' : 'translateY(50px)'
          }}>
            <div className="intro-image-main"></div>
            <div className="intro-image-secondary"></div>
          </div>
          <div className="intro-content fade-in-section" style={{
            opacity: scrollY > 200 ? 1 : 0,
            transform: scrollY > 200 ? 'translateY(0)' : 'translateY(50px)'
          }}>
            <h2>A Journey of <span className="highlight">Excellence</span></h2>
            <p>
              For nearly three decades, we have been the guardians of an age-old tradition, 
              transforming precious metals and gemstones into works of art that tell your unique story.
            </p>
            <p>
              Every piece we create is a testament to our unwavering commitment to perfection. 
              From the first sketch to the final polish, our master artisans pour their heart, 
              soul, and decades of expertise into each creation.
            </p>
            <div className="stats-row">
              <div className="stat-item">
                <span className="stat-number">29+</span>
                <span className="stat-label">Years of Legacy</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">50K+</span>
                <span className="stat-label">Happy Customers</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">100%</span>
                <span className="stat-label">Handcrafted</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="values-section">
        <div className="values-container">
          <div className="values-header">
            <h2>The Pillars of Our Craft</h2>
            <p>Values that define every piece we create</p>
          </div>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">
                <Gem size={40} color="#1a1a2e" />
              </div>
              <h3>Premium Quality</h3>
              <p>
                Only the finest diamonds, gemstones, and precious metals make it into our 
                collections, sourced from trusted suppliers worldwide.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <Heart size={40} color="#1a1a2e" />
              </div>
              <h3>Customer First</h3>
              <p>
                Your dreams and satisfaction drive everything we do. We're here to bring 
                your vision to life with personalized service.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <Award size={40} color="#1a1a2e" />
              </div>
              <h3>Timeless Design</h3>
              <p>
                Our designs transcend trends, creating pieces that remain stunning and 
                relevant for generations to come.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <Shield size={40} color="#1a1a2e" />
              </div>
              <h3>Ethical Sourcing</h3>
              <p>
                We are committed to responsible practices, ensuring every piece is crafted 
                with integrity and respect for our planet.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <Sparkles size={40} color="#1a1a2e" />
              </div>
              <h3>Master Artisans</h3>
              <p>
                Our team of skilled craftsmen brings decades of experience and passion to 
                every single piece they create.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <Star size={40} color="#1a1a2e" />
              </div>
              <h3>Lifetime Promise</h3>
              <p>
                We stand behind our work with comprehensive warranties and lifetime care 
                for every piece that leaves our workshop.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <Users size={40} color="#1a1a2e" />
              </div>
              <h3>Family Legacy</h3>
              <p>
                As a family-owned business, we understand the importance of creating 
                treasures that become cherished heirlooms.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <TrendingUp size={40} color="#1a1a2e" />
              </div>
              <h3>Innovation</h3>
              <p>
                We blend traditional techniques with cutting-edge technology to push the 
                boundaries of jewelry design.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="craftsmanship-section">
        <div className="craftsmanship-container">
          <div className="craftsmanship-grid">
            <div className="craftsmanship-content fade-in-section" style={{
              opacity: scrollY > 1500 ? 1 : 0,
              transform: scrollY > 1500 ? 'translateY(0)' : 'translateY(50px)'
            }}>
              <h2>The Art of Perfection</h2>
              <p>
                Behind every shimmer and sparkle lies hundreds of hours of meticulous work. 
                Our master craftsmen have dedicated their lives to perfecting techniques 
                passed down through generations.
              </p>
              <p>
                From hand-selecting each stone for its unique brilliance to the final polish 
                that brings out its inner fire, every step is a labor of love and precision.
              </p>
              <div className="feature-list">
                <div className="feature-item">
                  <div className="feature-icon">
                    <Gem size={24} color="#1a1a2e" />
                  </div>
                  <span className="feature-text">Hand-selected precious stones</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">
                    <Award size={24} color="#1a1a2e" />
                  </div>
                  <span className="feature-text">Master artisan craftsmanship</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">
                    <Shield size={24} color="#1a1a2e" />
                  </div>
                  <span className="feature-text">Quality assurance at every step</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">
                    <Star size={24} color="#1a1a2e" />
                  </div>
                  <span className="feature-text">Lifetime warranty & support</span>
                </div>
              </div>
            </div>
            <div className="craftsmanship-images fade-in-section" style={{
              opacity: scrollY > 1500 ? 1 : 0,
              transform: scrollY > 1500 ? 'translateY(0)' : 'translateY(50px)'
            }}>
              <div className="craft-image-1"></div>
              <div className="craft-image-2"></div>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="testimonials-section">
        <div className="testimonials-container">
          <div className="testimonials-header">
            <h2>Words from Our Family</h2>
            <p>Stories from those who wear our creations</p>
          </div>
          <div className="testimonial-slider">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className={`testimonial-card ${index === activeTestimonial ? 'active' : ''}`}
              >
                <div className="testimonial-text">"{testimonial.text}"</div>
                <div className="testimonial-author">{testimonial.name}</div>
                <div className="testimonial-role">{testimonial.role}</div>
              </div>
            ))}
          </div>
          <div className="testimonial-dots">
            {testimonials.map((_, index) => (
              <div 
                key={index}
                className={`dot ${index === activeTestimonial ? 'active' : ''}`}
                onClick={() => setActiveTestimonial(index)}
              ></div>
            ))}
          </div>
        </div>
      </section> */}

      <section className="gallery-section">
        <div className="gallery-container">
          <div className="gallery-header">
            <h2>Our Masterpieces</h2>
          </div>
          <div className="gallery-grid">
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80" alt="Ring" />
              <div className="gallery-overlay">
                <span className="gallery-text">Engagement Rings</span>
              </div>
            </div>
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80" alt="Necklace" />
              <div className="gallery-overlay">
                <span className="gallery-text">Necklaces</span>
              </div>
            </div>
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80" alt="Earrings" />
              <div className="gallery-overlay">
                <span className="gallery-text">Earrings</span>
              </div>
            </div>
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80" alt="Bracelet" />
              <div className="gallery-overlay">
                <span className="gallery-text">Bracelets</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-overlay"></div>
        <div className="cta-content">
          <h2>Begin Your Story</h2>
          <p>
            Let us create something extraordinary for you. Whether it's an engagement ring, 
            a special gift, or a custom design, we're here to bring your vision to life.
          </p>
          <div className="cta-buttons">
            <button className="cta-button">Explore Collection</button>
            <button className="cta-button cta-button-outline">Book Consultation</button>
          </div>
        </div>
      </section>
    </div>
  );
}