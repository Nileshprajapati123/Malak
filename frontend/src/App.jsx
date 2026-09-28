import React, { useState, useEffect } from 'react';
import { ShopProvider } from './context/ShopContext';
import { fetchCategories, fetchProducts, DEMO_CATEGORIES, DEMO_PRODUCTS } from './services/api';
import Navbar from './components/Navbar';
import HeroSlider from './components/HeroSlider';
import CategoryPills from './components/CategoryPills';
import ProductGrid from './components/ProductGrid';
import DealOfTheDay from './components/DealOfTheDay';
import StyleLookbook from './components/StyleLookbook';
import CustomerReviews from './components/CustomerReviews';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import WishlistModal from './components/WishlistModal';
import QuickViewModal from './components/QuickViewModal';
import AuthModal from './components/AuthModal';
import SizeChartModal from './components/SizeChartModal';
import Toast from './components/Toast';

function MainShop() {
  const [categories, setCategories] = useState(DEMO_CATEGORIES);
  const [products, setProducts] = useState(DEMO_PRODUCTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadShopData() {
      try {
        const [cats, prods] = await Promise.all([
          fetchCategories(),
          fetchProducts(),
        ]);
        if (cats && cats.length > 0) setCategories(cats);
        if (prods && prods.length > 0) setProducts(prods);
      } catch (error) {
        console.warn('Error loading remote store data, using local fallback:', error);
      } finally {
        setLoading(false);
      }
    }

    loadShopData();
  }, []);

  // Pick high-impact deal product
  const dealProduct = products.find((p) => p.is_bestseller || p.discount_percent >= 40) || products[0];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#fcfbfa' }}>
      {/* Navigation Bar */}
      <Navbar />

      {/* Main Content */}
      <main style={{ flex: 1 }}>
        {/* Hero Section */}
        <HeroSlider />

        {/* Categories Showcase */}
        <CategoryPills categories={categories} />

        {/* Product Catalog Grid & Filters */}
        <ProductGrid products={products} />

        {/* Flash Sale / Deal of the Day */}
        <DealOfTheDay dealProduct={dealProduct} />

        {/* Complete Ensembles / Style Lookbook */}
        <StyleLookbook />

        {/* Customer Testimonials & Reviews */}
        <CustomerReviews />
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Interactive Drawers and Modals */}
      <CartDrawer />
      <WishlistModal />
      <QuickViewModal />
      <AuthModal />
      <SizeChartModal />
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <ShopProvider>
      <MainShop />
    </ShopProvider>
  );
}
