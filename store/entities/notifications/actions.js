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

    if (watched) {
      dispatch(updateWatchedData(result?.data));
      if (watchedData.length > 0 && (sortedValue !== '' || searchValue !== 'all')) {
        dispatch(setWatchedData(result?.data));
      }
    } else {
      dispatch(updateUnwatchedData(result?.data));
      if (unwatchedData?.length > 0 && (sortedValue !== '' || searchValue !== 'all')) {
        dispatch(setUnwatchedData(result?.data));
      }
    }

    return { readed: result?.readCount, unread: result?.unreadCount };
  }
);

export const readAllNotifications = createAsyncThunk(NOTIFICATIONS.READ_ALL_NOTIFICATIONS, async (_, { dispatch }) => {
  await setReadAllNotifications();

  dispatch(fetchNotifications());
});
