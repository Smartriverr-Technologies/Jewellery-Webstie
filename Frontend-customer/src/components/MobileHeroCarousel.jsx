// import React, { useState, useEffect, useRef } from 'react';

// export default function MobileHeroCarousel() {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [touchStart, setTouchStart] = useState(0);
//   const [touchEnd, setTouchEnd] = useState(0);
//   const carouselRef = useRef(null);

// //   const slides = [
// //     {
// //       id: 1,
// //       image: 'https://ibb.co/YBc6143q',
// //     //   <a href="https://ibb.co/YBc6143q"><img src="https://i.ibb.co/4R8cXw75/1600x900pixel-1.jpg" alt="1600x900pixel-1" border="0"></a>
// //       badge: 'NEW ARRIVAL',
// //       title: 'Stunning Every Ear',
// //       subtitle: 'Explore our exquisite earring collection',
// //       buttonText: 'SHOP NOW',
// //       bgColor: '#5a7a8c'
// //     },
// //     {
// //       id: 2,
// //       image: 'https://i.ibb.co/4R8cXw75/1600x900pixel-1.jpg',
// //       badge: 'BESTSELLER',
// //       title: 'Luxury Necklaces',
// //       subtitle: 'Timeless pieces for every occasion',
// //       buttonText: 'SHOP NOW',
// //       bgColor: '#8b7355'
// //     },
// //     {
// //       id: 3,
// //       image: 'https://ibb.co/YBc6143q',
// //       badge: 'TRENDING',
// //       title: 'Elegant Rings',
// //       subtitle: 'Discover your perfect match',
// //       buttonText: 'SHOP NOW',
// //       bgColor: '#6b5b7a'
// //     }
// //   ];


//     const slides = [
//   {
//     id: 1,
//     image: 'https://i.ibb.co/4R8cXw75/1600x900pixel-1.jpg', // correct direct link
//     badge: 'NEW ARRIVAL',
//     title: 'Stunning Every Ear',
//     subtitle: 'Explore our exquisite earring collection',
//     buttonText: 'SHOP NOW',
//     bgColor: '#5a7a8c'
//   },
//   {
//     id: 2,
//     image: 'https://i.ibb.co/4R8cXw75/1600x900pixel-1.jpg',
//     badge: 'BESTSELLER',
//     title: 'Luxury Necklaces',
//     subtitle: 'Timeless pieces for every occasion',
//     buttonText: 'SHOP NOW',
//     bgColor: '#8b7355'
//   },
//   {
//     id: 3,
//     image: 'https://i.ibb.co/4R8cXw75/1600x900pixel-1.jpg', // correct direct link
//     badge: 'TRENDING',
//     title: 'Elegant Rings',
//     subtitle: 'Discover your perfect match',
//     buttonText: 'SHOP NOW',
//     bgColor: '#6b5b7a'
//   }
// ];

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % slides.length);
//     }, 4000);

//     return () => clearInterval(timer);
//   }, [slides.length]);

//   const handleTouchStart = (e) => {
//     setTouchStart(e.targetTouches[0].clientX);
//   };

//   const handleTouchMove = (e) => {
//     setTouchEnd(e.targetTouches[0].clientX);
//   };

//   const handleTouchEnd = () => {
//     if (!touchStart || !touchEnd) return;
    
//     const distance = touchStart - touchEnd;
//     const isLeftSwipe = distance > 50;
//     const isRightSwipe = distance < -50;

//     if (isLeftSwipe) {
//       setCurrentSlide((prev) => (prev + 1) % slides.length);
//     }
//     if (isRightSwipe) {
//       setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
//     }

//     setTouchStart(0);
//     setTouchEnd(0);
//   };

//   const goToSlide = (index) => {
//     setCurrentSlide(index);
//   };

//   return (
//     <div className="mobile-hero-carousel">
//       <style>{`
//         .mobile-hero-carousel {
//           display: block;
//           position: relative;
//           width: 100%;
//           height: 500px;
//           overflow: hidden;
//           background: #f8f8f8;
//         }

//         .carousel-container {
//           position: relative;
//           width: 100%;
//           height: 100%;
//           display: flex;
//           transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
//         }

//         .carousel-slide {
//           position: relative;
//           min-width: 100%;
//           height: 100%;
//           display: flex;
//           flex-direction: column;
//           overflow: hidden;
//         }

//         .slide-image-container {
//           position: relative;
//           width: 100%;
//           height: 60%;
//           overflow: hidden;
//         }

//         .slide-image {
//           width: 100%;
//           height: 100%;
//           object-fit: cover;
//           object-position: center;
//         }

