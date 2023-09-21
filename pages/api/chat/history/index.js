import { getServerSession } from 'next-auth';

import { chatHistoryResponseAdapter } from '@/adapters';
import { Authorization, ContentTypeJson } from '@/lib/constants';
import { getRtURL } from '@/utils';
import { responseHandler } from '@/utils/api';
import { AUTHCONFIG } from '@/utils/auth';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, AUTHCONFIG);
  const { id, date } = req.query;

  return responseHandler({
    req,
    res,
    path: getRtURL(`/chat/load/${id}?created=${date}`),
    dataAdapter: (data) => chatHistoryResponseAdapter({ data, session }),
    requestMethod: 'GET',
    options: { headers: { ...Authorization(session?.accessToken), ...ContentTypeJson() } },
  });
}
