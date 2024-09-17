import { CartProduct, Title, OrderSummary } from '@/components'
import { initialData } from '@/seed/seed';

const CartPage = () => {
  const products = initialData.products.slice(0, 4);
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Cart"  />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            <div className="flex flex-col">
              {products.map(product => (
                <CartProduct key={product.slug} product={product} />
              ))}
            </div>
            {/* <CartProduct product={firstProduct}/> */}
            <OrderSummary next='Checkout' nextStep='/checkout/shipping-address'/>
          </div>
      </div>
    </div>
  )
}

export default CartPage;