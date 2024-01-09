import { responseGetUnassignedVesselsAdapter } from '@/adapters/vessel';
import { Authorization } from '@/lib/constants';
import { getApiURL } from '@/utils';
import { responseHandler } from '@/utils/api';
import { getCookieFromServer } from '@/utils/helpers';

export default async function handler(req, res) {
  const token = getCookieFromServer('session-access-token', req);
  const { fleetId } = req.query;

  return responseHandler({
    req,
    res,
    path: getApiURL(`v1/owner/fleets/${fleetId}/vessels`),
    dataAdapter: responseGetUnassignedVesselsAdapter,
    requestMethod: 'GET',
    options: { headers: Authorization(token) },
  });
}
