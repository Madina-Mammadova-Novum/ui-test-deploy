import { notificationParamsAdapter } from '@/adapters/notifications';
import { api } from '@/lib/axios';
import { getRtURL } from '@/utils';
import { postData } from '@/utils/dataFetching';
import { getCookieFromBrowser } from '@/utils/helpers';

export const getNotifications = async ({ data }) => {
  const body = notificationParamsAdapter({ data });

  const token = getCookieFromBrowser('session-access-token');

  const response = await api.postForm(getRtURL(`notifications/search`), body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return {
    ...response,
  };
};

export const setReadAllNotifications = async () => {
  const response = await postData('notifications/read-all');

  return {
    ...response,
  };
};
