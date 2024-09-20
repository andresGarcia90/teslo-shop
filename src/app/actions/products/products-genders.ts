'use server';

import { Category, Type } from "@/interfaces";
import prisma from "@/lib/prisma";

interface PaginationOptions {
  gender: Category;
  page?: number;
  take?: number;
}
export const productsByGender = async ({ gender, page = 1, take = 12 }: PaginationOptions) => {
  try {
    // const categoryDB = await prisma.category.findUnique({
    //   where: {
    //     name: category,
    //   },
    // });
    // console.log(category, categoryDB)

    const productsDB = await prisma.product.findMany({
      take: take,
      skip: (page - 1) * take,
      include: {
        ProductImages: {
          take: 2,
          select: { url: true },
        },
      },
      where: {
        gender: gender,
      }
    });

    const totalProducts = await prisma.product.count({
      where: {
        gender: gender,
      }
    });

    return{
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
    }
    
  } catch (error) {
    throw new Error("Error with the products pagination ");
  }
};
