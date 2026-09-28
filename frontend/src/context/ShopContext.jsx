import React, { createContext, useContext, useState, useEffect } from 'react';
import { validateCouponCode } from '../services/api';

const ShopContext = createContext();

export function ShopProvider({ children }) {
  // Cart State (Persisted in localStorage)
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('malak_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist State (Persisted in localStorage)
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('malak_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // User State
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('malak_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);

  // Filters & Search
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  // Coupon State
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // Toasts
  const [toasts, setToasts] = useState([]);

  // Save Cart to LocalStorage
  useEffect(() => {
    localStorage.setItem('malak_cart', JSON.stringify(cart));
  }, [cart]);

  // Save Wishlist to LocalStorage
  useEffect(() => {
    localStorage.setItem('malak_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Save User to LocalStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('malak_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('malak_user');
      localStorage.removeItem('access_token');
    }
  }, [user]);

  // Toast System
  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart Functions
  const addToCart = (product, size = null, color = null, quantity = 1) => {
    const selectedSize = size || product.sizes?.[0] || 'Standard';
    const selectedColor = color || product.colors?.[0]?.name || 'Standard';
    const cartItemId = `${product.id}-${selectedSize}-${selectedColor}`;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prevCart,
          {
            cartItemId,
            id: product.id,
            product_name: product.product_name,
            price: product.price,
            original_price: product.original_price,
            image: product.image,
            category_name: product.category_name,
            size: selectedSize,
            color: selectedColor,
            quantity: quantity,
          },
        ];
      }
    });

    addToast(`Added "${product.product_name}" to your shopping bag! 🛍️`);
  };

  const updateCartQuantity = (cartItemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
    } else {
      setCart((prev) =>
        prev.map((item) =>
          item.cartItemId === cartItemId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const removeFromCart = (cartItemId) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
    addToast('Item removed from shopping bag', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  // Coupon Logic
  const applyCoupon = async (code) => {
    if (!code || !code.trim()) return false;
    const res = await validateCouponCode(code);
    if (res.success && res.data) {
      const { code: couponName, discount_rate, discount_amount, free_shipping, description } = res.data;
      setAppliedCoupon({
        code: couponName,
        discountRate: discount_rate || 0,
        discountAmount: discount_amount || 0,
        freeShipping: free_shipping || false,
        desc: description || `Coupon ${couponName} Applied`
      });
      addToast(`Coupon ${couponName} applied! ${description || ''} 🎉`);
      return true;
    } else {
      addToast(res.error || 'Invalid or expired coupon code.', 'error');
      return false;
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    addToast('Coupon removed');
  };

  // Cart Totals
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = appliedCoupon?.discountRate
    ? cartSubtotal * appliedCoupon.discountRate
    : (appliedCoupon?.discountAmount || 0);
  const shippingFee = (cartSubtotal > 999 || appliedCoupon?.freeShipping || cart.length === 0) ? 0 : 99;
  const cartTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Wishlist Functions
  const toggleWishlist = (product) => {
    const exists = wishlist.some((item) => item.id === product.id);
    if (exists) {
      setWishlist((prev) => prev.filter((item) => item.id !== product.id));
      addToast(`Removed "${product.product_name}" from Wishlist`);
    } else {
      setWishlist((prev) => [...prev, product]);
      addToast(`Saved "${product.product_name}" to Wishlist! ❤️`);
    }
  };

  const isWishlisted = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  // Auth Functions
  const login = (userData) => {
    setUser(userData);
    setIsAuthOpen(false);
    addToast(`Welcome back, ${userData.username || 'Fashionista'}! ✨`);
  };

  const logout = () => {
    setUser(null);
    addToast('Logged out successfully. See you soon!');
  };

  return (
    <ShopContext.Provider
      value={{
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
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        wishlist,
        toggleWishlist,
        isWishlisted,
        isWishlistOpen,
        setIsWishlistOpen,
        user,
        login,
        logout,
        isAuthOpen,
        setIsAuthOpen,
        authMode,
        setAuthMode,
        quickViewProduct,
        setQuickViewProduct,
        isSizeChartOpen,
        setIsSizeChartOpen,
        activeCategory,
        setActiveCategory,
        searchQuery,
        setSearchQuery,
        sortBy,
        setSortBy,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
}
