import { createSlice } from '@reduxjs/toolkit';
/* Actions */
import { HYDRATE } from 'next-redux-wrapper';

import { authApi } from './actions';

const initialState = {
  isAuthenticated: false,
  accessToken: localStorage.getItem('accessToken') ?? '',
  refreshToken: localStorage.getItem('refreshToken') ?? '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setRefreshToken: (state, action) => {
      state.refreshToken = action.payload;
    },
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    clearTokens: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
      const { accessToken, refreshToken } = action.payload.data;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.isAuthenticated = true;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
    });
  },
  [HYDRATE]: (state, action) => {
    return {
      ...state,
      ...action.payload,
    };
  },
});

export const { setAccessToken, setRefreshToken, setIsAuthenticated, clearTokens } = authSlice.actions;

export default authSlice.reducer;
