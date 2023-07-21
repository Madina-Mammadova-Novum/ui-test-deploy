import { getServerSession } from 'next-auth';

import { responseIncomingOffersAdapter } from '@/adapters/negotiating';
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
    path: getApiURL(`v1/owner/deals/counteroffers?VesselId=${vesselId}`),
    dataAdapter: responseIncomingOffersAdapter,
    requestMethod: 'GET',
    options: { ...Authorization(session?.accessToken) },
    customErrorHandling: true,
  });
}
