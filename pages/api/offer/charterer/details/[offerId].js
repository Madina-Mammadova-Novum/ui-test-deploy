import { responseOfferDetailsAdapter } from '@/adapters/offer';
import { Authorization } from '@/lib/constants';
import { getApiURL } from '@/utils';
import { responseHandler } from '@/utils/api';
import { getCookieFromServer } from '@/utils/helpers';

export default async function handler(req, res) {
  const token = getCookieFromServer('session-access-token', req);
  const { offerId } = req.query;

  return responseHandler({
    req,
    res,
    path: getApiURL(`v1/charterer/deals/${offerId}/details`),
    dataAdapter: responseOfferDetailsAdapter,
    requestMethod: 'GET',
    options: { headers: Authorization(token) },
  });
}
