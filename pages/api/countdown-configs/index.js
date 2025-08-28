import { responseCountdownConfigsAdapter } from '@/adapters/countdownTimer';
import { Authorization } from '@/lib/constants';
import { getApiURL } from '@/utils';
import { responseHandler } from '@/utils/api';
import { getCookieFromServer } from '@/utils/helpers';

export default async function handler(req, res) {
  const token = getCookieFromServer('session-access-token', req);
  const { purpose } = req.query;

  const queryParams = purpose ? `?purpose=${purpose}` : '';

  return responseHandler({
    req,
    res,
    path: getApiURL(`v1/countdownconfigs${queryParams}`),
    dataAdapter: responseCountdownConfigsAdapter,
    requestMethod: 'GET',
    options: { headers: Authorization(token) },
  });
}