//         .image-overlay {
//           position: absolute;
//           top: 0;
//           left: 0;
//           right: 0;
//           bottom: 0;
//           background: linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 100%);
//         }

//         .badge {
//           position: absolute;
//           top: 20px;
//           left: 20px;
//           background: rgba(212, 175, 55, 0.95);
//           color: white;
//           padding: 6px 16px;
//           border-radius: 20px;
//           font-size: 0.7rem;
//           font-weight: 700;
//           letter-spacing: 1.5px;
//           z-index: 2;
//           animation: fadeInDown 0.6s ease;
//         }

//         .slide-content {
//           flex: 1;
//           display: flex;
//           flex-direction: column;
//           justify-content: center;
//           align-items: center;
//           padding: 30px 25px;
//           text-align: center;
//           animation: fadeInUp 0.8s ease;
//         }

//         .slide-title {
//           font-family: 'Georgia', serif;
//           font-size: 2rem;
//           font-weight: 400;
//           color: #1a1a2e;
//           margin: 0 0 10px 0;
//           letter-spacing: 1px;
//         }

//         .slide-subtitle {
//           font-family: 'Georgia', serif;
//           font-size: 1rem;
//           color: #666;
//           margin: 0 0 25px 0;
//           line-height: 1.5;
//         }

//         .shop-button {
//           display: inline-flex;
//           align-items: center;
//           justify-content: center;
//           padding: 14px 40px;
//           background: #1a1a2e;
//           color: white;
//           border: 2px solid #1a1a2e;
//           border-radius: 30px;
//           font-size: 0.9rem;
//           font-weight: 600;
//           letter-spacing: 1.5px;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           font-family: 'Georgia', serif;
//         }

//         .shop-button:hover {
//           background: transparent;
//           color: #1a1a2e;
//         }

//         .carousel-dots {
//           position: absolute;
//           bottom: 100px;
//           left: 50%;
//           transform: translateX(-50%);
//           display: flex;
//           gap: 10px;
//           z-index: 10;
//         }

//         .dot {
//           width: 8px;
//           height: 8px;
//           border-radius: 50%;
//           background: rgba(255, 255, 255, 0.5);
//           cursor: pointer;
//           transition: all 0.3s ease;
//         }

//         .dot.active {
//           width: 24px;
//           border-radius: 4px;
//           background: #d4af37;
//         }

//         @keyframes fadeInDown {
//           from {
//             opacity: 0;
//             transform: translateY(-20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         @keyframes fadeInUp {
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         /* Hide on desktop */
//         @media (min-width: 769px) {
//           .mobile-hero-carousel {
//             display: none;
//           }
//         }

//         /* Optimize for different mobile sizes */
//         @media (max-width: 480px) {
//           .mobile-hero-carousel {
//             height: 450px;
//           }

//           .slide-title {
//             font-size: 1.6rem;
//           }

//           .slide-subtitle {
//             font-size: 0.9rem;
//           }

//           .badge {
//             top: 15px;
//             left: 15px;
//             font-size: 0.65rem;
//             padding: 5px 14px;
//           }
//         }

//         @media (max-width: 375px) {
//           .mobile-hero-carousel {
//             height: 420px;
//           }

//           .slide-title {
//             font-size: 1.4rem;
//           }

//           .shop-button {
//             padding: 12px 35px;
//             font-size: 0.85rem;
//           }
//         }
//       `}</style>

//       <div
//         ref={carouselRef}
//         className="carousel-container"
//         style={{ transform: `translateX(-${currentSlide * 100}%)` }}
//         onTouchStart={handleTouchStart}
//         onTouchMove={handleTouchMove}
//         onTouchEnd={handleTouchEnd}
//       >
//         {slides.map((slide, index) => (
//           <div key={slide.id} className="carousel-slide">
//             <div className="slide-image-container">
//               <img
//                 src={slide.image}
//                 alt={slide.title}
//                 className="slide-image"
//               />
//               <div className="image-overlay"></div>
//               <div className="badge">{slide.badge}</div>
//             </div>
//             <div className="slide-content" style={{ background: `linear-gradient(180deg, ${slide.bgColor}15 0%, #ffffff 100%)` }}>
//               <h2 className="slide-title">{slide.title}</h2>
//               <p className="slide-subtitle">{slide.subtitle}</p>
//               <button className="shop-button">{slide.buttonText}</button>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="carousel-dots">
//         {slides.map((_, index) => (
//           <div
//             key={index}
//             className={`dot ${index === currentSlide ? 'active' : ''}`}
//             onClick={() => goToSlide(index)}
//           ></div>
//         ))}
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect, useRef } from 'react';

