'use client';
import { QuantitySelector, SizeSelector } from '@/components';
import { Product, Size } from '@/interfaces';
import { useCartStore } from '@/store';
import { useState } from 'react';
interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {
  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState(1);
  const [posted, setPosted] = useState(false);

  const { addToCart } = useCartStore();

  const onAddToCart = () => {
    setPosted(true);
    if (!size) return;
    console.log({product, size, quantity});
    addToCart({...product, image: product.images[0], size,quantity});
    setPosted(false);
    setSize(undefined);
    setQuantity(1);
  };

  const handleSetQuantity = (value: number) => {
    setQuantity(quantity + value);
  }

  return (
    <>
      {posted && !size && (
        <span className="mt-2 text-red-500 fade-in">Please select a size</span>
      )}
      <SizeSelector
        allSizes={product.sizes}
        selectedSize={size}
        onSelectedSize={setSize}
      />
      {/* selector de cantidad */}
      <QuantitySelector quantity={quantity} onQuantityChange={handleSetQuantity} />
      {/* Botones */}
      <button className="btn-primary my-5" onClick={onAddToCart}>
        Add to cart
      </button>
    </>
  );
};
