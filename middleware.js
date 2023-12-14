/* eslint-disable consistent-return */
import { NextResponse } from 'next/server';
import { withAuth } from 'next-auth/middleware';

import { ROLES, ROUTES } from '@/lib';
import { checkAuthRoute } from '@/utils/helpers';

export default withAuth(
  function middleware(req) {
    const { accessToken, role } = req.nextauth.token;

    const charetererRoutes = checkAuthRoute(req, ROUTES.ACCOUNT_SEARCH);
    const ownerRoutes = checkAuthRoute(req, ROUTES.ACCOUNT_POSITIONS) || checkAuthRoute(req, ROUTES.ACCOUNT_FLEETS);

    if (req.nextUrl.pathname.startsWith('/account') && !accessToken) {
      return NextResponse.redirect(new URL(ROUTES.LOGIN, req.url));
    }

    if (charetererRoutes && role !== ROLES.CHARTERER) {
      return NextResponse.redirect(new URL(ROUTES.NOT_FOUND, req.url));
    }

    if (ownerRoutes && role !== ROLES.OWNER) {
      return NextResponse.redirect(new URL(ROUTES.NOT_FOUND, req.url));
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
