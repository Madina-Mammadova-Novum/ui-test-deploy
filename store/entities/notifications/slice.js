import { createSlice } from '@reduxjs/toolkit';
/* Actions */

// import { fetchNotifications } from '@/store/entities/notifications/actions'

const initialState = {
  data: [],
  isConnected: false,
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setConnectionStatus: (state, action) => {
      state.isConnected = action.payload;
    },
  },
});

export const { setConnectionStatus } = notificationsSlice.actions;

export default notificationsSlice.reducer;
