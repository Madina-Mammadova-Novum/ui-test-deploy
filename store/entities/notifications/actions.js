import { createAsyncThunk } from '@reduxjs/toolkit';

// eslint-disable-next-line import/no-cycle
import { setUnwatchedData, setWatchedData } from './slice';
import { NOTIFICATIONS } from './types';

import { notificationsDataAdapter } from '@/adapters/notifications';
import { getNotifications, setReadAllNotifications } from '@/services/notifications';

export const fetchReadedNotifications = createAsyncThunk(
  NOTIFICATIONS.GET_READED_NOTIFICATIONS,
  async (data, { dispatch }) => {
    const { data: result } = await getNotifications({ data });

    dispatch(setWatchedData(notificationsDataAdapter({ data: result?.data })));

    return { total: result?.readCount };
  }
);

export const fetchUnreadedNotifications = createAsyncThunk(
  NOTIFICATIONS.GET_UNREADED_NOTIFICATIONS,
  async (data, { dispatch }) => {
    const { data: result } = await getNotifications({ data });

    dispatch(setUnwatchedData(notificationsDataAdapter({ data: result?.data })));

    return { total: result?.unreadCount };
  }
);

export const fetchAllNotifications = createAsyncThunk(
  NOTIFICATIONS.GET_ALL_NOTIFICATIONS,
  async (_, { dispatch, getState }) => {
    const {
      notifications: { filterParams },
    } = getState();

    await Promise.all([
      dispatch(fetchReadedNotifications({ ...filterParams, watched: true })),
      dispatch(fetchUnreadedNotifications({ ...filterParams, watched: false })),
    ]);
  }
);

export const readAllNotifications = createAsyncThunk(NOTIFICATIONS.READ_ALL_NOTIFICATIONS, async (_, { dispatch }) => {
  await setReadAllNotifications();

  dispatch(fetchReadedNotifications());
});
