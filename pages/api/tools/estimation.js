import { estimationResponseDataAdapter } from '@/adapters';
import { ContentTypeJson } from '@/lib/constants';
import { getApiURL } from '@/utils';
import { responseHandler } from '@/utils/api';

export default async function handler(req, res) {
  const { format } = req.query;

  return responseHandler({
    req,
    res,
    path: getApiURL(`calculator/${format}`),
    dataAdapter: estimationResponseDataAdapter,
    requestMethod: 'POST',
    options: { headers: { ...ContentTypeJson() } },
  });
}
