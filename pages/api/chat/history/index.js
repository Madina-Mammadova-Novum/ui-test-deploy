import { chatHistoryResponseAdapter } from '@/adapters';
import { Authorization } from '@/lib/constants';
import { getRtURL } from '@/utils';
import { responseHandler } from '@/utils/api';
import { getCookieFromServer } from '@/utils/helpers';

export default async function handler(req, res) {
  const token = getCookieFromServer('session-access-token', req);

  return responseHandler({
    req,
    res,
    requestMethod: 'GET',
    path: getRtURL(`/chat/load/${req.query.id}?created=${req.query.date}`),
    dataAdapter: chatHistoryResponseAdapter,
    options: { headers: Authorization(token) },
  });
}
