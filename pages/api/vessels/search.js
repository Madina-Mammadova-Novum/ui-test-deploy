import { portsAdapter } from '@/adapters';
import { getApiURL } from '@/utils';
import { responseHandler } from '@/utils/dataFetching';

export default async function handler(req, res) {
  return responseHandler({
    req,
    res,
    path: getApiURL(`v1/vessels/search`),
    dataAdapter: portsAdapter,
    requestMethod: 'POST',
  });
}
