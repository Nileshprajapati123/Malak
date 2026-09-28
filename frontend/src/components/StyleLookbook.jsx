import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { fetchLookbooks, DEMO_LOOKS } from '../services/api';
import { Sparkles, ArrowRight, ShoppingBag } from 'lucide-react';

export default function StyleLookbook() {
  const [looks, setLooks] = useState(DEMO_LOOKS);
  const { setActiveCategory } = useShop();

  useEffect(() => {
    async function loadLookbooks() {
      const data = await fetchLookbooks();
      if (data && data.length > 0) {
        setLooks(data);
      }
    }
    loadLookbooks();
  }, []);

  const handleExploreLook = (categorySlug) => {
    setActiveCategory(categorySlug);
    const element = document.getElementById('catalog-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section style={{ padding: '60px 0', background: '#f6f5f2' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: '#b89324',
              fontWeight: '700',
              fontSize: '12px',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              marginBottom: '6px',
            }}
          >
            <Sparkles size={14} /> STYLE LOOKBOOK 2026
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '32px', color: '#0b0c10' }}>
            Complete Fashion Ensembles
          </h2>
          <p style={{ color: '#6d7588', maxWidth: '520px', margin: '8px auto 0', fontSize: '15px' }}>
            Curated styling sets designed by Malak Fashion Hub stylists for an unforgettable impression.
          </p>
        </div>

        {/* Lookbook Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '28px',
          }}
        >
          {looks.map((look) => (
            <div
              key={look.id}
              style={{
                background: '#ffffff',
                borderRadius: '18px',
                overflow: 'hidden',
                border: '1px solid #eae7df',
                boxShadow: '0 6px 20px rgba(0,0,0,0.05)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease',
              }}
              className="look-card"
            >
              <div style={{ position: 'relative', aspectRatio: '16/11', overflow: 'hidden' }}>
                <img
                  src={look.image}
                  alt={look.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                  }}
                  className="look-img"
                />
                <span
                  style={{
                    position: 'absolute',
                    top: '14px',
                    left: '14px',
                    background: '#0b0c10',
                    color: '#ffffff',
                    padding: '4px 12px',
                    borderRadius: '9999px',
                    fontSize: '11px',
                    fontWeight: '700',
                    letterSpacing: '0.6px',
                  }}
                >
                  {look.tag}
                </span>
              </div>

              <div style={{ padding: '22px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '18px',
                    color: '#0b0c10',
                    marginBottom: '8px',
                  }}
                >
                  {look.title}
                </h3>
                <p style={{ fontSize: '13.5px', color: '#666e7d', lineHeight: '1.5', marginBottom: '16px' }}>
                  {look.description}
                </p>

                {/* Included Pieces */}
                <div style={{ marginBottom: '18px' }}>
                  <div style={{ fontSize: '11.5px', fontWeight: '700', color: '#b89324', textTransform: 'uppercase', marginBottom: '6px' }}>
                    Curated Set Includes:
                  </div>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {look.pieces.map((piece, i) => (
                      <span
                        key={i}
                        style={{
                          background: '#f8f7f4',
                          border: '1px solid #eae7df',
                          padding: '3px 10px',
                          borderRadius: '6px',
                          fontSize: '11.5px',
                          color: '#333',
                          fontWeight: '500',
                        }}
                      >
                        ✓ {piece}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Action */}
                <div
                  style={{
                    marginTop: 'auto',
                    paddingTop: '14px',
                    borderTop: '1px solid #f2f0ea',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <span style={{ fontSize: '11.5px', color: '#7a8190' }}>Complete Set: </span>
                    <strong style={{ fontSize: '16px', color: '#0b0c10', fontFamily: 'var(--font-display)' }}>
                      {look.totalPrice}
                    </strong>
                  </div>

                  <button
                    onClick={() => handleExploreLook(look.categorySlug)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      color: '#b89324',
                      fontWeight: '700',
                      fontSize: '13px',
                      cursor: 'pointer',
                    }}
                  >
                    Shop Edit <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .look-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 30px rgba(0,0,0,0.1);
        }
        .look-card:hover .look-img {
          transform: scale(1.05);
        }
      `}</style>
    </section>
  );
}
