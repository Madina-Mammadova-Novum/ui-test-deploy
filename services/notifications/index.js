import { notificationParamsAdapter } from '@/adapters/notifications';
import { api } from '@/lib/axios';
import { getRtURL } from '@/utils';
import { postData } from '@/utils/dataFetching';

export const getNotifications = async ({ data }) => {
  const body = notificationParamsAdapter({ data });

  const response = await api.postForm(getRtURL(`notifications/search`), body);

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
