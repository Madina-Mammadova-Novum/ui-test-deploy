import Credentials from 'next-auth/providers/credentials';

import { sessionAdapter, tokenAdapter } from '@/adapters/user';
import { ROUTES } from '@/lib';
import { login, refreshAccessToken } from '@/services';

let isRefreshing = false;

async function tokenRotation(token) {
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
      isRefreshing = false; // Clear flag for repeat calls
    }
  }

  return token; // Return original token if no refresh needed
}

export const AUTHCONFIG = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: `${process.env.NEXT_PUBLIC_URL}/${ROUTES.LOGIN}`,
  },
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60, // One hour in seconds
  },
  providers: [
    Credentials({
      name: 'Credentials',
      type: 'credentials',
      credentials: {},
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
      if (user) {
        return tokenAdapter({ data: user });
      }

      if (isRefreshing) return token; // Early return if already refreshing

      return Promise.resolve(tokenRotation(token));
    },
    async session({ session, token }) {
      return sessionAdapter({ session, token });
    },
  },
};
