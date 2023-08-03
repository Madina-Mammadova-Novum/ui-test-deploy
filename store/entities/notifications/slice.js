import { createSlice } from '@reduxjs/toolkit';

/* Actions */
import { fetchNotifications } from './actions';

import { options } from '@/utils/helpers';

const initialState = {
  data: [],
  loading: false,
  error: null,
  isConnected: false,
  filterParams: {
    searchValue: '',
    sortedValue: '',
    activeTab: 'Unread',
    watched: false,
    tabs: options(['Unread', 'Read']),
  },
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
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
    });
    builder.addCase(fetchNotifications.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload?.error;
    });
  },
});

export const { setConnectionStatus, setFilterParams } = notificationsSlice.actions;

export default notificationsSlice.reducer;
