import { createSlice } from '@reduxjs/toolkit';

import { fetchPrefixtureOffers } from './actions';

const initialState = {
  loading: true,
  error: null,
  data: {
    offers: [],
    totalPages: 0,
  },
};

const preFixtureSlice = createSlice({
  name: 'pre-fixture',
  initialState,
  reducers: {
    updateConfirmationStatus: (state, action) => {
      const { offerId, isOwner } = action?.payload;
      state.data.offers = state.data.offers.map((offer) =>
        offer.id === offerId
          ? {
              ...offer,
              [isOwner ? 'ownerConfirmed' : 'chartererConfirmed']: 'Confirmed',
            }
          : offer
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPrefixtureOffers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPrefixtureOffers.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload?.data;
    });
    builder.addCase(fetchPrefixtureOffers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.error;
    });
  },
});

export const { updateConfirmationStatus } = preFixtureSlice.actions;

export default preFixtureSlice.reducer;
