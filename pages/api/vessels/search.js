import { responseSearchVesselsAdapter } from '@/adapters/vessel';
import { getApiURL } from '@/utils';
import { responseHandler } from '@/utils/api';

export default async function handler(req, res) {
  return responseHandler({
    req,
    res,
    path: getApiURL(`v1/vessels/search`),
    dataAdapter: responseSearchVesselsAdapter,
    requestMethod: 'POST',
  });
}
