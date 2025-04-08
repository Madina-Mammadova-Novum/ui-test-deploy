import { estimationResponseDataAdapter } from '@/adapters';
import { Authorization, ContentTypeJson } from '@/lib/constants';
import { getApiURL } from '@/utils';
import { responseHandler } from '@/utils/api';
import { getCookieFromServer } from '@/utils/helpers';

export default async function handler(req, res) {
  const { format } = req.query;
  const token = getCookieFromServer('session-access-token', req);

  // Get client IP from various possible headers
  const clientIp =
    req.headers['x-real-ip'] || req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress;

  return responseHandler({
    req,
    res,
    path: getApiURL(`calculator/${format}`),
    dataAdapter: estimationResponseDataAdapter,
    requestMethod: 'POST',
    options: {
      headers: {
        ...Authorization(token),
        ...ContentTypeJson(),
        'X-Forwarded-For': clientIp,
      },
    },
  });
}
