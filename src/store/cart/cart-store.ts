import type { CartProduct } from '@/interfaces';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface State {
  cart: CartProduct[];
  addToCart: (product: CartProduct) => void;
  removeItem: (product: CartProduct) => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],

      // Methods
      getTotalItems: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.quantity, 0)
      },
      getTotalPrice: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.price * item.quantity, 0)
      },

      addToCart: (product: CartProduct) => {
        const { cart } = get();

        const productInCart = cart.some(
          (item) => item.slug === product.slug && item.size === product.size
        );

        //adding in first time
        if (!productInCart) {
          set({ cart: [...cart, product] });
          return;
        }

        //on Update
        const updatedCart = cart.map((item) => {
          if (item.slug === product.slug && item.size === product.size) {
            return { ...product, quantity: product.quantity + item.quantity };
          }
          return item;
        });
        set({ cart: updatedCart });
      },
      removeItem: (product: CartProduct) => {
        const { cart } = get();
        const updatedCart = cart.filter(
          (item) => item.slug !== product.slug || item.size !== product.size
        );
        set({ cart: updatedCart });
      }
    }),
    { name: 'cart-storage' }
  )
);
