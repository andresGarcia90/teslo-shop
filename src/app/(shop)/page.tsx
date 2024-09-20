import { redirect } from 'next/navigation';
import { getPaginatedProducts } from '../actions';
import { ProductGrid, Title } from '@/components';

interface Props {
  searchParams: {
    page: string;
  };
}
const ShopPage = async ({ searchParams }: Props) => {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { products, totalPages } = await getPaginatedProducts({ page });

  if (!products || products.length === 0) {
    redirect('/');
  }


  return (
    <main className="min-h-screen px-5">
      <Title title="Testo Shop" subtitle="All the products" className="mb-2" />
      <ProductGrid products={products} totalPages={totalPages} />
    </main>
  );
};
export default ShopPage;
