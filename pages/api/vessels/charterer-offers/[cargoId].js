import { responseOffersAdapter } from '@/adapters/negotiating';
import { Authorization } from '@/lib/constants';
import { getApiURL } from '@/utils';
import { responseHandler } from '@/utils/api';
import { getCookieFromServer } from '@/utils/helpers';

export default async function handler(req, res) {
  const token = getCookieFromServer('session-access-token', req);

  const { cargoId } = req.query;

  return responseHandler({
    req,
    res,
    path: getApiURL(`v1/charterer/deals/negotiating?CargoId=${cargoId}`),
    dataAdapter: responseOffersAdapter,
    requestMethod: 'GET',
    options: { headers: Authorization(token) },
  });
}
