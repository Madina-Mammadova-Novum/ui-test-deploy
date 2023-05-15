// eslint-disable-next-line import/no-extraneous-dependencies
import CredentialsProvider from 'next-auth/providers/credentials';

import { login } from '@/services';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      async authorize(credentials) {
        const user = await login({ data: credentials });
        if (user?.status === 200) {
          return user;
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
};
