import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import ProductCard from './ProductCard';
import { Filter, SlidersHorizontal, Search, RefreshCw, Sparkles } from 'lucide-react';

export default function ProductGrid({ products = [] }) {
  const {
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
  } = useShop();

  const [inStockOnly, setInStockOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState(15000);

  const categories = [
    { name: 'All Styles', slug: 'all' },
    { name: "Men's Ethnic", slug: 'mens-ethnic' },
    { name: "Women's Ethnic", slug: 'womens-ethnic' },
    { name: "Streetwear & Tees", slug: 'casual-streetwear' },
    { name: "Festive & Bridal", slug: 'festive-wedding' },
    { name: "Kids Collection", slug: 'kids-collection' },
  ];

  // Filter and Sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (activeCategory !== 'all') {
          const matchCat =
            p.category_slug === activeCategory ||
            p.category_name?.toLowerCase().includes(activeCategory.replace('-', ' '));
          if (!matchCat) return false;
        }

        // Search query filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchSearch =
            p.product_name.toLowerCase().includes(q) ||
            p.category_name?.toLowerCase().includes(q) ||
            p.description?.toLowerCase().includes(q);
          if (!matchSearch) return false;
        }

        // In stock filter
        if (inStockOnly && !p.is_available) return false;

        // Price filter
        if (p.price > maxPrice) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
        if (sortBy === 'discount') return (b.discount_percent || 0) - (a.discount_percent || 0);
        return 0; // default featured
      });
  }, [products, activeCategory, searchQuery, inStockOnly, maxPrice, sortBy]);

  const handleResetFilters = () => {
    setActiveCategory('all');
    setSearchQuery('');
    setSortBy('featured');
    setMaxPrice(15000);
    setInStockOnly(false);
  };

  return (
    <section id="catalog-section" style={{ padding: '60px 0 80px', background: '#fcfbfa' }}>
      <div className="container">
        {/* Section Title */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '36px' }}>
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
            <Sparkles size={14} /> EXCLUSIVE ATTIRE & COUTURE
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '32px', color: '#0b0c10' }}>
            Featured Fashion Hub Catalog
          </h2>
          <p style={{ color: '#6d7588', maxWidth: '520px', fontSize: '15px', marginTop: '6px' }}>
            Discover our hand-picked wardrobe pieces, tailored in breathable luxury fabrics with contemporary flair.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: '16px',
            padding: '18px 20px',
            border: '1px solid #eae8e1',
            boxShadow: '0 4px 18px rgba(0,0,0,0.04)',
            marginBottom: '32px',
          }}
        >
          {/* Top Row: Category Tabs */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              overflowX: 'auto',
              paddingBottom: '12px',
              borderBottom: '1px solid #f2f0ea',
              scrollbarWidth: 'none',
            }}
          >
            {categories.map((cat) => {
              const isActive = activeCategory === cat.slug;
              return (
                <button
                  key={cat.slug}
                  onClick={() => setActiveCategory(cat.slug)}
                  style={{
                    padding: '8px 18px',
                    borderRadius: '9999px',
                    fontSize: '13px',
                    fontWeight: isActive ? '700' : '600',
                    background: isActive
                      ? 'linear-gradient(135deg, #0b0c10 0%, #1e2230 100%)'
                      : '#f7f6f2',
                    color: isActive ? '#ffffff' : '#444b59',
                    border: isActive ? '1px solid #d4af37' : '1px solid #e7e5dc',
                    whiteSpace: 'nowrap',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>

          {/* Bottom Row: Controls (Sort, Price Slider, Results Count) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '14px',
              flexWrap: 'wrap',
              gap: '14px',
            }}
          >
            {/* Results Count & Active Search Tag */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '13.5px', fontWeight: '600', color: '#18191f' }}>
                Showing <strong style={{ color: '#d4af37' }}>{filteredProducts.length}</strong> items
              </span>
              {searchQuery && (
                <span
                  style={{
                    background: '#fdf6e2',
                    color: '#926d0a',
                    border: '1px solid #d4af37',
                    padding: '2px 10px',
                    borderRadius: '9999px',
                    fontSize: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <Search size={12} /> "{searchQuery}"
                </span>
              )}
            </div>

            {/* Sort & Quick Filters */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              {/* Sort By Dropdown */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '12.5px', color: '#6d7588', fontWeight: '500' }}>Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '8px',
                    border: '1px solid #dcd9d0',
                    background: '#ffffff',
                    fontSize: '13px',
                    fontWeight: '600',
                    color: '#18191f',
                    outline: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <option value="featured">✨ Featured Collection</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated (Stars)</option>
                  <option value="discount">Biggest Discount</option>
                </select>
              </div>

              {/* Price Filter */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '12.5px', color: '#6d7588' }}>Max ₹{maxPrice.toLocaleString()}</span>
                <input
                  type="range"
                  min="1000"
                  max="15000"
                  step="500"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  style={{ width: '90px', accentColor: '#d4af37', cursor: 'pointer' }}
                />
              </div>

              {/* Reset Filter Button */}
              {(activeCategory !== 'all' || searchQuery || sortBy !== 'featured' || maxPrice < 15000) && (
                <button
                  onClick={handleResetFilters}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    background: '#fde8eb',
                    color: '#9e1b32',
                    fontSize: '12px',
                    fontWeight: '700',
                    cursor: 'pointer',
                  }}
                >
                  <RefreshCw size={12} /> Reset
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '24px',
            }}
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div
            style={{
              textAlign: 'center',
              padding: '60px 20px',
              background: '#ffffff',
              borderRadius: '16px',
              border: '1px dashed #dcd9d0',
            }}
          >
            <div
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: '#fdf6e2',
                color: '#b89324',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px',
              }}
            >
              <Search size={28} />
            </div>
            <h3 style={{ fontSize: '20px', marginBottom: '8px', color: '#18191f' }}>
              No apparel matches your filter
            </h3>
            <p style={{ color: '#7a8190', maxWidth: '420px', margin: '0 auto 20px', fontSize: '14px' }}>
              Try broadening your search query or reset the category and price filters to explore all items.
            </p>
            <button onClick={handleResetFilters} className="btn-gold">
              Reset Filters & View All
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
