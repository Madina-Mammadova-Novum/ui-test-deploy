import { cargoTypesAdapter } from '@/adapters/cargoTypes';
import { getApiURL } from '@/utils';
import { responseHandler } from '@/utils/api';

export default async function handler(req, res) {
  return responseHandler({
    req,
    res,
    path: getApiURL(`v1/cargotypes`),
    dataAdapter: cargoTypesAdapter,
    requestMethod: 'GET',
  });
}
