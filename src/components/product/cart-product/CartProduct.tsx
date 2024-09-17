import { Product } from '@/interfaces';
import { substring } from '@/utils';
import Image from 'next/image';

interface Props {
  product: Product;
  editable?: boolean;
}
export const CartProduct = ({ product, editable = true }: Props) => {
  const title = substring(product.title, 30, '...');
  return (
    <div className="flex flex-row mb-5">
      <Image
        src={`/products/${product.images[0]}`}
        alt={product.title}
        width={100}
        height={100}
        style={{
          width: '100px',
          height: '100px',
        }}
        className="mr-5 rounded"
      />
      <div className="grid-rows-3">
        <div className="mb-2">
          <span className="font-bold mr-10">{title}</span>
          <span>${product.price}</span>
        </div>
        <div className="grid">
          <span>{product.tags.join(', ')}</span>
        </div>
        {editable ? (
          <div className="flex flex-row justify-between">
            <div>Quantity: 1</div>
            <div>remove</div>
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
