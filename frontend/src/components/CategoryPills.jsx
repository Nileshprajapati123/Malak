import React from 'react';
import { useShop } from '../context/ShopContext';
import { DEMO_CATEGORIES } from '../services/api';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function CategoryPills({ categories = DEMO_CATEGORIES }) {
  const { activeCategory, setActiveCategory } = useShop();

  const handleSelect = (slug) => {
    setActiveCategory(slug);
    const element = document.getElementById('catalog-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section style={{ padding: '60px 0 30px', background: '#ffffff' }}>
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
              marginBottom: '8px',
            }}
          >
            <Sparkles size={14} /> CURATED APPAREL COLLECTIONS
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '32px', color: '#0b0c10' }}>
            Shop by Fashion Category
          </h2>
          <p style={{ color: '#6d7588', maxWidth: '540px', margin: '8px auto 0', fontSize: '15px' }}>
            From majestic royal ethnic weaves to modern streetwear cuts, explore clothing tailored for every moment.
          </p>
        </div>

        {/* Category Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '20px',
          }}
        >
          {categories.map((cat) => {
            const isSelected = activeCategory === cat.slug;
            return (
              <div
                key={cat.id || cat.slug}
                onClick={() => handleSelect(cat.slug)}
                style={{
                  cursor: 'pointer',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  position: 'relative',
                  aspectRatio: '3/4',
                  boxShadow: isSelected ? '0 8px 24px rgba(212,175,55,0.35)' : '0 4px 15px rgba(0,0,0,0.06)',
                  border: isSelected ? '2px solid #d4af37' : '1px solid #eee',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  transform: isSelected ? 'scale(1.02)' : 'none',
                }}
                className="category-tile"
              >
                {/* Image */}
                <img
                  src={cat.image}
                  alt={cat.category_name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                  }}
                  className="cat-img"
                />

                {/* Dark Gradient Overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(11,12,16,0.3) 40%, rgba(11,12,16,0.92) 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '18px 14px',
                    color: '#ffffff',
                  }}
                >
                  <span
                    style={{
                      fontSize: '11px',
                      color: '#d4af37',
                      fontWeight: '700',
                      letterSpacing: '0.8px',
                      textTransform: 'uppercase',
                      marginBottom: '4px',
                    }}
                  >
                    {cat.itemCount || 'Explore'}
                  </span>
                  <h3
                    style={{
                      color: '#ffffff',
                      fontSize: '16px',
                      fontWeight: '700',
                      lineHeight: '1.3',
                      fontFamily: 'var(--font-display)',
                    }}
                  >
                    {cat.category_name}
                  </h3>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '12px',
                      color: isSelected ? '#d4af37' : '#e0e0e0',
                      fontWeight: '600',
                      marginTop: '6px',
                    }}
                  >
                    <span>{isSelected ? 'Viewing' : 'Shop Now'}</span>
                    <ArrowRight size={13} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .category-tile:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        }
        .category-tile:hover .cat-img {
          transform: scale(1.08);
        }
      `}</style>
    </section>
  );
}
