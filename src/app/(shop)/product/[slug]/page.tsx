export const revalidate = 604800; //7 días

import type { Metadata } from 'next';
import { titleFont } from '@/config/fonts';

import { getProductBySlug } from '@/app/actions/products/product-slug';

import { notFound } from 'next/navigation';

import {
  ProductMobileSlideshow,
  ProductSlideshow,
  StockLabel,
} from '@/components';
import { AddToCart } from './ui/AddToCart';

interface Props {
  params: {
    slug: string;
  };
}

// export const metadata: Metadata = {
//   title: `${slug}`,
//   description: '...',
// }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;
  // fetch data
  const product = await getProductBySlug({ slug });

  return {
    title: `${product?.title ?? 'producto no encontrado'} | Teslo Shop`,
    description: product?.description ?? '',
    keywords: product?.tags.join(', '),
    openGraph: {
      title: `${product?.title ?? 'producto no encontrado'} | Teslo Shop`,
      description: product?.description ?? '',
      images: `/products/${product?.images[0]}`,
    },
  };
}

const ProductPage = async ({ params }: Props) => {
  const { slug } = params;
  const product = await getProductBySlug({ slug });

  if (!product) notFound();

  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
      {/* Slideshow DK and MB*/}
      <div className="col-span-1 md:col-span-2 bg-gray-200">
        <ProductSlideshow
          images={product.images}
          title={product.title}
          className="hidden md:block"
        />
        <ProductMobileSlideshow
          images={product.images}
          title={product.title}
          className="block md:hidden"
        />
      </div>

      {/* Detalles */}
      <div className="col-span-1 px-5">
        <StockLabel slug={slug} />
        <div className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </div>
        <p className="text-lg mb-5">${product.price}</p>

        <AddToCart product={product}/>

        {/* Descripción */}
        <h3 className="font-bold text-sm mb-3">Description</h3>
        <p>{product.description}</p>
      </div>
    </div>
  );
};

export default ProductPage;
