import { getServerSession } from 'next-auth';

import { responseCreateFleetAdapter } from '@/adapters';
import { Authorization, ContentTypeJson } from '@/lib/constants';
import { getApiURL } from '@/utils';
import { responseHandler } from '@/utils/api';
import { AUTHCONFIG } from '@/utils/auth';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, AUTHCONFIG);
  const { fleetId } = req.query;

  return responseHandler({
    req,
    res,
    path: getApiURL(`v1/owner/fleets/${fleetId}`),
    dataAdapter: responseCreateFleetAdapter,
    requestMethod: 'PUT',
    options: { headers: { ...Authorization(session?.accessToken), ...ContentTypeJson() } },
    customErrorHandling: true,
  });
}
