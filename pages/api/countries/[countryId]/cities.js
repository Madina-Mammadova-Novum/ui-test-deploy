import { citiesAdapter } from '@/adapters/city';
import { ContentTypeJson } from '@/lib/constants';
import { getApiURL } from '@/utils';
import { responseHandler } from '@/utils/api';

export default async function handler(req, res) {
  const { countryId, query = '', skip = 0, pageSize = 10 } = req.query;
  return responseHandler({
    req,
    res,
    path: getApiURL(`v1/countries/${countryId}/cities?query=${query}&skip=${skip}&pageSize=${pageSize}`),
    dataAdapter: citiesAdapter,
    requestMethod: 'GET',
    options: { headers: { ...ContentTypeJson() } },
  });
}
