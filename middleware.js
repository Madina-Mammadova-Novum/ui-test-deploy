import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { ROUTES } from '@/lib';
import { checkAuthRoute, getRoleIdentity } from '@/utils/helpers';

// Define allowed origins for CORS
const allowedOrigins = ['https://ship.link', 'https://prod-int.ship.link'];

// Handle CORS for API routes
function handleCors(req, response) {
  // Only apply to /api routes
  if (!req.nextUrl.pathname.startsWith('/api')) {
    return response;
  }

  // Get the origin from request headers
  const origin = req.headers.get('origin');

  // Only set CORS headers if there's an origin
  if (origin) {
    // Check if the origin is in our allowed list
    if (allowedOrigins.includes(origin)) {
      response.headers.set('Access-Control-Allow-Origin', origin);
    }
  }

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    response.headers.set('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT');
    response.headers.set(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );
    response.headers.set('Access-Control-Allow-Credentials', 'true');

    // Max age for preflight results (in seconds)
    response.headers.set('Access-Control-Max-Age', '86400');
  }

  return response;
}

export default async function middleware(req) {
  // Initialize the response
  let response = NextResponse.next();

  // Apply CORS headers for API routes
  if (req.nextUrl.pathname.startsWith('/api')) {
    response = handleCors(req, response);

    // If it's a preflight request, return early
    if (req.method === 'OPTIONS') {
      return response;
    }
  }

  // Check if maintenance mode is enabled and the environment is production
  const maintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true' && process.env.NODE_ENV === 'production';

  // Get the current pathname
  const { pathname } = req.nextUrl;

  // If maintenance mode is active, rewrite all requests to the maintenance page,
  // but skip static files, contact-us, well-known, and privacy-policy pages
  if (
    maintenanceMode &&
    !pathname.startsWith('/_next') &&
    !pathname.startsWith('/images') &&
    !pathname.startsWith('/favicon.ico') &&
    !pathname.startsWith('/api') &&
    !pathname.startsWith('/.well-known') &&
    !pathname.startsWith(ROUTES.MAINTENANCE) &&
    pathname !== ROUTES.CONTACT_US &&
    pathname !== ROUTES.PRIVACY_POLICY &&
    pathname !== ROUTES.SIGNUP &&
    pathname !== ROUTES.GETTING_STARTED
  ) {
    req.nextUrl.pathname = ROUTES.MAINTENANCE;
    response = NextResponse.rewrite(req.nextUrl);
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    return response;
  }

  // Continue with the original authentication and authorization checks if not in maintenance mode
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('session-access-token')?.value;
  const role = cookieStore.get('session-user-role')?.value;

  const { isOwner, isCharterer, isAnon } = getRoleIdentity({ role });

  const chartererRoutes = checkAuthRoute(req, ROUTES.ACCOUNT_SEARCH);
  const ownerRoutes = checkAuthRoute(req, ROUTES.ACCOUNT_POSITIONS) || checkAuthRoute(req, ROUTES.ACCOUNT_FLEETS);
  const isUnauthorizedAccess = (chartererRoutes && !isCharterer) || (ownerRoutes && !isOwner);

  // Redirect to the login page if accessing account-related routes without a valid access token
  if (pathname.startsWith('/account') && (!accessToken || isAnon)) {
    return NextResponse.redirect(new URL(ROUTES.LOGIN, req.url));
  }

  // Redirect to the "Not Found" page if trying to access unauthorized routes
  if (isUnauthorizedAccess) {
    return NextResponse.redirect(new URL(ROUTES.NOT_FOUND, req.url));
  }

  // Allow the request to proceed if all checks pass
  return response;
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
