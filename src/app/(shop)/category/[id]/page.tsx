import { ProductGrid, Title } from '@/components'
import { Category } from '@/interfaces'
import { initialData } from '@/seed/seed'
import React from 'react'

interface Props {
  params: {
    id: Category
  }
}

const CategoryPage = ({ params } : Props) => {
  const { id } = params;
  const label: Record<Category, string> = {
    'men': 'mens',
    'women': 'women',
    'kid': 'kids',
    'unisex': 'all'
  }
  const productsFiltered = initialData.products.filter(product => product.gender === id);

  return (
    <div className="min-h-screen px-5" >
      <Title 
        title={`Products for ${label[id]}`}
        subtitle='All the products'
      />
      <ProductGrid products={productsFiltered}/>
    </div>
  )
}

export default CategoryPage