import { chatTokenResponseAdapter } from '@/adapters';
import { ContentTypeJson } from '@/lib/constants';
import { getApiURL } from '@/utils';
import { responseHandler } from '@/utils/api';

export default async function handler(req, res) {
  const data = req.body;

  const body = {
    ...data,
    clientId: 'shiplink-api',
    clientSecret: '49C1A7E1-0C79-4A7889-Ay3D6-0997998FB86B0',
  };

  return responseHandler({
    req: { ...req, body },
    res,
    path: getApiURL(`v1/chats/anonymous`),
    dataAdapter: chatTokenResponseAdapter,
    requestMethod: 'POST',
    options: {
      headers: { ...ContentTypeJson() },
    },
  });
}
