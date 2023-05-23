import NextAuth from 'next-auth/next';
import Credentials from 'next-auth/providers/credentials';

import { sessionAdapter, tokenAdapter } from '@/adapters/user';
import { ROUTES } from '@/lib';
import { login } from '@/services';

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
      strategy: 'jwt',
    },
    callbacks: {
      jwt: async ({ token, user }) => {
        if (user) return tokenAdapter({ data: user });

        if (Date.now() < token.accessTokenExpires) return token;

        return null;
      },
      session: async ({ session, token }) => {
        return Promise.resolve(sessionAdapter({ session, token }));
      },
    },
    pages: {
      signIn: ROUTES.LOGIN,
      signOut: '/',
    },
  });

  return AuthResponse;
}
