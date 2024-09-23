import type { CartProduct } from "@/interfaces";
import { create } from "zustand";

interface State {
  cart: CartProduct[],
  addToCart: (product: CartProduct) => void,
}

export const useCartStore = create<State>()((set, get) =>({
  cart: [],

  // Methods
  addToCart: (product: CartProduct) => {
    const { cart } = get();

    const productInCart = cart.some(item => item.slug === product.slug && item.size === product.size);

    //adding in first time
    if (!productInCart) {
      set({ cart: [...cart, product] });
      return;
    }

    //on Update
    const updatedCart = cart.map(item => {
      if (item.slug === product.slug && item.size === product.size) {
        return {...product, quantity: product.quantity + item.quantity};
      }
      return item;
    });
    set({ cart: updatedCart });



  },
}))