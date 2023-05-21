/* eslint-disable consistent-return */
import { NextResponse } from 'next/server';
import { withAuth } from 'next-auth/middleware';

import { ROUTES } from '@/lib';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token?.access_token;

    if (req.nextUrl.pathname.startsWith('/account') && Boolean(token)) {
      return NextResponse.redirect(new URL(ROUTES.LOGIN, req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        if (token === null || token === '') return false;
        return true;
      },
    },
  }
);

export const config = { matcher: ['/account/:path*'] };
