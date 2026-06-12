import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/lib/db';

export interface CartItem extends Product {
  cartItemId: string;
  quantity: number;
  color?: string;
  size?: string;
}

interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity?: number, color?: string, size?: string) => void;
  removeItem: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      subtotal: 0,
      
      addItem: (product, quantity = 1, color = 'Default', size = 'Standard') => {
        set((state) => {
          const cartItemId = `${product.id}-${color}-${size}`;
          const existingItem = state.items.find(item => item.cartItemId === cartItemId);
          let newItems;
          if (existingItem) {
            newItems = state.items.map(item => 
              item.cartItemId === cartItemId 
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
          } else {
            newItems = [...state.items, { ...product, cartItemId, quantity, color, size }];
          }
          
          return {
            items: newItems,
            subtotal: newItems.reduce((total, item) => total + (item.price * item.quantity), 0)
          };
        });
      },

      removeItem: (cartItemId) => {
        set((state) => {
          const newItems = state.items.filter(item => item.cartItemId !== cartItemId);
          return {
            items: newItems,
            subtotal: newItems.reduce((total, item) => total + (item.price * item.quantity), 0)
          };
        });
      },

      updateQuantity: (cartItemId, quantity) => {
        set((state) => {
          const newItems = state.items.map(item => 
            item.cartItemId === cartItemId 
              ? { ...item, quantity }
              : item
          );
          return {
            items: newItems,
            subtotal: newItems.reduce((total, item) => total + (item.price * item.quantity), 0)
          };
        });
      },

      clearCart: () => {
        set({ items: [], subtotal: 0 });
      },
    }),
    {
      name: 'vellut-leather-cart',
    }
  )
);
