'use client';
import { useState } from 'react';
import { useCartStore } from '@/store/cartStore';

const COLORS = ['Black', 'Brown', 'Grey', 'Custom'];
const SIZES = ['Small', 'Medium', 'Large'];

export default function ProductActions({ product }: { product: any }) {
  const addItem = useCartStore(state => state.addItem);
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [customColor, setCustomColor] = useState('');
  const [selectedSize, setSelectedSize] = useState(SIZES[1]); // Default Medium

  // Dynamic price calculation
  const currentPrice = product.size_pricing && product.size_pricing[selectedSize] ? Number(product.size_pricing[selectedSize]) : product.price;

  const handleAddToCart = () => {
    const finalColor = selectedColor === 'Custom' ? (customColor || 'Custom') : selectedColor;
    const finalProduct = { ...product, price: currentPrice };
    addItem(finalProduct, 1, finalColor, selectedSize);
  };

  return (
    <div className="flex flex-col gap-6">
      <p className="font-headline-md text-2xl text-primary mb-2">
        ${currentPrice.toFixed(2)}
      </p>
      {/* Options */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="font-label-sm uppercase tracking-widest text-secondary">Color</label>
          <div className="relative">
            <select 
              value={selectedColor} 
              onChange={(e) => setSelectedColor(e.target.value)}
              className="w-full appearance-none bg-surface-container-low border border-outline-variant/30 py-3 px-4 font-body-md text-on-surface focus:outline-none focus:border-primary transition-colors cursor-pointer rounded-none"
            >
              {COLORS.map(color => (
                <option key={color} value={color}>{color}</option>
              ))}
            </select>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-secondary text-sm">expand_more</span>
          </div>
          {selectedColor === 'Custom' && (
            <div className="mt-2 animate-fade-in">
              <input 
                type="text" 
                value={customColor} 
                onChange={e => setCustomColor(e.target.value)} 
                placeholder="Type your custom color..."
                className="w-full bg-surface-container-low border border-outline-variant/30 py-3 px-4 font-body-md text-on-surface focus:outline-none focus:border-primary transition-colors"
                required
              />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-label-sm uppercase tracking-widest text-secondary">Size</label>
          <div className="relative">
            <select 
              value={selectedSize} 
              onChange={(e) => setSelectedSize(e.target.value)}
              className="w-full appearance-none bg-surface-container-low border border-outline-variant/30 py-3 px-4 font-body-md text-on-surface focus:outline-none focus:border-primary transition-colors cursor-pointer rounded-none"
            >
              {SIZES.map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-secondary text-sm">expand_more</span>
          </div>
        </div>
      </div>

      <button 
        onClick={handleAddToCart}
        className="w-full bg-on-surface text-surface-white py-5 font-label-md uppercase tracking-widest hover:bg-primary transition-colors flex items-center justify-center gap-2"
      >
        <span className="material-symbols-outlined text-[20px]">add_shopping_cart</span>
        Add to Cart
      </button>
    </div>
  );
}
