import { documentRequestsRequestAdapter } from '@/adapters/documentRequests';
import { Authorization } from '@/lib/constants';
import { getApiURL } from '@/utils';
import { responseHandler } from '@/utils/api';
import { getCookieFromServer } from '@/utils/helpers';

export default async function handler(req, res) {
  const role = getCookieFromServer('session-user-role', req);
  const token = getCookieFromServer('session-access-token', req);
  const { dealId } = req.body;

  return responseHandler({
    req,
    res,
    path: getApiURL(`v1/${role}/deals/${dealId}/documentrequest`),
    dataAdapter: documentRequestsRequestAdapter,
    requestMethod: 'POST',
    options: { headers: Authorization(token) },
  });
}
