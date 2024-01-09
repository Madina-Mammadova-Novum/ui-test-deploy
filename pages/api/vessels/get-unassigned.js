import { responseGetUnassignedVesselsAdapter } from '@/adapters/vessel';
import { Authorization } from '@/lib/constants';
import { getApiURL } from '@/utils';
import { responseHandler } from '@/utils/api';
import { getCookieFromServer } from '@/utils/helpers';

export default async function handler(req, res) {
  const token = getCookieFromServer('session-access-token', req);

  return responseHandler({
    req,
    res,
    path: getApiURL(`v1/owner/fleets/unassigned/vessels`),
    dataAdapter: responseGetUnassignedVesselsAdapter,
    requestMethod: 'GET',
    options: { headers: Authorization(token) },
  });
}
