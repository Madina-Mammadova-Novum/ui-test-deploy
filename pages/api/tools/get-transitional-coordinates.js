import { estimationResponseDataAdapter } from '@/adapters';
import { ContentTypeJson } from '@/lib/constants';
import { responseHandler } from '@/utils/api';

export default async function handler(req, res) {
  return responseHandler({
    req,
    res,
    path: `https://apipro.seametrix.net/api/GetRoutes?AccessKey=${process.env.NEXT_PUBLIC_SEAMETRIX_KEY}`,
    dataAdapter: estimationResponseDataAdapter,
    requestMethod: 'POST',
    options: { headers: { ...ContentTypeJson() } },
  });
}
