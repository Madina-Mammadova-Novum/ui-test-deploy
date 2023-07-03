import { portsAdapter } from '@/adapters';
import { getApiURL } from '@/utils';
import { responseHandler } from '@/utils/api';

export default async function handler(req, res) {
  return responseHandler({
    req,
    res,
    path: getApiURL(`v1/ports/searchports`),
    dataAdapter: portsAdapter,
    requestMethod: 'GET',
  });
}
