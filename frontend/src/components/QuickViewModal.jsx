import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import {
  X,
  Star,
  ShoppingBag,
  Heart,
  Truck,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  Plus,
  Minus,
  Check
} from 'lucide-react';

export default function QuickViewModal() {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    toggleWishlist,
    isWishlisted,
    setIsCartOpen,
    setIsSizeChartOpen
  } = useShop();

  const [selectedImage, setSelectedImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (quickViewProduct) {
      setSelectedImage(quickViewProduct.image);
      setSelectedSize(quickViewProduct.sizes?.[0] || 'M');
      setSelectedColor(quickViewProduct.colors?.[0]?.name || '');
      setQuantity(1);
      setIsAdded(false);
    }
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const isFavorite = isWishlisted(quickViewProduct.id);

  const handleAddToCart = () => {
    addToCart(quickViewProduct, selectedSize, selectedColor, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const handleBuyNow = () => {
    addToCart(quickViewProduct, selectedSize, selectedColor, quantity);
    setQuickViewProduct(null);
    setIsCartOpen(true);
  };

  const gallery = quickViewProduct.gallery || [quickViewProduct.image];

  return (
    <div
      className="modal-overlay"
      onClick={() => setQuickViewProduct(null)}
    >
      <div
        style={{
          background: '#ffffff',
          borderRadius: '24px',
          width: '100%',
          maxWidth: '900px',
          maxHeight: '90vh',
          boxShadow: '0 25px 60px rgba(0,0,0,0.35)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            zIndex: 20,
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: '#ffffff',
            border: '1px solid #e0ded8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            cursor: 'pointer',
          }}
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* Modal Body */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            overflowY: 'auto',
          }}
        >
          {/* Left: Image & Gallery */}
          <div style={{ padding: '24px', background: '#faf9f6', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ position: 'relative', aspectRatio: '3/4', borderRadius: '16px', overflow: 'hidden', background: '#ffffff' }}>
              <img
                src={selectedImage}
                alt={quickViewProduct.product_name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              {quickViewProduct.badge && (
                <span
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    background: '#9e1b32',
                    color: '#ffffff',
                    padding: '4px 12px',
                    borderRadius: '9999px',
                    fontWeight: '700',
                    fontSize: '11px',
                  }}
                >
                  {quickViewProduct.badge}
                </span>
              )}
            </div>

            {/* Thumbnail selector */}
            {gallery.length > 1 && (
              <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
                {gallery.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt=""
                    onClick={() => setSelectedImage(img)}
                    style={{
                      width: '56px',
                      height: '66px',
                      borderRadius: '8px',
                      objectFit: 'cover',
                      cursor: 'pointer',
                      border: selectedImage === img ? '2px solid #d4af37' : '1px solid #ddd',
                      opacity: selectedImage === img ? 1 : 0.7,
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Options & Actions */}
          <div style={{ padding: '32px 28px', display: 'flex', flexDirection: 'column' }}>
            {/* Category & Rating */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ color: '#b89324', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase' }}>
                {quickViewProduct.category_name}
              </span>

              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', fontWeight: '600' }}>
                <Star size={14} fill="#f59e0b" color="#f59e0b" />
                <span>{quickViewProduct.rating || '4.9'}</span>
                <span style={{ color: '#7a8190', fontSize: '12px' }}>({quickViewProduct.reviews_count || 120} reviews)</span>
              </div>
            </div>

            {/* Title */}
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '22px',
                color: '#0b0c10',
                lineHeight: '1.25',
                marginBottom: '14px',
              }}
            >
              {quickViewProduct.product_name}
            </h3>

            {/* Price */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '16px' }}>
              <span style={{ fontSize: '26px', fontWeight: '800', color: '#0b0c10', fontFamily: 'var(--font-display)' }}>
                ₹{quickViewProduct.price.toLocaleString()}
              </span>
              {quickViewProduct.original_price && (
                <span style={{ fontSize: '15px', color: '#7a8190', textDecoration: 'line-through' }}>
                  ₹{Number(quickViewProduct.original_price).toLocaleString()}
                </span>
              )}
              {quickViewProduct.discount_percent && (
                <span style={{ background: '#e6f6ee', color: '#11694e', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '700' }}>
                  {quickViewProduct.discount_percent}% OFF
                </span>
              )}
            </div>

            {/* Description */}
            <p style={{ color: '#5e6472', fontSize: '13.5px', lineHeight: '1.6', marginBottom: '20px' }}>
              {quickViewProduct.description}
            </p>

            {/* Fabric Details */}
            <div
              style={{
                background: '#faf9f6',
                borderRadius: '10px',
                padding: '12px 14px',
                border: '1px solid #ebe8de',
                fontSize: '12.5px',
                color: '#444',
                marginBottom: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
              }}
            >
              <div>🧵 <strong>Fabric:</strong> {quickViewProduct.fabric || 'Pure Premium Silk & Combed Cotton'}</div>
              <div>🧼 <strong>Care:</strong> {quickViewProduct.wash_care || 'Dry Clean Recommended'}</div>
            </div>

            {/* Color Selection */}
            {quickViewProduct.colors && quickViewProduct.colors.length > 0 && (
              <div style={{ marginBottom: '18px' }}>
                <div style={{ fontSize: '12.5px', fontWeight: '700', color: '#18191f', marginBottom: '8px' }}>
                  Color: <span style={{ color: '#b89324', fontWeight: '600' }}>{selectedColor}</span>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {quickViewProduct.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      style={{
                        width: '30px',
                        height: '30px',
                        borderRadius: '50%',
                        background: c.hex,
                        border: selectedColor === c.name ? '3px solid #d4af37' : '1px solid #ccc',
                        cursor: 'pointer',
                        boxShadow: selectedColor === c.name ? '0 0 0 2px #fff' : 'none',
                      }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {quickViewProduct.sizes && quickViewProduct.sizes.length > 0 && (
              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div style={{ fontSize: '12.5px', fontWeight: '700', color: '#18191f' }}>
                    Select Size: <span style={{ color: '#b89324' }}>{selectedSize}</span>
                  </div>
                  <button
                    onClick={() => setIsSizeChartOpen(true)}
                    style={{ fontSize: '12px', color: '#b89324', textDecoration: 'underline', cursor: 'pointer' }}
                  >
                    📏 Size Chart
                  </button>
                </div>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {quickViewProduct.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      style={{
                        padding: '6px 14px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '700',
                        border: selectedSize === sz ? '1.5px solid #d4af37' : '1px solid #dcd9d0',
                        background: selectedSize === sz ? '#fdf6e2' : '#ffffff',
                        color: selectedSize === sz ? '#926d0a' : '#333',
                        cursor: 'pointer',
                      }}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Stepper & Add To Bag */}
            <div style={{ display: 'flex', gap: '12px', marginTop: 'auto', marginBottom: '14px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  border: '1px solid #dcd9d0',
                  borderRadius: '9999px',
                  background: '#faf9f6',
                  padding: '2px 8px',
                }}
              >
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{ padding: '6px 8px', color: '#333', cursor: 'pointer' }}
                >
                  <Minus size={14} />
                </button>
                <span style={{ fontSize: '14px', fontWeight: '700', minWidth: '28px', textAlign: 'center' }}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  style={{ padding: '6px 8px', color: '#333', cursor: 'pointer' }}
                >
                  <Plus size={14} />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="btn-gold"
                style={{ flex: 1, justifyContent: 'center', padding: '12px', cursor: 'pointer' }}
              >
                {isAdded ? (
                  <>
                    <Check size={16} /> Added to Bag
                  </>
                ) : (
                  <>
                    <ShoppingBag size={16} /> Add to Shopping Bag
                  </>
                )}
              </button>

              <button
                onClick={() => toggleWishlist(quickViewProduct)}
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  border: '1px solid #dcd9d0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#ffffff',
                  cursor: 'pointer',
                }}
                title="Wishlist"
              >
                <Heart size={18} fill={isFavorite ? '#e63946' : 'none'} color={isFavorite ? '#e63946' : '#333'} />
              </button>
            </div>

            {/* Buy Now Button */}
            <button
              onClick={handleBuyNow}
              className="btn-dark"
              style={{
                width: '100%',
                justifyContent: 'center',
                padding: '12px',
                fontSize: '14px',
                cursor: 'pointer',
              }}
            >
              ⚡ Instant Buy / Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
