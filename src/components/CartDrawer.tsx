'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import { Trash2, Plus, Minus, X } from 'lucide-react';

export default function CartDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { items, subtotal, removeItem, updateQuantity } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
            onClick={onClose}
          />
          
          {/* Sidebar */}
          <div className="relative w-full max-w-[400px] h-full bg-background-cream shadow-2xl flex flex-col animate-slide-in-right">
            <div className="p-6 flex justify-between items-center border-b border-outline-variant/20">
              <h2 className="font-headline-sm text-2xl text-on-surface">Your Cart</h2>
              <button onClick={onClose} className="p-2 hover:bg-surface-container rounded-full transition-colors">
                <X className="w-6 h-6 text-on-surface" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-secondary">
                  <p className="font-body-lg mb-4">Your cart is empty.</p>
                  <button onClick={onClose} className="border border-outline-variant px-6 py-3 font-label-md uppercase tracking-widest hover:bg-primary hover:text-white transition-colors">
                    Continue Shopping
                  </button>
                </div>
              ) : (
                items.map(item => (
                  <div key={item.cartItemId} className="flex gap-4 border-b border-outline-variant/10 pb-6">
                    <div className="w-24 h-24 bg-surface-container-low flex-shrink-0">
                      <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col justify-between flex-1">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-headline-sm text-sm text-on-surface line-clamp-1">{item.name}</h4>
                          <button onClick={() => removeItem(item.cartItemId)} className="text-secondary hover:text-error transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="font-body-sm text-xs text-secondary mt-1">{item.category}</p>
                        <p className="font-body-sm text-[10px] text-secondary mt-0.5 uppercase tracking-wider">
                          {item.color} | {item.size}
                        </p>
                      </div>
                      
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center border border-outline-variant/30">
                          <button 
                            onClick={() => updateQuantity(item.cartItemId, Math.max(1, item.quantity - 1))}
                            className="p-2 hover:bg-surface-container transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-label-md w-8 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                            className="p-2 hover:bg-surface-container transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="font-label-md">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-outline-variant/20 bg-background-cream">
                <div className="flex justify-between items-center mb-6">
                  <span className="font-headline-sm text-lg uppercase tracking-wider">Subtotal</span>
                  <span className="font-headline-sm text-xl">${subtotal.toFixed(2)}</span>
                </div>
                <p className="font-body-sm text-secondary mb-6 text-center">Shipping & taxes calculated at checkout.</p>
                <Link 
                  href="/checkout"
                  onClick={onClose}
                  className="w-full block text-center bg-primary text-white py-4 font-label-md uppercase tracking-widest hover:bg-[#5a4800] transition-colors"
                >
                  Proceed to Checkout
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
