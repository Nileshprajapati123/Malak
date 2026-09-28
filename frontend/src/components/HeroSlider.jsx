import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { fetchBanners, DEMO_BANNERS } from '../services/api';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Shield,
  Truck,
  RotateCcw,
  Star
} from 'lucide-react';

export default function HeroSlider() {
  const [slides, setSlides] = useState(DEMO_BANNERS);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { setActiveCategory } = useShop();

  useEffect(() => {
    async function loadBanners() {
      const remoteBanners = await fetchBanners();
      if (remoteBanners && remoteBanners.length > 0) {
        setSlides(remoteBanners);
      }
    }
    loadBanners();
  }, []);

  // Auto-play slides
  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handleShopNow = (slug) => {
    setActiveCategory(slug);
    const element = document.getElementById('catalog-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const slide = slides[currentSlide] || slides[0];

  return (
    <div style={{ position: 'relative', overflow: 'hidden', background: '#0b0c10' }}>
      {/* Hero Slide Canvas */}
      <div
        style={{
          position: 'relative',
          minHeight: '560px',
          display: 'flex',
          alignItems: 'center',
          transition: 'all 0.6s ease-in-out',
        }}
      >
        {/* Background Image with Luxury Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${slide.bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 25%',
            filter: 'brightness(0.38)',
            transform: 'scale(1.02)',
            transition: 'all 0.8s ease',
          }}
        />

        {/* Ambient Gradient Lighting */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(90deg, rgba(11,12,16,0.92) 0%, rgba(11,12,16,0.65) 50%, rgba(11,12,16,0.85) 100%)',
          }}
        />

        {/* Content Container */}
        <div className="container" style={{ position: 'relative', zIndex: 10, padding: '60px 24px' }}>
          <div style={{ maxWidth: '680px' }}>
            {/* Badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(212, 175, 55, 0.15)',
                border: '1px solid rgba(212, 175, 55, 0.4)',
                padding: '6px 16px',
                borderRadius: '9999px',
                color: '#d4af37',
                fontSize: '12px',
                fontWeight: '700',
                letterSpacing: '1.2px',
                marginBottom: '20px',
                backdropFilter: 'blur(4px)',
              }}
            >
              <Sparkles size={14} />
              <span>{slide.badge}</span>
              <span
                style={{
                  background: '#d4af37',
                  color: '#000000',
                  padding: '2px 8px',
                  borderRadius: '9999px',
                  fontSize: '10px',
                  marginLeft: '4px',
                  fontWeight: '800',
                }}
              >
                {slide.tag}
              </span>
            </div>

            {/* Title */}
            <h1
              style={{
                color: '#ffffff',
                fontFamily: 'var(--font-display)',
                fontWeight: '800',
                fontSize: 'clamp(2.2rem, 4.8vw, 3.8rem)',
                lineHeight: '1.15',
                marginBottom: '18px',
                textShadow: '0 4px 20px rgba(0,0,0,0.5)',
              }}
            >
              {slide.title}
            </h1>

            {/* Subtitle */}
            <p
              style={{
                color: '#d0d4dc',
                fontSize: 'clamp(1rem, 1.4vw, 1.15rem)',
                lineHeight: '1.6',
                marginBottom: '32px',
                maxWidth: '560px',
              }}
            >
              {slide.subtitle}
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center' }}>
              <button
                onClick={() => handleShopNow(slide.categorySlug)}
                className="btn-gold"
                style={{
                  padding: '14px 32px',
                  fontSize: '15px',
                  fontWeight: '700',
                  cursor: 'pointer',
                }}
              >
                <span>Explore Collection</span>
                <ArrowRight size={18} />
              </button>

              <button
                onClick={() => handleShopNow('all')}
                style={{
                  padding: '13px 26px',
                  borderRadius: '9999px',
                  background: 'rgba(255,255,255,0.1)',
                  color: '#ffffff',
                  border: '1px solid rgba(255,255,255,0.25)',
                  fontSize: '14px',
                  fontWeight: '600',
                  backdropFilter: 'blur(8px)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.2s',
                  cursor: 'pointer',
                }}
              >
                View Full Catalog
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Controls */}
        <button
          onClick={prevSlide}
          style={{
            position: 'absolute',
            left: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 20,
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.12)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            backdropFilter: 'blur(6px)',
          }}
          aria-label="Previous Slide"
        >
          <ChevronLeft size={22} />
        </button>

        <button
          onClick={nextSlide}
          style={{
            position: 'absolute',
            right: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 20,
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.12)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            backdropFilter: 'blur(6px)',
          }}
          aria-label="Next Slide"
        >
          <ChevronRight size={22} />
        </button>

        {/* Slide Indicators */}
        <div
          style={{
            position: 'absolute',
            bottom: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 20,
            display: 'flex',
            gap: '8px',
          }}
        >
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              style={{
                width: index === currentSlide ? '32px' : '10px',
                height: '8px',
                borderRadius: '4px',
                background: index === currentSlide ? '#d4af37' : 'rgba(255,255,255,0.3)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Trust Highlights Bar */}
      <div
        style={{
          background: '#12141c',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          padding: '16px 0',
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'rgba(212,175,55,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Truck size={20} color="#d4af37" />
              </div>
              <div>
                <div style={{ color: '#ffffff', fontWeight: '700', fontSize: '13px' }}>
                  Free Shipping in India
                </div>
                <div style={{ color: '#9aa0a6', fontSize: '12px' }}>On all orders above ₹999</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'rgba(212,175,55,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Shield size={20} color="#d4af37" />
              </div>
              <div>
                <div style={{ color: '#ffffff', fontWeight: '700', fontSize: '13px' }}>
                  100% Genuine Fabrics
                </div>
                <div style={{ color: '#9aa0a6', fontSize: '12px' }}>Pure Silk, Cotton & Linens</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'rgba(212,175,55,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <RotateCcw size={20} color="#d4af37" />
              </div>
              <div>
                <div style={{ color: '#ffffff', fontWeight: '700', fontSize: '13px' }}>
                  7-Day Easy Exchange
                </div>
                <div style={{ color: '#9aa0a6', fontSize: '12px' }}>Hassle-free doorstep returns</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'rgba(212,175,55,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Star size={20} color="#d4af37" />
              </div>
              <div>
                <div style={{ color: '#ffffff', fontWeight: '700', fontSize: '13px' }}>
                  4.9★ Rated Clothing Store
                </div>
                <div style={{ color: '#9aa0a6', fontSize: '12px' }}>50,000+ Happy Customers</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
