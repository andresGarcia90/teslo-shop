'use server'
import { auth } from '@/app/auth.config';
import prisma from '@/lib/prisma';


export  const getOrderById = async (id: string) => {
  try {
    const session = await auth();

    if ( !session?.user ) {
      return {
        ok: false,
        message: 'Debe de estar autenticado'
      }
    }

    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        OrderAddress: true,
        OrderItem: {
          select:{
            price: true,
            quantity: true,
            size: true,
            product: {
              select: {
                id: true,
                slug: true,
                ProductImages: {
                  select: {
                    url: true
                  },
                  take: 1
                }
              }
            }
          }
        },
      }
    });

    if( !order ) {
      return {
        ok: false,
        message: 'Order not found'
      }
    }

    // const orderAddresses = await prisma.orderAddress.findUnique({
    //   where: { orderId: order?.id },
    // });

    // const orderItems = await prisma.orderItem.findMany({
    //   where: { orderId: order?.id },
    // });

    // const arrayOfProductsIds = orderItems.map((orderItem) => orderItem.productId);

    // const productImage = await prisma.productImages.findMany({
    //   where: { productId: { in: arrayOfProductsIds } },
    // });

    // const productData = await prisma.product.findMany({
    //   where: { id: { in: arrayOfProductsIds } },
    // })

    // const productsWithImage = orderItems.map((item) => ({
    //   ...item,
    //   slug: productData.find((product) => product.id === item.productId)?.slug,
    //   image: productImage.find((image) => image.productId === item.productId)?.url
    // }));
    console.log(order);
    
    return {
      ok: true,
      order: order,
    }

  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'Error getting order',
    };
  }
};
