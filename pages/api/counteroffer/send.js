import { responseSendCounterofferAdapter } from '@/adapters/offer';
import { Authorization } from '@/lib/constants';
import { getApiURL } from '@/utils';
import { responseHandler } from '@/utils/api';
import { getCookieFromServer } from '@/utils/helpers';

export default async function handler(req, res) {
  const token = getCookieFromServer('session-access-token', req);

  return responseHandler({
    req,
    res,
    path: getApiURL(`v1/owner/deals/counteroffers`),
    dataAdapter: responseSendCounterofferAdapter,
    requestMethod: 'POST',
    options: { headers: Authorization(token) },
  });
}
