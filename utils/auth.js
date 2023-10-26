import Credentials from 'next-auth/providers/credentials';

import { sessionAdapter, tokenAdapter } from '@/adapters/user';
import { ROUTES } from '@/lib';
import { login } from '@/services';

export const AUTHCONFIG = {
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: 'jwt' },
  pages: {
    signIn: ROUTES.LOGIN,
  },
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
    jwt: async ({ token, session, user, trigger }) => {
      if (user) return tokenAdapter({ data: user });
      if (trigger === 'update') return tokenAdapter({ data: session });

      return Promise.resolve(token);
    },
    session: async ({ session, token }) => {
      return Promise.resolve(sessionAdapter({ session, token }));
    },
  },
};
