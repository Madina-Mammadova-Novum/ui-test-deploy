import { countriesAdapter } from '@/adapters/country';
import { getApiURL } from '@/utils';
import { responseHandler } from '@/utils/dataFetching';

export default async function handler(req, res) {
  return responseHandler({
    req,
    res,
    path: getApiURL(`v1/countries`),
    dataAdapter: countriesAdapter,
    requestMethod: 'GET',
  });
}
