import Credentials from 'next-auth/providers/credentials';

import { sessionAdapter, tokenAdapter } from '@/adapters/user';
import { ROUTES } from '@/lib';
import { login, refreshAccessToken } from '@/services';

let isRefreshing = false;

async function tokenRotation(token) {
  if (isRefreshing) return token; // previous token if refresh in action

  if (Date.now() >= token?.expires) {
    isRefreshing = true; // prevent multiple calls
    try {
      const response = await refreshAccessToken({ token: token.refreshToken });

      if (response?.data) {
        return { ...token, ...tokenAdapter({ data: response.data }) };
      }
    } catch (error) {
      return { ...token, error: 'Refresh token error' };
    } finally {
      isRefreshing = false; // reset to re-fetch token
    }
  }

  return token;
}

export const AUTHCONFIG = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: `${process.env.NEXT_PUBLIC_URL}/${ROUTES.LOGIN}`,
  },
  providers: [
    Credentials({
      id: 'credentials',
      type: 'credentials',
      name: 'credentials',
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
    jwt: async ({ token, user }) => {
      if (user) return tokenAdapter({ data: user });

      // eslint-disable-next-line no-return-await
      return await tokenRotation(token);
    },
    async session({ session, token }) {
      return sessionAdapter({ session, token });
    },
  },
};
