import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "./MobileHeroCarousel.css";
import api from "../api/axiosConfig"; // your API setup file
import { CircularProgress, Box } from "@mui/material";
import { Link } from "react-router-dom";

const MobileHeroCarousel = () => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const { data } = await api.get("/api/hero-carousel");
        setSlides(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch hero slides:", error);
        setLoading(false);
      }
    };
    fetchSlides();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    pauseOnHover: false,
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="70vh"
      >
        <CircularProgress size={40} />
      </Box>
    );
  }

  if (slides.length === 0) return null;

  return (
    <div className="mobile-hero-carousel">
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide._id} className="mobile-slide">
            <img
              src={slide.image}
              alt={slide.headline || "Banner"}
              className="mobile-hero-image"
            />

            <div className="mobile-overlay">
              {slide.headline && (
                <h2 className="mobile-headline">{slide.headline}</h2>
              )}
              {slide.caption && (
                <p className="mobile-caption">{slide.caption}</p>
              )}
              {slide.link && (
                <Link
                  to={slide.link}
                  className="mobile-shop-btn"
                >
                  Shop Now
                </Link>
              )}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MobileHeroCarousel;
