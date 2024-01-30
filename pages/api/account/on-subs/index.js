import { responseOwnerPrefixtureAdapter } from '@/adapters';
import { Authorization } from '@/lib/constants';
import { getApiURL } from '@/utils';
import { responseHandler } from '@/utils/api';
import { getCookieFromServer } from '@/utils/helpers';

export default async function handler(req, res) {
  const role = getCookieFromServer('session-user-role', req);
  const token = getCookieFromServer('session-access-token', req);

  return responseHandler({
    req,
    res,
    requestMethod: 'GET',
    path: getApiURL(`v1/${role}/deals/onsubs?Skip=${req.body.skip}&PageSize=${req.body.pageSize}`),
    dataAdapter: responseOwnerPrefixtureAdapter,
    options: { headers: Authorization(token) },
  });
}
