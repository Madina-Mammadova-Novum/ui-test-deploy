import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

import { citiesAdapter } from '@/adapters/citiesAdapter';

export const citiesApi = createApi({
  reducerPath: 'citiesApi',
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
    cities: builder.query({
      query: () => 'cities',
      transformResponse: (data) => citiesAdapter(data),
    }),
  }),
});
