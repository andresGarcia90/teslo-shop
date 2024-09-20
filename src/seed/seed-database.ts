import prisma from '../lib/prisma';
import { initialData } from './seed';
async function main() {
  await Promise.all([
    prisma.productImages.deleteMany(),
    prisma.product.deleteMany(),
    prisma.category.deleteMany(),
  ])
    .then((result) => console.log('All data base clean', result))
    .catch((err) => console.log(err));

  const { products, categories } = initialData;

  console.log('Adding Categories...');
  const categoriesData = categories.map((category) => ({ name: category }));
  await prisma.category.createMany({
    data: categoriesData,
  });

  const categoriesDb = await prisma.category.findMany();

  const categoriesMap = categoriesDb.reduce((map, category) => {
    map[category.name] = category.id;
    return map;
  }, {} as Record<string, string>);

  console.log('Adding Products...');
  products.forEach(async (product) => {
    const { images, title, type, sizes, ...rest } = product;
    const dbProduct = await prisma.product.create({
      data: {
        ...rest,
        categoryId: categoriesMap[type],
        size: sizes,
      },
    });

    const imagesData = images.map((image) => ({
      url: image,
      productId: dbProduct.id
    }))

    await prisma.productImages.createMany({
      data: imagesData
    })
  });

  console.log('Finish Process');
}

(() => {
  if (process.env.NODE_ENV === 'production') return;

  main();
})();
