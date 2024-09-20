import { Product } from "@/interfaces"
import { ProductGridItem } from "./ProductGridItem"
import { Pagination } from "./../../index"

interface Props {
  products: Product[],
  currentPage?: number;
  totalPages?: number;

}
export const ProductGrid = ({ products, currentPage, totalPages }: Props) => {
  return (
    <div className="flex flex-col items-center mb-14">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 mb-7">
        {products.map(product => (
          <ProductGridItem key={product.slug} product={product} />
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  )
}