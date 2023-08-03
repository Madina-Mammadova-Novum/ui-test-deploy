import { createAsyncThunk } from '@reduxjs/toolkit';

import { NOTIFICATIONS } from './types';

import { getNotifications, setReadAllNotifications } from '@/services/notifications';

export const fetchNotifications = createAsyncThunk(NOTIFICATIONS.GET_NOTIFICATIONS, async (data) => {
  const { data: result } = await getNotifications({ data });

  return { data: result?.data, readed: result?.readCount, unread: result?.unreadCount };
});

export const readAllNotifications = createAsyncThunk(NOTIFICATIONS.READ_ALL_NOTIFICATIONS, async (_, { dispatch }) => {
  await setReadAllNotifications();

  dispatch(fetchNotifications());
});
