import { getServerSession } from 'next-auth';

import { responseAddVesselByImoAdapter } from '@/adapters/vessel';
import { Authorization } from '@/lib/constants';
import { getApiURL } from '@/utils';
import { responseHandler } from '@/utils/api';
import { AUTHCONFIG } from '@/utils/auth';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, AUTHCONFIG);
  const { fleetId } = req.query;
  return responseHandler({
    req,
    res,
    path: getApiURL(`v1/owner/fleets/${fleetId}/addvessel`),
    dataAdapter: responseAddVesselByImoAdapter,
    requestMethod: 'POST',
    options: { headers: { ...Authorization(session?.accessToken) } },
    customErrorHandling: true,
  });
}
