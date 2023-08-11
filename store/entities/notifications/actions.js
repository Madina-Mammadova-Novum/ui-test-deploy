import { createAsyncThunk } from '@reduxjs/toolkit';

// eslint-disable-next-line import/no-cycle
import { setUnwatchedData, setWatchedData, updateUnwatchedData, updateWatchedData } from './slice';
import { NOTIFICATIONS } from './types';

import { getNotifications, setReadAllNotifications } from '@/services/notifications';

export const fetchNotifications = createAsyncThunk(
  NOTIFICATIONS.GET_READED_NOTIFICATIONS,
  async (data, { dispatch }) => {
    const { data: result } = await getNotifications({ data });

    const setAction = data?.watched ? setWatchedData : setUnwatchedData;

    dispatch(setAction(result?.data));

    return { watchedCounter: result?.readCount, unwatchedCounter: result?.unreadCount };
  }
);

export const fetchMoreNotifications = createAsyncThunk(
  NOTIFICATIONS.GET_MORE_NOTIFICATIONS,
  async (data, { dispatch }) => {
    const { data: result } = await getNotifications({ data });

    const updateAction = data?.watched ? updateWatchedData : updateUnwatchedData;

    if (result?.data?.length > 0) dispatch(updateAction(result?.data));
  }
);

export const fetchAllNotifications = createAsyncThunk(
  NOTIFICATIONS.GET_ALL_NOTIFICATIONS,
  async (_, { dispatch, getState }) => {
    const { filterParams } = getState().notifications;

    await Promise.all([
      dispatch(fetchNotifications({ ...filterParams, watched: true })),
      dispatch(fetchNotifications({ ...filterParams, watched: false })),
    ]);
  }
);

export const readAllNotifications = createAsyncThunk(
  NOTIFICATIONS.SET_READ_ALL_NOTIFICATIONS,
  async (_, { dispatch }) => {
    await Promise.all([setReadAllNotifications(), dispatch(fetchAllNotifications())]);
  }
);
