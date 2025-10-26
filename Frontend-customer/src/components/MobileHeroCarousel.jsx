"use client"

import { useState, useEffect } from "react"
import "./MobileHeroCarousel.css"

const MobileHeroCarousel = () => {
  const slides = [
    {
      id: 1,
      image:
        "https://i.ibb.co/4R8cXw75/1600x900pixel-1.jpg",
      title: "Stunning",
      subtitle: "every Ear",
      buttonText: "SHOP NOW",
      badge: "Featured",
    },
    {
      id: 2,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/elegant-diamond-necklace-jewelry-UPCi8C1v1hFESaQfQWZqW8SOiycbmW.jpg",
      title: "Timeless",
      subtitle: "Elegance",
      buttonText: "EXPLORE",
      badge: "New",
    },
    {
      id: 3,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/luxury-silver-bracelet-jewelry-bya5LMqLT112tP8hDfjXa6aHoeviA0.jpg",
      title: "Radiant",
      subtitle: "Beauty",
      buttonText: "DISCOVER",
      badge: "Exclusive",
    },
    {
      id: 4,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/premium-gold-rings-collection-1Of9QVMod32j9w0CLXumGQflgrucfQ.jpg",
      title: "Precious",
      subtitle: "Moments",
      buttonText: "VIEW MORE",
    },
  ]

  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlay) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlay, slides.length])

  const goToSlide = (index) => {
    setCurrentSlide(index)
    setIsAutoPlay(false)
    setTimeout(() => setIsAutoPlay(true), 10000)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setIsAutoPlay(false)
    setTimeout(() => setIsAutoPlay(true), 10000)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    setIsAutoPlay(false)
    setTimeout(() => setIsAutoPlay(true), 10000)
  }

  const slide = slides[currentSlide]

  return (
    <div className="Mobilehero-carousel-container">
      {/* Mobile-only carousel */}
      <div className="carousel-wrapper">
        {/* Slides */}
        <div className="carousel-slides">
          {slides.map((s, index) => (
            <div
              key={s.id}
              className={`carousel-slide ${index === currentSlide ? "active" : ""}`}
              style={{
                backgroundImage: `url(${s.image})`,
              }}
            >
              {/* Gradient overlay */}
              <div className="carousel-overlay"></div>
            </div>
          ))}
        </div>

        {/* Badge */}
        {/* {slide.badge && (
          <div className="carousel-badge">
            <span className="badge-text">{slide.badge}</span>
          </div>
        )} */}

        {/* Content overlay */}
        <div className="carousel-content">
          {/* Title and subtitle */}
          <div className="carousel-text">
            <h1 className="carousel-title">{slide.title}</h1>
            <p className="carousel-subtitle">{slide.subtitle}</p>
          </div>

          {/* CTA Button */}
          <button className="carousel-button">{slide.buttonText}</button>
        </div>

        {/* Navigation arrows */}
        <button onClick={prevSlide} className="carousel-arrow carousel-arrow-left" aria-label="Previous slide">
          &#10094;
        </button>

        <button onClick={nextSlide} className="carousel-arrow carousel-arrow-right" aria-label="Next slide">
          &#10095;
        </button>

        {/* Carousel indicators */}
        {/* <div className="carousel-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`indicator ${index === currentSlide ? "active" : ""}`}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div> */}
      </div>
    </div>
  )
}

export default MobileHeroCarousel
