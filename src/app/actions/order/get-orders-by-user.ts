import { auth } from '@/app/auth.config';
import prisma from '@/lib/prisma';

export const getOrdersByUser = async () => {
  const session = await auth();

  if (!session) {
    return {
      ok: false,
      message: 'Session not found',
    };
  }

  try {
    const id = session.user.id;

    const orders = await prisma.order.findMany({
      where: { userId: id },
    });

    return {
      ok: true,
      orders 
    }
  } catch (error) {
    console.log('Error getting orders by user', error);
    return {
      ok: false,
      message: 'Error getting orders by user',
    };
  }
};
