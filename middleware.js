import { NextResponse } from 'next/server';
import { withAuth } from 'next-auth/middleware';

import { ROUTES } from '@/lib';

export default withAuth(
  // eslint-disable-next-line consistent-return
  function middleware(req) {
    if (req.nextUrl.pathname.startsWith('/account') && !req.nextauth.token?.access_token) {
      return NextResponse.redirect(new URL(ROUTES.LOGIN, req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = { matcher: ['/account/:path*'] };
