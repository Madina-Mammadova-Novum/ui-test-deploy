import { updateVesselPortAdapter } from '@/adapters/user';
import { Authorization } from '@/lib/constants';
import { getApiURL } from '@/utils';
import { responseHandler } from '@/utils/api';
import { getCookieFromServer } from '@/utils/helpers';

export default async function handler(req, res) {
  const token = getCookieFromServer('session-access-token', req);

  return responseHandler({
    req,
    res,
    path: getApiURL(`v1/owner/vessels/updateopenportanddate`),
    dataAdapter: updateVesselPortAdapter,
    requestMethod: 'PUT',
    options: { headers: Authorization(token) },
  });
}
