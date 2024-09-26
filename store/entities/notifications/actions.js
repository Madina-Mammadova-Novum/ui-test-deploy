import { createAsyncThunk } from '@reduxjs/toolkit';

// eslint-disable-next-line import/no-cycle
import { resetParams, setUnwatchedData, setWatchedData, updateUnwatchedData, updateWatchedData } from './slice';
import { NOTIFICATIONS } from './types';

import { getNotifications, readNotificationById, setReadAllNotifications } from '@/services/notifications';
import { getOfferDetails } from '@/services/offer';
import { notificationPathGenerator } from '@/utils/helpers';

export const fetchNotifications = createAsyncThunk(
  NOTIFICATIONS.GET_NOTIFICATIONS,
  async (data, { getState, dispatch }) => {
    const { data: result, readCount, unreadCount } = await getNotifications({ data });

    const {
      notifications: {
        watchedData,
        unwatchedData,
        filterParams: { searchValue, sortedValue, watched },
      },
    } = getState();

    if (watched && watchedData.length > 0) {
      dispatch(updateWatchedData(result));
      if (sortedValue || searchValue) {
        dispatch(setWatchedData(result));
      }
    } else {
      dispatch(setWatchedData(result));
    }

    if (!watched && unwatchedData.length > 0) {
      dispatch(updateUnwatchedData(result));

      if (sortedValue || searchValue) {
        dispatch(setUnwatchedData(result));
      }
    } else {
      dispatch(setUnwatchedData(result));
    }

    return { readed: readCount, unread: unreadCount };
  }
);

export const getCurrentDealStage = createAsyncThunk(
  NOTIFICATIONS.GET_CURRENT_DEAL,
  async ({ id, role }, { rejectWithValue }) => {
    try {
      const { data, error } = await getOfferDetails(id, role);

      /* eslint-disable no-console */
      console.log('Getting offer details with mouse action: ', data);

      if (error) {
        return rejectWithValue(error);
      }

      const route = notificationPathGenerator({ data, role });
      return { ...data, route };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const readNotification = createAsyncThunk(NOTIFICATIONS.READ_NOTIFICATION, async ({ id }, { dispatch }) => {
  await readNotificationById({ id }).then(() => {
    dispatch(resetParams());
  });
});

export const readAllNotifications = createAsyncThunk(NOTIFICATIONS.READ_ALL_NOTIFICATIONS, async (_, { dispatch }) => {
  await setReadAllNotifications().then(() => {
    dispatch(resetParams());
  });
});
