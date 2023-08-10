import { getServerSession } from 'next-auth';

import { responseGetVesselDetailsAdapter } from '@/adapters/vessel';
import { Authorization, ContentTypeJson } from '@/lib/constants';
import { getApiURL } from '@/utils';
import { responseHandler } from '@/utils/api';
import { AUTHCONFIG } from '@/utils/auth';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, AUTHCONFIG);
  const { vesselId } = req.query;

  return responseHandler({
    req,
    res,
    path: getApiURL(`v1/owner/vessels/${vesselId}`),
    dataAdapter: responseGetVesselDetailsAdapter,
    requestMethod: 'GET',
    options: { headers: { ...Authorization(session?.accessToken), ...ContentTypeJson() } },
    customErrorHandling: true,
  });
}
