'use client';

import { getStockByProduct } from "@/app/actions";
import { titleFont } from "@/config/fonts";
import { useEffect, useState } from "react";

interface Props {
  slug: string
}

export const StockLabel = ({ slug }: Props ) => {
  const [isLoading, setIsLoading] = useState(true);
  const [stock, setStock] = useState(0);

  useEffect(() => {
    getStock();
  });

  const getStock = async() => {
    const inStock = await getStockByProduct({ slug });
    setStock(inStock ?? 0);
    setIsLoading(false);
  }



  return (
    <>
    {isLoading ? (
      <h1
        className={` ${titleFont.className} antialiased font-bold text-lg bg-gray-200 animate-pulse w-14`}
      >
        &nbsp;
      </h1>
    ) : (
      <h1 className={` ${titleFont.className} antialiased font-bold text-lg`}>
        Stock: {stock}
      </h1>
    )}
  </>
  )
}
