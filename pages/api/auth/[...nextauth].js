import NextAuth from 'next-auth/next';
import Credentials from 'next-auth/providers/credentials';

import { decodedTokenAdapter, userSessionAdapter } from '@/adapters/user';
import { ROUTES } from '@/lib';
import { refreshAccessToken, signIn } from '@/services';

export default async function auth(req, res) {
  const providers = [
    Credentials({
      name: 'Credentials',
      type: 'credentials',
      credentials: {
        emal: {},
        password: {},
      },
      async authorize(credentials) {
        // const response = await login({ data: credentials });
        // TODO: error response doesn't sync with apiHandler
        const response = await signIn(credentials);
        const user = await response.json();

        if (response.ok && user) return user;

        return null;
      },
    }),
  ];

  const AuthResponse = await NextAuth(req, res, {
    providers,
    session: {
      jwt: true,
      maxAge: 30 * 24 * 60 * 60,
      updateAge: 24 * 60 * 60,
    },
    pages: {
      signIn: ROUTES.LOGIN,
    },
    callbacks: {
      async jwt({ token, user, account }) {
        if (account && user) {
          const decodedData = decodedTokenAdapter(user?.access_token);

          return {
            accessToken: user.access_token,
            accessTokenExpires: Date.now() + decodedData?.exp * 1000,
            refreshToken: user.refresh_token,
            ...decodedData,
          };
        }

        if (Date.now() < token?.accessTokenExpires) {
          return token;
        }

        const result = await refreshAccessToken(token?.refresh_token);

        return result;
      },
      async session({ session, token }) {
        const result = await userSessionAdapter({ session, token });
        return result;
      },
    },
  });

  return AuthResponse;
}
