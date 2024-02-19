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
  reducers: {
    setPaymentTerms: (state, { payload }) => {
      state.data.paymentTerms = payload;
    },
    setDemurragePaymentTerms: (state, { payload }) => {
      state.data.demurragePaymentTerms = payload;
    },
  },
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

export const { setPaymentTerms, setDemurragePaymentTerms } = offerSlice.actions;

export default offerSlice.reducer;
