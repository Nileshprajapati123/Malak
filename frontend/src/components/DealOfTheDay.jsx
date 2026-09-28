import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { Sparkles, Clock, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';

export default function DealOfTheDay({ dealProduct }) {
  const { addToCart, setQuickViewProduct } = useShop();

  // 14 hours countdown timer
  const [timeLeft, setTimeLeft] = useState({
    hours: 13,
    minutes: 45,
    seconds: 20,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 12, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!dealProduct) return null;

  return (
    <section style={{ padding: '40px 0 60px', background: '#ffffff' }}>
      <div className="container">
        <div
          style={{
            background: 'linear-gradient(135deg, #0b0c10 0%, #171b26 60%, #0b0c10 100%)',
            borderRadius: '24px',
            border: '1px solid rgba(212, 175, 55, 0.4)',
            overflow: 'hidden',
            boxShadow: '0 16px 40px rgba(0,0,0,0.25)',
            position: 'relative',
          }}
        >
          {/* Subtle gold glow behind content */}
          <div
            style={{
              position: 'absolute',
              top: '-10%',
              right: '-10%',
              width: '400px',
              height: '400px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(212,175,55,0.15) 0%, rgba(0,0,0,0) 70%)',
              pointerEvents: 'none',
            }}
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '40px',
              alignItems: 'center',
              padding: '40px',
            }}
          >
            {/* Left Column: Product Image */}
            <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', maxHeight: '440px' }}>
              <img
                src={dealProduct.image}
                alt={dealProduct.product_name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '16px',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  background: '#9e1b32',
                  color: '#ffffff',
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  fontWeight: '800',
                  fontSize: '12px',
                  letterSpacing: '1px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
                }}
              >
                ⚡ DEAL OF THE DAY
              </div>
            </div>

            {/* Right Column: Deal Details & Timer */}
            <div style={{ color: '#ffffff' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#d4af37',
                  fontSize: '12px',
                  fontWeight: '700',
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  marginBottom: '10px',
                }}
              >
                <Sparkles size={14} /> LIMITED TIME FESTIVE OFFER
              </div>

              <h3
                style={{
                  color: '#ffffff',
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)',
                  lineHeight: '1.25',
                  marginBottom: '14px',
                }}
              >
                {dealProduct.product_name}
              </h3>

              <p
                style={{
                  color: '#b0b6c4',
                  fontSize: '14.5px',
                  lineHeight: '1.6',
                  marginBottom: '22px',
                }}
              >
                {dealProduct.description}
              </p>

              {/* Pricing */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '20px' }}>
                <span
                  style={{
                    fontSize: '32px',
                    fontWeight: '800',
                    color: '#d4af37',
                    fontFamily: 'var(--font-display)',
                  }}
                >
                  ₹{dealProduct.price.toLocaleString()}
                </span>
                {dealProduct.original_price && (
                  <span
                    style={{
                      fontSize: '18px',
                      color: '#7a8190',
                      textDecoration: 'line-through',
                    }}
                  >
                    ₹{Number(dealProduct.original_price).toLocaleString()}
                  </span>
                )}
                <span
                  style={{
                    background: 'rgba(212, 175, 55, 0.2)',
                    color: '#d4af37',
                    border: '1px solid #d4af37',
                    padding: '3px 10px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: '700',
                  }}
                >
                  SAVE {dealProduct.discount_percent}%
                </span>
              </div>

              {/* Countdown Boxes */}
              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#c0c5d0', marginBottom: '8px' }}>
                  <Clock size={14} color="#d4af37" /> Flash Sale Ends In:
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <div
                    style={{
                      background: 'rgba(255,255,255,0.08)',
                      border: '1px solid rgba(212,175,55,0.3)',
                      borderRadius: '10px',
                      padding: '8px 14px',
                      textAlign: 'center',
                      minWidth: '60px',
                    }}
                  >
                    <div style={{ fontSize: '20px', fontWeight: '800', color: '#ffffff' }}>
                      {String(timeLeft.hours).padStart(2, '0')}
                    </div>
                    <div style={{ fontSize: '10px', color: '#9aa0a6', textTransform: 'uppercase' }}>Hours</div>
                  </div>

                  <div
                    style={{
                      background: 'rgba(255,255,255,0.08)',
                      border: '1px solid rgba(212,175,55,0.3)',
                      borderRadius: '10px',
                      padding: '8px 14px',
                      textAlign: 'center',
                      minWidth: '60px',
                    }}
                  >
                    <div style={{ fontSize: '20px', fontWeight: '800', color: '#ffffff' }}>
                      {String(timeLeft.minutes).padStart(2, '0')}
                    </div>
                    <div style={{ fontSize: '10px', color: '#9aa0a6', textTransform: 'uppercase' }}>Mins</div>
                  </div>

                  <div
                    style={{
                      background: 'rgba(255,255,255,0.08)',
                      border: '1px solid rgba(212,175,55,0.3)',
                      borderRadius: '10px',
                      padding: '8px 14px',
                      textAlign: 'center',
                      minWidth: '60px',
                    }}
                  >
                    <div style={{ fontSize: '20px', fontWeight: '800', color: '#d4af37' }}>
                      {String(timeLeft.seconds).padStart(2, '0')}
                    </div>
                    <div style={{ fontSize: '10px', color: '#9aa0a6', textTransform: 'uppercase' }}>Secs</div>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div style={{ marginBottom: '28px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#b0b6c4', marginBottom: '6px' }}>
                  <span>Stock Status: <strong>76% Claimed</strong></span>
                  <span style={{ color: '#d4af37', fontWeight: '600' }}>Only 6 Pieces Left!</span>
                </div>
                <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.12)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div
                    style={{
                      width: '76%',
                      height: '100%',
                      background: 'linear-gradient(90deg, #d4af37 0%, #e63946 100%)',
                      borderRadius: '4px',
                    }}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => addToCart(dealProduct, dealProduct.sizes?.[0], dealProduct.colors?.[0]?.name, 1)}
                  className="btn-gold"
                  style={{ padding: '13px 28px', fontSize: '14px', cursor: 'pointer' }}
                >
                  <ShoppingBag size={17} /> Claim Deal & Add to Bag
                </button>

                <button
                  onClick={() => setQuickViewProduct(dealProduct)}
                  style={{
                    padding: '12px 22px',
                    borderRadius: '9999px',
                    background: 'transparent',
                    border: '1px solid rgba(255,255,255,0.3)',
                    color: '#ffffff',
                    fontSize: '13.5px',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    cursor: 'pointer',
                  }}
                >
                  Quick View <ArrowRight size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
