import { responseFreightEstimationAdapter } from '@/adapters/calculator';
import { ContentTypeJson } from '@/lib/constants';
import { getApiURL } from '@/utils';
import { responseHandler } from '@/utils/api';

export default async function handler(req, res) {
  return responseHandler({
    req,
    res,
    path: getApiURL(`calculator/freightestimation`),
    dataAdapter: responseFreightEstimationAdapter,
    requestMethod: 'POST',
    options: { headers: ContentTypeJson() },
  });
}
