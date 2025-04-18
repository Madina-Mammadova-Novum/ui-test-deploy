import { validateOtpAdapter, validateOtpResponseAdapter } from '@/adapters/otp';
import { Authorization } from '@/lib/constants';
import { getApiURL } from '@/utils';
import { responseHandler } from '@/utils/api';
import { getCookieFromServer } from '@/utils/helpers';

export default async function handler(req, res) {
  const token = getCookieFromServer('session-access-token', req);
  return responseHandler({
    req,
    res,
    path: getApiURL('v1/onetimepasswords/validate'),
    dataAdapter: validateOtpResponseAdapter,
    requestMethod: 'POST',
    options: { headers: Authorization(token) },
    body: validateOtpAdapter({ data: req.body }),
  });
}
