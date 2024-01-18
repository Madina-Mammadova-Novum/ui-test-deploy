import { chatHistoryResponseAdapter } from '@/adapters';
import { Authorization, ContentTypeJson } from '@/lib/constants';
import { getRtURL } from '@/utils';
import { responseHandler } from '@/utils/api';
import { getCookieFromServer } from '@/utils/helpers';

export default async function handler(req, res) {
  const token = getCookieFromServer('session-access-token', req);
  const role = getCookieFromServer('session-user-role', req);
  const clientId = getCookieFromServer('session-user-id', req);

  return responseHandler({
    req,
    res,
    requestMethod: 'GET',
    path: getRtURL(`/chat/load/${req.query.id}?created=${req.query.date}`),
    dataAdapter: (data) => chatHistoryResponseAdapter({ role, clientId, ...data }),
    options: { headers: Authorization(token), ...ContentTypeJson() },
  });
}
