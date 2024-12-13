import { dischargeOptionsAdapter } from '@/adapters';
import { ContentTypeJson } from '@/lib/constants';
import { getApiURL } from '@/utils';
import { responseHandler } from '@/utils/api';

export default async function handler(req, res) {
  const { query = '' } = req.query;

  return responseHandler({
    req,
    res,
    path: getApiURL(`v1/ports/additionaldischargeoptions?SearchValue=${query}`),
    dataAdapter: dischargeOptionsAdapter,
    requestMethod: 'GET',
    options: { headers: { ...ContentTypeJson() } },
  });
}
