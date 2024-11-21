import {
  apiErrorAdapter,
  apiOptionsAdapter,
  apiSuccessAdapter,
  errorResponseAdapter,
  successResponseAdapter,
} from '@/adapters/api';
import { responseAdapter } from '@/adapters/response';
import { api } from '@/lib/axios';

// Function to get the client IP address
const getClientIP = (req) => {
  const ip =
    req.headers['x-real-ip'] ||
    req.headers['x-forwarded-for']?.split(',')[0] ||
    req.headers['x-client-ip'] ||
    req.socket?.remoteAddress;

  if (!ip || ip === '::1' || ip.startsWith('127.') || ip.startsWith('::ffff:127.')) {
    return 'Unknown';
  }

  return ip;
};

export const apiHandler = async (options) => {
  try {
    const response = await api.request(apiOptionsAdapter(options));
    return apiSuccessAdapter(successResponseAdapter(response));
  } catch (error) {
    return apiErrorAdapter(errorResponseAdapter(error));
  }
};

export const responseHandler = async ({ req, res, dataAdapter, ...rest }) => {
  // Load Test should be added for checking here DDOS
  const ip = getClientIP(req);

  const headers = {
    ...req.headers,
    'x-forwarded-for': req.headers['x-forwarded-for'] ? `${req.headers['x-forwarded-for']}, ${ip}` : ip,
  };

  const response = await apiHandler({
    body: req.body,
    options: {
      ...req.options,
      options: {
        ...req.options,
        headers,
      },
    },
    ...rest,
  });

  const data = await dataAdapter({ data: response.data });

  return res.status(response.status).json({ ...response, ...responseAdapter(data) });
};
