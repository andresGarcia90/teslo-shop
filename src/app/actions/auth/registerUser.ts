'use server';

import prisma from '@/lib/prisma';
import bcryptjs from 'bcryptjs';

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const user = await prisma.user.findFirst({ where: { email: email } });

    if (user) {
      return {
        ok: false,
        message: 'User already exists',
      };
    }

    const newUser = await prisma.user.create({
      data: { name: name, email: email.toLowerCase(), password: bcryptjs.hashSync(password) },
      select: {name: true, email: true, id: true}
    });

    return {
      ok: true,
      user: JSON.stringify(newUser),
      message: 'User created successfully',
    }
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'Error creating user',
    };
  }
};