export default function MobileHeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const carouselRef = useRef(null);

  const slides = [
    {
      id: 1,
      image: 'https://i.ibb.co/4R8cXw75/1600x900pixel-1.jpg', // direct image link
      badge: 'NEW ARRIVAL',
      title: 'Stunning Every Ear',
      subtitle: 'Explore our exquisite earring collection',
      buttonText: 'SHOP NOW',
      bgColor: '#5a7a8c'
    },
    {
      id: 2,
      image: 'https://i.ibb.co/ZYW3VTp/bestseller-necklace.jpg', // replace with your direct image link
      badge: 'BESTSELLER',
      title: 'Luxury Necklaces',
      subtitle: 'Timeless pieces for every occasion',
      buttonText: 'SHOP NOW',
      bgColor: '#8b7355'
    },
    {
      id: 3,
      image: 'https://i.ibb.co/4R8cXw75/elegant-rings.jpg', // replace with your direct image link
      badge: 'TRENDING',
      title: 'Elegant Rings',
      subtitle: 'Discover your perfect match',
      buttonText: 'SHOP NOW',
      bgColor: '#6b5b7a'
    }
  ];

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [slides.length]);

  // Swipe handlers
  const handleTouchStart = (e) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) setCurrentSlide((prev) => (prev + 1) % slides.length);
    if (distance < -50) setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTouchStart(0);
    setTouchEnd(0);
  };

  const goToSlide = (index) => setCurrentSlide(index);

  return (
    <div className="mobile-hero-carousel">
      <style>{`
        .mobile-hero-carousel { display: block; position: relative; width: 100%; height: 500px; overflow: hidden; background: #f8f8f8; }
        .carousel-container { display: flex; transition: transform 0.5s ease-in-out; height: 100%; }
        .carousel-slide { min-width: 100%; height: 100%; position: relative; display: flex; flex-direction: column; }
        .slide-image-container { position: relative; width: 100%; height: 60%; overflow: hidden; }
        .slide-image { width: 100%; height: 100%; object-fit: cover; }
        .image-overlay { position: absolute; top:0; left:0; right:0; bottom:0; background: linear-gradient(180deg, rgba(0,0,0,0.1), rgba(0,0,0,0.2)); z-index:1; }
        .badge { position:absolute; top:20px; left:20px; background: rgba(212, 175, 55,0.95); color:#fff; padding:6px 16px; border-radius:20px; font-size:0.7rem; font-weight:700; z-index:2; }
        .slide-content { flex:1; display:flex; flex-direction:column; justify-content:center; align-items:center; padding:20px; text-align:center; z-index:2; position:relative; }
        .slide-title { font-family:'Georgia', serif; font-size:2rem; color:#1a1a2e; margin:0 0 10px 0; }
        .slide-subtitle { font-family:'Georgia', serif; font-size:1rem; color:#333; margin:0 0 20px 0; }
        .shop-button { padding:14px 40px; background:#1a1a2e; color:#fff; border-radius:30px; border:none; cursor:pointer; transition:0.3s; font-family:'Georgia', serif; }
        .shop-button:hover { background:transparent; color:#1a1a2e; border:2px solid #1a1a2e; }
        .carousel-dots { position:absolute; bottom:30px; left:50%; transform:translateX(-50%); display:flex; gap:10px; z-index:3; }
        .dot { width:8px; height:8px; border-radius:50%; background: rgba(255,255,255,0.5); cursor:pointer; transition:0.3s; }
        .dot.active { width:24px; border-radius:4px; background:#d4af37; }
        @media (min-width:769px){ .mobile-hero-carousel{ display:none; } }
      `}</style>

      <div
        ref={carouselRef}
        className="carousel-container"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="carousel-slide">
            <div className="slide-image-container">
              <img src={slide.image} alt={slide.title} className="slide-image" />
              <div className="image-overlay"></div>
              <div className="badge">{slide.badge}</div>
            </div>
            <div className="slide-content" style={{ background: `linear-gradient(180deg, ${slide.bgColor}15 0%, #fff 100%)` }}>
              <h2 className="slide-title">{slide.title}</h2>
              <p className="slide-subtitle">{slide.subtitle}</p>
              <button className="shop-button">{slide.buttonText}</button>
            </div>
          </div>
        ))}
      </div>

      <div className="carousel-dots">
        {slides.map((_, index) => (
          <div key={index} className={`dot ${index === currentSlide ? 'active' : ''}`} onClick={() => goToSlide(index)}></div>
        ))}
      </div>
    </div>
  );
}
