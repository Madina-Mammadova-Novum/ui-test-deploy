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

  if (!ip || ip === '::1' || ip.startsWith('127.')) {
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
  const ip = getClientIP(req);

  const response = await apiHandler({
    ...rest,
    body: req.body,
    options: {
      ...req.options,
      headers: {
        ...req.headers,
        'x-forwarded-for': ip,
      },
    },
  });

  const data = await dataAdapter({ data: response.data });

  return res.status(response.status).json({ ...response, ...responseAdapter(data) });
};
