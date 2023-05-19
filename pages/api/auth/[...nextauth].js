import NextAuth from 'next-auth/next';
import Credentials from 'next-auth/providers/credentials';

import { userSessionAdapter, userTokenAdapter } from '@/adapters/user';
import { ROUTES } from '@/lib';
import LoginModel from '@/models/loginModel';
import { signIn } from '@/services';

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
        const body = new LoginModel(credentials).setFormData();
        // const response = await login({ data: credentials });
        // TODO: error response doesn't sync with apiHandler
        const response = await signIn(body);
        const user = await response.json();

        if (response.ok && user) return user;

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
      signIn: ROUTES.LOGIN,
    },
    callbacks: {
      async jwt({ token, user }) {
        const result = await userTokenAdapter({ token, user });
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
