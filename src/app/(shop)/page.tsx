import { ProductGrid, Title } from "@/components";
import { initialData } from "@/seed/seed";

const ShopPage = () => {

  const products = initialData.products;

  return (
      <main className="min-h-screen px-5">
        <Title title="Testo Shop" subtitle="All the products" className="mb-2" />
        <ProductGrid products={products} />

      </main>
  );
}
export default ShopPage;