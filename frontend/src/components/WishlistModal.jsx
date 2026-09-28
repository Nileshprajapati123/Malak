import React from 'react';
import { useShop } from '../context/ShopContext';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';

export default function WishlistModal() {
  const {
    wishlist,
    toggleWishlist,
    addToCart,
    isWishlistOpen,
    setIsWishlistOpen,
  } = useShop();

  if (!isWishlistOpen) return null;

  return (
    <div
      className="modal-overlay"
      onClick={() => setIsWishlistOpen(false)}
    >
      <div
        style={{
          background: '#ffffff',
          borderRadius: '20px',
          width: '100%',
          maxWidth: '680px',
          maxHeight: '85vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
          overflow: 'hidden',
          animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid #ebe8e0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Heart size={20} color="#e63946" fill="#e63946" />
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', color: '#0b0c10' }}>
              My Wishlist ({wishlist.length})
            </h3>
          </div>

          <button
            onClick={() => setIsWishlistOpen(false)}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: '#f4f3ef',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#333',
              cursor: 'pointer',
            }}
            aria-label="Close Wishlist"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          {wishlist.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: '#fde8eb',
                  color: '#e63946',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '14px',
                }}
              >
                <Heart size={28} />
              </div>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', color: '#18191f', marginBottom: '6px' }}>
                Your Wishlist is Empty
              </h4>
              <p style={{ color: '#7a8190', fontSize: '14px', marginBottom: '20px' }}>
                Tap the heart icon on any outfit to save your favorite wedding sherwanis, sarees, or casual tees.
              </p>
              <button
                onClick={() => setIsWishlistOpen(false)}
                className="btn-gold"
                style={{ padding: '10px 24px', fontSize: '13px' }}
              >
                Explore Catalog
              </button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '18px' }}>
              {wishlist.map((item) => (
                <div
                  key={item.id}
                  style={{
                    border: '1px solid #ebe8e0',
                    borderRadius: '14px',
                    overflow: 'hidden',
                    background: '#ffffff',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <div style={{ position: 'relative', height: '180px' }}>
                    <img
                      src={item.image}
                      alt={item.product_name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <button
                      onClick={() => toggleWishlist(item)}
                      style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.9)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#e63946',
                        cursor: 'pointer',
                      }}
                      title="Remove"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>

                  <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <h5
                      style={{
                        fontSize: '13.5px',
                        fontWeight: '600',
                        color: '#18191f',
                        marginBottom: '6px',
                        lineHeight: '1.3',
                      }}
                    >
                      {item.product_name}
                    </h5>

                    <div style={{ fontSize: '16px', fontWeight: '800', color: '#0b0c10', fontFamily: 'var(--font-display)', marginBottom: '12px' }}>
                      ₹{item.price.toLocaleString()}
                    </div>

                    <button
                      onClick={() => {
                        addToCart(item, item.sizes?.[0], item.colors?.[0]?.name, 1);
                        toggleWishlist(item);
                      }}
                      className="btn-gold"
                      style={{
                        width: '100%',
                        justifyContent: 'center',
                        padding: '9px 12px',
                        fontSize: '12.5px',
                        marginTop: 'auto',
                      }}
                    >
                      <ShoppingBag size={14} /> Move to Bag
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
