import { getServerSession } from 'next-auth';

import { responseDeleteVesselFromFleetAdapter } from '@/adapters/vessel';
import { Authorization, ContentTypeJson } from '@/lib/constants';
import { getApiURL } from '@/utils';
import { responseHandler } from '@/utils/api';
import { AUTHCONFIG } from '@/utils/auth';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, AUTHCONFIG);
  return responseHandler({
    req,
    res,
    path: getApiURL(`v1/owner/vessels/removefromfleet`),
    dataAdapter: responseDeleteVesselFromFleetAdapter,
    requestMethod: 'DELETE',
    options: { headers: { ...Authorization(session?.accessToken), ...ContentTypeJson() } },
    customErrorHandling: true,
  });
}
