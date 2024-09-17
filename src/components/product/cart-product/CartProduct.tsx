import { Product } from '@/interfaces';
import Image from 'next/image';

interface Props {
  product: Product;
}
export const CartProduct = ({ product }: Props) => {
  return (
    <div className="flex flex-row mb-5">
      <Image
        src={`/products/${product.images[0]}`}
        alt={product.title}
        width={100}
        height={100}
        style={
          {
            width: '100px',
            height: '100px',
          }
        }
        className='mr-5 rounded'
      />
      <div className="grid-rows-3">
        <div className="mb-2">
          <span className="font-bold mr-10">{product.title}</span>
          <span>${product.price}</span>
        </div>
        <div className="grid">
          <span>{product.tags.join(', ')}</span>
        </div>
        <div className="flex flex-row justify-between">
          <div>Quantity: 1</div>
          <div>remove</div>
        </div>
      </div>
    </div>
  );
};
