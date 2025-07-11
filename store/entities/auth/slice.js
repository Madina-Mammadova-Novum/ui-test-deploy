import { createSlice } from '@reduxjs/toolkit';

import { signIn } from './actions';

import { removeCookie } from '@/utils/helpers';

const initialState = {
  loading: false,
  authorized: false,
  session: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearSession: (state) => {
      removeCookie('session-user-id');
      removeCookie('session-user-role');
      removeCookie('session-access-token');
      removeCookie('session-refresh-token');

      // Clear remember-me preference
      if (typeof window !== 'undefined') {
        localStorage.removeItem('remember-me');
      }

      state.authorized = initialState.authorized;
      state.error = initialState.error;
      state.session = initialState.session;
      state.loading = initialState.loading;
    },
    clearError: (state) => {
      state.authorized = initialState.authorized;
      state.error = initialState.error;
      state.session = initialState.session;
      state.loading = initialState.loading;
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

export const { clearSession, clearError } = authSlice.actions;

export default authSlice.reducer;
