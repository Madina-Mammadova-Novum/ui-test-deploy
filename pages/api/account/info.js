/**
 * Account Info Endpoint
 *
 * Purpose: Protected endpoint for health checks that verifies authentication
 * Returns: 401 Unauthorized if no valid token, 200 OK with user info if authenticated
 */

import { getCookieFromServer } from '@/utils/helpers';

export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({
      status: 'error',
      message: 'Method not allowed',
    });
  }

  try {
    // Check for authentication token
    const token = getCookieFromServer('session-access-token', req);
    const role = getCookieFromServer('session-user-role', req);

    // If no token, return 401 (expected for health checks)
    if (!token) {
      return res.status(401).json({
        status: 'error',
        message: 'Unauthorized - Authentication required',
      });
    }

    // If authenticated, return basic info
    return res.status(200).json({
      status: 'authenticated',
      role: role || 'unknown',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    // Return 500 for unexpected errors
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      error: error.message,
    });
  }
}
