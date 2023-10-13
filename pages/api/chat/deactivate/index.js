import { getServerSession } from 'next-auth';

import { Authorization, ContentTypeJson } from '@/lib/constants';
import { getRtURL } from '@/utils';
import { responseHandler } from '@/utils/api';
import { AUTHCONFIG } from '@/utils/auth';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, AUTHCONFIG);
  const { chatId } = req.query;

  return responseHandler({
    req,
    res,
    path: getRtURL(`/chat/${chatId}/archieve`),
    dataAdapter: (data) => data,
    requestMethod: 'POST',
    options: { headers: { ...Authorization(session?.accessToken), ...ContentTypeJson() } },
  });
}
