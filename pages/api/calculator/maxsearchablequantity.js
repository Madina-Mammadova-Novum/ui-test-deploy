import { responseMaxSearchableQuantityAdapter } from '@/adapters/calculator';
import { getApiURL } from '@/utils';
import { responseHandler } from '@/utils/api';

export default async function handler(req, res) {
  return responseHandler({
    req,
    res,
    path: getApiURL('calculator/maxsearchablequantity'),
    dataAdapter: responseMaxSearchableQuantityAdapter,
    requestMethod: 'GET',
  });
}
