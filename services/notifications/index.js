import { notificationParamsAdapter } from '@/adapters/notifications';
import { postData } from '@/utils/dataFetching';

export const getNotifications = async ({ data }) => {
  const body = notificationParamsAdapter({ data });

  const response = await postData('notifications', body);

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
