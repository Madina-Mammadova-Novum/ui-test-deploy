import NextAuth from 'next-auth/next';
import Credentials from 'next-auth/providers/credentials';

import { userSessionAdapter, userTokenAdapter } from '@/adapters/user';
import { ROUTES } from '@/lib';
import { login, refreshAccessToken } from '@/services';

export default async function auth(req, res) {
  const providers = [
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
  ];

  const AuthResponse = await NextAuth(req, res, {
    providers,
    secret: process.env.NEXTAUTH_SECRET,
    session: {
      jwt: true,
      maxAge: 3600, // 1 hour in seconds
      updateAge: 0,
    },
    pages: {
      signIn: ROUTES.LOGIN,
    },
    callbacks: {
      async jwt({ token, user }) {
        if (user) return userTokenAdapter({ user });

        if (Date.now() < token.accessTokenExpires * 1000) {
          // If the access token has not expired yet, return it
          return token;
        }

        const result = await refreshAccessToken(token?.refreshToken);

        return result;
      },
      async session({ session, token }) {
        const result = await userSessionAdapter({ session, token });

        return result;
      },
    },
    useSecureCookies: process.env.NODE_ENV === 'production',
  });

  return AuthResponse;
}
