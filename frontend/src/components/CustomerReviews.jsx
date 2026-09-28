import React, { useState, useEffect } from 'react';
import { Star, CheckCircle2, Quote, Sparkles } from 'lucide-react';
import { fetchCustomerReviews, DEMO_REVIEWS } from '../services/api';

export default function CustomerReviews() {
  const [reviews, setReviews] = useState(DEMO_REVIEWS);

  useEffect(() => {
    async function loadReviews() {
      const data = await fetchCustomerReviews();
      if (data && data.length > 0) {
        setReviews(data);
      }
    }
    loadReviews();
  }, []);

  return (
    <section style={{ padding: '70px 0', background: '#ffffff' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '44px' }}>
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
            <Sparkles size={14} /> LOVED BY 50,000+ CUSTOMERS
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '32px', color: '#0b0c10' }}>
            Stories from Our Fashion Family
          </h2>
          <p style={{ color: '#6d7588', maxWidth: '500px', margin: '8px auto 0', fontSize: '15px' }}>
            Real experiences from patrons who chose Malak Fashion Hub for their most cherished occasions.
          </p>
        </div>

        {/* Reviews Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
          }}
        >
          {reviews.map((item) => (
            <div
              key={item.id}
              style={{
                background: '#faf9f6',
                borderRadius: '16px',
                padding: '28px 24px',
                border: '1px solid #ebe8de',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
              }}
            >
              {/* Star Rating */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '3px', marginBottom: '14px' }}>
                {[...Array(item.rating || 5)].map((_, i) => (
                  <Star key={i} size={16} fill="#f59e0b" color="#f59e0b" />
                ))}
              </div>

              {/* Review Text */}
              <p
                style={{
                  color: '#2e323b',
                  fontSize: '14px',
                  lineHeight: '1.65',
                  fontStyle: 'italic',
                  marginBottom: '20px',
                  flexGrow: 1,
                }}
              >
                "{item.text}"
              </p>

              {/* Product purchased tag */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  background: '#ffffff',
                  border: '1px solid #e2ded5',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontSize: '11.5px',
                  fontWeight: '600',
                  color: '#b89324',
                  marginBottom: '16px',
                  alignSelf: 'flex-start',
                }}
              >
                👗 Outfit: {item.outfit}
              </div>

              {/* User Profile Footer */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderTop: '1px solid #ebe8de', paddingTop: '14px' }}>
                <img
                  src={item.avatar}
                  alt={item.name}
                  style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <div style={{ fontWeight: '700', fontSize: '14px', color: '#18191f', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {item.name} <CheckCircle2 size={14} color="#11694e" />
                  </div>
                  <div style={{ fontSize: '11.5px', color: '#7a8190' }}>
                    {item.city} • {item.date}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
