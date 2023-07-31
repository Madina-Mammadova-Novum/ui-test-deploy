import { getSession } from 'next-auth/react';

import { Authorization } from '@/lib/constants';
import { setNotifications } from '@/models/notificationsModel';
import { getRtURL } from '@/utils';
// import { postData } from '@/utils/dataFetching';

export const getNotifications = async () => {
  // const response = await postData(`notifications`, { data: setNotifications(), type: 'formdata' });

  const session = await getSession();

  const response = await fetch(getRtURL(`notifications/search`), {
    method: 'POST',
    headers: {
      Accept: '*/*',
      ...Authorization(session?.accessToken),
    },
    body: setNotifications(),
  });

  const result = await response.text();

  return {
    status: response.status,
    data: JSON.parse(result),
  };
};
