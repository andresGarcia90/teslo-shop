'use server';

import prisma from '@/lib/prisma';

export const deleteUserAddress = async (userId: string) => {
  try {
    const address =  await prisma.userAddress.delete({
      where: {
        userId: userId,
      },
    });
    return { ok: true, data: address };
  } catch (error) {
    console.log(error);
    return { ok: false, message: 'Error deleting address' };
  }
};
