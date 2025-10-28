import { createSlice } from '@reduxjs/toolkit';

import { fetchDealCountdownData, fetchUserNegotiating } from './actions';

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
  tabsByParentId: {}, // Store tabs per card/parentId for multiple cards
  expandedParentId: null, // Track which card should be expanded
  countdownData: {}, // For storing individual deal countdown data
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
    setTabForParent: (state, action) => {
      const { parentId, tab } = action?.payload;
      state.tabsByParentId[parentId] = tab;
    },
    setExpandedParent: (state, action) => {
      const { parentId } = action?.payload;
      state.expandedParentId = parentId;
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
    builder.addCase(fetchDealCountdownData.pending, () => {
      // Could add loading state for countdown data if needed
    });
    builder.addCase(fetchDealCountdownData.fulfilled, (state, action) => {
      const { dealId, ...countdownData } = action.payload;
      state.countdownData[dealId] = countdownData;
    });
    builder.addCase(fetchDealCountdownData.rejected, (state, action) => {
      // Could handle countdown data fetch errors if needed
      console.error('Failed to fetch countdown data:', action.payload);
    });
  },
});

export const { updateCountdown, setToggle, setTab, setTabForParent, setExpandedParent } = negotiatingSlice.actions;

export default negotiatingSlice.reducer;
