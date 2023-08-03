import { createAsyncThunk } from '@reduxjs/toolkit';

import { NOTIFICATIONS } from './types';

import { getNotifications } from '@/services/notifications';

export const fetchNotifications = createAsyncThunk(NOTIFICATIONS.GET_NOTIFICATIONS, async (data) => {
  const { data: result } = await getNotifications({ data });

  return { data: result?.data };
});
