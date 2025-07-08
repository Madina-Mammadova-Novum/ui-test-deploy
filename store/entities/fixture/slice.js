import { createSlice } from '@reduxjs/toolkit';

import { fetchFixtureOffers } from './actions';

const initialState = {
  loading: true,
  error: null,
  toggle: false,
  data: {
    offers: [],
    totalPages: 0,
  },
};

const fixtureSlice = createSlice({
  name: 'fixture',
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

export const { updateDocumentStatus, updateDocumentList, setToggle } = fixtureSlice.actions;

export default fixtureSlice.reducer;
