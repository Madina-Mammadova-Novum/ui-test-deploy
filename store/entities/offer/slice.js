import { createSlice } from '@reduxjs/toolkit';

import { fetchOfferOptions, fetchOfferValidation, fetchСounterOfferValidation } from './actions';

import { convertPayloadToOptions } from '@/utils/helpers';

const initialState = {
  loading: true,
  validating: false,
  valid: false,
  laycanEnd: null,
  laycanStart: null,
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
    builder.addCase(fetchOfferOptions.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchOfferOptions.fulfilled, (state, action) => {
      state.loading = false;
      state.data = {
        ...state.data,
        ...action.payload?.data,
      };
    });
    builder.addCase(fetchOfferOptions.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.error;
    });
    builder.addCase(fetchOfferValidation.pending, (state) => {
      state.validating = true;
    });
    builder.addCase(fetchOfferValidation.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.validating = false;
      state.valid = payload?.canProceed;
      state.data.ranges = payload?.ranges;
      state.data.message = payload?.message;
      state.data.laycanStart = payload?.laycanStart;
      state.data.laycanEnd = payload?.laycanEnd;
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
      state.loading = false;
      state.validating = false;
      state.valid = payload?.canProceed;
      state.data.ranges = payload?.ranges;
      state.data.message = payload?.message;
      state.data.demurragePaymentTerms = convertPayloadToOptions(payload?.demurragePaymentTerms, 'id', 'name');
      state.data.paymentTerms = convertPayloadToOptions(payload?.paymentTerms, 'id', 'name');
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

export const { setPaymentTerms, setDemurragePaymentTerms, resetOfferData } = offerSlice.actions;

export default offerSlice.reducer;
