import { getSession, signOut } from 'next-auth/react';

import { notificationParamsAdapter } from '@/adapters/notifications';
import { signOutAdapter } from '@/adapters/user';
import { Authorization } from '@/lib/constants';
import { setNotifications } from '@/models/notificationsModel';
import { getRtURL } from '@/utils';
import { postData } from '@/utils/dataFetching';

export const getNotifications = async ({ data }) => {
  const session = await getSession();
  const params = notificationParamsAdapter({ data });
  // const response = await postData(`notifications`, { data: setNotifications(), type: 'formdata' });

  const response = await fetch(getRtURL(`notifications/search`), {
    method: 'POST',
    headers: { Accept: '*/*', ...Authorization(session?.accessToken) },
    body: setNotifications({ data: params }),
  });

  if (response.status === 401) {
    await signOut({ ...signOutAdapter() });
  }

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
