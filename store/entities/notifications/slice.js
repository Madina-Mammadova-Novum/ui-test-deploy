/* eslint-disable import/no-cycle */
import { createSlice } from '@reduxjs/toolkit';

import { fetchReadedNotifications, fetchUnreadedNotifications } from './actions';

const initialState = {
  isConnected: false,
  activeTab: 'unread',
  loading: false,
  error: null,
  watched: {
    total: 0,
    data: [],
  },
  unwatched: {
    total: 0,
    data: [],
  },
  filterParams: {
    searchValue: '',
    sortedValue: '',
    skip: 0,
    take: 50,
    watched: false,
  },
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setWatchedData: (state, { payload }) => {
      state.watched.data = payload;
    },
    updateWatchedData: (state, action) => {
      state.watched.data = [...state.watched.data, ...action.payload];
    },
    setUnwatchedData: (state, { payload }) => {
      state.unwatched.data = payload;
    },
    updateUnwatchedData: (state, action) => {
      state.unwatched.data = [...state.watched.data, ...action.payload];
    },
    setFilterParams: (state, action) => {
      state.filterParams = {
        ...state.filterParams,
        ...action.payload,
      };
    },
    resetNotifications: (state) => {
      state.filterParams = initialState.filterParams;
    },
    setConnectionStatus: (state, action) => {
      state.isConnected = action.payload;
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReadedNotifications.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchReadedNotifications.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.watched.total = payload?.total;
      })
      .addCase(fetchReadedNotifications.rejected, (state) => {
        state.error = true;
      })
      .addCase(fetchUnreadedNotifications.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUnreadedNotifications.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.unwatched.total = payload?.total;
      })
      .addCase(fetchUnreadedNotifications.rejected, (state) => {
        state.error = true;
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
  setActiveTab,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
