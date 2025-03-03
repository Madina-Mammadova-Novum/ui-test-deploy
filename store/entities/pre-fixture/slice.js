import { createSlice } from '@reduxjs/toolkit';

import { fetchPrefixtureOffers } from './actions';

import { FIFTEEN_MINUTES_IN_MS } from '@/lib/constants';
import { transformDate } from '@/utils/date';

const initialState = {
  loading: true,
  error: null,
  toggle: false,
  data: {
    offers: [],
    totalPages: 0,
  },
};

const preFixtureSlice = createSlice({
  name: 'preFixture',
  initialState,
  reducers: {
    setToggle: (state, { payload }) => {
      state.toggle = payload;
    },
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
    updateCountdown: (state, action) => {
      const { offerId } = action?.payload;
      state.data.offers = state.data.offers.map((offer) =>
        offer.id === offerId
          ? {
              ...offer,
              expiresAt: transformDate(
                new Date(offer.expiresAt).getTime() + FIFTEEN_MINUTES_IN_MS,
                "yyyy-MM-dd'T'HH:mm:ss.SSS"
              ),
            }
          : offer
      );
    },
    updateSpecificOffer: (state, action) => {
      const { offerId, data } = action?.payload;
      state.data.offers = state.data.offers.map((offer) =>
        offer.id === offerId
          ? {
              ...offer,
              ...data,
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

export const { updateConfirmationStatus, updateCountdown, updateSpecificOffer, setToggle } = preFixtureSlice.actions;

export default preFixtureSlice.reducer;
