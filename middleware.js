/* eslint-disable consistent-return */
import { NextResponse } from 'next/server';
import { withAuth } from 'next-auth/middleware';

import { ROUTES } from '@/lib';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token?.accessToken;

    if (req.nextUrl.pathname.startsWith('/account') && !token) {
      return NextResponse.redirect(new URL(ROUTES.LOGIN, req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        if (token?.accessToken) return true;
        return false;
      },
    },
  }
);

export const config = { matcher: ['/account/:path*'] };
