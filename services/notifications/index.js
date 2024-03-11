import { notificationParamsAdapter } from '@/adapters/notifications';
import { getData, postData } from '@/utils/dataFetching';

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

export const readNotificationById = async ({ id }) => {
  const response = await getData(`notifications/read?id=${id}`);

  return {
    ...response,
  };
};
