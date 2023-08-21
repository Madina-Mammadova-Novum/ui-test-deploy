import { getServerSession } from 'next-auth';

import { responseCargoSentOffersAdapter } from '@/adapters/cargo';
import { Authorization, ContentTypeJson } from '@/lib/constants';
import { getApiURL } from '@/utils';
import { responseHandler } from '@/utils/api';
import { AUTHCONFIG } from '@/utils/auth';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, AUTHCONFIG);
  const { cargoId } = req.query;

  return responseHandler({
    req,
    res,
    path: getApiURL(`v1/charterer/deals/sentoffers?CargoId=${cargoId}`),
    dataAdapter: responseCargoSentOffersAdapter,
    requestMethod: 'GET',
    options: { headers: { ...Authorization(session?.accessToken), ...ContentTypeJson() } },
    customErrorHandling: true,
  });
}
