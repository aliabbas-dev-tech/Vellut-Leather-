'use client';
import { useEffect, useState } from 'react';
import { Product } from '@/lib/db';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';

export default function ProductGrid({ collectionName }: { collectionName?: string }) {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [collectionDetails, setCollectionDetails] = useState<any>(null);
  const [allCollections, setAllCollections] = useState<any[]>([]);
  const [selectedFilterCollection, setSelectedFilterCollection] = useState<string | null>(collectionName || null);
  const addItem = useCartStore(state => state.addItem);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setAllProducts(data);
        } else {
          console.error('API Error:', data);
          setAllProducts([]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Fetch Error:', err);
        setAllProducts([]);
        setLoading(false);
      });

    fetch('/api/collections')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setAllCollections(data);
          if (collectionName) {
            const found = data.find(c => c.name.toLowerCase() === collectionName.toLowerCase());
            if (found) setCollectionDetails(found);
          }
        }
      })
      .catch(err => console.error('Error fetching collections:', err));
  }, [collectionName]);

  // Derived state for filtering
  const displayedProducts = selectedFilterCollection
    ? allProducts.filter(p =>
        p.product_collections?.some((pc: any) =>
          pc.collections?.name.toLowerCase() === selectedFilterCollection.toLowerCase()
        )
      )
    : allProducts;

  return (
    <section className="px-6 md:px-margin-desktop py-section-gap w-full" id="collection">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
        <div>
          <h3 className="font-headline-md text-headline-md text-on-surface mb-2">
            {collectionDetails ? collectionDetails.name.toUpperCase() : 'EXPLORE OUR COLLECTION'}
          </h3>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-lg">
            {collectionDetails?.description || 'Curated essentials for the modern traveler, handcrafted with sustainably sourced, full-grain Italian leather.'}
          </p>
        </div>
        {/* Filter */}
        <div className="flex flex-wrap gap-4 border-b border-outline-variant/30 pb-2">
          <div className="relative">
            <select
              value={selectedFilterCollection || ''}
              onChange={(e) => {
                const val = e.target.value;
                setSelectedFilterCollection(val === '' ? null : val);
                
                // Update header text based on selection
                if (val === '') {
                  setCollectionDetails(null);
                } else {
                  const found = allCollections.find(c => c.name === val);
                  if (found) setCollectionDetails(found);
                }
              }}
              className="appearance-none bg-transparent font-label-md text-label-md uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors pb-2 pr-8 focus:outline-none cursor-pointer"
            >
              <option value="">ALL COLLECTIONS</option>
              {allCollections.map(c => (
                <option key={c.id} value={c.name}>{c.name.toUpperCase()}</option>
              ))}
            </select>
            <span className="material-symbols-outlined absolute right-0 top-0 pointer-events-none text-secondary text-sm">expand_more</span>
          </div>
        </div>
      </div>

      {collectionDetails?.image_url && (
        <div className="w-full h-[300px] md:h-[400px] mb-12 bg-surface-variant overflow-hidden relative">
          <img
            src={collectionDetails.image_url}
            alt={`${collectionDetails.name} leather collection — handcrafted premium travel bags by Vellut Leather`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
             <h2 className="text-white font-display-lg text-4xl md:text-5xl tracking-widest uppercase">{collectionDetails.name}</h2>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center">Loading collection...</div>
      ) : (
        <div className="grid grid-cols-3 lg:grid-cols-4 gap-y-12 gap-x-2 md:gap-x-8">
          {displayedProducts.map(product => (
            <div key={product.id} className="luxury-hover group animate-fade-in relative">
              <Link href={`/product/${product.id}`} className="block">
                <div className="relative aspect-[4/5] bg-surface-container-low overflow-hidden mb-6">
                  <img
                    alt={`${product.name} — handcrafted premium leather bag by Vellut Leather`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    src={product.imageUrl || "https://lh3.googleusercontent.com/aida-public/AB6AXuD7XxYIOoLtAVepX37UOiTmBMk_AQLG25JeTG6HQnJ0c85vB2y6f0-KFyO4auvzRSiWc0QmUJois9_NSJn77c1iacooQl-cVU4BC9gqdfel8ecxI6L3M2EwKZHAuITsfX4KzzocoF9IXfOX-xHidK3lKCVratul2m5K04vKUW63a5tug-ZkvZfxd6m538Djk-2YV24srN_r1SmvyReE-3vrjvuK8qfgLqe2X3qpjF7N2yAOqVFbdijl8niRS-AvXIu80S7Wd0xxpgU"}
                  />
                </div>
                <div className="flex flex-col md:flex-row md:justify-between items-start gap-1">
                  <div>
                    <h4 className="text-sm md:text-headline-sm mb-1 line-clamp-1 group-hover:text-primary transition-colors">{product.name}</h4>
                    <p className="text-xs md:text-label-md text-on-surface-variant line-clamp-2 md:line-clamp-1">{product.description}</p>
                  </div>
                  <span className="text-sm md:text-body-md text-primary font-medium mt-1 md:mt-0">${product.price.toFixed(2)}</span>
                </div>
              </Link>
              
              {/* Overlay Actions */}
              <div className="opacity-0 translate-y-4 absolute top-[70%] md:top-[65%] right-6 flex flex-col gap-3 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 z-10 pointer-events-none group-hover:pointer-events-auto">
                <button className="w-12 h-12 bg-surface-white flex items-center justify-center hover:bg-primary hover:text-white transition-colors shadow-lg">
                  <span className="material-symbols-outlined text-[20px]">favorite</span>
                </button>
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    addItem(product, 1);
                  }}
                  className="w-12 h-12 bg-inverse-surface text-surface-white flex items-center justify-center hover:bg-primary transition-colors shadow-lg"
                >
                  <span className="material-symbols-outlined text-[20px]">add_shopping_cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
