import { getServerSession } from 'next-auth';

import { responseGetVesselFreightFormatsAdapter } from '@/adapters/vessel';
import { Authorization } from '@/lib/constants';
import { getApiURL } from '@/utils';
import { responseHandler } from '@/utils/api';
import { AUTHCONFIG } from '@/utils/auth';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, AUTHCONFIG);
  const { vesselId } = req.query;
  return responseHandler({
    req,
    res,
    path: getApiURL(`v1/vessels/${vesselId}/freightformats`),
    dataAdapter: responseGetVesselFreightFormatsAdapter,
    requestMethod: 'GET',
    options: { headers: { ...Authorization(session?.accessToken) } },
    customErrorHandling: true,
  });
}
