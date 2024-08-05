import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { ROUTES } from '@/lib';
import { checkAuthRoute, getRoleIdentity } from '@/utils/helpers';

export default function middleware(req) {
  const accessToken = cookies().get('session-access-token')?.value;
  const role = cookies().get('session-user-role')?.value;

  const { isOwner, isCharterer } = getRoleIdentity({ role });

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

  const res = NextResponse.next();

  res.headers.append('Access-Control-Allow-Credentials', 'true');
  res.headers.append('Access-Control-Allow-Origin', 'https://test.link2');
  res.headers.append('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT');
  res.headers.append(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  return res;
}

export const config = {
  matcher: [
    '/api/:path*',
    {
      source: '/account/:path*',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};
