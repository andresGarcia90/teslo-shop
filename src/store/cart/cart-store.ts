import type { CartProduct } from '@/interfaces';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface State {
  cart: CartProduct[];
  addToCart: (product: CartProduct) => void;
  removeItem: (product: CartProduct) => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getSummaryInformation: () => {
    subTotal: number;
    tax: number;
    total: number;
    itemsInCart: number;
  };
  clearCart: () => void;
};

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],

      // Methods
      getTotalItems: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.quantity, 0)
      },
      getSummaryInformation: () => {
        const { cart } = get();

        const subTotal = cart.reduce(
          (subTotal, product) => product.quantity * product.price + subTotal,
          0
        );
        const tax = subTotal * 0.15;
        const total = subTotal + tax;
        const itemsInCart = cart.reduce(
          (total, item) => total + item.quantity,
          0
        );

        return {
          subTotal,
          tax,
          total,
          itemsInCart,
        };
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
      },
      clearCart: () => {
        set({ cart: [] });
      },
    }),
    { name: 'cart-storage' }
  )
);
