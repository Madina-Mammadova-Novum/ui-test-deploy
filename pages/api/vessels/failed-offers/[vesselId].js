import { getServerSession } from 'next-auth';

import { responseFailedOffersAdapter } from '@/adapters/negotiating';
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
    path: getApiURL(`v1/owner/deals/failed?VesselId=${vesselId}`),
    dataAdapter: responseFailedOffersAdapter,
    requestMethod: 'GET',
    options: { headers: { ...Authorization(session?.accessToken), ...ContentTypeJson() } },
    customErrorHandling: true,
  });
}
