import prisma from '../lib/prisma';
import { initialData } from './seed';
import{ countries }   from './seed-countries'
async function main() {
  console.log('Cleaning database...');
  await Promise.all([
    prisma.userAddress.deleteMany(),
    prisma.user.deleteMany(),
    prisma.productImages.deleteMany(),
    prisma.product.deleteMany(),
    prisma.category.deleteMany(),
    prisma.country.deleteMany(),
    prisma.orderAddress.deleteMany(),
    prisma.orderItem.deleteMany(),
    prisma.order.deleteMany(),
  ])
    .then((result) => console.log('All data base clean', result))
    .catch((err) => console.log(err));

  const { products, categories, users } = initialData;

  console.log("Adding Users...");
  await prisma.user.createMany({
    data: users,
  })
  
  console.log('Adding Countries...');
  await prisma.country.createMany({
    data: countries
  })

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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
