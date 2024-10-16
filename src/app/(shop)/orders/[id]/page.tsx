import { getOrderById } from '@/app/actions/order/get-order-by-id';

import clsx from 'clsx';
import Image from 'next/image';

import { Title } from '@/components';
import { IoCardOutline } from 'react-icons/io5';

interface Props {
  params: {
    id: string
  }
}


const OrderPage = async ({ params }: Props) => {
  const { id } = params;
  const { order, ok } = await getOrderById(id);
  if (!ok) {
    return (
      <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
        Try again in a few minutes
      </div>
    )
  }

  const address = order!.OrderAddress;
  

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">

      <div className="flex flex-col w-[1000px]">

        <Title title={`Orden #${order!.id}`} />


        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

          {/* Carrito */}
          <div className="flex flex-col mt-5">

            <div className={
              clsx(
                "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                {
                  'bg-red-500': !order!.isPaid,
                  'bg-green-700': order!.isPaid,
                }
              )
            }>
              <IoCardOutline size={30} />
              {/* <span className="mx-2">Pendiente de pago</span> */}
              <span className="mx-2">{order!.isPaid ? 'Pagada' : 'Pendiente de pago'}</span>
            </div>



            {/* Items */}
            {
              order!.OrderItem.map(product => (

                <div key={product.product.slug+product.size} className="flex mb-5">
                  <Image
                    src={`/products/${product.product.ProductImages[0].url}`}
                    width={100}
                    height={100}
                    style={{
                      width: '100px',
                      height: '100px'
                    }}
                    alt={product.product.slug}
                    className="mr-5 rounded"
                  />

                  <div>
                    <p>{product.product.slug}</p>
                    <p>{product.size}</p>
                    <p>${product.price} x {product.quantity}</p>
                    <p className="font-bold">Subtotal: ${product.price * product.quantity}</p>
                  </div>

                </div>


              ))
            }
          </div>




          {/* Checkout - Resumen de orden */}
          <div className="bg-white rounded-xl shadow-xl p-7">

            <h2 className="text-2xl mb-2">Dirección de entrega</h2>
            <div className="mb-10">
              <p className="text-xl">{address!.firstName} {address!.lastName}</p>
              <p>{address!.address}</p>
              <p>{address!.city}</p>
              <p>{address!.phone}</p>
              <p>{address!.postalCode}</p>
            </div>

            {/* Divider */}
            <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />


            <h2 className="text-2xl mb-2">Resumen de orden</h2>

            <div className="grid grid-cols-2">

              <span>No. Productos</span>
              <span className="text-right">3 artículos</span>

              <span>Subtotal</span>
              <span className="text-right">$ 100</span>

              <span>Impuestos (15%)</span>
              <span className="text-right">$ 100</span>

              <span className="mt-5 text-2xl">Total:</span>
              <span className="mt-5 text-2xl text-right">$ 100</span>


            </div>

            <div className="mt-5 mb-2 w-full">

              <div className={
                clsx(
                  "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                  {
                    'bg-red-500': !order!.isPaid,
                    'bg-green-700': order!.isPaid,
                  }
                )
              }>
                <IoCardOutline size={30} />
                {/* <span className="mx-2">Pendiente de pago</span> */}
                <span className="mx-2">{order!.isPaid ? 'Pagada' : 'Pendiente de pago'}</span>
              </div>

            </div>


          </div>



        </div>



      </div>


    </div>
  );

}

export default OrderPage