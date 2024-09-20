'use server'
import prisma from '@/lib/prisma';

interface Props {
  slug: string;
}

export const getStockByProduct = async ({ slug }: Props) => {
  try {
    const stockDB = await prisma.product.findFirst({
      select: {
        inStock: true,
      },
      where: {
        slug: slug,
      },
    });
    console.log(stockDB);
    
    return stockDB?.inStock ?? 0;
  } catch (error) {
    console.log('error finding stock', error);
  }
};
