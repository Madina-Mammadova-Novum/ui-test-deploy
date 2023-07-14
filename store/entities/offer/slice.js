import { createSlice } from '@reduxjs/toolkit';

import { fetchOfferOptioins } from './actions';

const initialState = {
  loading: true,
  error: null,
  data: {
    paymentTerms: [],
    demurragePaymentTerms: [],
    freightFormats: [],
  },
};

const offerSlice = createSlice({
  name: 'offer',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchOfferOptioins.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchOfferOptioins.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload?.data;
    });
    builder.addCase(fetchOfferOptioins.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.error;
    });
  },
});

export default offerSlice.reducer;
