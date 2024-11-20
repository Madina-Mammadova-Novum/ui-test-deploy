import {
  apiErrorAdapter,
  apiOptionsAdapter,
  apiSuccessAdapter,
  errorResponseAdapter,
  successResponseAdapter,
} from '@/adapters/api';
import { responseAdapter } from '@/adapters/response';
import { api } from '@/lib/axios';

export const apiHandler = async (options) => {
  try {
    const headers = {
      ...options.headers,
      'x-forwarded-for': options.forwardedFor || options.ip,
    };

    const response = await api.request(apiOptionsAdapter({ ...options, headers }));

    return apiSuccessAdapter(successResponseAdapter(response));
  } catch (error) {
    return apiErrorAdapter(errorResponseAdapter(error));
  }
};

export const responseHandler = async ({ req, res, dataAdapter, ...rest }) => {
  const ip =
    req.headers['x-real-ip'] ||
    req.headers['x-forwarded-for']?.split(',')[0] ||
    req.headers['x-client-ip'] ||
    req.socket?.remoteAddress ||
    'Unknown';

  const response = await apiHandler({
    body: req.body,
    options: req.options,
    headers: {
      ...req.headers,
      'x-forwarded-for': ip,
    },
    ...rest,
  });

  const data = await dataAdapter({ data: response.data });

  return res.status(response.status).json({ ...response, ...responseAdapter(data) });
};
