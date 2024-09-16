import { Size } from '@/interfaces';
import clsx from 'clsx';

interface Props {
  selectedSize: Size;
  allSizes: Size[];
}

export const SizeSelector = ({ selectedSize, allSizes }: Props) => {
  return (
    <div className="my-5">
      <h3 className="font-bold mb-4">Size</h3>
      <div className="flex flex-row gap-2">
        {allSizes.map((size) => (
          <button
            key={size}
            className={clsx('mx-2 hover:underline text-lg', {
              'underline font-bold': size === selectedSize,
            })}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};
