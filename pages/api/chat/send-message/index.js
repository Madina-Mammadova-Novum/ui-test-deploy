import { Authorization, ContentTypeJson } from '@/lib/constants';
import { getRtURL } from '@/utils';
import { responseHandler } from '@/utils/api';
import { getCookieFromServer } from '@/utils/helpers';

export default async function handler(req, res) {
  const token = getCookieFromServer('session-access-token', req);

  return responseHandler({
    req,
    res,
    requestMethod: 'POST',
    path: getRtURL(`chat/${req.body.chatId}/SendMessage`),
    dataAdapter: (data) => data,
    options: {
      headers: Authorization(token),
      ...ContentTypeJson(),
    },
  });
}
