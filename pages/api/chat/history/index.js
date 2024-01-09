// import { chatHistoryResponseAdapter } from '@/adapters';
import { Authorization } from '@/lib/constants';
import { getRtURL } from '@/utils';
import { responseHandler } from '@/utils/api';
import { getCookieFromServer } from '@/utils/helpers';

export default async function handler(req, res) {
  const token = getCookieFromServer('session-access-token', req);

  const { id, date } = req.query;

  return responseHandler({
    req,
    res,
    path: getRtURL(`/chat/load/${id}?created=${date}`),
    // dataAdapter: (data) => chatHistoryResponseAdapter({ data, session }),
    requestMethod: 'GET',
    options: { headers: Authorization(token) },
  });
}
