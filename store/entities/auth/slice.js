import { createSlice } from '@reduxjs/toolkit';

// eslint-disable-next-line import/no-cycle
import { signIn } from './actions';

import { removeCookie } from '@/utils/helpers';

const initialState = {
  loading: false,
  authorized: false,
  session: null,
  error: null,
};

const authSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    clearSession: (state) => {
      state.authorized = initialState.authorized;
      state.error = initialState.error;
      state.session = initialState.session;
      state.loading = initialState.loading;

      removeCookie('session-user-id');
      removeCookie('session-user-role');
      removeCookie('session-access-token');
      removeCookie('session-refresh-token');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state) => {
      state.loading = true;
      state.authorized = false;
    });
    builder.addCase(signIn.fulfilled, (state, { payload }) => {
      state.error = false;
      state.loading = false;
      state.authorized = true;
      state.session = payload;
    });
    builder.addCase(signIn.rejected, (state, { payload }) => {
      state.authorized = false;
      state.loading = false;
      state.error = payload;
    });
  },
});

export const { clearSession } = authSlice.actions;

export default authSlice.reducer;
