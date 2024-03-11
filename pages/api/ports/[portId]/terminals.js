import { terminalsAdapter } from '@/adapters/terminal';
import { ContentTypeJson } from '@/lib/constants';
import { getApiURL } from '@/utils';
import { responseHandler } from '@/utils/api';

export default async function handler(req, res) {
  const { portId } = req.query;
  return responseHandler({
    req,
    res,
    path: getApiURL(`v1/ports/${portId}/terminals`),
    dataAdapter: terminalsAdapter,
    requestMethod: 'GET',
    options: { headers: { ...ContentTypeJson() } },
  });
}
