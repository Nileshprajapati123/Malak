import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  Sparkles,
  Mail,
  Phone,
  MapPin,
  Clock,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  Truck,
  Heart
} from 'lucide-react';

export default function Footer() {
  const { setActiveCategory, setIsSizeChartOpen, addToast } = useShop();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      addToast('Please enter a valid email address', 'error');
      return;
    }
    setSubscribed(true);
    addToast('Welcome to the Malak VIP Club! Use code VIP20 for 20% off 🎉');
    setNewsletterEmail('');
  };

  const handleCategoryNav = (slug) => {
    setActiveCategory(slug);
    const el = document.getElementById('catalog-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer style={{ background: '#0b0c10', color: '#c5cad3', borderTop: '1px solid rgba(212,175,55,0.25)' }}>
      {/* Newsletter VIP Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, #131620 0%, #1a1e2d 100%)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          padding: '48px 0',
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '24px',
            }}
          >
            <div style={{ maxWidth: '500px' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#d4af37',
                  fontSize: '12px',
                  fontWeight: '700',
                  letterSpacing: '1px',
                  marginBottom: '6px',
                }}
              >
                <Sparkles size={14} /> JOIN THE MALAK VIP FASHION CLUB
              </div>
              <h3 style={{ color: '#ffffff', fontFamily: 'var(--font-display)', fontSize: '24px', marginBottom: '6px' }}>
                Unlock 20% Off Your Next Couture Order
              </h3>
              <p style={{ color: '#9aa0a6', fontSize: '13.5px' }}>
                Subscribe for private festive drops, bridal lookbooks & secret seasonal discount codes.
              </p>
            </div>

            <form
              onSubmit={handleSubscribe}
              style={{
                display: 'flex',
                gap: '8px',
                width: '100%',
                maxWidth: '420px',
              }}
            >
              <input
                type="email"
                placeholder="Enter your email address..."
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  borderRadius: '9999px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  background: 'rgba(255,255,255,0.06)',
                  color: '#ffffff',
                  fontSize: '13.5px',
                  outline: 'none',
                }}
              />
              <button
                type="submit"
                className="btn-gold"
                style={{ padding: '12px 24px', fontSize: '13.5px', whiteSpace: 'nowrap', cursor: 'pointer' }}
              >
                <span>Subscribe</span>
                <ArrowRight size={15} />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div style={{ padding: '60px 0 30px' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '40px',
              marginBottom: '50px',
            }}
          >
            {/* Brand Bio */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '8px',
                    background: '#181b24',
                    border: '1px solid #d4af37',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#d4af37',
                    fontWeight: '800',
                    fontSize: '18px',
                    fontFamily: 'var(--font-display)',
                  }}
                >
                  M
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: '800', fontSize: '20px', color: '#ffffff', letterSpacing: '1px' }}>
                    MALAK
                  </div>
                  <div style={{ fontSize: '9px', fontWeight: '700', letterSpacing: '2px', color: '#d4af37', textTransform: 'uppercase' }}>
                    FASHION HUB
                  </div>
                </div>
              </div>

              <p style={{ color: '#9aa0a6', fontSize: '13.5px', lineHeight: '1.6', marginBottom: '18px' }}>
                Malak Fashion Hub is your premier destination for royal ethnic wear, bridal lehengas, bespoke wedding sherwanis, and luxury streetwear apparel.
              </p>

              <div style={{ display: 'flex', gap: '10px' }}>
                <span style={{ fontSize: '12px', color: '#d4af37', fontWeight: '700' }}>⭐ 4.9 / 5 Rating</span>
                <span style={{ color: '#666' }}>•</span>
                <span style={{ fontSize: '12px', color: '#c5cad3' }}>50,000+ Patrons Dressed</span>
              </div>
            </div>

            {/* Quick Collections */}
            <div>
              <h4 style={{ color: '#ffffff', fontSize: '15px', fontWeight: '700', letterSpacing: '0.8px', marginBottom: '18px', textTransform: 'uppercase' }}>
                Apparel Collections
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13.5px' }}>
                <li>
                  <button onClick={() => handleCategoryNav('mens-ethnic')} style={{ color: '#9aa0a6', cursor: 'pointer', textAlign: 'left' }}>
                    Men's Royal Silk Kurtas
                  </button>
                </li>
                <li>
                  <button onClick={() => handleCategoryNav('womens-ethnic')} style={{ color: '#9aa0a6', cursor: 'pointer', textAlign: 'left' }}>
                    Designer Banarasi Sarees
                  </button>
                </li>
                <li>
                  <button onClick={() => handleCategoryNav('festive-wedding')} style={{ color: '#9aa0a6', cursor: 'pointer', textAlign: 'left' }}>
                    Midnight Velvet Sherwanis
                  </button>
                </li>
                <li>
                  <button onClick={() => handleCategoryNav('casual-streetwear')} style={{ color: '#9aa0a6', cursor: 'pointer', textAlign: 'left' }}>
                    240 GSM Oversized Tees
                  </button>
                </li>
                <li>
                  <button onClick={() => handleCategoryNav('kids-collection')} style={{ color: '#9aa0a6', cursor: 'pointer', textAlign: 'left' }}>
                    Kids Festive Brocade Dhoti Sets
                  </button>
                </li>
              </ul>
            </div>

            {/* Customer Care & Policies */}
            <div>
              <h4 style={{ color: '#ffffff', fontSize: '15px', fontWeight: '700', letterSpacing: '0.8px', marginBottom: '18px', textTransform: 'uppercase' }}>
                Customer Care
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13.5px' }}>
                <li>
                  <button onClick={() => setIsSizeChartOpen(true)} style={{ color: '#9aa0a6', cursor: 'pointer', textAlign: 'left' }}>
                    📏 Clothing Size Guide
                  </button>
                </li>
                <li>
                  <span style={{ color: '#9aa0a6' }}>🚚 Express Shipping & Tracking</span>
                </li>
                <li>
                  <span style={{ color: '#9aa0a6' }}>🔄 7-Day Easy Doorstep Returns</span>
                </li>
                <li>
                  <span style={{ color: '#9aa0a6' }}>💵 Cash on Delivery (COD) Available</span>
                </li>
                <li>
                  <span style={{ color: '#9aa0a6' }}>🛡️ Authentic Fabric Guarantee</span>
                </li>
              </ul>
            </div>

            {/* Store Location & Contacts */}
            <div>
              <h4 style={{ color: '#ffffff', fontSize: '15px', fontWeight: '700', letterSpacing: '0.8px', marginBottom: '18px', textTransform: 'uppercase' }}>
                Store Visit & Support
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13.5px', color: '#9aa0a6' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <MapPin size={18} color="#d4af37" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>Malak Fashion Hub, High Street Couture Arcade, Main Market, Ring Road, Surat, Gujarat - 395003</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Phone size={16} color="#d4af37" />
                  <a href="tel:+919876543210" style={{ color: '#ffffff', fontWeight: '600' }}>
                    +91 98765 43210
                  </a>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Clock size={16} color="#d4af37" />
                  <span>Open All 7 Days: 10:00 AM - 9:30 PM</span>
                </div>

                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: '#25d366',
                    color: '#ffffff',
                    padding: '8px 16px',
                    borderRadius: '9999px',
                    fontWeight: '700',
                    fontSize: '12.5px',
                    marginTop: '4px',
                    width: 'fit-content',
                  }}
                >
                  💬 Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar: Payments & Copyright */}
          <div
            style={{
              borderTop: '1px solid rgba(255,255,255,0.08)',
              paddingTop: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px',
              fontSize: '12.5px',
            }}
          >
            <div>
              © {new Date().getFullYear()} <strong>Malak Fashion Hub</strong>. All Rights Reserved. Crafted for Timeless Elegance.
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#9aa0a6' }}>
              <span>Accepted Payments:</span>
              <span style={{ color: '#d4af37', fontWeight: '700' }}>UPI • Cards • NetBanking • COD</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
