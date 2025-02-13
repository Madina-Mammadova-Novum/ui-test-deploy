import { createSlice } from '@reduxjs/toolkit';

import { fetchFailedOffers } from './actions';

const initialState = {
  data: {
    offers: [],
    searchParams: {},
    sorting: {},
    totalPages: 0,
    perPage: 5,
  },
  loading: false,
  error: null,
  toggle: false,
};

const failedOffersSlice = createSlice({
  name: 'failedOffers',
  initialState,
  reducers: {
    setToggle: (state, { payload }) => {
      state.toggle = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFailedOffers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFailedOffers.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = payload.data;
      })
      .addCase(fetchFailedOffers.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const { setToggle } = failedOffersSlice.actions;
export default failedOffersSlice.reducer;
