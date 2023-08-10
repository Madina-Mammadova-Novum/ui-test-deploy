import { countriesAdapter } from '@/adapters/country';
import { ContentTypeJson } from '@/lib/constants';
import { getApiURL } from '@/utils';
import { responseHandler } from '@/utils/api';

export default async function handler(req, res) {
  return responseHandler({
    req,
    res,
    path: getApiURL(`v1/countries`),
    dataAdapter: countriesAdapter,
    requestMethod: 'GET',
    options: { headers: { ...ContentTypeJson() } },
  });
}
