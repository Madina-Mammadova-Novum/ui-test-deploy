/* eslint-disable consistent-return */
import { NextResponse } from 'next/server';
import { withAuth } from 'next-auth/middleware';

import { decodedTokenAdapter, userRoleAdapter } from './adapters/user';

import { ROUTES } from '@/lib';
import { checkAuthRoute, getRoleIdentity } from '@/utils/helpers';

export default withAuth(
  function middleware(req) {
    const { accessToken } = req.nextauth.token;

    const { role } = decodedTokenAdapter(accessToken);
    const { isOwner, isCharterer } = getRoleIdentity({ role: userRoleAdapter({ data: role }) });

    const charetererRoutes = checkAuthRoute(req, ROUTES.ACCOUNT_SEARCH);
    const ownerRoutes = checkAuthRoute(req, ROUTES.ACCOUNT_POSITIONS) || checkAuthRoute(req, ROUTES.ACCOUNT_FLEETS);

    if (req.nextUrl.pathname.startsWith('/account') && !accessToken) {
      return NextResponse.redirect(new URL(ROUTES.LOGIN, req.url));
    }

    if (charetererRoutes && !isCharterer) {
      return NextResponse.redirect(new URL(ROUTES.NOT_FOUND, req.url));
    }

    if (ownerRoutes && !isOwner) {
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
