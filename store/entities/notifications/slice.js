import { createSlice } from '@reduxjs/toolkit';

/* Actions */
import { fetchNotifications } from './actions';

const initialState = {
  cachedRead: null,
  cachedUnread: null,
  unread: 0,
  readed: 0,
  loading: false,
  error: null,
  isConnected: false,
  filterParams: {
    activeTab: 'unread',
    searchValue: '',
    sortedValue: '',
    skip: 0,
    take: 20,
    watched: false,
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
    resetFilterParams: (state) => {
      state.filterParams = {
        ...state.filterParams,
        searchValue: '',
        sortedValue: '',
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNotifications.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchNotifications.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.data = payload.data;
      state.readed = payload.readed;
      state.unread = payload.unread;
    });
    builder.addCase(fetchNotifications.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload?.error;
    });
  },
});

export const { setConnectionStatus, setFilterParams, setUpdatedData, resetFilterParams } = notificationsSlice.actions;

export default notificationsSlice.reducer;
