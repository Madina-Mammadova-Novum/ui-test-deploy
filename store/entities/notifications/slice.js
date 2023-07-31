import { createSlice } from '@reduxjs/toolkit';

/* Actions */
import { fetchNotifications } from './actions';

const initialState = {
  data: [],
  isConnected: false,
  loading: false,
  error: null,
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
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

export const { setConnectionStatus } = notificationsSlice.actions;

export default notificationsSlice.reducer;
