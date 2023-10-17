import { createSlice } from '@reduxjs/toolkit';

import { fetchFixtureOffers } from './actions';

const initialState = {
  loading: true,
  error: null,
  data: {
    offers: [],
    totalPages: 0,
  },
};

const fixtureSlice = createSlice({
  name: 'fixture',
  initialState,
  reducers: {
    updateDocumentStatus: (state, action) => {
      const { documentId, status } = action?.payload;
      state.data.offers = state.data.offers.map((offer) => ({
        ...offer,
        documents: offer.documents.map((document) => (document.id === documentId ? { ...document, status } : document)),
      }));
    },
    updateDocumentList: (state, action) => {
      const { offerId, newDocument } = action?.payload;
      state.data.offers = state.data.offers.map((offer) =>
        offer.id === offerId
          ? {
              ...offer,
              documents: [...offer.documents, newDocument],
            }
          : offer
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFixtureOffers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchFixtureOffers.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload?.data;
    });
    builder.addCase(fetchFixtureOffers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.error;
    });
  },
});

export const { updateDocumentStatus, updateDocumentList } = fixtureSlice.actions;

export default fixtureSlice.reducer;
