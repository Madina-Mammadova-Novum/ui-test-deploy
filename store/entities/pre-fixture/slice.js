import { createSlice } from '@reduxjs/toolkit';

import { fetchDealCountdownData, fetchPrefixtureOffers } from './actions';

import { transformDate } from '@/utils/date';

const initialState = {
  loading: true,
  error: null,
  toggle: null,
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
    builder.addCase(fetchDealCountdownData.pending, () => {
      // Optional: could add a separate loading state for deal countdown
    });
    builder.addCase(fetchDealCountdownData.fulfilled, () => {
      // The countdown data represents the remaining time for a specific deal.
      // When this data is fetched successfully, it is dispatched to the notifications slice
      // using a separate action. The notifications slice is responsible for updating the
      // state related to deal notifications, including countdown timers.
      // This dispatch is typically triggered in the relevant React component that handles
      // deal notifications, ensuring the UI reflects the updated countdown data.
    });
    builder.addCase(fetchDealCountdownData.rejected, (state, action) => {
      console.error('Failed to fetch deal countdown data:', action.payload);
    });
  },
});

export const {
  updateConfirmationStatus,
  updateCountdown,
  updateDocumentList,
  updateDocumentStatus,
  updateSpecificOffer,
  setToggle,
} = preFixtureSlice.actions;

export default preFixtureSlice.reducer;
