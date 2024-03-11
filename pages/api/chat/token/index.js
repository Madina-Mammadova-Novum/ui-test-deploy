import { chatTokenResponseAdapter } from '@/adapters';
import { ContentTypeJson } from '@/lib/constants';
import { getApiURL } from '@/utils';
import { responseHandler } from '@/utils/api';

export default async function handler(req, res) {
  return responseHandler({
    req,
    res,
    path: getApiURL(`v1/chats/anonymous`),
    dataAdapter: chatTokenResponseAdapter,
    requestMethod: 'POST',
    options: { headers: { ...ContentTypeJson() } },
  });
}
