'use client';
import { CartInProductSkeleton, Title, OrderSummary, CartInProduct } from '@/components';
import { CartProduct } from '@/interfaces';
import { useCartStore } from '@/store';
import { useEffect, useState } from 'react';

const CartPage = () => {
  const { cart: productsInCart, addToCart, removeItem } = useCartStore();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
  }, []);

  if (!isLoading) {
    return <CartInProductSkeleton />;
  }

  const handleChangeQuantity = (product: CartProduct, quantity: number) => {
    addToCart({ ...product, quantity:quantity });
  };

  const handleRemoveItem = (productToRemove : CartProduct)  => {
    removeItem( productToRemove );
  }

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Cart" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <div className="flex flex-col flex-1">
            {productsInCart.map((product) => (
              <CartInProduct 
                key={`${product.slug}-${product.size}`} 
                product={product} 
                setQuantity={(q) => handleChangeQuantity(product, q)}
                onRemoveItem={()=>handleRemoveItem(product)}
                />
            ))}
          </div>
          <OrderSummary next="Checkout" nextStep="/checkout/shipping-address" />
        </div>
      </div>
    </div>
  );
};

export default CartPage;
