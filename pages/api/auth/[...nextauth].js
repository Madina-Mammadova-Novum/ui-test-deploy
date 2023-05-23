import NextAuth from 'next-auth/next';

import { ROUTES } from '@/lib';
import { AUTHCONFIG } from '@/utils/auth';

export default async function auth(req, res) {
  const AuthResponse = await NextAuth(req, res, {
    providers: AUTHCONFIG.providers,
    secret: process.env.NEXTAUTH_SECRET,
    session: {
      strategy: 'jwt',
    },
    callbacks: {
      jwt: AUTHCONFIG.jwt,
      session: AUTHCONFIG.session,
    },
    pages: {
      signIn: ROUTES.LOGIN,
    },
  });

  return AuthResponse;
}
