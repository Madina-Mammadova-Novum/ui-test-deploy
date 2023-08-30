import { createSlice } from '@reduxjs/toolkit';

/* Actions */
// eslint-disable-next-line import/no-cycle
import { fetchNotifications } from './actions';

const initialState = {
  unread: 0,
  readed: 0,
  watchedData: [],
  unwatchedData: [],
  loading: false,
  error: null,
  isConnected: false,
  filterParams: {
    activeTab: 'unread',
    searchValue: '',
    sortedValue: 'all',
    skip: 0,
    take: 50,
    watched: false,
  },
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setWatchedData: (state, action) => {
      state.watchedData = [...action.payload];
    },
    updateWatchedData: (state, action) => {
      state.watchedData = [...state.watchedData, ...action.payload];
    },
    setUnwatchedData: (state, action) => {
      state.unwatchedData = [...action.payload];
    },
    updateUnwatchedData: (state, action) => {
      state.unwatchedData = [...state.unwatchedData, ...action.payload];
    },
    setFilterParams: (state, action) => {
      state.filterParams = {
        ...state.filterParams,
        ...action.payload,
      };
    },
    resetNotifications: (state) => {
      state.watchedData = [];
      state.unwatchedData = [];
    },
    resetParams: (state) => {
      state.filterParams = initialState.filterParams;
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
      state.readed = payload.readed;
      state.unread = payload.unread;
    });
    builder.addCase(fetchNotifications.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload?.error;
    });
  },
});

export const {
  setConnectionStatus,
  setFilterParams,
  setWatchedData,
  setUnwatchedData,
  resetNotifications,
  updateWatchedData,
  updateUnwatchedData,
  getUnwatchedData,
  getWatchedData,
  resetParams,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
