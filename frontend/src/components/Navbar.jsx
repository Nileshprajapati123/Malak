import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  ShoppingBag,
  Heart,
  User,
  Search,
  Menu,
  X,
  Sparkles,
  PhoneCall,
  ShieldCheck,
  ChevronDown,
  LogOut,
  Tag
} from 'lucide-react';

export default function Navbar() {
  const {
    cartCount,
    cartSubtotal,
    setIsCartOpen,
    wishlist,
    setIsWishlistOpen,
    user,
    logout,
    setIsAuthOpen,
    setAuthMode,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    setIsSizeChartOpen
  } = useShop();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const navLinks = [
    { name: 'All Collections', slug: 'all' },
    { name: "Men's Wear", slug: 'mens-ethnic' },
    { name: "Women's Ethnic", slug: 'womens-ethnic' },
    { name: "Streetwear & Tees", slug: 'casual-streetwear' },
    { name: "Festive & Bridal", slug: 'festive-wedding' },
    { name: "Kids Collection", slug: 'kids-collection' },
  ];

  const handleCategoryClick = (slug) => {
    setActiveCategory(slug);
    setIsMobileMenuOpen(false);
    const element = document.getElementById('catalog-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const element = document.getElementById('catalog-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 900, background: '#ffffff', boxShadow: '0 2px 15px rgba(0,0,0,0.05)' }}>
      {/* Top Announcement Bar */}
      <div
        style={{
          background: 'linear-gradient(90deg, #0b0c10 0%, #1a1d29 50%, #0b0c10 100%)',
          color: '#ffffff',
          padding: '8px 0',
          fontSize: '12px',
          borderBottom: '1px solid rgba(212, 175, 55, 0.25)',
        }}
      >
        <div className="container flex-between" style={{ flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                background: 'rgba(212,175,55,0.2)',
                color: '#d4af37',
                padding: '2px 8px',
                borderRadius: '4px',
                fontWeight: '700',
                fontSize: '11px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <Sparkles size={12} /> FESTIVE SALE
            </span>
            <span>
              Flat <strong>50% OFF</strong> on Wedding Couture | Use Coupon:{' '}
              <strong style={{ color: '#d4af37', letterSpacing: '0.5px' }}>MALAK50</strong>
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#c8cdd5' }}>
              <ShieldCheck size={13} color="#d4af37" /> 100% Genuine Handcrafted Fabrics
            </span>
            <span
              onClick={() => setIsSizeChartOpen(true)}
              style={{ cursor: 'pointer', textDecoration: 'underline', color: '#d4af37' }}
            >
              Size Guide
            </span>
            <a
              href="tel:+919876543210"
              style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#ffffff' }}
            >
              <PhoneCall size={12} color="#d4af37" /> +91 98765 43210
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div style={{ borderBottom: '1px solid #edece8', padding: '14px 0' }}>
        <div className="container flex-between" style={{ gap: '20px' }}>
          {/* Brand Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setActiveCategory('all');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
          >
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #0b0c10 0%, #1a1d29 100%)',
                border: '1.5px solid #d4af37',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#d4af37',
                fontWeight: '800',
                fontSize: '20px',
                fontFamily: 'var(--font-display)',
                boxShadow: '0 4px 12px rgba(212,175,55,0.2)',
              }}
            >
              M
            </div>
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: '800',
                  fontSize: '22px',
                  letterSpacing: '1.5px',
                  color: '#0b0c10',
                  lineHeight: '1.1',
                }}
              >
                MALAK
              </div>
              <div
                style={{
                  fontSize: '9.5px',
                  fontWeight: '700',
                  letterSpacing: '2.8px',
                  color: '#b89324',
                  textTransform: 'uppercase',
                }}
              >
                FASHION HUB & COUTURE
              </div>
            </div>
          </a>

          {/* Desktop Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            style={{
              flex: '1',
              maxWidth: '480px',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                background: '#f6f5f2',
                border: '1px solid #e2ded5',
                borderRadius: '9999px',
                padding: '7px 16px',
                transition: 'all 0.25s',
              }}
            >
              <Search size={18} color="#8a909d" style={{ marginRight: '10px' }} />
              <input
                type="text"
                placeholder="Search kurtas, sarees, sherwanis, oversized tees..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  border: 'none',
                  background: 'transparent',
                  outline: 'none',
                  fontSize: '14px',
                  color: '#18191f',
                }}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  style={{ color: '#8a909d', padding: '2px' }}
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </form>

          {/* User & Shop Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            {/* Wishlist Button */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: '#f8f7f4',
                border: '1px solid #eae7df',
                color: '#18191f',
                transition: 'all 0.2s',
              }}
              title="View Wishlist"
            >
              <Heart size={20} color={wishlist.length > 0 ? '#e63946' : '#18191f'} />
              {wishlist.length > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-4px',
                    right: '-4px',
                    background: '#e63946',
                    color: '#ffffff',
                    fontSize: '10px',
                    fontWeight: '700',
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Bag Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '9999px',
                background: 'linear-gradient(135deg, #0b0c10 0%, #1e2230 100%)',
                color: '#ffffff',
                border: '1px solid rgba(212, 175, 55, 0.4)',
                boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
                transition: 'all 0.2s',
              }}
              title="View Shopping Bag"
            >
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <ShoppingBag size={19} color="#d4af37" />
                {cartCount > 0 && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '-7px',
                      right: '-9px',
                      background: '#d4af37',
                      color: '#000000',
                      fontSize: '10px',
                      fontWeight: '800',
                      width: '17px',
                      height: '17px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {cartCount}
                  </span>
                )}
              </div>
              <span style={{ fontSize: '13px', fontWeight: '600', display: 'none', minWidth: '55px' }}>
                ₹{cartSubtotal}
              </span>
              <span style={{ fontSize: '13px', fontWeight: '600' }} className="desktop-only">
                Bag
              </span>
            </button>

            {/* User Account / Auth */}
            <div style={{ position: 'relative' }}>
              {user ? (
                <div>
                  <button
                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '6px 14px',
                      borderRadius: '9999px',
                      background: '#fdf6e2',
                      border: '1px solid #d4af37',
                      color: '#926d0a',
                      fontWeight: '600',
                      fontSize: '13px',
                    }}
                  >
                    <User size={16} />
                    <span>{user.username || 'Account'}</span>
                    <ChevronDown size={14} />
                  </button>

                  {isUserDropdownOpen && (
                    <div
                      style={{
                        position: 'absolute',
                        right: 0,
                        top: '48px',
                        background: '#ffffff',
                        border: '1px solid #e5e2d8',
                        borderRadius: '12px',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
                        width: '200px',
                        zIndex: 100,
                        padding: '8px 0',
                        animation: 'slideDown 0.2s ease',
                      }}
                    >
                      <div style={{ padding: '10px 16px', borderBottom: '1px solid #f0eee7' }}>
                        <div style={{ fontWeight: '700', fontSize: '14px', color: '#18191f' }}>
                          {user.username}
                        </div>
                        <div style={{ fontSize: '12px', color: '#7a8190' }}>{user.email || 'Verified Customer'}</div>
                      </div>
                      <button
                        onClick={() => {
                          setIsSizeChartOpen(true);
                          setIsUserDropdownOpen(false);
                        }}
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          padding: '10px 16px',
                          fontSize: '13px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          color: '#333',
                        }}
                      >
                        <Tag size={15} /> Size Guide
                      </button>
                      <button
                        onClick={() => {
                          logout();
                          setIsUserDropdownOpen(false);
                        }}
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          padding: '10px 16px',
                          fontSize: '13px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          color: '#e63946',
                        }}
                      >
                        <LogOut size={15} /> Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => {
                    setAuthMode('login');
                    setIsAuthOpen(true);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 16px',
                    borderRadius: '9999px',
                    background: '#f8f7f4',
                    border: '1px solid #eae7df',
                    color: '#18191f',
                    fontWeight: '600',
                    fontSize: '13px',
                    transition: 'all 0.2s',
                  }}
                >
                  <User size={17} />
                  <span>Sign In</span>
                </button>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                background: '#f6f5f2',
                color: '#18191f',
              }}
              className="mobile-menu-btn"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Category Navigation Bar (Desktop) */}
      <nav
        style={{
          background: '#ffffff',
          borderBottom: '1px solid #f1efe9',
        }}
        className="desktop-nav"
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '32px', padding: '10px 0' }}>
          {navLinks.map((link) => {
            const isActive = activeCategory === link.slug;
            return (
              <button
                key={link.slug}
                onClick={() => handleCategoryClick(link.slug)}
                style={{
                  fontSize: '14px',
                  fontWeight: isActive ? '700' : '500',
                  color: isActive ? '#d4af37' : '#2b2d38',
                  padding: '6px 4px',
                  position: 'relative',
                  letterSpacing: '0.3px',
                  transition: 'color 0.2s ease',
                  borderBottom: isActive ? '2px solid #d4af37' : '2px solid transparent',
                }}
              >
                {link.name}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            top: '115px',
            background: 'rgba(0,0,0,0.6)',
            zIndex: 850,
          }}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            style={{
              background: '#ffffff',
              width: '280px',
              height: '100%',
              padding: '24px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ fontWeight: '800', fontSize: '13px', color: '#b89324', letterSpacing: '1px' }}>
              CATEGORIES
            </div>
            {navLinks.map((link) => (
              <button
                key={link.slug}
                onClick={() => handleCategoryClick(link.slug)}
                style={{
                  textAlign: 'left',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  background: activeCategory === link.slug ? '#fdf6e2' : 'transparent',
                  color: activeCategory === link.slug ? '#b89324' : '#18191f',
                  fontWeight: activeCategory === link.slug ? '700' : '500',
                  fontSize: '15px',
                }}
              >
                {link.name}
              </button>
            ))}

            <div style={{ marginTop: 'auto', borderTop: '1px solid #f0eee7', paddingTop: '16px' }}>
              <button
                onClick={() => {
                  setIsSizeChartOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '8px',
                  border: '1px solid #dcd9d0',
                  fontWeight: '600',
                  fontSize: '14px',
                  marginBottom: '10px',
                }}
              >
                📏 Clothing Size Guide
              </button>
              <div style={{ fontSize: '12px', color: '#7a8190', textAlign: 'center' }}>
                Need help? Call +91 98765 43210
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Responsive Styles Injection */}
      <style>{`
        @media (max-width: 900px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: flex !important;
          }
          .desktop-only {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
