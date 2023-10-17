import { createSlice } from '@reduxjs/toolkit';

import { fetchUserNegotiating } from './actions';

import { FIFTEEN_MINUTES_IN_MS } from '@/lib/constants';
import { transformDate } from '@/utils/date';

const initialState = {
  loading: true,
  error: null,
  data: {
    totalPages: 0,
    offers: [],
    offerById: {},
  },
};

const negotiatingSlice = createSlice({
  name: 'negotiating',
  initialState,
  reducers: {
    updateCountdown: (state, action) => {
      const { itemId, offerId, isOwner } = action?.payload;
      state.data.offerById[itemId][isOwner ? 'incoming' : 'sent'] = state.data.offerById[itemId][
        isOwner ? 'incoming' : 'sent'
      ].map((offer) =>
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
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserNegotiating.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUserNegotiating.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload?.data;
    });
    builder.addCase(fetchUserNegotiating.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.error;
    });
  },
});

export const { updateCountdown } = negotiatingSlice.actions;

export default negotiatingSlice.reducer;
