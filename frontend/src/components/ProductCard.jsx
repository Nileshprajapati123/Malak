import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Heart, ShoppingBag, Eye, Star, Check } from 'lucide-react';

export default function ProductCard({ product }) {
  const {
    addToCart,
    toggleWishlist,
    isWishlisted,
    setQuickViewProduct,
  } = useShop();

  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || 'M');
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.name || '');
  const [isAdded, setIsAdded] = useState(false);

  const isFavorite = isWishlisted(product.id);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, selectedSize, selectedColor, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1600);
  };

  return (
    <div
      className="fashion-card"
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '16px',
        background: '#ffffff',
        border: '1px solid #ebe9e1',
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Product Image Frame */}
      <div
        style={{
          position: 'relative',
          aspectRatio: '3/4',
          background: '#f8f7f5',
          overflow: 'hidden',
          cursor: 'pointer',
        }}
        onClick={() => setQuickViewProduct(product)}
      >
        <img
          src={product.image}
          alt={product.product_name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease',
          }}
          className="product-main-img"
          loading="lazy"
        />

        {/* Badges */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            zIndex: 5,
          }}
        >
          {product.badge && (
            <span
              style={{
                background: product.badge.includes('OFF') ? '#9e1b32' : '#0b0c10',
                color: '#ffffff',
                padding: '3px 10px',
                borderRadius: '9999px',
                fontSize: '11px',
                fontWeight: '700',
                letterSpacing: '0.5px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
              }}
            >
              {product.badge}
            </span>
          )}
          {product.is_bestseller && !product.badge?.includes('Bestseller') && (
            <span
              style={{
                background: 'linear-gradient(135deg, #d4af37 0%, #b89324 100%)',
                color: '#000000',
                padding: '3px 10px',
                borderRadius: '9999px',
                fontSize: '10px',
                fontWeight: '800',
                letterSpacing: '0.5px',
              }}
            >
              ★ POPULAR
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            zIndex: 5,
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 10px rgba(0,0,0,0.12)',
            transition: 'transform 0.2s',
          }}
          title="Save to Wishlist"
          aria-label="Wishlist"
        >
          <Heart
            size={18}
            fill={isFavorite ? '#e63946' : 'none'}
            color={isFavorite ? '#e63946' : '#18191f'}
          />
        </button>

        {/* Quick View Button Hover Overlay */}
        <div className="quick-view-overlay">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            style={{
              background: 'rgba(11, 12, 16, 0.85)',
              color: '#ffffff',
              padding: '8px 16px',
              borderRadius: '9999px',
              fontSize: '12px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backdropFilter: 'blur(4px)',
              border: '1px solid rgba(212,175,55,0.4)',
              boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
            }}
          >
            <Eye size={14} color="#d4af37" /> Quick Look
          </button>
        </div>
      </div>

      {/* Card Content Details */}
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        {/* Category & Rating */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
          <span
            style={{
              fontSize: '11px',
              fontWeight: '700',
              color: '#b89324',
              textTransform: 'uppercase',
              letterSpacing: '0.6px',
            }}
          >
            {product.category_name}
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '12px', fontWeight: '600' }}>
            <Star size={13} fill="#f59e0b" color="#f59e0b" />
            <span>{product.rating || '4.8'}</span>
            <span style={{ color: '#9aa0a6', fontSize: '11px' }}>({product.reviews_count || 45})</span>
          </div>
        </div>

        {/* Product Title */}
        <h4
          style={{
            fontSize: '15px',
            fontWeight: '600',
            fontFamily: 'var(--font-sans)',
            color: '#18191f',
            lineHeight: '1.35',
            marginBottom: '8px',
            cursor: 'pointer',
            minHeight: '40px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
          onClick={() => setQuickViewProduct(product)}
        >
          {product.product_name}
        </h4>

        {/* Sizes Pill Selector */}
        {product.sizes && product.sizes.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '10px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '11px', color: '#7a8190', marginRight: '2px' }}>Size:</span>
            {product.sizes.slice(0, 5).map((sz) => (
              <button
                key={sz}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedSize(sz);
                }}
                style={{
                  fontSize: '10px',
                  fontWeight: '700',
                  padding: '2px 7px',
                  borderRadius: '4px',
                  border: selectedSize === sz ? '1.5px solid #d4af37' : '1px solid #e0ded8',
                  background: selectedSize === sz ? '#fdf6e2' : '#ffffff',
                  color: selectedSize === sz ? '#926d0a' : '#444',
                  cursor: 'pointer',
                }}
              >
                {sz}
              </button>
            ))}
          </div>
        )}

        {/* Price & Action */}
        <div
          style={{
            marginTop: 'auto',
            paddingTop: '12px',
            borderTop: '1px solid #f2f0ea',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
              <span
                style={{
                  fontSize: '18px',
                  fontWeight: '800',
                  color: '#0b0c10',
                  fontFamily: 'var(--font-display)',
                }}
              >
                ₹{product.price.toLocaleString()}
              </span>
              {product.original_price && (
                <span
                  style={{
                    fontSize: '12px',
                    color: '#9aa0a6',
                    textDecoration: 'line-through',
                  }}
                >
                  ₹{Number(product.original_price).toLocaleString()}
                </span>
              )}
            </div>
            {product.discount_percent && (
              <div style={{ fontSize: '10.5px', color: '#11694e', fontWeight: '700' }}>
                Save {product.discount_percent}%
              </div>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            style={{
              padding: '9px 14px',
              borderRadius: '9999px',
              background: isAdded
                ? '#11694e'
                : 'linear-gradient(135deg, #0b0c10 0%, #1e2230 100%)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
              fontWeight: '700',
              boxShadow: '0 3px 10px rgba(0,0,0,0.15)',
              transition: 'all 0.2s',
              border: isAdded ? 'none' : '1px solid rgba(212,175,55,0.3)',
            }}
            title="Add to Shopping Bag"
          >
            {isAdded ? (
              <>
                <Check size={14} /> Added
              </>
            ) : (
              <>
                <ShoppingBag size={14} color="#d4af37" /> Add
              </>
            )}
          </button>
        </div>
      </div>

      <style>{`
        .quick-view-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0,0,0,0.25);
          opacity: 0;
          transition: opacity 0.25s ease;
          pointer-events: none;
        }
        .fashion-card:hover .quick-view-overlay {
          opacity: 1;
          pointer-events: auto;
        }
        .fashion-card:hover .product-main-img {
          transform: scale(1.06);
        }
      `}</style>
    </div>
  );
}
