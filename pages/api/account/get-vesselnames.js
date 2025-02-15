import { responseOwnerPrefixtureAdapter } from '@/adapters';
import { Authorization } from '@/lib/constants';
import { getApiURL } from '@/utils';
import { responseHandler } from '@/utils/api';
import { getCookieFromServer } from '@/utils/helpers';

export default async function handler(req, res) {
  const role = getCookieFromServer('session-user-role', req);
  const token = getCookieFromServer('session-access-token', req);
  const stages = req.query.stages?.split(',') || [];

  const stagesQuery = stages.length
    ? `?${stages.reduce((query, stage, index) => `${query}${index === 0 ? '' : '&'}Stages=${stage}`, '')}`
    : '';

  return responseHandler({
    req,
    res,
    path: getApiURL(`v1/${role}/deals/vesselnames${stagesQuery}`),
    dataAdapter: responseOwnerPrefixtureAdapter,
    requestMethod: 'GET',
    options: { headers: Authorization(token) },
  });
}
