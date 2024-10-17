import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { ROUTES } from '@/lib';
import { checkAuthRoute, getRoleIdentity } from '@/utils/helpers';

export default function middleware(req) {
  // Check if maintenance mode is enabled and the environment is production
  const maintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true' && process.env.NODE_ENV === 'production';

  // Get the current pathname
  const { pathname } = req.nextUrl;

  // If maintenance mode is active, rewrite all requests to the maintenance page,
  // but keep the original URL in the browser's address bar
  if (maintenanceMode && !pathname.startsWith(ROUTES.MAINTENANCE)) {
    req.nextUrl.pathname = ROUTES.MAINTENANCE;
    return NextResponse.rewrite(req.nextUrl);
  }

  // Continue with the original authentication and authorization checks if not in maintenance mode
  const accessToken = cookies().get('session-access-token')?.value;
  const role = cookies().get('session-user-role')?.value;

  const { isOwner, isCharterer } = getRoleIdentity({ role });

  const chartererRoutes = checkAuthRoute(req, ROUTES.ACCOUNT_SEARCH);
  const ownerRoutes = checkAuthRoute(req, ROUTES.ACCOUNT_POSITIONS) || checkAuthRoute(req, ROUTES.ACCOUNT_FLEETS);
  const isUnauthorizedAccess = (chartererRoutes && !isCharterer) || (ownerRoutes && !isOwner);

  // Redirect to the login page if accessing account-related routes without a valid access token
  if (pathname.startsWith('/account') && !accessToken) {
    return NextResponse.redirect(new URL(ROUTES.LOGIN, req.url));
  }

  // Redirect to the "Not Found" page if trying to access unauthorized routes
  if (isUnauthorizedAccess) {
    return NextResponse.redirect(new URL(ROUTES.NOT_FOUND, req.url));
  }

  // Allow the request to proceed if all checks pass
  return NextResponse.next();
}

export const config = {
  matcher: [
    {
      source: '/((?!_next/static|_next/image|favicon.ico).*)', // Match all routes except static files
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};
