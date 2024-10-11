import { createSlice } from '@reduxjs/toolkit';

/* Actions */

// eslint-disable-next-line import/no-cycle
import { fetchNotifications, getCurrentDealStage, readNotification } from './actions';

const initialState = {
  unread: 0,
  watchedData: [],
  unwatchedData: [],
  dealData: {},
  dealFetching: false,
  loading: false,
  error: null,
  isOpened: false,
  filterParams: {
    activeTab: 'unread',
    searchValue: '',
    sortedValue: [],
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
    setIsOpened: (state, action) => {
      state.isOpened = action.payload;
    },
    setDealPath: (state, { payload }) => {
      state.dealPath = payload;
    },
    resetDealData: (state) => {
      state.dealData = initialState.dealData;
    },
    resetNotificationData: (state) => {
      state.unread = 0;
      state.unwatchedData = [];
      state.watchedData = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNotifications.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchNotifications.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.unread = payload.unread;
    });
    builder.addCase(fetchNotifications.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload?.error;
    });
    builder.addCase(readNotification.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(readNotification?.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(readNotification.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    builder.addCase(getCurrentDealStage.pending, (state) => {
      state.dealFetching = true;
    });
    builder.addCase(getCurrentDealStage.fulfilled, (state, { payload }) => {
      state.dealFetching = false;
      state.dealData = payload;
    });
    builder.addCase(getCurrentDealStage.rejected, (state, { payload }) => {
      state.dealFetching = false;
      state.error = payload;
    });
  },
});

export const {
  setConnectionStatus,
  setFilterParams,
  setIsOpened,
  setWatchedData,
  setUnwatchedData,
  setDealPath,
  resetNotifications,
  updateWatchedData,
  updateUnwatchedData,
  getUnwatchedData,
  getWatchedData,
  resetParams,
  resetNotificationData,
  resetDealData,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
