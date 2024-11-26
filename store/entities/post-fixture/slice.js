import { createSlice } from '@reduxjs/toolkit';

import { fetchPostFixtureOffers } from './actions';

const initialState = {
  loading: true,
  error: null,
  toggle: false,
  data: {
    offers: [],
    filters: {},
    filterData: {},
    sorting: {},
    totalPages: 0,
    perPage: 5,
  },
};

const postFixtureSlice = createSlice({
  name: 'postFixture',
  initialState,
  reducers: {
    setToggle: (state, { payload }) => {
      state.toggle = payload;
    },
    setFilter: (state, { payload }) => {
      state.data.filters = payload;
    },
    setSearchParams: (state, { payload }) => {
      state.data.searchParams = payload;
    },
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
    builder.addCase(fetchPostFixtureOffers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPostFixtureOffers.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload?.data;
    });
    builder.addCase(fetchPostFixtureOffers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.error;
    });
  },
});

export const { updateDocumentStatus, updateDocumentList, setToggle, setFilter, setSearchParams } =
  postFixtureSlice.actions;

export default postFixtureSlice.reducer;
