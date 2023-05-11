import { citiesAdapter } from '@/adapters/city';
import { getApiURL } from '@/utils';
import { responseHandler } from '@/utils/dataFetching';

export default async function handler(req, res) {
  const { countryId } = req.query;
  return responseHandler({
    req,
    res,
    path: getApiURL(`v1/countries/${countryId}/cities`),
    dataAdapter: citiesAdapter,
    requestMethod: 'GET',
  });
}
