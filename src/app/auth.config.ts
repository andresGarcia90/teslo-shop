import { z } from 'zod';
import NextAuth, { type NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import prisma from '@/lib/prisma';
import bcryptjs from 'bcryptjs'
 
export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/new-account',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      console.log({ auth });
      return true;
    },
    jwt({ token, user }) {
      if ( user ) {
        return {...token, data: user };
      }
      return token;
    },

    session({ session, token, user }) {
      session.user = token.data as any;
      return session;
    },
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if  (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;


        //find the user by email
        const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
        if ( !user ) return null;

        if( !bcryptjs.compareSync(password, user.password) ) return null;

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password:_password, ...rest } = user;
        console.log("Auth Config");
        console.log({rest});
        

        return rest;
      },
    }),
  ], 
} 

export const {  signIn, signOut, auth, handlers } = NextAuth( authConfig );