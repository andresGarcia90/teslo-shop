'use server';

import prisma from "@/lib/prisma";

export const getUserAddress = async (userId: string) => {
  try {
    
    const addressDB = await prisma.userAddress.findFirst({
      where: { userId },
      select: {
        address: true,
        address2: true,
        city: true,
        country: true,
        firstName: true,
        lastName: true,
        phone: true,
        postalCode: true,
        userId: true
      }
    });


    return{
      ok: true,
      address: { ...addressDB, country: addressDB?.country.id }
    }

  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'Error getting user address',
    }
  }
}
