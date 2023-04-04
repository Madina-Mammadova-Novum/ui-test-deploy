import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

import { authorization } from '@/lib/api';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_LOGIN_API_URL,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      const { accessToken } = getState().auth;
      if (accessToken) headers.set(authorization(accessToken));

      return headers;
    },
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) return action.payload[reducerPath];
    return null;
  },
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: 'token',
        method: 'POST',
        body: credentials,
      }),
      transformResponse: (data) => data,
    }),
    refreshToken: builder.mutation({
      query: (refreshToken) => ({
        url: 'token/refresh-token',
        method: 'POST',
        body: { refreshToken },
      }),
    }),
  }),
});
