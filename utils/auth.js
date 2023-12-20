import Credentials from 'next-auth/providers/credentials';

import { sessionAdapter, tokenAdapter } from '@/adapters/user';
import { ROUTES } from '@/lib';
import { login, refreshAccessToken } from '@/services';

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
    async jwt({ token, user }) {
      if (user) {
        return tokenAdapter({ data: user });
      }

      if (Date.now() >= token.expires) {
        try {
          const response = await refreshAccessToken({ token: token.refreshToken });

          if (!response.data) {
            throw Error(response?.error?.message);
          }

          return tokenAdapter({ data: response.data });
        } catch (err) {
          return { ...token, error: err.message };
        }
      }

      return token;
    },
    async session({ session, token }) {
      return sessionAdapter({ session, token });
    },
  },
};
