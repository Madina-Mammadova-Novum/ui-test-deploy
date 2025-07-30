import { createSlice } from '@reduxjs/toolkit';

import { fetchOnSubsOffers } from './actions';

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

const onSubsSlice = createSlice({
  name: 'onSubs',
  initialState,
  reducers: {
    setToggle: (state, { payload }) => {
      state.toggle = payload;
    },
    updateDocumentStatus: (state, action) => {
      const { documentId, status } = action?.payload;
      state.data.offers = state.data.offers.map((offer) => ({
        ...offer,
        documents: offer.documents.map((document) => (document.id === documentId ? { ...document, status } : document)),
      }));
    },
    updateDocumentList: (state, action) => {
      const { offerId, newDocuments } = action?.payload;

      state.data.offers = state.data.offers.map((offer) =>
        offer.id === offerId
          ? {
              ...offer,
              documents: [...offer.documents, ...newDocuments],
            }
          : offer
      );
    },
    updateCountdown: (state, action) => {
      const { offerId, extendMinute = 15 } = action?.payload;
      const extendMinutesInMs = extendMinute * 60 * 1000; // Convert minutes to milliseconds

      state.data.offers = state.data.offers.map((offer) =>
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
    updateDeals: (state, action) => {
      const { offerId, updates } = action?.payload;

      state.data.offers = state.data.offers.map((offer) =>
        offer.id === offerId
          ? {
              ...offer,
              ...updates,
            }
          : offer
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOnSubsOffers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchOnSubsOffers.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload?.data;
    });
    builder.addCase(fetchOnSubsOffers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.error;
    });
  },
});

export const { updateDocumentStatus, updateDocumentList, updateCountdown, updateDeals, setToggle } =
  onSubsSlice.actions;

export default onSubsSlice.reducer;
