import { productsByGender } from '@/app/actions/products/products-genders';
import { ProductGrid, Title } from '@/components';
import { Category } from '@/interfaces';

interface Props {
  params: {
    id: Category;
  };
  searchParams: {
    page: string;
  };
}

const CategoryPage = async ({ params, searchParams }: Props) => {
  const { id } = params;

  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const label: Record<Category, string> = {
    men: 'mens',
    women: 'women',
    kid: 'kids',
    unisex: 'all',
  };
  const { products, totalPages } = await productsByGender({
    gender: id,
    page: page
  });

  return (
    <div className="min-h-screen px-5">
      <Title title={`Products for ${label[id]}`} subtitle="All the products" />
      <ProductGrid
        products={products}
        totalPages={totalPages}
      />
    </div>
  );
};

export default CategoryPage;
