/* eslint-disable import/no-cycle */
import { createSlice } from '@reduxjs/toolkit';

import { fetchMoreNotifications, fetchNotifications } from './actions';

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
    sortedValue: 'all',
    skip: 0,
    take: 50,
    watched: false,
    triggered: false,
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
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNotifications.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.watched.total = payload?.watchedCounter;
        state.unwatched.total = payload?.unwatchedCounter;
      })
      .addCase(fetchNotifications.rejected, (state) => {
        state.error = true;
      })
      .addCase(fetchMoreNotifications.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMoreNotifications.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchMoreNotifications.rejected, (state) => {
        state.loading = false;
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
