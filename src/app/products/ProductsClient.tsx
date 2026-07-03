'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { Product } from '@/lib/data';
import ProductCard from '@/components/ui/ProductCard';
import ScrollReveal from '@/components/ui/ScrollReveal';
import DivisionLine from '@/components/ui/DivisionLine';

export default function ProductsClient({ products }: { products: Product[] }) {
  const [search, setSearch] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Filter & Sort states
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortOrder, setSortOrder] = useState<string>('featured');
  const [showOnlyTagged, setShowOnlyTagged] = useState<boolean>(false);

  // Derived unique categories
  const categories = useMemo(() => {
    const cats = new Set(products.map(p => p.category));
    return ['All', ...Array.from(cats)];
  }, [products]);

  // Derived filtered & sorted products
  const filteredAndSortedProducts = useMemo(() => {
    // 1. Search Filter
    let filtered = products.filter(p => 
      p.name.toLowerCase().includes(search.toLowerCase()) || 
      p.category.toLowerCase().includes(search.toLowerCase())
    );
    
    // 2. Category Filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }
    
    // 3. Tag Filter
    if (showOnlyTagged) {
      filtered = filtered.filter(p => p.tag && p.tag.trim() !== '');
    }
    
    // 4. Sort
    filtered.sort((a, b) => {
      if (sortOrder === 'price-asc' || sortOrder === 'price-desc') {
        const priceA = parseInt(a.price.replace(/[^0-9]/g, ''), 10) || 0;
        const priceB = parseInt(b.price.replace(/[^0-9]/g, ''), 10) || 0;
        return sortOrder === 'price-asc' ? priceA - priceB : priceB - priceA;
      }
      if (sortOrder === 'name') {
        return a.name.localeCompare(b.name);
      }
      return 0; // 'featured' keeps original array order
    });
    
    return filtered;
  }, [products, search, selectedCategory, showOnlyTagged, sortOrder]);

  // Derived search suggestions
  const suggestions = useMemo(() => {
    if (!search.trim()) return [];
    return products.filter(p => 
      p.name.toLowerCase().includes(search.toLowerCase()) || 
      p.category.toLowerCase().includes(search.toLowerCase())
    ).slice(0, 4);
  }, [products, search]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      {/* Top connect banner */}
      <div style={{ background: 'var(--fg)', color: 'var(--bg)', padding: '0.875rem', textAlign: 'center' }}>
        <a href="/contact" style={{ color: 'inherit', textDecoration: 'none', fontSize: '0.8125rem', letterSpacing: '0.04em', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
          Connect for the latest catalogue and studio experiences 
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>

      <div className="page-hero container" style={{ paddingBottom: 'var(--space-md)' }}>
        <ScrollReveal>
          <h1 className="display-lg" style={{ letterSpacing: '-0.04em' }}>Shop</h1>
        </ScrollReveal>
      </div>

      {/* Search Bar & Controls */}
      <div className="container" style={{ paddingBottom: 'var(--space-xl)' }}>
        <ScrollReveal delay={1}>
          
          {/* SEARCH COMPONENT */}
          {/* Added relative positioning and z-index to explicitly overlay division lines/content below */}
          <div style={{ position: 'relative', zIndex: 50, marginBottom: 'var(--space-xl)' }}>
            <div ref={searchRef} style={{ position: 'relative', maxWidth: '480px' }}>
              <div style={{ position: 'relative' }}>
                <input 
                  type="text" 
                  placeholder="Search objects, seating, lighting..." 
                  value={search}
                  onChange={e => {
                    setSearch(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  style={{
                    width: '100%',
                    padding: '1.25rem 0',
                    background: 'transparent',
                    border: 'none',
                    borderBottom: '1px solid var(--fg)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '1.25rem',
                    color: 'var(--fg)',
                    outline: 'none',
                    transition: 'border-color 0.2s ease'
                  }}
                />
                <svg style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', color: 'var(--fg)' }} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>

              {/* Suggestions Dropdown */}
              {showSuggestions && suggestions.length > 0 && (
                <div style={{
                  position: 'absolute',
                  top: 'calc(100% + 1px)',
                  left: 0,
                  right: 0,
                  background: 'var(--bg)',
                  border: '1px solid var(--border)',
                  borderTop: 'none',
                  zIndex: 60,
                  boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
                }}>
                  {suggestions.map(s => (
                    <a 
                      key={s.slug} 
                      href={`/products/${s.slug}`}
                      style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        padding: '1.25rem', 
                        textDecoration: 'none', 
                        color: 'var(--fg)', 
                        borderBottom: '1px solid var(--border)',
                        transition: 'background 0.15s ease'
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-subtle)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      <span className="body-base" style={{ fontWeight: 500 }}>{s.name}</span>
                      <span className="label text-muted">{s.category}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* FILTER & SORT CONTROLS */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-md)', justifyContent: 'space-between', alignItems: 'center' }}>
            {/* Category Pills */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '0.4rem 1rem',
                    borderRadius: '2rem',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    background: selectedCategory === cat ? 'var(--fg)' : 'transparent',
                    color: selectedCategory === cat ? 'var(--bg)' : 'var(--fg-muted)',
                    border: `1px solid ${selectedCategory === cat ? 'var(--fg)' : 'var(--border-strong)'}`,
                    transition: 'all 0.2s ease'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Sort & Tag Toggles */}
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--fg-muted)' }}>
                <input 
                  type="checkbox" 
                  checked={showOnlyTagged} 
                  onChange={e => setShowOnlyTagged(e.target.checked)} 
                  style={{ accentColor: 'var(--fg)', width: '14px', height: '14px' }} 
                />
                Special Editions
              </label>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--fg-muted)', fontWeight: 500 }}>Sort</span>
                <select 
                  value={sortOrder} 
                  onChange={e => setSortOrder(e.target.value)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    borderBottom: '1px solid var(--border-strong)',
                    color: 'var(--fg)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    padding: '0.4rem 0.5rem 0.4rem 0',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <option value="featured" style={{ color: '#000' }}>Featured</option>
                  <option value="price-asc" style={{ color: '#000' }}>Price: Low to High</option>
                  <option value="price-desc" style={{ color: '#000' }}>Price: High to Low</option>
                  <option value="name" style={{ color: '#000' }}>Name (A-Z)</option>
                </select>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>

      <DivisionLine className="container" />

      {/* Products grid */}
      <div className="container" style={{ paddingTop: 'var(--space-xl)', paddingBottom: 'var(--space-2xl)' }}>
        {filteredAndSortedProducts.length > 0 ? (
          <div className="products-grid">
            {filteredAndSortedProducts.map((product, i) => (
              <ScrollReveal key={product.slug} delay={(i % 4) as 0|1|2|3|4|5}>
                <ProductCard product={product} />
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <div style={{ padding: 'var(--space-xl) 0', textAlign: 'center' }}>
            <p className="body-lg text-muted">No objects found matching your filters.</p>
            <button 
              onClick={() => {
                setSearch('');
                setSelectedCategory('All');
                setShowOnlyTagged(false);
                setSortOrder('featured');
              }}
              style={{
                marginTop: '1rem',
                padding: '0.5rem 1.5rem',
                border: '1px solid var(--fg)',
                background: 'transparent',
                color: 'var(--fg)',
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                fontWeight: 500
              }}
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </>
  );
}
