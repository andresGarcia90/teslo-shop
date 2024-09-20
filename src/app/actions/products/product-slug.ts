'use server';

import { Type } from '@/interfaces';
import prisma from '@/lib/prisma';

interface PaginationOptions {
  slug: string;
}

export const getProductBySlug = async ({ slug }: PaginationOptions) => {
  try {
    const productDB = await prisma.product.findUnique({
      include: { ProductImages: { select: { url: true } } },
      where: { slug: slug },
    });
    const categoryDB = await prisma.category.findUnique({
      where: { id: productDB?.categoryId },
    });

    const { categoryId, ProductImages, size, ...rest } = productDB;
    return {
      ...rest,
      title: productDB?.slug ?? slug,
      sizes: size,
      images: productDB?.ProductImages.map(image => image.url) ?? [],
      type: categoryDB?.name as Type,
    };
  } catch (error) {
    console.log('Error finding product ', error);
  }
};
