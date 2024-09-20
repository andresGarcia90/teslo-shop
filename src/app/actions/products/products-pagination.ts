'use server';

import prisma from '@/lib/prisma';
import { Type } from '@/interfaces/product.interface';

interface PaginationOptions{
  page?: number;
  take?: number;
}


export const getPaginatedProducts = async ({ page = 1, take = 12 }: PaginationOptions) => {

  if ( isNaN(Number(page)) ) page = 1;
  if ( page < 1 ) page = 1;

  try {
    const productsDB = await prisma.product.findMany({
      take: take,
      skip: (page - 1) * take,
      include: {
        ProductImages: {
          take: 2,
          select: { url: true },
        },
      },
    });

    const totalProducts = await prisma.product.count();

    return {
      currentPage: page,
      totalPages: Math.ceil(totalProducts / take),
      products: productsDB.map((product) => {
        return {
          ...product,
          images: product.ProductImages.map(image => image.url),
          type: 'hats' as Type,
          sizes: [],
          title: product.slug,
        }
      })
    };
  } catch (error) {
    throw new Error("Error with the products pagination ");
  }
};
