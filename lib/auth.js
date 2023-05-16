// eslint-disable-next-line import/no-extraneous-dependencies
import CredentialsProvider from 'next-auth/providers/credentials';

import { login } from '@/services';

// import { login } from '@/services';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      async authorize(credentials) {
        const data = await login({ data: credentials });

        if (data) {
          return data;
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
