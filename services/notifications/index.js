import { notificationParamsAdapter } from '@/adapters/notifications';
import { Authorization } from '@/lib/constants';
import { setNotifications } from '@/models/notificationsModel';
import { getRtURL } from '@/utils';
import { postData } from '@/utils/dataFetching';
import { getCookieFromBrowser } from '@/utils/helpers';

export const getNotifications = async ({ data }) => {
  const token = getCookieFromBrowser('session-access-token');
  const body = notificationParamsAdapter({ data });

  // const response = await postData(`notifications`, setNotifications({ data: body }));

  // return {
  //   ...response,
  // };

  const response = await fetch(getRtURL(`notifications/search`), {
    method: 'POST',
    headers: { Accept: '*/*', ...Authorization(token) },
    body: setNotifications({ data: body }),
  });

  const result = await response.text();

  return {
    status: response.status,
    data: JSON.parse(result),
  };
};

export const setReadAllNotifications = async () => {
  const response = await postData('notifications/read-all');

  return {
    ...response,
  };
};
