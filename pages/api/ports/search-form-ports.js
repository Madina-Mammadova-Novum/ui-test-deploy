import { portsAdapter } from '@/adapters';
import { ContentTypeJson } from '@/lib/constants';
import { getApiURL } from '@/utils';
import { responseHandler } from '@/utils/api';

export default async function handler(req, res) {
  const { query = '', skip = 0, pageSize = 10 } = req.query;

  return responseHandler({
    req,
    res,
    path: getApiURL(`v1/ports/searchports?query=${query}&skip=${skip}&pageSize=${pageSize}`),
    dataAdapter: portsAdapter,
    requestMethod: 'GET',
    options: { headers: { ...ContentTypeJson() } },
  });
}
