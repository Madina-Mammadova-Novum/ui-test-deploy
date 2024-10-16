import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { ROUTES } from '@/lib';
import { checkAuthRoute, getRoleIdentity } from '@/utils/helpers';

export default function middleware(req) {
  const accessToken = cookies().get('session-access-token')?.value;
  const role = cookies().get('session-user-role')?.value;

  const { isOwner, isCharterer } = getRoleIdentity({ role });

  const chartererRoutes = checkAuthRoute(req, ROUTES.ACCOUNT_SEARCH);
  const ownerRoutes = checkAuthRoute(req, ROUTES.ACCOUNT_POSITIONS) || checkAuthRoute(req, ROUTES.ACCOUNT_FLEETS);

  if (req.nextUrl.pathname.startsWith('/account') && !accessToken) {
    return NextResponse.redirect(new URL(ROUTES.LOGIN, req.url));
  }

  if (chartererRoutes && !isCharterer) {
    return NextResponse.redirect(new URL(ROUTES.NOT_FOUND, req.url));
  }

  if (ownerRoutes && !isOwner) {
    return NextResponse.redirect(new URL(ROUTES.NOT_FOUND, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    {
      source: '/account/:path*',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};
