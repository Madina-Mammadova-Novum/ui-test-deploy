import { createSlice } from '@reduxjs/toolkit';

import { fetchUserNegotiating } from './actions';

import { transformDate } from '@/utils/date';

const initialState = {
  loading: true,
  error: null,
  toggle: false,
  data: {
    totalPages: 0,
    offers: [],
    offerById: {},
  },
  tab: 'incoming',
};

const negotiatingSlice = createSlice({
  name: 'negotiating',
  initialState,
  reducers: {
    setToggle: (state, { payload }) => {
      state.toggle = payload;
    },
    setTab: (state, { payload }) => {
      state.tab = payload;
    },
    updateCountdown: (state, action) => {
      const { parentId, offerId, isOwner, extendMinute = 15 } = action?.payload;
      const extendMinutesInMs = extendMinute * 60 * 1000; // Convert minutes to milliseconds

      state.data.offerById[parentId][isOwner ? 'incoming' : 'sent'] = state.data.offerById[parentId][
        isOwner ? 'incoming' : 'sent'
      ].map((offer) =>
        offer.id === offerId
          ? {
              ...offer,
              expiresAt: transformDate(
                new Date(offer.expiresAt).getTime() + extendMinutesInMs,
                "yyyy-MM-dd'T'HH:mm:ss.SSS"
              ),
            }
          : offer
      );
    },
    updateAssignedTasksForOffers: (state, action) => {
      const { parentId, offers, type } = action?.payload; // type: 'incoming' or 'sent'

      if (state.data.offerById[parentId] && state.data.offerById[parentId][type]) {
        state.data.offerById[parentId][type] = offers;
      }
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

export const { updateCountdown, setToggle, setTab, updateAssignedTasksForOffers } = negotiatingSlice.actions;

export default negotiatingSlice.reducer;
