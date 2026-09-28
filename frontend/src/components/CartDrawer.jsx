import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { submitOrder } from '../services/api';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Tag
} from 'lucide-react';

export default function CartDrawer() {
  const {
    cart,
    cartCount,
    cartSubtotal,
    discountAmount,
    shippingFee,
    cartTotal,
    appliedCoupon,
    couponCode,
    setCouponCode,
    applyCoupon,
    removeCoupon,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    isCartOpen,
    setIsCartOpen,
    addToast
  } = useShop();

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    paymentMethod: 'cod',
  });

  if (!isCartOpen) return null;

  const freeDeliveryThreshold = 999;
  const progressToFreeShipping = Math.min(100, (cartSubtotal / freeDeliveryThreshold) * 100);
  const amountNeededForFreeShipping = Math.max(0, freeDeliveryThreshold - cartSubtotal);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    applyCoupon(couponCode);
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!checkoutForm.name || !checkoutForm.phone || !checkoutForm.address) {
      addToast('Please fill all required delivery details', 'error');
      return;
    }

    setIsSubmitting(true);
    const orderPayload = {
      full_name: checkoutForm.name,
      phone: checkoutForm.phone,
      address: checkoutForm.address,
      city: checkoutForm.city || 'India',
      pincode: checkoutForm.pincode || '395003',
      payment_method: checkoutForm.paymentMethod,
      subtotal: cartSubtotal,
      discount_amount: discountAmount,
      shipping_fee: shippingFee,
      total_amount: cartTotal,
      coupon_code: appliedCoupon?.code || '',
      items: cart.map((item) => ({
        product: item.id,
        product_name: item.product_name,
        size: item.size,
        color: item.color,
        price: item.price,
        quantity: item.quantity,
        image_url: item.image || '',
      })),
    };

    const res = await submitOrder(orderPayload);
    setIsSubmitting(false);

    if (res.success) {
      setOrderPlaced(true);
      setTimeout(() => {
        clearCart();
        setOrderPlaced(false);
        setIsCheckingOut(false);
        setIsCartOpen(false);
        addToast(`Order #${res.data?.order_number || 'MALAK'} confirmed! Tracking details sent via SMS 📦🎉`);
      }, 2500);
    } else {
      addToast('Error placing order. Please try again.', 'error');
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(11, 12, 16, 0.7)',
        backdropFilter: 'blur(5px)',
        zIndex: 1200,
        display: 'flex',
        justifyContent: 'flex-end',
        animation: 'fadeIn 0.2s ease',
      }}
      onClick={() => setIsCartOpen(false)}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '460px',
          height: '100%',
          background: '#ffffff',
          boxShadow: '-10px 0 35px rgba(0,0,0,0.25)',
          display: 'flex',
          flexDirection: 'column',
          animation: 'slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
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
            background: '#ffffff',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShoppingBag size={20} color="#d4af37" />
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '19px', color: '#0b0c10' }}>
              Shopping Bag ({cartCount})
            </h3>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              background: '#f4f3ef',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#333',
              cursor: 'pointer',
            }}
            aria-label="Close Shopping Bag"
          >
            <X size={18} />
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div style={{ background: '#fdf6e2', padding: '12px 24px', borderBottom: '1px solid #f2e2b8' }}>
          {cartSubtotal >= freeDeliveryThreshold ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#11694e', fontSize: '12.5px', fontWeight: '700' }}>
              <CheckCircle2 size={15} /> 🎉 Congratulations! You unlocked <strong>FREE Express Delivery</strong>!
            </div>
          ) : (
            <div>
              <div style={{ fontSize: '12px', color: '#926d0a', marginBottom: '6px', fontWeight: '600' }}>
                Add <strong style={{ color: '#0b0c10' }}>₹{amountNeededForFreeShipping}</strong> more to unlock <strong>FREE Delivery</strong>!
              </div>
              <div style={{ width: '100%', height: '6px', background: '#e9dfc4', borderRadius: '3px', overflow: 'hidden' }}>
                <div
                  style={{
                    width: `${progressToFreeShipping}%`,
                    height: '100%',
                    background: '#d4af37',
                    borderRadius: '3px',
                    transition: 'width 0.3s ease',
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Cart Items List or Checkout Screen */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>
          {orderPlaced ? (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <div
                style={{
                  width: '70px',
                  height: '70px',
                  borderRadius: '50%',
                  background: '#e6f6ee',
                  color: '#11694e',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                }}
              >
                <CheckCircle2 size={40} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: '#0b0c10', marginBottom: '8px' }}>
                Thank You for Your Order!
              </h3>
              <p style={{ color: '#5e6472', fontSize: '14px', lineHeight: '1.5' }}>
                Your festive couture order from <strong>Malak Fashion Hub</strong> is confirmed and being prepared by our master tailors.
              </p>
            </div>
          ) : isCheckingOut ? (
            /* Checkout Form */
            <form onSubmit={handlePlaceOrder} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '17px', color: '#0b0c10' }}>
                  Delivery Details
                </h4>
                <button
                  type="button"
                  onClick={() => setIsCheckingOut(false)}
                  style={{ fontSize: '12px', color: '#b89324', textDecoration: 'underline' }}
                >
                  ← Back to Bag
                </button>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: '700', color: '#444' }}>Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={checkoutForm.name}
                  onChange={(e) => setCheckoutForm({ ...checkoutForm, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: '8px',
                    border: '1px solid #dcd9d0',
                    marginTop: '4px',
                    fontSize: '13.5px',
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: '700', color: '#444' }}>Mobile Number (For WhatsApp Updates) *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9876543210"
                  value={checkoutForm.phone}
                  onChange={(e) => setCheckoutForm({ ...checkoutForm, phone: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: '8px',
                    border: '1px solid #dcd9d0',
                    marginTop: '4px',
                    fontSize: '13.5px',
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: '700', color: '#444' }}>Street Address & Landmark *</label>
                <textarea
                  rows={2}
                  required
                  placeholder="House / Flat No., Street, Landmark"
                  value={checkoutForm.address}
                  onChange={(e) => setCheckoutForm({ ...checkoutForm, address: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: '8px',
                    border: '1px solid #dcd9d0',
                    marginTop: '4px',
                    fontSize: '13.5px',
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: '700', color: '#444' }}>City</label>
                  <input
                    type="text"
                    placeholder="e.g. Surat"
                    value={checkoutForm.city}
                    onChange={(e) => setCheckoutForm({ ...checkoutForm, city: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '9px 12px',
                      borderRadius: '8px',
                      border: '1px solid #dcd9d0',
                      marginTop: '4px',
                      fontSize: '13.5px',
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '12px', fontWeight: '700', color: '#444' }}>Pincode</label>
                  <input
                    type="text"
                    placeholder="e.g. 395003"
                    value={checkoutForm.pincode}
                    onChange={(e) => setCheckoutForm({ ...checkoutForm, pincode: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '9px 12px',
                      borderRadius: '8px',
                      border: '1px solid #dcd9d0',
                      marginTop: '4px',
                      fontSize: '13.5px',
                    }}
                  />
                </div>
              </div>

              {/* Payment Method Selector */}
              <div style={{ marginTop: '8px' }}>
                <label style={{ fontSize: '12px', fontWeight: '700', color: '#444', marginBottom: '6px', display: 'block' }}>
                  Payment Mode
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: checkoutForm.paymentMethod === 'cod' ? '1.5px solid #d4af37' : '1px solid #e0ded8',
                      background: checkoutForm.paymentMethod === 'cod' ? '#fdf6e2' : '#ffffff',
                      cursor: 'pointer',
                    }}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={checkoutForm.paymentMethod === 'cod'}
                      onChange={() => setCheckoutForm({ ...checkoutForm, paymentMethod: 'cod' })}
                    />
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: '700', color: '#18191f' }}>Cash on Delivery (COD)</div>
                      <div style={{ fontSize: '11px', color: '#666' }}>Pay in cash/UPI upon delivery</div>
                    </div>
                  </label>

                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: checkoutForm.paymentMethod === 'online' ? '1.5px solid #d4af37' : '1px solid #e0ded8',
                      background: checkoutForm.paymentMethod === 'online' ? '#fdf6e2' : '#ffffff',
                      cursor: 'pointer',
                    }}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={checkoutForm.paymentMethod === 'online'}
                      onChange={() => setCheckoutForm({ ...checkoutForm, paymentMethod: 'online' })}
                    />
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: '700', color: '#18191f' }}>UPI / Net Banking / Cards</div>
                      <div style={{ fontSize: '11px', color: '#666' }}>Instant secure digital payment</div>
                    </div>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="btn-gold"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  padding: '14px',
                  marginTop: '10px',
                  fontSize: '15px',
                  fontWeight: '700',
                  cursor: 'pointer',
                }}
              >
                Confirm & Place Order (₹{cartTotal.toLocaleString()})
              </button>
            </form>
          ) : cart.length === 0 ? (
            /* Empty Cart */
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: '#f6f5f2',
                  color: '#9aa0a6',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '14px',
                }}
              >
                <ShoppingBag size={30} />
              </div>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', color: '#18191f', marginBottom: '6px' }}>
                Your Shopping Bag is Empty
              </h4>
              <p style={{ color: '#7a8190', fontSize: '13.5px', marginBottom: '20px' }}>
                Discover our royal ethnic kurtas, designer sarees & streetwear tees.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="btn-gold"
                style={{ padding: '10px 24px', fontSize: '13px' }}
              >
                Start Shopping
              </button>
            </div>
          ) : (
            /* Cart Items List */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {cart.map((item) => (
                <div
                  key={item.cartItemId}
                  style={{
                    display: 'flex',
                    gap: '14px',
                    paddingBottom: '16px',
                    borderBottom: '1px solid #f2f0ea',
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.product_name}
                    style={{
                      width: '74px',
                      height: '92px',
                      borderRadius: '10px',
                      objectFit: 'cover',
                      border: '1px solid #eee',
                    }}
                  />

                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <h5 style={{ fontSize: '14px', fontWeight: '600', color: '#18191f', lineHeight: '1.3' }}>
                        {item.product_name}
                      </h5>
                      <button
                        onClick={() => removeFromCart(item.cartItemId)}
                        style={{ color: '#9aa0a6', padding: '2px', cursor: 'pointer' }}
                        title="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div style={{ fontSize: '12px', color: '#7a8190', margin: '4px 0 8px' }}>
                      Size: <strong style={{ color: '#333' }}>{item.size}</strong> | Color: <strong style={{ color: '#333' }}>{item.color}</strong>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                      {/* Quantity Stepper */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          border: '1px solid #dcd9d0',
                          borderRadius: '6px',
                          background: '#faf9f6',
                        }}
                      >
                        <button
                          onClick={() => updateCartQuantity(item.cartItemId, item.quantity - 1)}
                          style={{ padding: '4px 8px', color: '#444', cursor: 'pointer' }}
                        >
                          <Minus size={13} />
                        </button>
                        <span style={{ fontSize: '13px', fontWeight: '700', padding: '0 8px', minWidth: '24px', textAlign: 'center' }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.cartItemId, item.quantity + 1)}
                          style={{ padding: '4px 8px', color: '#444', cursor: 'pointer' }}
                        >
                          <Plus size={13} />
                        </button>
                      </div>

                      {/* Item Total Price */}
                      <span style={{ fontWeight: '700', fontSize: '15px', color: '#0b0c10', fontFamily: 'var(--font-display)' }}>
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Coupon Form */}
              <div style={{ marginTop: '8px' }}>
                {appliedCoupon ? (
                  <div
                    style={{
                      background: '#fdf6e2',
                      border: '1px dashed #d4af37',
                      borderRadius: '8px',
                      padding: '10px 14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '12.5px', fontWeight: '700', color: '#926d0a', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <Tag size={13} /> Code: {appliedCoupon.code}
                      </div>
                      <div style={{ fontSize: '11px', color: '#b89324' }}>{appliedCoupon.desc}</div>
                    </div>
                    <button
                      onClick={removeCoupon}
                      style={{ fontSize: '11px', color: '#e63946', fontWeight: '700', textDecoration: 'underline' }}
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '8px' }}>
                    <input
                      type="text"
                      placeholder="Coupon: MALAK50 or FIRST10"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      style={{
                        flex: 1,
                        padding: '8px 12px',
                        borderRadius: '8px',
                        border: '1px solid #dcd9d0',
                        fontSize: '13px',
                        textTransform: 'uppercase',
                      }}
                    />
                    <button
                      type="submit"
                      style={{
                        padding: '8px 16px',
                        borderRadius: '8px',
                        background: '#0b0c10',
                        color: '#ffffff',
                        fontSize: '12.5px',
                        fontWeight: '700',
                        cursor: 'pointer',
                      }}
                    >
                      Apply
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer Summary & Checkout Button */}
        {cart.length > 0 && !isCheckingOut && !orderPlaced && (
          <div
            style={{
              padding: '20px 24px',
              borderTop: '1px solid #ebe8e0',
              background: '#ffffff',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#5e6472' }}>
                <span>Subtotal</span>
                <span>₹{cartSubtotal.toLocaleString()}</span>
              </div>

              {discountAmount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#11694e', fontWeight: '600' }}>
                  <span>Discount ({appliedCoupon?.code})</span>
                  <span>- ₹{discountAmount.toLocaleString()}</span>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#5e6472' }}>
                <span>Express Shipping</span>
                <span>{shippingFee === 0 ? <strong style={{ color: '#11694e' }}>FREE</strong> : `₹${shippingFee}`}</span>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '17px',
                  fontWeight: '800',
                  color: '#0b0c10',
                  borderTop: '1px solid #f2f0ea',
                  paddingTop: '8px',
                }}
              >
                <span>Total Amount</span>
                <span style={{ fontFamily: 'var(--font-display)', color: '#d4af37' }}>
                  ₹{cartTotal.toLocaleString()}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsCheckingOut(true)}
              className="btn-gold"
              style={{
                width: '100%',
                justifyContent: 'center',
                padding: '14px',
                fontSize: '15px',
                fontWeight: '700',
                cursor: 'pointer',
              }}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
