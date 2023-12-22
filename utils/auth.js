import Credentials from 'next-auth/providers/credentials';

import { sessionAdapter, tokenAdapter } from '@/adapters/user';
import { ROUTES } from '@/lib';
import { login } from '@/services';

export const AUTHCONFIG = {
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: 'jwt' },
  pages: { signIn: `${process.env.NEXT_PUBLIC_URL}/${ROUTES.LOGIN}` },
  providers: [
    Credentials({
      name: 'Credentials',
      type: 'credentials',
      async authorize(credentials) {
        const { data } = await login({ data: credentials });

        if (data) {
          // Any object returned will be saved in `user` property of the JWT
          return data;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        return tokenAdapter({ data: user });
      }

      if (Date.now() < token?.expires) {
        return Promise.resolve(token);
      }

      if (trigger === 'update') {
        return Promise.resolve(session);
      }

      return Promise.resolve(token);
    },
    async session({ session, token }) {
      return sessionAdapter({ session, token });
    },
  },
};
