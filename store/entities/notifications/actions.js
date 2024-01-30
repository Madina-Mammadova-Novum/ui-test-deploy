import { createAsyncThunk } from '@reduxjs/toolkit';

// eslint-disable-next-line import/no-cycle
import { setUnwatchedData, setWatchedData, updateUnwatchedData, updateWatchedData } from './slice';
import { NOTIFICATIONS } from './types';

import { getNotifications, setReadAllNotifications } from '@/services/notifications';

export const fetchNotifications = createAsyncThunk(
  NOTIFICATIONS.GET_NOTIFICATIONS,
  async (data, { getState, dispatch }) => {
    const { data: result } = await getNotifications({ data });

    const {
      notifications: {
        watchedData,
        unwatchedData,
        filterParams: { searchValue, sortedValue, watched },
      },
    } = getState();

    if (watched && watchedData.length > 0) {
      dispatch(updateWatchedData(result?.data));
      if (sortedValue || searchValue) {
        dispatch(setWatchedData(result?.data));
      }
    } else {
      dispatch(setWatchedData(result?.data));
    }

    if (!watched && unwatchedData.length > 0) {
      dispatch(updateUnwatchedData(result?.data));

      if (sortedValue || searchValue) {
        dispatch(setUnwatchedData(result?.data));
      }
    } else {
      dispatch(setUnwatchedData(result?.data));
    }

    return { readed: result?.readCount, unread: result?.unreadCount };
  }
);

export const readAllNotifications = createAsyncThunk(NOTIFICATIONS.READ_ALL_NOTIFICATIONS, async (_, { dispatch }) => {
  await setReadAllNotifications();

  dispatch(fetchNotifications());
});
