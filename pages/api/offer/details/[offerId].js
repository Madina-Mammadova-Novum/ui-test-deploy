import { getServerSession } from 'next-auth';

import { responseOfferDetailsAdapter } from '@/adapters/offer';
import { Authorization } from '@/lib/constants';
import { getApiURL } from '@/utils';
import { responseHandler } from '@/utils/api';
import { AUTHCONFIG } from '@/utils/auth';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, AUTHCONFIG);
  const { offerId } = req.query;
  return responseHandler({
    req,
    res,
    path: getApiURL(`v1/owner/deals/${offerId}/details`),
    dataAdapter: responseOfferDetailsAdapter,
    requestMethod: 'GET',
    options: { headers: { ...Authorization(session?.accessToken) } },
    customErrorHandling: true,
  });
}
