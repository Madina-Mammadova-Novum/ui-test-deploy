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

      if (Date.now() < token.expires) {
        return Promise.resolve(token);
      }

      // If the access token has expired, try to refresh it
      try {
        const response = await refreshAccessToken({ token: token.refreshToken });

        if (!response.data) throw Error('RefreshAccessTokenError');

        return tokenAdapter({ data: response.data });
      } catch (error) {
        // The error property will be used client-side to handle the refresh token error
        return { ...token, error: error.message };
      }
    },
    async session({ session, token }) {
      return Promise.resolve(sessionAdapter({ session, token }));
    },
  },
};
