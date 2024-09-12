import { notFound } from 'next/navigation'
import React from 'react'

interface Props {
  params: {
    id: string
  }
}

const CategoryPage = ({ params } : Props) => {
  const { id } = params
  console.log(id);
  

  if (id === 'kids') {
    notFound()
  }

  return (
    <div>CategoryPage {id}</div>
  )
}

export default CategoryPage