'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Product } from '@/lib/db';

export default function SearchOverlay({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setLoading(true);
      fetch('/api/products')
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) setProducts(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
      
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const filteredProducts = query.trim() === '' 
    ? [] 
    : products.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) || 
        p.description.toLowerCase().includes(query.toLowerCase())
      );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] bg-background-cream/95 backdrop-blur-md flex flex-col animate-fade-in">
      <div className="flex items-center justify-between p-4 md:p-6 md:px-margin-desktop border-b border-outline-variant/20 bg-background-cream">
        <div className="flex items-center w-full max-w-4xl mx-auto gap-4 relative">
          <span className="material-symbols-outlined text-on-surface-variant absolute left-4 text-2xl">search</span>
          <input
            type="text"
            placeholder="Search for products, categories..."
            className="w-full bg-surface-container border-none outline-none font-headline-sm text-xl md:text-2xl text-on-surface placeholder:text-on-surface-variant/50 py-4 pl-14 pr-4 rounded-sm"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={onClose} className="p-2 ml-2 md:ml-4 shrink-0 hover:text-primary transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-3xl">close</span>
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 md:p-6 md:px-margin-desktop">
        <div className="max-w-4xl mx-auto">
          {query.trim() !== '' && (
            <div className="mb-6 text-label-md text-on-surface-variant uppercase tracking-widest border-b border-outline-variant/10 pb-4">
              {filteredProducts.length} Results
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <Link 
                href={`/product/${product.id}`} 
                key={product.id} 
                onClick={onClose}
                className="flex items-center gap-4 group p-3 hover:bg-surface-container transition-colors rounded-sm"
              >
                <div className="w-20 h-24 bg-surface-container-low shrink-0 relative overflow-hidden">
                  <img 
                    src={product.imageUrl || 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7XxYIOoLtAVepX37UOiTmBMk_AQLG25JeTG6HQnJ0c85vB2y6f0-KFyO4auvzRSiWc0QmUJois9_NSJn77c1iacooQl-cVU4BC9gqdfel8ecxI6L3M2EwKZHAuITsfX4KzzocoF9IXfOX-xHidK3lKCVratul2m5K04vKUW63a5tug-ZkvZfxd6m538Djk-2YV24srN_r1SmvyReE-3vrjvuK8qfgLqe2X3qpjF7N2yAOqVFbdijl8niRS-AvXIu80S7Wd0xxpgU'} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>
                <div>
                  <h4 className="font-headline-sm text-lg group-hover:text-primary transition-colors line-clamp-2">{product.name}</h4>
                  <p className="text-body-md text-primary font-medium mt-1">${product.price.toFixed(2)}</p>
                </div>
              </Link>
            ))}
          </div>
          
          {query.trim() !== '' && filteredProducts.length === 0 && !loading && (
            <div className="text-center py-16">
              <span className="material-symbols-outlined text-6xl text-on-surface-variant/30 mb-4 block">search_off</span>
              <p className="text-on-surface-variant font-body-lg">No products found for "{query}"</p>
            </div>
          )}
          
          {query.trim() === '' && !loading && (
            <div className="text-center py-16 opacity-50">
              <span className="material-symbols-outlined text-6xl text-on-surface-variant/30 mb-4 block">search</span>
              <p className="text-on-surface-variant font-body-lg">Type something to start searching</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
