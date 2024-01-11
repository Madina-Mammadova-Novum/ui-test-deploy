import { notificationsDataAdapter } from '@/adapters/notifications';
import { Authorization, ContentTypeUrlEncoded } from '@/lib/constants';
import { setNotifications } from '@/models/notificationsModel';
import { getRtURL } from '@/utils';
import { responseHandler } from '@/utils/api';
import { getCookieFromServer } from '@/utils/helpers';

export default async function handler(req, res) {
  const token = getCookieFromServer('session-access-token', req);

  req.body = setNotifications({ data: req.body });

  return responseHandler({
    req,
    res,
    path: getRtURL(`notifications/search`),
    dataAdapter: notificationsDataAdapter,
    requestMethod: 'POST',
    options: {
      headers: { ...Authorization(token), ...ContentTypeUrlEncoded() },
    },
  });
}
