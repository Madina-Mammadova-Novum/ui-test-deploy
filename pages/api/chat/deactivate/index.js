import { Authorization } from '@/lib/constants';
import { getRtURL } from '@/utils';
import { responseHandler } from '@/utils/api';
import { getCookieFromServer } from '@/utils/helpers';

export default async function handler(req, res) {
  const token = getCookieFromServer('session-access-token', req);

  return responseHandler({
    req,
    res,
    path: getRtURL(`/chat/${req.query.chatId}/archive`),
    dataAdapter: (data) => data,
    requestMethod: 'POST',
    options: { headers: Authorization(token) },
  });
}
