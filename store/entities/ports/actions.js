import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

import { terminalAdapter } from '@/adapters';

export const portsApi = createApi({
  reducerPath: 'portsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
    return null;
  },
  endpoints: (builder) => ({
    ports: builder.query({
      query: () => 'ports/registryports',
    }),
    terminals: builder.query({
      query: () => 'ports/registryports?limit=10',
      transformResponse: (data) => data?.map(({ terminals }) => terminalAdapter(terminals ?? [])),
    }),
  }),
});
