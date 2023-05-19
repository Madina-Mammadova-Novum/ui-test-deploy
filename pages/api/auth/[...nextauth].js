// eslint-disable-next-line import/no-extraneous-dependencies
import jwt from 'jsonwebtoken';
import NextAuth from 'next-auth/next';
import Credentials from 'next-auth/providers/credentials';

import { login } from '@/services';

export default async function auth(req, res) {
  const providers = [
    Credentials({
      name: 'credentials',
      id: 'credentials',
      type: 'credentials',
      credentials: {
        emal: {},
        password: {},
      },
      async authorize(credentials) {
        const response = await login({ data: credentials });
        // TODO: response doesn't sync with apiHandler
        if (response) return response;

        return null;
      },
    }),
  ];

  const AuthResponse = await NextAuth(req, res, {
    providers,
    session: {
      strategy: 'jwt',
    },
    pages: {
      signIn: '/login',
    },
    callbacks: {
      async jwt({ token, user }) {
        return { ...token, ...user };
      },
      async session({ session, token: { data } }) {
        session.user = { ...data, ...jwt.decode(data?.access_token) };
        return session;
      },
    },
  });

  return AuthResponse;
}
