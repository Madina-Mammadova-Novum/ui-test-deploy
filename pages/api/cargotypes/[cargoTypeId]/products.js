import { getProductsAdapter } from '@/adapters';
import { ContentTypeJson } from '@/lib/constants';
import { getApiURL } from '@/utils';
import { responseHandler } from '@/utils/api';

export default async function handler(req, res) {
  const { cargoTypeId } = req.query;
  return responseHandler({
    req,
    res,
    path: getApiURL(`v1/cargotypes/${cargoTypeId}/products`),
    dataAdapter: getProductsAdapter,
    requestMethod: 'GET',
    options: { headers: { ...ContentTypeJson() } },
  });
}
