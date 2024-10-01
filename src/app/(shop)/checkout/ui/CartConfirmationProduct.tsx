import { CartProduct } from '@/interfaces';
import { substring } from '@/utils';
import Image from 'next/image';

interface Props {
  product: CartProduct;
  editable?: boolean;
}

export const CartConfirmationProductSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mb-5">
      <div className="flex flex-col gap-10">
        <div className="shadow rounded-md p-4 max-w-sm w-full mx-auto">
          <div className="animate-pulse flex space-x-4">
            <div className=" bg-gray-700 h-15 w-10"></div>
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 bg-gray-700 rounded"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-gray-700 rounded col-span-2"></div>
                  <div className="h-2 bg-gray-700 rounded col-span-1"></div>
                </div>
                <div className="h-2 bg-gray-700 rounded"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-10">
          <div className="shadow rounded-md p-4 max-w-sm w-full mx-auto">
            <div className="animate-pulse flex space-x-4">
              <div className=" bg-gray-700 h-15 w-10"></div>
              <div className="flex-1 space-y-6 py-1">
                <div className="h-2 bg-gray-700 rounded"></div>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-2 bg-gray-700 rounded col-span-2"></div>
                    <div className="h-2 bg-gray-700 rounded col-span-1"></div>
                  </div>
                  <div className="h-2 bg-gray-700 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export const CartConfirmationProduct = ({ product, editable = true }: Props) => {
  const title = substring(product.title, 30, '...');
  return (
    <div className="flex flex-row grow  mb-5">
      <Image
        src={`/products/${product.image}`}
        alt={product.title}
        width={100}
        height={100}
        style={{
          width: '100px',
          height: '100px',
        }}
        className="mr-5 rounded"
      />
      <div className="grid-rows-3 grow  ">
        <div className="flex flex-row justify-between mb-2">
          <span>
            <span className="font-bold mr-10 hover:underline">{title}</span>
          </span>
          <span>${product.price * product.quantity}</span>
        </div>
        {editable ? (
          <div className="flex flex-row justify-between">
            {/* <QuantitySelector quantity={product.quantity} onQuantityChange={setQuantity} /> */}
            {/* <div className='cursor-pointer' onClick={onRemoveItem}>remove</div> */}
          </div>
        ) : (
          <div className="grid grid-cols-1">
            <p>Total${product.price} x 3</p>
            <p className='font-bold'>Subtotal: ${product.price * 3}</p>
          </div>
        )}
      </div>
    </div>
  );
};
