import { documentRequestsResponseAdapter } from '@/adapters/documentRequests';
import { Authorization } from '@/lib/constants';
import { getApiURL } from '@/utils';
import { responseHandler } from '@/utils/api';
import { getCookieFromServer } from '@/utils/helpers';

export default async function handler(req, res) {
  const role = getCookieFromServer('session-user-role', req);
  const token = getCookieFromServer('session-access-token', req);
  const { dealId } = req.query;

  return responseHandler({
    req,
    res,
    path: getApiURL(`v1/${role}/deals/${dealId}/documentrequests`),
    dataAdapter: documentRequestsResponseAdapter,
    requestMethod: 'GET',
    options: { headers: Authorization(token) },
  });
}
