import { createSlice } from '@reduxjs/toolkit';

/* Actions */
import { fetchNotifications } from './actions';

import { options } from '@/utils/helpers';

const initialState = {
  data: [],
  unread: 0,
  readed: 0,
  loading: false,
  error: null,
  isConnected: false,
  filterParams: {
    searchValue: '',
    sortedValue: '',
    skip: 0,
    take: 20,
    activeTab: 'Unread',
    watched: false,
    tabs: options(['Unread', 'Read']),
  },
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setUpdatedData: (state, action) => {
      state.data = action.payload;
    },
    setFilterParams: (state, action) => {
      state.filterParams = {
        ...state.filterParams,
        ...action.payload,
      };
    },
    setConnectionStatus: (state, action) => {
      state.isConnected = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNotifications.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchNotifications.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.data = payload?.data;
      state.readed = payload.readed;
      state.unread = payload.unread;
    });
    builder.addCase(fetchNotifications.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload?.error;
    });
  },
});

export const { setConnectionStatus, setFilterParams, setUpdatedData } = notificationsSlice.actions;

export default notificationsSlice.reducer;
