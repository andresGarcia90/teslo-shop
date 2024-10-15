'use client';
import { OrderSummary, Title } from '@/components'
import { useCartStore } from '@/store/index';
import { CartConfirmationProduct } from './ui/CartConfirmationProduct';

const CheckoutPage = () => {
  const { cart: productsInCart } = useCartStore();
  
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Checkout" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <div className="flex flex-col">
            {productsInCart.map((product) => (
              <CartConfirmationProduct
                key={`${product.slug}-${product.size}`}
                product={product}
                editable={true}
              />
            ))}
          </div>
          <OrderSummary
           next='Create Order' 
           nextStep='/checkout/place-order' 
           showAddress />

        </div>
      </div>
    </div>
  )
}

export default CheckoutPage