/**
 * Health Check Endpoint
 *
 * Purpose: Basic health check for deployment verification
 * Returns: 200 OK with health status information
 */

export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({
      status: 'error',
      message: 'Method not allowed',
    });
  }

  try {
    // Basic health check - app is running and can respond
    return res.status(200).json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      service: 'shiplink-frontend',
      environment: process.env.NEXT_PUBLIC_APP_ENV || 'unknown',
    });
  } catch (error) {
    // If something goes wrong, return unhealthy status
    return res.status(503).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: error.message,
    });
  }
}
