import { chatSupportResponseAdapter } from '@/adapters';
import { Authorization } from '@/lib/constants';
import { getApiURL } from '@/utils';
import { responseHandler } from '@/utils/api';
import { getCookieFromServer } from '@/utils/helpers';

export default async function handler(req, res) {
  const token = getCookieFromServer('session-access-token', req);

  return responseHandler({
    req,
    res,
    requestMethod: 'POST',
    path: getApiURL(`v1/chats/helpcenter`),
    dataAdapter: chatSupportResponseAdapter,
    options: { headers: Authorization(token) },
  });
}
