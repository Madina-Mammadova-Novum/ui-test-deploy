import { createSlice } from '@reduxjs/toolkit';

import { fetchOfferOptioins, fetchOfferValidation, fetchСounterOfferValidation } from './actions';

const initialState = {
  loading: true,
  validating: false,
  valid: false,
  error: null,
  data: {
    message: null,
    ranges: {},
    paymentTerms: [],
    demurragePaymentTerms: [],
    freightFormats: [],
  },
};

const offerSlice = createSlice({
  name: 'offer',
  initialState,
  reducers: {
    setRanges: (state, { payload }) => {
      state.data.ranges = payload;
    },
    setPaymentTerms: (state, { payload }) => {
      state.data.paymentTerms = payload;
    },
    setDemurragePaymentTerms: (state, { payload }) => {
      state.data.demurragePaymentTerms = payload;
    },
    resetOfferData: (state) => {
      state.data = initialState.data;
      state.error = initialState.error;
      state.valid = initialState.valid;
      state.validating = initialState.validating;
      state.loading = initialState.loading;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOfferOptioins.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchOfferOptioins.fulfilled, (state, action) => {
      state.loading = false;
      state.data = {
        ...state.data,
        ...action.payload?.data,
      };
    });
    builder.addCase(fetchOfferOptioins.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.error;
    });
    builder.addCase(fetchOfferValidation.pending, (state) => {
      state.validating = true;
    });
    builder.addCase(fetchOfferValidation.fulfilled, (state, { payload }) => {
      state.validating = false;
      state.valid = payload?.canProceed;
      state.data.ranges = payload?.ranges;
      state.data.message = payload?.message;
      state.error = null;
    });
    builder.addCase(fetchOfferValidation.rejected, (state, action) => {
      state.validating = false;
      state.loading = false;
      state.valid = false;
      state.error = action.payload;
    });
    builder.addCase(fetchСounterOfferValidation.pending, (state) => {
      state.validating = true;
    });
    builder.addCase(fetchСounterOfferValidation.fulfilled, (state, { payload }) => {
      state.validating = false;
      state.valid = payload?.canProceed;
      state.data.ranges = payload?.ranges;
      state.data.message = payload?.message;
      state.error = null;
    });
    builder.addCase(fetchСounterOfferValidation.rejected, (state, action) => {
      state.validating = false;
      state.loading = false;
      state.valid = false;
      state.error = action.payload;
    });
  },
});

export const { setPaymentTerms, setDemurragePaymentTerms, setRanges, resetOfferData } = offerSlice.actions;

export default offerSlice.reducer;
