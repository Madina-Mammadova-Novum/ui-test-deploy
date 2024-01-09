import { Authorization } from '@/lib/constants';
import { getRtURL } from '@/utils';
import { responseHandler } from '@/utils/api';
import { getCookieFromServer } from '@/utils/helpers';

export default async function handler(req, res) {
  const token = getCookieFromServer('session-access-token', req);

  const { chatId } = req.query;

  return responseHandler({
    req,
    res,
    path: getRtURL(`/chat/${chatId}/archieve`),
    dataAdapter: (data) => data,
    requestMethod: 'POST',
    options: { headers: Authorization(token) },
  });
}
