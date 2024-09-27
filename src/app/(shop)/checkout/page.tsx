'use client';
import { CartInProduct, OrderSummary, Title } from '@/components'
import { CartProduct } from '@/interfaces';
import { useCartStore } from '@/store/index';

const CheckoutPage = () => {
  const { cart: productsInCart, addToCart, removeItem } = useCartStore();
  const handleChangeQuantity = (product: CartProduct, quantity: number) => {
    addToCart({ ...product, quantity:quantity });
  };

  const handleRemoveItem = (productToRemove : CartProduct)  => {
    removeItem( productToRemove );
  }
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Checkout"  />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            <div className="flex flex-col">
              <p>Hola todas las trolas</p>
              {productsInCart.map((product) => (
              <CartInProduct 
                key={`${product.slug}-${product.size}`} 
                product={product} 
                setQuantity={(q) => handleChangeQuantity(product, q)}
                onRemoveItem={()=>handleRemoveItem(product)}
                />
            ))}

            </div>
            <OrderSummary next='Select Shipping' nextStep='/checkout/shipping-address' />
          </div>
      </div>
    </div>
  )
}

export default CheckoutPage